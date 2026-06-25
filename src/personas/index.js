import {
  MILLENNIAL_SYNTHETIC,
  MILLENNIAL_PERSONA_SIMULATION,
  MILLENNIAL_PROFILE
} from './millennial.js';

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

// Persona registry. Add Gen Z / Gen X / Boomer here later, same shape.
export const PERSONAS = {
  millennial: {
    profile: MILLENNIAL_PROFILE,
    prompts: {
      synthetic: MILLENNIAL_SYNTHETIC,
      persona_simulation: MILLENNIAL_PERSONA_SIMULATION
    }
  }
};
