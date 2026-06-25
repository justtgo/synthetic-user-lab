// Curated, CITED real data per research topic, distilled from the ground-truth
// research document. This feeds the comparator's third column.
//
// IMPORTANT: this is NOT a fabricated "user quote". Real qualitative research rarely
// publishes full transcripts (IP + participant confidentiality), so we never invent a
// human voice. We only show documented statistics/patterns, with sources. Topics we
// don't have data for show an honest "no curated data" note instead.

export const GROUND_TRUTH = {
  cart: {
    topic: 'Cart abandonment',
    match: ['cart', 'abandon', 'checkout', "didn't buy", 'did not buy', 'leave the site'],
    points: [
      {
        text: '~43% of cart abandonments are "just browsing" — these shoppers never intended to buy.',
        source: 'Baymard Institute, 2026'
      },
      {
        text: 'Top reasons overall: unexpected extra costs (shipping/taxes) 48%, forced account creation 26%, checkout too long 22%.',
        source: 'Baymard Institute, 2026'
      },
      {
        text: 'Millennials are the most impatient generation: 74% abandon when asked to re-enter their details — the highest across all generations.',
        source: 'Adobe Customer Experience Report, March 2026'
      },
      {
        text: '~50% of Millennials abandon over high price; they instinctively compare to Amazon-level friction.',
        source: 'Ground-truth research, 2026 (see appendix)'
      },
      {
        text: 'Average abandonment is ~70%, climbing to ~87% on mobile in fashion specifically.',
        source: 'Baymard Institute, 2026'
      }
    ],
    note: 'A confident individual "voice" rarely volunteers the "never intended to buy" reality — yet it is the single largest slice of the data.'
  },
  reviews: {
    topic: 'How shoppers use reviews',
    match: ['review', 'ratings', 'stars', 'trust', 'new brand', 'never bought'],
    points: [
      {
        text: 'Millennials: ~80% read reviews before buying, and trust user-generated content more than advertising.',
        source: 'Ground-truth research, 2026 (see appendix)'
      },
      {
        text: "Recency is decisive: ~66% of Gen Z + Millennials won't buy if reviews are older than a year.",
        source: 'Ground-truth research, 2026'
      },
      {
        text: 'They are suspicious of high volumes of overly positive reviews (astroturfing) and cross-check on Reddit / Trustpilot.',
        source: 'Ground-truth research (qualitative patterns)'
      }
    ],
    note: 'The data shows behavior — cross-checking, recency thresholds, distrust — more than tidy reasons. AI tends to produce a clean rationale; real shoppers are messier.'
  }
};

// Match a free-typed or suggested question to a research topic. Returns null when we
// have no curated real data for it (and we will NOT fabricate any).
export function matchGroundTruth(question) {
  const q = (question || '').toLowerCase();
  for (const key of Object.keys(GROUND_TRUTH)) {
    if (GROUND_TRUTH[key].match.some((m) => q.includes(m))) return GROUND_TRUTH[key];
  }
  return null;
}
