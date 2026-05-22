// Cloudflare Pages Function — server-side proxy for Groq API.
// Path: POST /api/chat
//
// Why this exists: the Groq API key MUST stay server-side. If we put it in
// VITE_* env, Vite bakes it into the public JS bundle — anyone can extract it.
// This function reads GROQ_API_KEY from Cloudflare's server-side environment
// (Pages → Settings → Environment variables) and forwards the chat request.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL    = 'llama-3.3-70b-versatile';

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

  // Whitelist + clamp inputs so clients can't abuse the key (e.g. swap to a
  // bigger model, request huge token counts, change provider params arbitrarily).
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify(safePayload)
    });
  } catch (err) {
    return json({ error: 'Network error reaching Groq', detail: String(err) }, 502);
  }

  // Pass through Groq's response (status + body), but never leak the auth header.
  const text = await groqRes.text();
  return new Response(text, {
    status: groqRes.status,
    headers: { 'Content-Type': groqRes.headers.get('Content-Type') || 'application/json' }
  });
}

function num(v, dflt) { const n = Number(v); return Number.isFinite(n) ? n : dflt; }
function int(v, dflt) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : dflt; }
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
