📘 Sedat City — Indiana University Edition

A custom Monopoly-style board game built from scratch using HTML5 Canvas, JavaScript, and DOM rendering.

🎮 Overview

Sedat City is a fully interactive, browser-based board game inspired by Monopoly, redesigned with an Indiana University theme.
It features:

🧠 A custom game engine (turns, dice, properties, rent, jail logic)

🎲 Animated dice rolls

🎯 Token movement rendered on an HTML5 Canvas + DOM layer

🏙️ Board layout defined by JSON tile metadata

💸 Complete buying, rent, tax, and chance/chest logic

🎨 IU-themed UI styling (Crimson & Cream)

⚡ Smooth rendering loop with scaling for all screen sizes

This project is a great example of modular game architecture, real-time rendering, and DOM-Canvas hybrid design.

🚀 Features
✔ Core Engine

Player movement

Turn order system

Jail and escape logic

Property ownership + rent payment

Tax, chance, and community chest events

✔ UI & Rendering

Live sidebar with player status

Scaled rendering on all resolutions

Animated DOM tokens over a Canvas board

Tile highlighting effects

✔ Tech Stack

JavaScript (ES6 Classes & Modules)

HTML5 Canvas

DOM Layer for tokens

CSS (custom theme)

🔧 Fix I Implemented (Important)

A key bug prevented tokens from moving because the game object wasn't globally accessible.

Solution:

Expose the game engine to the global window:

window.Game = Game;


This allowed the renderer to access Game.players and correctly update token positions every frame.

📂 Project Structure
SedatCity/
│── index.html
│── css/
│   ├── style.css
│   └── animations.css
│── js/
│   ├── renderer.js
│   ├── ui/
│   │   └── events.js
│   └── engine/
│       ├── board.js
│       ├── game.js
│       ├── player.js
│       └── dice.js
│── assets/
│   ├── board.png
│   └── tokens/
│       ├── dog.png
│       ├── car.png
│       ├── hat.png
│       └── ship.png

🎯 What I Learned