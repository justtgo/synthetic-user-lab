import { useState, useEffect, useRef } from 'react';
import { PERSONAS, MODES } from './personas/index.js';
import { sendMessage, MODELS } from './lib/gemini.js';

const KEY_STORAGE = 'sul_gemini_key';
const PERSONA_ID = 'millennial';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_STORAGE) || '');
  const [keyDraft, setKeyDraft] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [mode, setMode] = useState('persona_simulation');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  const persona = PERSONAS[PERSONA_ID];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function saveKey() {
    const k = keyDraft.trim();
    if (!k) return;
    localStorage.setItem(KEY_STORAGE, k);
    setApiKey(k);
  }

  function resetKey() {
    localStorage.removeItem(KEY_STORAGE);
    setApiKey('');
    setKeyDraft('');
    setMessages([]);
    setError('');
  }

  function resetConversation() {
    setMessages([]);
    setError('');
  }

  async function ask(question) {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setError('');
    setInput('');
    const next = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const systemPrompt = persona.prompts[mode];
      const reply = await sendMessage({ apiKey, model, systemPrompt, messages: next });
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function exportTranscript() {
    const lines = [];
    lines.push('# Synthetic User Lab — Transcript');
    lines.push('');
    lines.push(`- Persona: ${persona.profile.generation} (${persona.profile.ageRange}) — ${persona.profile.name}`);
    lines.push(`- Mode: ${MODES[mode].label}`);
    lines.push(`- Model: ${MODELS[model]}`);
    lines.push(`- Exported: ${new Date().toISOString()}`);
    lines.push('');
    lines.push('> WARNING: This is AI-generated content imitating a user. It is NOT a real user and must not be used as a substitute for real research.');
    lines.push('');
    messages.forEach((m) => {
      const who = m.role === 'user' ? 'Interviewer' : persona.profile.name;
      lines.push(`**${who}:** ${m.content}`);
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${PERSONA_ID}-${mode}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---- Setup screen (no API key yet) ----
  if (!apiKey) {
    return (
      <div className="container setup">
        <header className="header">
          <div>
            <h1>Synthetic User Lab</h1>
            <p className="subtitle">A tool that critiques synthetic users — built with AI · BYOK · Free tier</p>
          </div>
        </header>

        <div className="setup-card">
          <h2>Step 1 — Your Google AI Studio API key</h2>
          <p className="muted">
            This tool calls the Google Gemini API directly from your browser. Your key is stored only
            in this browser's localStorage and is never sent anywhere except Google.
          </p>
          <div className="input-row">
            <input
              type="password"
              placeholder="Paste your Gemini API key (starts with AIza...)"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveKey()}
            />
            <button onClick={saveKey}>Save &amp; start</button>
          </div>
          <p className="muted small">
            No key yet? Get one free (no credit card) at{' '}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">
              aistudio.google.com/apikey
            </a>.
          </p>
          <div className="mode-warning" style={{ marginTop: 8 }}>
            <strong>Privacy note:</strong> On the free tier, Google may use your prompts to improve its
            models. That's fine for fashion personas — but don't paste anything confidential.
          </div>
        </div>

        <footer className="footer">
          <p className="muted small">
            ⚠️ This tool generates AI content that imitates a user. It is not a real user. Use it for
            hypotheses, not conclusions.
          </p>
        </footer>
      </div>
    );
  }

  // ---- Main app ----
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Synthetic User Lab</h1>
          <p className="subtitle">
            {persona.profile.generation} ({persona.profile.ageRange}) · {persona.profile.domain}
          </p>
        </div>
        <button className="ghost" onClick={resetKey} title="Clear stored API key">
          🔑 Reset key
        </button>
      </header>

      <div className="controls">
        <div className="control-group">
          <label>Mode</label>
          <div className="toggle-group">
            {Object.entries(MODES).map(([id, m]) => (
              <button
                key={id}
                className={`toggle ${mode === id ? 'active' : ''}`}
                onClick={() => setMode(id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {Object.entries(MODELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mode-warning">{MODES[mode].warning}</div>

      <div className="chat">
        {messages.length === 0 && (
          <div className="suggestions">
            <p className="muted small">Try one of these:</p>
            {persona.profile.suggestedQuestions.map((q, i) => (
              <button key={i} className="suggestion" onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role === 'user' ? 'user' : 'assistant'}`}>
            <div className="message-role">{m.role === 'user' ? 'You' : persona.profile.name}</div>
            <div className="message-content">{m.content}</div>
          </div>
        ))}

        {loading && (
          <div className="message message-assistant">
            <div className="message-role">{persona.profile.name}</div>
            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && <div className="error-box">{error}</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="input-row">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
          disabled={loading}
        />
        <button onClick={() => ask()} disabled={loading}>
          Send
        </button>
      </div>

      <div className="actions">
        <button className="ghost" onClick={exportTranscript} disabled={messages.length === 0}>
          📥 Export transcript (.md)
        </button>
        <button className="ghost" onClick={resetConversation} disabled={messages.length === 0}>
          🔄 Reset conversation
        </button>
      </div>

      <footer className="footer">
        <p className="muted small">
          ⚠️ This tool generates AI content that imitates a user. It is not a real user. Don't make
          product decisions based on this alone — use it for hypotheses, not conclusions.
        </p>
      </footer>
    </div>
  );
}
