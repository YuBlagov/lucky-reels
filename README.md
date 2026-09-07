# Lucky Reels 🎰

A small slot machine built from scratch with plain HTML, CSS and JavaScript — no frameworks, no external assets, no game engine. Built as a portfolio piece to demonstrate frontend fundamentals: DOM manipulation, CSS animation, event handling, and game-state logic.

**[Live demo →](https://yublagov.github.io/lucky-reels/)**

## What it does

- 3×3 reel grid with 5 active paylines (top row, middle row, bottom row, both diagonals)
- Weighted random symbol generation — rarer symbols (like the diamond and the 7) pay out more, same principle real slot games use
- Reels animate independently with staggered stop times for a more natural feel
- Winning lines are highlighted with a glowing SVG overlay and pulsing symbols
- Paytable showing all symbol payouts, sorted from highest to lowest
- Simple credit/bet system with adjustable bet size (5 / 10 / 20 / 50)

## Why I built it this way

I wanted a project that's honest about where I am as a developer right now: comfortable with core HTML/CSS/JS, understands animation and state management, and can reason about game logic (weighted randomness, payline evaluation) without leaning on a framework or library. All symbols are hand-drawn inline SVG — no downloaded assets, so no licensing questions.

Possible next steps I'd take this further:
- Port the state logic to TypeScript
- Rebuild the view layer in React to compare the two approaches
- Add sound effects (Web Audio API, generated — no external audio files)
- Add an autoplay mode

## Tech

Vanilla HTML / CSS / JavaScript (ES6+). No build step — just open `index.html` in a browser, or serve the folder with any static file server.

## Run it locally

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply double-click `index.html`.
