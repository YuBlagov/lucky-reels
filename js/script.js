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