// Cloudflare Pages Function — server-side proxy for Groq API.
// Path: POST /api/chat
//
// Why this exists: the Groq API key MUST stay server-side. If we put it in
// VITE_* env, Vite bakes it into the public JS bundle — anyone can extract it.
// This function reads GROQ_API_KEY from Cloudflare's server-side environment
// (Pages → Settings → Environment variables) and forwards the chat request.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL    = 'llama-3.3-70b-versatile';

function buildHeaders(key) {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Tahanan-Tutorial/1.0 (+https://tahanan-tutorial.pages.dev)',
    'Authorization': `Bearer ${key}`
  };
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra }
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.GROQ_API_KEY) {
    return json(
      { error: 'Server is missing the GROQ_API_KEY environment variable. Configure it in the Cloudflare Pages dashboard under Settings → Environment variables.' },
      500
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    return json({ error: 'messages[] is required' }, 400);
  }

  const safePayload = {
    model: MODEL,
    messages: body.messages,
    temperature: clamp(num(body.temperature, 0.4), 0, 1),
    max_tokens: clamp(int(body.max_tokens, 800), 16, 1024)
  };

  let groqRes;
  try {
    groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: buildHeaders(env.GROQ_API_KEY),
      body: JSON.stringify(safePayload)
    });
  } catch (err) {
    return json({ error: 'Network error reaching Groq', detail: String(err) }, 502);
  }

  const text = await groqRes.text();
  return new Response(text, {
    status: groqRes.status,
    headers: { 'Content-Type': groqRes.headers.get('Content-Type') || 'application/json' }
  });
}

// Diagnostic endpoints:
//   GET /api/chat            → env var inspection (no Groq call)
//   GET /api/chat?test=1     → live Groq round-trip with current key
//   GET /api/chat?test=1&model=openai/gpt-oss-20b → try a different model
export async function onRequestGet({ request, env }) {
  const k = env.GROQ_API_KEY || '';
  const url = new URL(request.url);

  if (url.searchParams.get('test') === '1') {
    if (!k) return json({ error: 'No key configured' }, 500);
    const testModel = url.searchParams.get('model') || MODEL;
    try {
      const testRes = await fetch(GROQ_URL, {
        method: 'POST',
        headers: buildHeaders(k),
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 5
        })
      });
      const body = await testRes.text();
      return json({
        status: testRes.status,
        ok: testRes.ok,
        modelTried: testModel,
        groqResponse: body.slice(0, 1500)
      });
    } catch (err) {
      return json({ error: 'fetch threw', detail: String(err) }, 500);
    }
  }

  return json({
    keyConfigured: !!k,
    keyLength: k.length,
    keyPrefix: k.slice(0, 4) || null,
    keySuffix: k.slice(-4) || null,
    hasLeadingWhitespace: k !== k.trimStart(),
    hasTrailingWhitespace: k !== k.trimEnd(),
    startsWithBearer: k.toLowerCase().startsWith('bearer '),
    looksLikeGroqKey: k.startsWith('gsk_'),
    defaultModel: MODEL
  });
}

function num(v, dflt) { const n = Number(v); return Number.isFinite(n) ? n : dflt; }
function int(v, dflt) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : dflt; }
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
