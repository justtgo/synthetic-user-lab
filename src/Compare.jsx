import { useState } from 'react';
import { PERSONAS } from './personas/index.js';
import { sendMessage } from './lib/gemini.js';
import { matchGroundTruth } from './personas/groundTruth.js';

const PERSONA_ID = 'millennial';

export default function Compare({ apiKey, model }) {
  const persona = PERSONAS[PERSONA_ID];
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [synthetic, setSynthetic] = useState('');
  const [personaSim, setPersonaSim] = useState('');
  const [gt, setGt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function run(qArg) {
    const q = (qArg ?? input).trim();
    if (!q || loading) return;
    setError('');
    setQuestion(q);
    setSynthetic('');
    setPersonaSim('');
    setGt(matchGroundTruth(q));
    setLoading(true);
    try {
      const [s, p] = await Promise.all([
        sendMessage({
          apiKey,
          model,
          systemPrompt: persona.prompts.synthetic,
          messages: [{ role: 'user', content: q }]
        }),
        sendMessage({
          apiKey,
          model,
          systemPrompt: persona.prompts.persona_simulation,
          messages: [{ role: 'user', content: q }]
        })
      ]);
      setSynthetic(s);
      setPersonaSim(p);
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const typing = (
    <span className="typing">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );

  return (
    <>
      <div className="mode-warning">
        Same question, three views: a generic <strong>synthetic user</strong>, a{' '}
        <strong>persona simulation</strong> anchored in real data, and the{' '}
        <strong>documented ground truth</strong> (cited). The two left columns are AI; the right
        column is real data — never a fabricated quote.
      </div>

      <div className="input-row">
        <input
          type="text"
          placeholder="Ask one question to compare..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          disabled={loading}
        />
        <button onClick={() => run()} disabled={loading}>
          Run comparison
        </button>
      </div>

      {!question && (
        <div className="suggestions">
          <p className="muted small">Try one of the research questions:</p>
          {persona.profile.suggestedQuestions.map((q, i) => (
            <button key={i} className="suggestion" onClick={() => run(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      {error && <div className="error-box">{error}</div>}

      {question && (
        <>
          <p className="compare-question">
            <strong>Question:</strong> {question}
          </p>

          <div className="compare-grid">
            <div className="compare-col">
              <span className="label label-bad">Synthetic user</span>
              <p className="muted small">Generic prompt · no data</p>
              <div className="compare-body">{loading && !synthetic ? typing : synthetic}</div>
            </div>

            <div className="compare-col">
              <span className="label label-mid">Persona simulation</span>
              <p className="muted small">AI + real data</p>
              <div className="compare-body">{loading && !personaSim ? typing : personaSim}</div>
            </div>

            <div className="compare-col">
              <span className="label label-good">Ground truth</span>
              <p className="muted small">Documented · cited</p>
              <div className="compare-body">
                {gt ? (
                  <>
                    {gt.points.map((pt, i) => (
                      <p key={i} className="gt-point">
                        {pt.text} <span className="gt-source">— {pt.source}</span>
                      </p>
                    ))}
                    <p className="gt-note">{gt.note}</p>
                  </>
                ) : (
                  <p className="muted small">
                    No curated real data for this question. We only show cited ground truth for the
                    researched topics (cart abandonment, reviews) — and we don't fabricate it.
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="muted small" style={{ marginTop: 16 }}>
            Even the middle column is imitation. A real interview surfaces contradictions and
            hesitations no prompt can fake; the right column is aggregate evidence, not a single
            voice. Neither AI mode is a substitute for talking to real people.
          </p>
        </>
      )}
    </>
  );
}
