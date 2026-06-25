# Synthetic User Lab

> A critique-tool built with AI to critique synthetic users.
> Open source · BYOK · Free tier · Meta-demonstration for an article on UX research and AI.

## Why This Tool Exists

The companion article argues that **synthetic users** — AI users that simulate real research — are largely a mirror of the assumptions of whoever creates them, not a source of discovery. In many organizations they're used as an instrument of self-validation and to tick the box on AI adoption, under a label of methodological rigor they don't have.

This tool is the meta-demonstration of that argument. **We use AI itself to build exactly the kind of tool we're critiquing**, in fewer than 500 lines of code, to show that:

1. The technical barrier to doing "fake research" is zero.
2. The difference between a generic "synthetic user" and a "persona simulation" anchored in real data is immediately visible.
3. Even with the best real data, AI cannot replace real human voices.

The tool is intended as proof, not as a substitute. **Don't use it for product decisions.**

## How It Works

The tool calls the Google Gemini API directly from the browser, using your API key (BYOK — Bring Your Own Key). The key is stored only in `localStorage` and never leaves the browser. There's no backend, no tracking, no intermediary servers.

**Why Gemini?** The free tier of Google AI Studio is generous and requires no credit card, which makes the tool accessible to any reader of the article without a financial barrier.

**Privacy caveat (important):** On the free tier, Google may use your prompts to improve its models. For this tool's purpose (fashion shopper personas) that's acceptable. If you need privacy, enable billing in Google Cloud (the paid tier doesn't use your data for training) or self-host with a different provider.

Two modes of operation:

- **Synthetic user** — a generic system prompt, no anchoring in data. This is what most commercial tools look like once you strip away the marketing.
- **Persona simulation** — a system prompt distilled from published research (Baymard Institute, Adobe Experience Report, Salsify Consumer Research, etc.). More methodologically responsible, but still limited.

Compare the two modes' responses to the same question. The difference is the article's material.

## Ground Truth

The research document the personas are distilled from contains the real data, with a source for every figure, so a reader can verify any claim. (In the full project it lives in `01-research/ground-truth-fashion-ecommerce.md`.)

Personas in this prototype:
- ✅ **Millennial** (30–45) — implemented (both modes)
- 🔜 Gen Z (14–29)
- 🔜 Gen X (46–61)
- 🔜 Boomer (62–80)

## Run Locally

You need Node.js 20+.

```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173`.

On first run you'll be asked for your Gemini API key. To get one:

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key (starts with `AIza...`)
5. Paste it into the app

**No credit card needed.**

## Free Tier Limits (approximate, 2026)

| Model | RPM | RPD |
|---|---|---|
| Gemini 2.5 Flash (default) | ~10 | ~250 |
| Gemini 2.5 Flash-Lite | ~15 | ~1000 |

If you hit rate limits, switch to Flash-Lite or wait a minute. Limits reset daily (Pacific Time).

## Deploy on Netlify

Simplest path is through GitHub:

1. Push the code to a GitHub repo (public).
2. Go to [netlify.com](https://netlify.com) and connect with GitHub.
3. "Add new site" → "Import an existing project" → select the repo.
4. Netlify auto-detects `netlify.toml`.

Build command: `npm run build`. Publish directory: `dist`. Node version: 20. The live URL is ready in 2–3 minutes; any push to `main` triggers an automatic rebuild.

## Tech Stack

- React 18 + Vite
- Vanilla CSS (no Tailwind — so a reader can read all the styling)
- Direct Gemini API call from the browser (key as query parameter)
- Storage: `localStorage` only. Zero backend, zero tracking.

Total code is under 500 lines including styling — the article can cite this as proof of the zero technical barrier.

## Project Structure

```
synthetic-user-lab/
├── package.json
├── vite.config.js
├── netlify.toml
├── index.html
├── README.md
├── preview.html
└── src/
    ├── main.jsx           # React boot
    ├── App.jsx            # Main component (chat, controls, export)
    ├── styles.css         # All styling
    ├── lib/
    │   └── gemini.js      # Gemini API wrapper (BYOK, direct browser)
    └── personas/
        ├── index.js       # Persona registry + modes
        └── millennial.js  # Millennial persona (synthetic + persona_simulation)
```

## How to Extend

To add a new generation:

1. Create `src/personas/genz.js` with three exports: `GENZ_SYNTHETIC`, `GENZ_PERSONA_SIMULATION`, `GENZ_PROFILE`.
2. Import it into `src/personas/index.js` and add it to the `PERSONAS` registry.
3. (Currently the app is hardcoded to `millennial` via `PERSONA_ID` in `App.jsx`; add a selector when you have more than one.)

System prompts must be distilled from real ground truth, not invented.

## License

MIT. Use, modify, fork. If you publish a fork, please keep the link to the article in the README, for context.

## Disclaimer

This tool generates AI content that imitates a human user. It is **not** a human user. **Do not** use it as a substitute for real research. Use it only for:
- Preparing real interviews (testing the question guide)
- Generating initial hypotheses
- Demonstrating the limits of synthetic users (the purpose of this article)

For real product decisions, talk to real people. That's non-negotiable.
