# 🎰 Manam Tosser

A fun, interactive spin-based web game built with HTML, CSS, and vanilla JavaScript. Players compete in different modes — **Regular Spin**, **Ranked Elimination**, and **Best of 3** — all decided by a canvas-rendered spinning wheel.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa&logoColor=white)
![Status](https://img.shields.io/badge/status-live-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

🚀 **Live Demo:** [md-manam-khan.github.io/Manam-Tosser](https://md-manam-khan.github.io/Manam-Tosser/)

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Game Modes](#-game-modes)
- [How the Wheel Works](#️-how-the-wheel-works)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation (PWA)](#-installation-pwa)
- [Run Locally](#️-run-locally)
- [Known Limitations](#-known-limitations)
- [Why This Project?](#-why-this-project)
- [License](#-license)

---

## 📌 About

**Manam Tosser** turns a simple spinning wheel into three distinct competitive formats. Enter player names, hit spin, and let the canvas-rendered wheel — complete with animated deceleration and a pointer — decide the outcome. Built entirely with vanilla JS and the HTML5 Canvas API, with no external libraries or frameworks.

---

## 🎮 Features

- 🎡 Real-time spinning wheel animation with physics-based deceleration
- 🏆 Ranked elimination mode — last player standing, full ranking displayed
- ⚔️ Best of 3 duel mode — first to 2 round wins takes it
- 🎲 Dynamic player count support (Regular & Ranked modes)
- 🚫 Duplicate name detection before a game starts
- 📱 Fully responsive, glassmorphism-styled UI
- 📦 Installable as a PWA with offline support via Service Worker
- 🔗 Fixed "Dev:Md-Manam-Khan" button (top-right) linking straight to the author's GitHub

---

## 🧠 Game Modes

### 🎲 Regular Mode
- Enter any number of players
- One spin decides a single winner

### 🏆 Ranked Elimination
- Each spin eliminates one player (the one the pointer lands on)
- Continues round after round until one player remains
- Displays the full elimination order as a final ranking (winner first)

### ⚔️ Best of 3
- Fixed 2-player duel
- Plays up to 3 rounds
- First to win 2 rounds is declared the winner; live score shown after every round

---

## ⚙️ How the Wheel Works

The wheel is drawn from scratch on an HTML5 `<canvas>` — each player gets an equal-angle slice, colored from a rotating 6-color palette, with their name rendered along the slice.

```text
Spin triggered
   ↓
Random starting angle + high initial speed
   ↓
requestAnimationFrame loop — speed decays each frame
   ↓
Once speed drops below threshold → wheel stops
   ↓
Final angle mapped to a slice index → winner determined
```

The stopping slice is calculated by mapping the final rotation angle against the fixed pointer position, so the visual result the player sees always matches the actual outcome — no separate "fake" animation and "real" result.

> **Fairness note:** Each spin starts from a fresh random angle and decelerates over many full rotations before landing, which keeps outcomes effectively unpredictable for casual play. It's a physics-driven randomizer rather than a cryptographically verified fair-selection algorithm — worth knowing if this is ever used for anything higher-stakes than friendly competition.

---

## 🛠️ Tech Stack

- **HTML5** — structure & manifest linking
- **CSS3** — glassmorphism UI, gradients, backdrop blur
- **Vanilla JavaScript** — all game logic, no frameworks
- **Canvas API** — wheel rendering and animation
- **Service Worker** — offline caching for PWA support
- **Web App Manifest** — installable app metadata

---

## 📁 Project Structure

```text
Manam-Tosser/
│
├── index.html        → App shell, mode selector, wheel canvas
├── style.css          → Glassmorphism styling, responsive layout
├── script.js           → Game logic: modes, spin physics, wheel rendering
├── manifest.json       → PWA metadata (name, icons, theme color)
├── sw.js               → Service Worker — caches core assets for offline use
└── icon.png            → App icon (192x192 & 512x512)
```

---

## 📲 Installation (PWA)

1. Open the [live site](https://md-manam-khan.github.io/Manam-Tosser/) in Chrome (or any Chromium-based browser)
2. Tap the browser menu → **Add to Home Screen / Install App**
3. Launch it like a native app — works offline after first load 🎉

---

## 🖥️ Run Locally

Since this is a static site with no build step, you only need a local server (opening `index.html` directly via `file://` will work for the game itself, but the Service Worker requires an actual server context):

```bash
git clone https://github.com/Md-Manam-Khan/Manam-Tosser.git
cd Manam-Tosser
npx serve .
```

Then open the printed local address in your browser.

---

## ⚠️ Known Limitations

- **Best of 3 is hardcoded to exactly 2 players** — the mode reads `names[0]` and `names[1]` directly, so more than 2 entered names are silently ignored.
- **No maximum player limit enforced in code** — very large player counts will still render on the wheel but slice labels may visually overlap.
- **Spin randomness is animation-driven**, not backed by `crypto.getRandomValues()` — sufficient for casual use, not intended for anything requiring provable fairness.

---

## 🚀 Why This Project?

The idea was to take something as simple as "spin a wheel, get a result" and build actual competitive structure around it — elimination brackets, best-of series, live scoring — using nothing but core web technologies. No canvas libraries, no game engines, no frameworks: just the Canvas API, `requestAnimationFrame`, and vanilla DOM manipulation doing all the work.

---

## 🎓 Context

**Type:** Personal / practice project
**Stack:** HTML5, CSS3, JavaScript (Vanilla)
**Focus:** Canvas rendering, animation timing, PWA fundamentals

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute it, just keep the original copyright notice.

---

## 🔗 Connect

Check out more of my work on my [GitHub profile](https://github.com/Md-Manam-Khan).