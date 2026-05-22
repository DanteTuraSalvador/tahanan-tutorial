// Cloudflare Pages Function — uses Workers AI (native, no external API).
// Path: POST /api/chat
//
// Why Workers AI: we pivoted away from Groq because Groq blocks our specific
// Cloudflare egress IPs for this account. Workers AI runs Llama natively inside
// Cloudflare's network — no external HTTP call, no API key, no routing issues.
// Free tier: 10,000 Neurons/day, plenty for a small tutorial center.

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra }
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.AI) {
    return json(
      { error: 'AI binding not configured. Owner: in Cloudflare → Pages project → Settings → Bindings, add a Workers AI binding named "AI".' },
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
    messages: body.messages,
    temperature: clamp(num(body.temperature, 0.4), 0, 1),
    max_tokens: clamp(int(body.max_tokens, 800), 16, 1024)
  };

  let result;
  try {
    result = await env.AI.run(MODEL, safePayload);
  } catch (err) {
    return json({ error: 'Workers AI call failed', detail: String(err) }, 502);
  }

  const text = result?.response ?? '';
  if (!text) {
    return json({ error: 'Empty response from Workers AI', raw: result }, 502);
  }

  // Return OpenAI-compatible shape so the existing frontend (data.choices[0].message.content) keeps working.
  return json({
    id: `chatcmpl-cf-${Date.now()}`,
    object: 'chat.completion',
    model: MODEL,
    choices: [{
      index: 0,
      message: { role: 'assistant', content: text },
      finish_reason: 'stop'
    }]
  });
}

// Diagnostic: GET /api/chat → check AI binding + run a tiny test inference.
export async function onRequestGet({ env }) {
  const hasBinding = !!env.AI;
  if (!hasBinding) {
    return json({ aiBinding: false, hint: 'Add a Workers AI binding named "AI" in Pages → Settings → Bindings.' });
  }

  try {
    const ping = await env.AI.run(MODEL, {
      messages: [{ role: 'user', content: 'Say hi in one word.' }],
      max_tokens: 5
    });
    return json({ aiBinding: true, model: MODEL, ok: true, sample: ping });
  } catch (err) {
    return json({ aiBinding: true, model: MODEL, ok: false, error: String(err) }, 500);
  }
}

function num(v, dflt) { const n = Number(v); return Number.isFinite(n) ? n : dflt; }
function int(v, dflt) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : dflt; }
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
