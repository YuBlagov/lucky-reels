const SYMBOLS = {
  cherry: {
    weight: 30,
    payout: 2,
    svg: `<svg viewBox="0 0 64 64"><circle cx="22" cy="44" r="12" fill="#d81e3e"/><circle cx="42" cy="40" r="12" fill="#e8394f"/></svg>`,
  },
  lemon: {
    weight: 24,
    payout: 3,
    svg: `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="32" rx="22" ry="16" fill="#f4d431"/></svg>`,
  },
  grape: {
    weight: 18,
    payout: 4,
    svg: `<svg viewBox="0 0 64 64"><g fill="#7b4ea3"><circle cx="24" cy="20" r="9"/><circle cx="40" cy="20" r="9"/><circle cx="16" cy="34" r="9"/><circle cx="32" cy="34" r="9"/><circle cx="48" cy="34" r="9"/><circle cx="24" cy="48" r="9"/><circle cx="40" cy="48" r="9"/></g></svg>`,
  },
  bell: {
    weight: 12,
    payout: 8,
    svg: `<svg viewBox="0 0 64 64"><path d="M32 8c-3 0-5 2-5 5v2c-9 2-15 10-15 20v6l-4 6h48l-4-6v-6c0-10-6-18-15-20v-2c0-3-2-5-5-5z" fill="#f2c14e"/><circle cx="32" cy="54" r="5" fill="#b8871f"/></svg>`,
  },
  clover: {
    weight: 9,
    payout: 12,
    svg: `<svg viewBox="0 0 64 64"><g fill="#3f9142"><circle cx="24" cy="24" r="11"/><circle cx="40" cy="24" r="11"/><circle cx="24" cy="40" r="11"/><circle cx="40" cy="40" r="11"/></g></svg>`,
  },
  diamond: {
    weight: 5,
    payout: 25,
    svg: `<svg viewBox="0 0 64 64"><polygon points="32,6 50,26 32,58 14,26" fill="#4fd2e8"/></svg>`,
  },
  seven: {
    weight: 2,
    payout: 50,
    svg: `<svg viewBox="0 0 64 64"><text x="32" y="46" font-family="Segoe UI, sans-serif" font-size="44" font-weight="800" fill="#d81e3e" text-anchor="middle">7</text></svg>`,
  },
};

const SYMBOL_KEYS = Object.keys(SYMBOLS);
const TOTAL_WEIGHT = SYMBOL_KEYS.reduce((sum, k) => sum + SYMBOLS[k].weight, 0);

function weightedRandomKey() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const key of SYMBOL_KEYS) {
    r -= SYMBOLS[key].weight;
    if (r <= 0) return key;
  }
  return SYMBOL_KEYS[SYMBOL_KEYS.length - 1];
}

function symbolMarkup(key) {
  return `<div class="symbol" data-symbol="${key}">${SYMBOLS[key].svg}</div>`;
}

function renderInitialGrid() {
  const strips = [
    document.getElementById("strip-0"),
    document.getElementById("strip-1"),
    document.getElementById("strip-2"),
  ];

  for (const strip of strips) {
    const column = [weightedRandomKey(), weightedRandomKey(), weightedRandomKey()];
    strip.innerHTML = column.map(symbolMarkup).join("");
  }
}

renderInitialGrid();

const SYMBOL_HEIGHT = 100;
const STRIP_LENGTH = 24;

function buildStripArray(finalColumn) {
  const arr = [];
  for (let i = 0; i < STRIP_LENGTH - 3; i++) {
    arr.push(weightedRandomKey());
  }
  return arr.concat(finalColumn);
}

const REEL_DURATIONS = [900, 1200, 1500];

function spinReel(reelIndex, finalColumn, duration) {
  const strip = document.getElementById(`strip-${reelIndex}`);
  const keys = buildStripArray(finalColumn);
  strip.innerHTML = keys.map(symbolMarkup).join("");

  strip.style.transition = "none";
  strip.style.transform = "translateY(0)";
  void strip.offsetHeight; // force reflow

  const travel = (keys.length - 3) * SYMBOL_HEIGHT;

  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      strip.style.transition = `transform ${duration}ms cubic-bezier(0.22, 0.85, 0.35, 1)`;
      strip.style.transform = `translateY(-${travel}px)`;
    });
    setTimeout(resolve, duration);
  });
}