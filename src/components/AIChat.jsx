import { useEffect, useRef, useState } from 'react';
import { buildSystemPrompt } from '../data/aiPrompt.js';
import { SITE } from '../data/config.js';
import { IconClose } from './Icons.jsx';

// Frontend calls our own /api/chat path. In production this hits the
// Cloudflare Pages Function (functions/api/chat.js). In dev it's proxied by
// Vite straight to Groq with the key from .env. Either way the key never
// touches the client bundle.
const CHAT_ENDPOINT = '/api/chat';

const SUGGESTED = [
  'What programs do you offer?',
  'How much are the fees?',
  'My child is 4 — what level would they start at?',
  'How is this different from Kumon?'
];

const INITIAL_GREETING = {
  role: 'assistant',
  text: `Magandang araw, magulang! 🌱 I'm Tahanan's virtual assistant. I can help with programs, fees, levels, schedules, or how enrollment works. Ask me anything — or pick a suggestion below.`
};

export default function AIChat() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState([INITIAL_GREETING]);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);
  const [hasPulsed, setHasPulsed] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) window.setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasPulsed(true);
  };

  const sendMessage = async (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m !== INITIAL_GREETING)
        .slice(-10)
        .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));

      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            ...history,
            { role: 'user', content: trimmed }
          ],
          temperature: 0.4,
          max_tokens: 800
        })
      });

      if (!res.ok) {
        let detail = '';
        try { const j = await res.json(); detail = j?.error || j?.message || ''; } catch {}
        if (res.status === 401 || res.status === 403) throw new Error('AI key invalid or revoked. The site owner needs to rotate GROQ_API_KEY in Cloudflare → Settings → Variables, then redeploy.');
        if (res.status === 429) throw new Error('Many questions right now — please try again in a moment.');
        if (res.status === 500 && detail) throw new Error(detail);
        throw new Error(`Request failed (${res.status})${detail ? `: ${detail}` : ''}`);
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (!reply) throw new Error('Unexpected response from AI');

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setError(err.message || `Sorry — having trouble connecting. Try again or message ${SITE.teacherName} directly.`);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggested = messages.length === 1 && !isLoading && !error;

  return (
    <>
      <button
        className={`ai-bubble ${!hasPulsed ? 'pulse' : ''} ${isOpen ? 'open' : ''}`}
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {isOpen ? (
          <IconClose width={20} height={20} />
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
        <span className="ai-bubble-badge" aria-hidden="true">AI</span>
      </button>

      {isOpen && (
        <div className="ai-panel" role="dialog" aria-label="Tahanan virtual assistant">
          <header className="ai-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <span>T</span>
                <span className="ai-status" aria-hidden="true" />
              </div>
              <div>
                <h3>Ask Tahanan</h3>
                <p>Virtual assistant · powered by AI</p>
              </div>
            </div>
            <button className="ai-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <IconClose width={14} height={14} />
            </button>
          </header>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                {m.text}
              </div>
            ))}

            {isLoading && (
              <div className="ai-typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}

            {error && (
              <div className="ai-error">
                {error} <button onClick={() => setError(null)}>dismiss</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {showSuggested && (
            <div className="ai-suggested">
              {SUGGESTED.map((q) => (
                <button key={q} onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}

          <div className="ai-input-row">
            <input
              ref={inputRef}
              className="ai-input"
              placeholder="Ask about programs, fees, schedules…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
            <button
              className="ai-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <footer className="ai-foot">
            <span>AI may make mistakes. Verify with <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></span>
          </footer>
        </div>
      )}
    </>
  );
}
