import { GENZ_SYNTHETIC, GENZ_PERSONA_SIMULATION, GENZ_PROFILE } from './genz.js';
import {
  MILLENNIAL_SYNTHETIC,
  MILLENNIAL_PERSONA_SIMULATION,
  MILLENNIAL_PROFILE
} from './millennial.js';
import { GENX_SYNTHETIC, GENX_PERSONA_SIMULATION, GENX_PROFILE } from './genx.js';
import { BOOMER_SYNTHETIC, BOOMER_PERSONA_SIMULATION, BOOMER_PROFILE } from './boomer.js';

// The two operating modes, with the honest in-UI warning shown for each.
export const MODES = {
  synthetic: {
    label: 'Synthetic user',
    warning:
      'Synthetic mode: a generic prompt with no real data behind it. Responses tend to sound plausible but generic — this is exactly what the article critiques.'
  },
  persona_simulation: {
    label: 'Persona simulation',
    warning:
      'Persona simulation: better — anchored in published research — but still imitation. An AI does not truly feel; it imitates patterns.'
  }
};

// Persona registry. Order = oldest culture-narrative first to oldest age last.
export const PERSONAS = {
  genz: {
    profile: GENZ_PROFILE,
    prompts: { synthetic: GENZ_SYNTHETIC, persona_simulation: GENZ_PERSONA_SIMULATION }
  },
  millennial: {
    profile: MILLENNIAL_PROFILE,
    prompts: { synthetic: MILLENNIAL_SYNTHETIC, persona_simulation: MILLENNIAL_PERSONA_SIMULATION }
  },
  genx: {
    profile: GENX_PROFILE,
    prompts: { synthetic: GENX_SYNTHETIC, persona_simulation: GENX_PERSONA_SIMULATION }
  },
  boomer: {
    profile: BOOMER_PROFILE,
    prompts: { synthetic: BOOMER_SYNTHETIC, persona_simulation: BOOMER_PERSONA_SIMULATION }
  }
};
