// Curated, CITED real data per GENERATION x TOPIC, distilled from the ground-truth
// research document. This feeds the comparator's third column and is generation-specific
// on purpose: the article's whole point is that the paradoxes differ by generation
// (Gen Z most patient, Gen X reads the most reviews, Boomers patient with friction but
// strict on trust, etc.).
//
// IMPORTANT: this is NOT a fabricated "user quote". Real qualitative research rarely
// publishes full transcripts (IP + participant confidentiality), so we never invent a
// human voice. We only show documented statistics/patterns, with sources. Topics/personas
// we don't have data for show an honest "no curated data" note instead.

export const GROUND_TRUTH = {
  genz: {
    cart: {
      topic: 'Cart abandonment — Gen Z',
      points: [
        { text: 'Myth-buster: Gen Z is the MOST patient generation at checkout friction — only ~58% abandon when asked to re-enter details, vs ~74% of Millennials.', source: 'Adobe Customer Experience Report, March 2026' },
        { text: 'What actually drives Gen Z away is the absence of expected payment options: no Apple Pay / Google Pay, or buy-now-pay-later missing or complicated (~62% have used BNPL).', source: 'Ground-truth research, 2026 (see appendix)' },
        { text: 'Slow mobile checkout hurts: every extra second of load above ~3s adds ~7% abandonment.', source: 'Ground-truth research, 2026' },
        { text: 'A brand with no visible social proof makes them hesitate.', source: 'Ground-truth research (qualitative)' }
      ],
      note: 'The cultural myth says Gen Z is the most impatient generation. At checkout, the data says the opposite. A synthetic user usually adopts the myth.'
    },
    reviews: {
      topic: 'Reviews — Gen Z',
      points: [
        { text: "Recency is decisive: ~66% of Gen Z + Millennials won't buy if reviews are older than a year.", source: 'Ground-truth research, 2026' },
        { text: 'Reviewer credibility matters more than the number of reviews.', source: 'PLS-SEM study on Gen Z review behavior, 2026' },
        { text: 'They scan for authenticity — real photos on real, diverse bodies — and read a few recent negatives to spot deal-breakers.', source: 'Ground-truth research (qualitative)' },
        { text: '~44% have bought something after an influencer recommendation.', source: 'Ground-truth research, 2026' }
      ],
      note: 'Gen Z reads reviews for "vibe" and authenticity, not spec validation — a nuance flatter prompts tend to miss.'
    }
  },

  millennial: {
    cart: {
      topic: 'Cart abandonment — Millennial',
      points: [
        { text: '~43% of cart abandonments are "just browsing" — these shoppers never intended to buy.', source: 'Baymard Institute, 2026' },
        { text: 'Top reasons overall: unexpected extra costs (shipping/taxes) 48%, forced account creation 26%, checkout too long 22%.', source: 'Baymard Institute, 2026' },
        { text: 'Millennials are the most impatient generation: ~74% abandon when asked to re-enter their details — the highest across all generations.', source: 'Adobe Customer Experience Report, March 2026' },
        { text: '~50% of Millennials abandon over high price; they instinctively compare to Amazon-level friction.', source: 'Ground-truth research, 2026 (see appendix)' },
        { text: 'Average abandonment is ~70%, climbing to ~87% on mobile in fashion specifically.', source: 'Baymard Institute, 2026' }
      ],
      note: 'A confident individual "voice" rarely volunteers the "never intended to buy" reality — yet it is the single largest slice of the data.'
    },
    reviews: {
      topic: 'Reviews — Millennial',
      points: [
        { text: 'Millennials: ~80% read reviews before buying, and trust user-generated content more than advertising.', source: 'Ground-truth research, 2026 (see appendix)' },
        { text: "Recency is decisive: ~66% of Gen Z + Millennials won't buy if reviews are older than a year.", source: 'Ground-truth research, 2026' },
        { text: 'They are suspicious of high volumes of overly positive reviews (astroturfing) and cross-check on Reddit / Trustpilot.', source: 'Ground-truth research (qualitative)' }
      ],
      note: 'The data shows behavior — cross-checking, recency thresholds, distrust — more than tidy reasons. AI tends to produce a clean rationale; real shoppers are messier.'
    }
  },

  genx: {
    cart: {
      topic: 'Cart abandonment — Gen X',
      points: [
        { text: 'Price is the trigger: ~50% of Gen X abandon over high price — the highest share on that specific reason of any generation.', source: 'Ground-truth research, 2026 (see appendix)' },
        { text: 'Time-sensitive but not impatient: they research thoroughly, but a cumbersome checkout makes them leave.', source: 'Ground-truth research (qualitative)' },
        { text: 'Lack of transparency is intolerable — costs sprung at the end kill the sale.', source: 'Ground-truth research, 2026' },
        { text: '~62% consider price and availability the most important thing on a product page (vs ~52% of Millennials).', source: 'Ground-truth research, 2026' }
      ],
      note: 'Gen X is the most overlooked generation in research; a synthetic user tends to give bland, undifferentiated answers for them.'
    },
    reviews: {
      topic: 'Reviews — Gen X',
      points: [
        { text: 'Gen X spends the MOST time reading reviews — about 13 minutes on average, more than any other generation.', source: 'Ground-truth research, 2026' },
        { text: 'They prefer review sites (Trustpilot, Yelp) and detailed product pages over social media; only ~19% buy directly on social.', source: 'Ground-truth research, 2026' },
        { text: 'They read technical details, compare specs, and check the return policy before adding to cart.', source: 'Ground-truth research (qualitative)' },
        { text: 'Highly resistant to artificial urgency; countdown tactics lower their trust.', source: 'Ground-truth research (qualitative)' }
      ],
      note: '"13 minutes reading reviews" is probably the single hardest fact for a synthetic user to capture — it contradicts the lazy "skims a few stars" assumption.'
    }
  },

  boomer: {
    cart: {
      topic: 'Cart abandonment — Boomer',
      points: [
        { text: 'Boomers abandon the LEAST on technical friction — they are patient with clunky interfaces — but abandon the MOST on trust and security concerns.', source: 'Ground-truth research, 2026 (see appendix)' },
        { text: 'A single bad customer-service experience can make them abandon a brand permanently.', source: 'Ground-truth research (qualitative)' },
        { text: '~80% research via search engines and retailer sites first, so they arrive with clear intent — when they abandon, it is a serious signal, not "just browsing".', source: 'Ground-truth research, 2026' }
      ],
      note: 'The stereotype says Boomers fumble online and bail on technical problems. The data says they are patient with friction and leave over trust — the reverse.'
    },
    reviews: {
      topic: 'Reviews — Boomer',
      points: [
        { text: '~92% consult reviews on the company\u2019s own website before buying.', source: 'Ground-truth research, 2026' },
        { text: 'Only ~8% trust amateur influencer opinions; they look for expert reviews and experienced-buyer testimonials.', source: 'Ground-truth research, 2026' },
        { text: '~70% say recent reviews matter more than the volume of reviews; they read content, not stars.', source: 'Ground-truth research, 2026' },
        { text: 'Comfort, returns and warranty are central concerns.', source: 'Ground-truth research (qualitative)' }
      ],
      note: 'The "tech-illiterate Boomer" caricature collapses here: they research heavily and read reviews closely. A synthetic user usually exaggerates incompetence.'
    }
  }
};

// Keywords that map a question to a research topic.
const TOPIC_MATCHERS = {
  cart: ['cart', 'abandon', 'checkout', "didn't buy", 'did not buy', 'leave the site'],
  reviews: ['review', 'ratings', 'stars', 'trust', 'new brand', 'never bought']
};

// Match a (persona, question) to curated real data. Returns null when we have none —
// and we will NOT fabricate any.
export function matchGroundTruth(personaId, question) {
  const gen = GROUND_TRUTH[personaId];
  if (!gen) return null;
  const q = (question || '').toLowerCase();
  for (const topic of Object.keys(TOPIC_MATCHERS)) {
    if (TOPIC_MATCHERS[topic].some((m) => q.includes(m)) && gen[topic]) return gen[topic];
  }
  return null;
}
