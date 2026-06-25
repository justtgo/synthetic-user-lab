// Gemini API wrapper — calls Google AI Studio directly from the browser (BYOK).
// No backend, no proxy. The key lives only in the user's localStorage and is sent
// only to Google's endpoint.

// Models exposed in the UI dropdown. Keys are the API model IDs; values are labels.
export const MODELS = {
  'gemini-2.5-flash': 'Gemini 2.5 Flash (stable, recommended)',
  'gemini-2.5-flash-lite': 'Gemini 2.5 Flash-Lite (faster, more daily requests)',
  'gemini-3-flash': 'Gemini 3 Flash (preview, more capable)',
  'gemini-3.1-flash-lite': 'Gemini 3.1 Flash-Lite (preview, fastest)'
};

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

// messages: array of { role: 'user' | 'assistant', content: string }
// Gemini uses roles 'user' and 'model' (not 'assistant').
export async function sendMessage({ apiKey, model, systemPrompt, messages }) {
  const url = `${ENDPOINT}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 1024
    }
  };

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (e) {
    throw new Error('Network error. Check your connection and try again.');
  }

  if (!res.ok) {
    let detail = '';
    try {
      const err = await res.json();
      detail = err?.error?.message || '';
    } catch (e) {
      /* ignore parse errors */
    }
    if (res.status === 429) {
      throw new Error(
        'Rate limit hit. The free tier allows ~10 requests/min and 250/day for Flash. ' +
          'Wait a minute, or switch to Flash-Lite in the model dropdown for higher limits.'
      );
    }
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new Error(
        'Invalid or unauthorized API key. Generate a new one at https://aistudio.google.com/apikey'
      );
    }
    throw new Error(`Gemini API error (${res.status}). ${detail}`.trim());
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];

  if (!candidate) {
    const blockReason = data?.promptFeedback?.blockReason;
    if (blockReason) {
      throw new Error(`The prompt was blocked by Gemini's safety filter (${blockReason}).`);
    }
    throw new Error('No response was returned by the model.');
  }

  const text = (candidate?.content?.parts || []).map((p) => p.text || '').join('');
  if (!text) {
    throw new Error('The model returned an empty response. Try rephrasing your question.');
  }
  return text;
}
