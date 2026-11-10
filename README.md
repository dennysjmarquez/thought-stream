<h1 align="center">ThoughtStream</h1>

<p align="center">
  <strong>Text animations in ASCII, ANSI, Unicode and Braille — for terminals and browsers, with one API and one plugin format.</strong><br>
  250+ ready-made animations. Zero dependencies. Write your own plugin in five lines.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/thought-stream"><img alt="npm" src="https://img.shields.io/npm/v/thought-stream.svg"></a>
  <img alt="dependencies: 0" src="https://img.shields.io/badge/dependencies-0-brightgreen.svg">
  <img alt="types included" src="https://img.shields.io/npm/types/thought-stream.svg">
  <a href="https://github.com/dennysjmarquez/thought-stream/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/thought-stream.svg"></a>
</p>

<p align="center">
  <a href="https://dennysjmarquez.github.io/thought-stream/"><strong>Live demo</strong></a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#create-your-own-plugin">Create a plugin</a> ·
  <a href="#api-reference">API reference</a>
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/hero.svg" alt="A terminal window animating four ThoughtStream plugins at once: a tokenizer, an attention progress bar, a loss sparkline and a KV-cache gauge" width="720">
</p>

ThoughtStream draws animation frames made of text — spinners, progress bars, "the AI is thinking" indicators, Braille-dot scenes, half-block pixel art, even ANSI art — into a terminal or into any HTML element.
You choose an animation (a **plugin**), point it at a **container**, and press start:

```js
new ThoughtStream('#status').start('pacman');
```

## Contents

- [Why ThoughtStream](#why-thoughtstream)
- [Install](#install)
- [How it works: engine, plugin, container](#how-it-works-engine-plugin-container)
- [Quick start](#quick-start) — Node.js · Browser · Bundlers · React · Vue · Angular · SSR
- [Using plugins](#using-plugins) — parameters, live updates, controls, playlists, callbacks
- [The timing model](#the-timing-model)
- [Pixel art in text: Braille and half-blocks](#pixel-art-in-text-braille-and-half-blocks)
- [Create your own plugin](#create-your-own-plugin)
- [Learn by example](#learn-by-example)
- [Playing third-party art (Durdraw)](#playing-third-party-art-durdraw)
- [API reference](#api-reference)
- [Accessibility and performance](#accessibility-and-performance)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [Author](#author)
- [Support](#support)
- [License](#license)

> **Enjoying ThoughtStream?** [Support it with a PayPal donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SC7UXSK6B76L4) — it keeps the project free and the roadmap moving. A star, an issue or a pull request helps just as much.

## Why ThoughtStream

- **One engine, two worlds.** The same API draws into a Node.js terminal (`process.stdout`) and into any DOM element, from plain HTML to React, Vue and Angular.
- **250+ plugins in 13 categories** — classic spinners, AI and machine-learning visualisations, terminal effects, algorithms, nature, physics, space, retro art. Every plugin is its own file, so you ship only what you use. Browse them all in the [catalog](https://github.com/dennysjmarquez/thought-stream/blob/main/docs/catalog.md).
- **Pixel art made of characters.** Built-in Braille (2×4 dots per character) and half-block (1×2 pixels per character) canvases, with true-colour output. In the browser, dense scenes and ANSI art are painted on a real `<canvas>`; ANSI art is drawn glyph by glyph, so it looks the same in every browser and font.
- **Plays Durdraw animations.** Drop in a `.dur` file made with [Durdraw](https://durdraw.org/) and it becomes a plugin like any other — see [Playing third-party art](#playing-third-party-art-durdraw).
- **Plugins are tiny.** An animation is an array of strings. When you need more, it can be a function that receives your parameters, or a multitrack timeline.
- **Learn by reading.** Every function of the SDK, every field of a plugin and every kind of frame has a short, readable [example](#learn-by-example) that you can run in the terminal or in the browser.
- **Respectful by default.** One drift-compensated clock; it pauses when the tab is hidden or the element is scrolled out of view, and honours `prefers-reduced-motion`.
- **Zero dependencies**, CommonJS + browser global + ES module entry points, TypeScript types included.

## Install

```bash
npm install thought-stream
```

Or load it from a CDN, no build step:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.css">
<script src="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.js"></script>
```

Those two URLs always serve the newest published package. In production, pin the exact version you tested instead of following the newest one.

Runs on Node.js 14 or newer and on any current browser. The engine and every plugin have zero dependencies.

## How it works: engine, plugin, container

```
  1. ENGINE                    2. PLUGIN                     3. CONTAINER
  thought-stream.js     +      pacman.js              →      <pre id="status">
  clock, rendering,            frames and timing:            or process.stdout
  controls                     what to show, and when        where to draw
```

Three rules cover everything:

1. **Load the engine first.** It is the only thing you `import` or `require` by name.
2. **Then load the plugins you want.** A plugin is a file that registers itself in the engine when it loads. It can live anywhere — inside this package, in your own `src/animations/` folder, on a CDN, or in a package of its own. Importing it is all it takes.
3. **Create a stream on a container and start a plugin by name.** `start('pacman')` looks the name up in the registry.

```js
import ThoughtStream from 'thought-stream';                       // 1. the engine
import 'thought-stream/plugins/catalog/pacman';                   // 2. a plugin (any path works)
const stream = new ThoughtStream(document.querySelector('#out')); // 3. the container
stream.start('pacman');                                           //    go
```

What you can pass as the container:

| You pass | What happens |
|---|---|
| a CSS selector, e.g. `'#status'` | `document.querySelector` is used |
| a DOM element | drawn into that element |
| a React ref object (`{ current }`) | `ref.current` is used — it must already be set when you construct |
| a writable stream, e.g. `process.stdout` | drawn into the terminal |
| nothing (`null`) | headless: nothing is drawn, you receive every frame in `onFrame` |

## Quick start

### Node.js

<!-- test:node -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');

const stream = new ThoughtStream(process.stdout);   // draw into the terminal
stream.start('spinner_dots');

setTimeout(() => stream.succeed('Deployed to production'), 3000);
```

`succeed`, `fail`, `warn` and `info` stop the animation and print a coloured status line (`✔ ✖ ⚠ ℹ`).

> **Terminal note.** Most plugins draw one line and redraw it in place. A plugin whose frames span several lines (Braille scenes, ANSI art) is made for the browser: in a terminal each frame is printed below the previous one, so it scrolls. The [catalog](https://github.com/dennysjmarquez/thought-stream/blob/main/docs/catalog.md) lists every plugin's size in columns × lines; to animate a multi-line frame in a terminal, see [Known limitations](#known-limitations).

### Browser, no build step

<!-- test:web -->
```html
<!doctype html>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.css">

<pre id="status" role="img" aria-label="Loading"></pre>

<script src="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.js"></script>
<script src="https://cdn.jsdelivr.net/npm/thought-stream/dist/plugins/catalog/pacman.js"></script>
<script>
  new ThoughtStream('#status').start('pacman');
</script>
```

Include the stylesheet (it is tiny). Without it, canvas scenes (dense half-blocks, ANSI art) are drawn at their raw pixel size instead of filling their container, and blinking text (`paint({ blink: true })`) does not blink. It also offers optional looks that you switch on by adding a class to your container: `thought-stream` (monospace font stack, `white-space: pre`, its own GPU layer) and the themes `thought-stream-dark` (dark box with green text), `thought-stream-compact` (small grey text) and `thought-stream-crt` (green phosphor glow). `thought-stream-dot` is a small round marker you can place next to the text. The engine itself only sets `white-space: pre` on the container.
To try everything at once, load `plugins/all.browser.js` instead of a single plugin — it registers every plugin, which makes it large; use single files in production.

### Bundlers (Vite, webpack, esbuild, Rollup)

<!-- test:bundle -->
```js
import ThoughtStream from 'thought-stream';
import 'thought-stream/plugins/catalog/matrix-rain';
import 'thought-stream/thought-stream.css';

const stream = ThoughtStream.create(document.getElementById('out'));
stream.start('matrix_rain');
```

Import only the plugin files you use; bundlers then drop the rest. Whole categories are available as one import each, for example `thought-stream/plugins/ai-models`, and `thought-stream/plugins/all` loads everything.

### React

<!-- test:react -->
```jsx
import { useEffect, useRef } from 'react';
import ThoughtStream from 'thought-stream';
import 'thought-stream/plugins/catalog/beam-search';
import 'thought-stream/thought-stream.css';

export function Thinking({ plugin = 'beam_search' }) {
  const ref = useRef(null);

  useEffect(() => {
    const stream = ThoughtStream.create(ref.current);   // the container
    stream.start(plugin);
    return () => stream.destroy();                      // always clean up
  }, [plugin]);

  return <pre ref={ref} role="img" aria-label="Loading" />;
}
```

`destroy()` stops the timers and removes every listener the stream registered, so the component is safe under `<React.StrictMode>`, hot reloading and route changes.

**With parameters, and a text you can change without restarting:**

<!-- test:react-params -->
```jsx
import { useEffect, useRef } from 'react';
import ThoughtStream from 'thought-stream';
import 'thought-stream/plugins/text-reveal';
import 'thought-stream/thought-stream.css';

export function Status({ text }) {
  const ref = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {                                     // create once
    const stream = ThoughtStream.create(ref.current);
    stream.start('text-reveal', { text });              // parameters are the 2nd argument
    streamRef.current = stream;
    return () => stream.destroy();
  }, []);

  useEffect(() => {                                     // update live, no restart
    streamRef.current?.setText(text);
  }, [text]);

  return <pre ref={ref} aria-live="polite" />;
}
```

### Vue 3

<!-- test:vue -->
```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ThoughtStream from 'thought-stream';
import 'thought-stream/plugins/catalog/pacman';
import 'thought-stream/thought-stream.css';

const el = ref(null);
let stream;

onMounted(() => {
  stream = ThoughtStream.create(el.value);   // el.value, not el
  stream.start('pacman');
});

onBeforeUnmount(() => stream?.destroy());
</script>

<template>
  <pre ref="el" role="img" aria-label="Loading"></pre>
</template>
```

### Angular

<!-- test:angular -->
```ts
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import ThoughtStream from 'thought-stream';
import 'thought-stream/plugins/catalog/pacman';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `<pre #out role="img" aria-label="Loading"></pre>`,
})
export class LoaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('out', { static: true }) out!: ElementRef<HTMLPreElement>;
  private stream?: ThoughtStream;

  ngAfterViewInit(): void {
    this.stream = ThoughtStream.create(this.out.nativeElement);
    this.stream.start('pacman');
  }

  ngOnDestroy(): void {
    this.stream?.destroy();
  }
}
```

Add the stylesheet once, in `angular.json`:

```json
"styles": ["node_modules/thought-stream/dist/thought-stream.css", "src/styles.css"]
```

### Next.js, Nuxt and other SSR frameworks

Importing the engine and the plugins is safe on the server — nothing touches the DOM until you create a stream. Create streams only in client code (`useEffect`, `onMounted`, `ngAfterViewInit`), and in the Next.js App Router put `'use client'` at the top of the component file.

## Using plugins

Every plugin is an animation with its own visual style and timing. Across the 250+ catalog plugins, four implementation patterns cover every animation:

| Pattern | Plugins | Characteristics | Examples |
|---|---:|---|---|
| **Plain strings** | 181 | Pure string arrays. Zero allocation, instantaneous rendering. | `pacman`, `matrix_rain`, `dna` |
| **Frame objects** | 61 | Paced with `{ frame, interval, pause }` for deliberate slowdowns and holds. | `upload`, `flame`, `checkpoint` |
| **Generator functions** | 15 | Procedural animations computed on the fly from options (`cols`, `rows`, `palette`, `seed`). | `braille_plasma`, `boreal_odyssey` |
| **Multitrack timelines** | 1 | Orchestrates independent visual tracks, counters, and scenes on a single line. | `chess_checkmate` |

### Passing parameters

The second argument of `start()` is handed to the plugin. A plugin that is configurable lists its parameters in its `options` field:

<!-- test:node-params -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/text-reveal');

const stream = new ThoughtStream(process.stdout);
stream.start('text-reveal', { text: 'Generating answer', speed: 350 });

console.log(ThoughtStream.get('text-reveal').options);   // text, speed, maxDots
```

`text-reveal` (with a hyphen) is the parametric text plugin: it takes `text`, `speed` and `maxDots`. Do not confuse it with `text_reveal` (underscore) in the catalog, a fixed seven-frame animation that takes no parameters. Import `thought-stream/plugins/text-reveal` for the first, `thought-stream/plugins/catalog/text-reveal` for the second.

Generator plugins take sizing and palette parameters. The same call works for every plugin: parameters a plugin does not read are ignored, while a plugin may reject invalid values of the ones it does read (for example, `boreal_odyssey` throws a `RangeError` for a `cols` outside 48–160):

<!-- test:web-params -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.css">
<pre id="plasma"></pre>

<script src="https://cdn.jsdelivr.net/npm/thought-stream/dist/thought-stream.js"></script>
<script src="https://cdn.jsdelivr.net/npm/thought-stream/dist/plugins/catalog/braille-plasma.js"></script>
<script>
  const stream = new ThoughtStream('#plasma');
  stream.start('braille_plasma', { palette: 'fire', cols: 60, rows: 14 });
  console.log(ThoughtStream.get('braille_plasma').options);   // cols, rows, frames, speed, palette
</script>
```

Common parameters accepted across generator plugins:

| Option | Type / Examples | Used for |
|---|---|---|
| `cols`, `rows` | numbers, e.g. `cols: 60, rows: 14` | width in columns and height in terminal lines |
| `palette` | `'neon'` (default), `'fire'`, `'ocean'`, `'acid'` | color theme for plasmas, fractals and auroras |
| `colorTheme` | `'golden'`, `'ultraviolet'`, `'crimson'` | color palette for space generators (`event_horizon`) |
| `speed` | number (ms) | frame duration or playback multiplier |
| `frames` | number, e.g. `30` | total frames generated in a cycle |
| `seed` | number, e.g. `1337` | reproducible procedural seed (`boreal_odyssey`) |
| `threshold` | number 0.0–1.0, default `0.28` | dark void cut threshold (`braille_nebula`) |

The parameters apply to the first pass. In the current release a generator is rebuilt with **empty** parameters each time the animation loops, so a parameterised scene such as this one returns to its defaults on the second pass. To keep your parameters on every loop, register a copy that builds its frames once:

<!-- test:keep-params -->
```js
const base = ThoughtStream.get('braille_plasma');
ThoughtStream.register({ ...base, name: 'my_plasma', cache: true });   // frames are built once, with your parameters

new ThoughtStream('#plasma').start('my_plasma', { cols: 60, rows: 14, palette: 'ocean' });
```

### Updating a running plugin

| To change | Use | Notes |
|---|---|---|
| the text of a text plugin | `stream.setText('New text')` | only plugins that expose `api.setText`, such as `text-reveal` |
| a `{placeholder}` inside the frames | `stream.setTrack('label', 'Verifying')` | works on any plugin whose frames contain `{label}`; see [placeholders](#4-placeholders-you-can-update-live) |
| the speed | `stream.setSpeed(ms)` or `stream.speed = ms` | applies from the next frame |
| any plugin's own methods | `stream.plugin('name').method(...)` | calls the plugin's `api` |

### Quick text display

When you just want to show a message — no plugin, no `register()` — use `phrase()`. If the text ends in dots, they pulse:

<!-- test:phrase -->
```js
const ThoughtStream = require('thought-stream');

const stream = new ThoughtStream(process.stdout);
stream.phrase('Thinking...');                      // the dots pulse every 400 ms
// stream.phrase('Connecting...', { dotSpeed: 200 });  // faster pulse
// stream.phrase('Ready');                             // no dots → static text, no pulse

setTimeout(() => stream.stop(), 3000);
```

Use `phrase()` for one-off messages. For animated spinners and progress bars, use `start()` with a plugin.

### Playing frames without a plugin

`playCustom()` runs an array of frames without registering a plugin:

<!-- test:play-custom -->
```js
const ThoughtStream = require('thought-stream');

const stream = new ThoughtStream(process.stdout);
stream.playCustom(['⠋ Checking', '⠙ Checking', '⠹ Checking', '⠸ Checking'], 'check', { loop: true });

setTimeout(() => stream.succeed('All good'), 2000);
```

It is the fastest way to test a frame sequence. For anything you want to reuse or share, `register()` is cleaner.

### Speed, looping and controls

<!-- test:controls -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');

const stream = new ThoughtStream(null, { speed: 120, loop: true });   // headless: only for the demo
stream.start('spinner_dots');

stream.pause();      // resumable
stream.resume();
stream.toggle();     // pause <-> resume
stream.seek(3);      // show frame 3 (use after pause() to step manually)
stream.stop();       // stop; the last frame stays on screen
stream.destroy();    // stop and release everything — call it when you are done with the stream
```

### Playlists and random rotation

<!-- test:playlist -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');
require('thought-stream/plugins/text-reveal');
require('thought-stream/plugins/catalog/pacman');

const stream = new ThoughtStream(process.stdout);

stream.playlist([
  { name: 'spinner_dots', duration: 1500 },
  { name: 'text-reveal', text: 'Thinking', duration: 2000 },     // extra keys are plugin parameters
  'pacman',                                                       // a bare name uses the default duration (2500 ms)
  { frames: ['Done ✔'], duration: 800 },                          // inline frames, no plugin needed
], {
  loop: true,
  onItem: (track, index) => console.error('now playing #' + index),
});

// Or let the engine shuffle (Fisher-Yates deck, no repeats until exhausted):
// stream.startRandom();                                          // every loaded plugin, every 2.6 s
// stream.startRandom({ category: 'ai-models', interval: 2600, hold: 1000 }); // with visual hold
```

`startRandom()` picks a random plugin and switches to the next one after `interval` ms. It never repeats a plugin until every loaded one has played (Fisher-Yates shuffle). `hold` adds a visual pause between transitions. Stop it at any time with `stream.stopRandom()`:

<!-- test:start-random -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');
require('thought-stream/plugins/catalog/pacman');

const stream = new ThoughtStream(process.stdout);
stream.startRandom({ interval: 2000, hold: 300 });   // rotate every 2 s with a 300 ms visual hold

setTimeout(() => stream.stopRandom(), 8000);         // stop after 8 s
```

### Callbacks

Pass them as constructor options:

<!-- test:callbacks -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');

const stream = new ThoughtStream(null, {
  loop: false,
  onFrame:    (index, frame, name) => {},     // every frame, right after it is drawn (also in headless mode)
  onLoop:     (name) => {},                   // the animation reached its last frame
  onComplete: (name) => {},                   // loop is false and the animation finished
  onChange:   (name, plugin) => {},           // a different plugin started
});
stream.start('spinner_dots');
```

### Promises and async tasks (Ora compatibility)

Wrap any `Promise` or `async` function with `.promise()`. The stream animates while the task runs, displays a green `✔` on resolve or a red `✖` on reject, and returns the original resolved value:

```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/spinner-dots');

const stream = new ThoughtStream(process.stdout);

// 1. Instance method:
const user = await stream.promise(fetchUser(), {
  name: 'spinner_dots',
  text: 'Loading user profile...',
  successText: (res) => `Loaded profile for ${res.name}`,
  failText: (err) => `Failed to load: ${err.message}`,
});

// 2. Static one-liner on process.stdout:
await ThoughtStream.promise(downloadArchive(), 'Downloading assets...');
```

### Status indicators and custom persistence

When an animation finishes, you can freeze it with standard status icons or persist any custom symbol and text to the terminal without clearing:

```js
stream.succeed('Build completed in 1.4s');           // green ✔ line + newline
stream.fail('Build failed with exit code 1');         // red ✖ line + newline
stream.warn('Dependencies out of date');             // yellow ⚠ line + newline
stream.info('Listening on http://localhost:3000');   // blue ℹ line + newline

// Persist custom symbols (emojis, unicode badges) like ora.stopAndPersist():
stream.stopAndPersist({ symbol: '🚀', text: 'Service deployed to edge' });

// Live properties and controls:
stream.text = 'Processing chunk 3/8...';             // update current text dynamically
stream.color = '#3fb950';                           // colorize whole stream on the fly
console.log(stream.isSpinning);                      // true while active, false when stopped
```

### Headless mode: bring your own renderer

With no container, ThoughtStream is only a clock plus a frame source. Use `onFrame` to draw frames wherever you like — a `<canvas>`, a game HUD, a TUI library, a log:

<!-- test:headless -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/beam-search');

const stream = new ThoughtStream(null, {
  onFrame: (index, frame) => console.error(frame),
});
stream.start('beam_search');
```

## The timing model

Every frame has a **hold time**: how long it stays on screen before the next frame replaces it. The engine picks it in this order, first match wins:

A frame can set its own hold time. That is the **rhythm** of the piece. The **speed** of the stream (`start(name, { speed })`,
the constructor's `speed`, `stream.speed` or `setSpeed(ms)`) then sets how fast that rhythm is played: it multiplies every
hold time of the piece.

| # | What it sets | Example |
|---|---|---|
| 1 | the rhythm: a frame's own `pause` or `interval` | `{ frame: 'Done', pause: 1500 }`, `{ frame: '██████', interval: 300 }` |
| 2 | the rhythm of the frames that set nothing | the plugin's `interval`, else 62.5 ms |
| 3 | the speed: `start(name, { speed })`, then the constructor's `speed` / `stream.speed` / `setSpeed()` | `stream.start('pacman', { speed: 90 })` |

A piece nobody touched plays at the speed its author chose: that is **1x**, the plugin's `interval` (or 62.5 ms if it
declares none). From there the speed is a multiplier: 2x is twice as slow, 0.5x twice as fast, and the proportions are kept
— a hold 15x longer than another stays 15x longer. Many bundled pieces carry their own per-frame timings (most of
them imported from Durdraw, which writes a pause into every frame).

`pause` and `interval` behave identically — use `interval` for rhythm and `pause` for a deliberate hold (for example the last frame before the loop restarts).

A worked example — `interval: 100` with the frames `A B C D E`, where `C` has `interval: 300` and `E` has `pause: 1500`:

```
time (ms)  0     100    200          500    600    2100
           A ───▶ B ───▶ C ─────────▶ D ───▶ E ───────────────────────▶ A …
           100    100    300          100    1500
```

> **Tip.** Frame durations can be specified directly via `{ frame: 'C', interval: 300 }` or `{ frame: 'E', pause: 1500 }`. Alternatively, for quantised step-based animations, you can express a long hold as several identical frames. Identical consecutive frames are not redrawn, so nothing flickers:

<!-- test:timing-hold -->
```js
const hold = (frame, ms, step = 100) => Array(Math.round(ms / step)).fill(frame);   // ms: a multiple of step
ThoughtStream.register({
  name: 'upload_exact',
  interval: 100,
  frames: ['A', 'B', ...hold('C', 300), 'D', ...hold('E', 1500)],                   // holds 100, 100, 300, 100, 1500
});
```

How the clock behaves:

- **One timer chain, drift-compensated.** If a tick fires late, the next one is shortened by the same amount, so the average rhythm stays true. A hold time is never compressed below half its length or below 16 ms (about 60 fps), and a stall longer than one frame is forgotten rather than "caught up".
- **Looping.** When the last frame is reached the animation wraps. A generator plugin is called again at each loop with the initial parameters, unless it declares `cache: true` (see [Generated frames and parameters](#3-generated-frames-and-parameters)). With `loop: false` the stream stops and calls `onComplete`.
- **Automatic pausing.** The clock stops while the tab is hidden and while the element is scrolled out of view, and resumes by itself. With `prefers-reduced-motion: reduce` a single static frame is drawn — the plugin's `preview` if it has one, otherwise its last frame — and nothing moves.

## Pixel art in text: Braille and half-blocks

Two techniques turn characters into pixels. Both are available as small canvases in `ThoughtStream.SDK`, and both produce ordinary frame strings with true-colour escape codes.

| | **Braille dots** | **Half-block squares** |
|---|---|---|
| Characters | `⠁ ⠃ ⡇ ⣿` — U+2800 to U+28FF | `▀ ▄ █` and space |
| One character is | a 2 × 4 grid of dots (8 bits) | two square pixels, one above the other |
| A `W × H` canvas gives | `2W × 4H` addressable dots | `W × 2H` square pixels |
| Look | fine, LED-like dots with a little air between them — ideal for curves, waves, orbits, plots | solid, seamless pixels with no gaps — ideal for images, gradients, landscapes |
| Colour | one foreground colour per character (plus optional background) | two colours per character: foreground = upper pixel, background = lower pixel |
| Helper | `SDK.BrailleCanvas(cols, rows)` | `SDK.BlockCanvas(cols, rows)` (alias `HalfBlockCanvas`) |

**In the terminal** both are drawn as coloured text. Half-blocks look best in a true-colour terminal.

**In the browser** frames are text too — one `<div class="ts-line">` per row, updated only where a row changed. Two kinds of scene are a poor fit for text, so they are painted on a real `<canvas>` instead:

- **Half-block pixel art** — a plugin that declares `fontScale: 'dense'` and whose frames use only `▀ ▄ █` in true colour. Dense scenes would mean tens of thousands of text nodes; as a canvas (`<canvas class="ts-canvas">`) it is one pixel per half-block and one draw call per frame, scaled crisply with `image-rendering: pixelated`.
- **ANSI / BBS art** — multi-line art with block, mosaic or box-drawing characters, from a plugin that declares `fontScale: 'dense'` or `'ultra'`, or that belongs to the `retro` category (everything `importDur` makes). As text, every browser would draw it with its own font: blocks leave seams between rows, and the mosaics of *Symbols for Legacy Computing* fall back to a font with another width that breaks the picture. So the engine draws the blocks itself — Block Elements (`▀▄█▌▐`, shades `░▒▓`, quadrants), the sextants, diagonals, triangles and eighths of *Legacy Computing*, `◢◣◤◥` and box drawing (`─│┌╔═║…`) — and writes letters and any other symbol on the same grid. The result is identical in every browser, whatever fonts are installed. It is a picture: it cannot be selected or copied like text, and it carries the plugin description as its accessible label. Its class is `ts-cells`; it is sized like an image — at its natural size, never wider than its container — so a page that shrinks text to fit a box can shrink it the same way.

That is why the stylesheet matters. Braille scenes, and every plugin that is neither of these, stay as text.

Example — a Braille canvas, dot by dot:

<!-- test:braille -->
```js
const { BrailleCanvas } = ThoughtStream.SDK;

const canvas = BrailleCanvas(40, 8);              // 40 × 8 characters = 80 × 32 dots
canvas.clear();
for (let x = 0; x < canvas.pixelWidth; x++) {
  const y = Math.round((Math.sin(x / 6) * 0.45 + 0.5) * (canvas.pixelHeight - 1));
  canvas.setPixel(x, y, true);                    // light one dot
}
for (let cy = 0; cy < canvas.rows; cy++) {
  for (let cx = 0; cx < canvas.cols; cx++) {
    canvas.setColor(cx, cy, '#00ff88');           // colour is per character cell: (cx, cy, fg, bg)
  }
}
const frame = canvas.render();                    // a string, ready to be a frame
```

Or paint the whole canvas with a per-dot shader — `fill((x, y, t) => ({ on, color, bg }))`:

<!-- test:braille-fill -->
```js
const { BrailleCanvas } = ThoughtStream.SDK;

const canvas = BrailleCanvas(40, 8);
const frame = canvas
  .fill((x, y, t) => ({ on: Math.sin(x / 5 + t) + Math.cos(y / 3) > 0, color: '#00ccff' }), 0.5)
  .render();
```

Or shade cell by cell with `fillDensity((cx, cy, t) => ({ density, color, bg }))` — 8× faster than per-dot loops, mapping a 0–1 density value across 9 canonical Braille glyphs (`⠀` to `⣿`):

<!-- test:braille-density -->
```js
const { BrailleCanvas } = ThoughtStream.SDK;

const canvas = BrailleCanvas(40, 8);
const frame = canvas
  .fillDensity((cx, cy, t) => ({
    density: Math.sin(cx / 5 + t) * 0.5 + 0.5,
    color: '#00ff88',
  }), 0.5)
  .render();
```

Example — a half-block canvas (hex strings, `{ color }` or `null` for empty):

<!-- test:block -->
```js
const { BlockCanvas } = ThoughtStream.SDK;

const hex = (n) => Math.round(n).toString(16).padStart(2, '0');
const canvas = BlockCanvas(40, 10);               // 40 × 20 square pixels
const frame = canvas
  .fill((x, y) => '#' + hex(255 * x / 39) + hex(255 * y / 19) + '80')   // a colour gradient
  .render();
canvas.setPixel(5, 5, '#ffffff');                 // single pixel (before render)
```

To turn existing pixels into a frame — a decoded PNG, a camera frame, generated data — use `SDK.fromPixels(pixels, width, height, { dither, palette })`.

Every canvas call above has a runnable file: [`15-braille.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/15-braille.js), [`16-block.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) and, for terminal programs, [`17-diff.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/17-diff.js).

### Getting hold of the real canvas

While a canvas plugin plays in the browser, its canvas is a child of your container: `<canvas class="ts-canvas">` for half-block art, `<canvas class="ts-cells">` for ANSI art. For half-block art it is one canvas pixel per half-block, so an 80 × 24 scene is 80 × 48 pixels, and it is created with the first frame that contains a half-block (`▀`) — a frame of one flat colour is drawn as ordinary text. ANSI art is drawn at 16 × 32 canvas pixels per character, so an 80 × 24 scene is 1280 × 768, and it is used from the first frame of a plugin that has art in any of its frames. The canvas is removed when you start a plugin that draws text, or call `destroy()`. Braille scenes and Node never use a canvas.

<!-- test:canvas-grab -->
```js
// Browser only. Any plugin that declares fontScale: 'dense' paints a canvas.
const hex = (n) => Math.round(n).toString(16).padStart(2, '0');

ThoughtStream.register({
  name: 'gradient_tile',
  fontScale: 'dense',
  interval: 100,
  frames: () => [
    ThoughtStream.SDK.BlockCanvas(40, 10)
      .fill((x, y) => '#' + hex(255 * x / 39) + hex(255 * y / 19) + '80')
      .render(),
  ],
});

new ThoughtStream('#out').start('gradient_tile');

// Call this once the first frame has been drawn (from a button, for example).
function saveFrame() {
  const canvas = document.querySelector('#out canvas.ts-canvas');
  return canvas ? canvas.toDataURL('image/png') : null;   // a 40 × 20 pixel PNG
}

// The same picture, enlarged with sharp square pixels.
function snapshot(canvas, scale = 8) {
  const big = document.createElement('canvas');
  big.width = canvas.width * scale;
  big.height = canvas.height * scale;
  const ctx = big.getContext('2d');
  ctx.imageSmoothingEnabled = false;               // keep the pixels square
  ctx.drawImage(canvas, 0, 0, big.width, big.height);
  return big.toDataURL('image/png');               // 320 × 160 pixels
}
```

To record a video instead, give `canvas.captureStream()` to a [`MediaRecorder`](https://developer.mozilla.org/docs/Web/API/MediaRecorder). Both are standard browser APIs, not part of ThoughtStream.

## Create your own plugin

A plugin is a plain object passed to `ThoughtStream.register()`. From then on, every stream in your app can start it by name. Put the file wherever you like; it only has to run after the engine has loaded. Every step below has a complete, runnable file in [`examples/`](#learn-by-example).

> **Want to customize an existing plugin?** ThoughtStream is open-source (MIT). Rather than digging through `node_modules`, you can grab any of the 250+ original animation files directly from the public GitHub repository catalog: [`plugins/catalog/`](https://github.com/dennysjmarquez/thought-stream/tree/main/plugins/catalog). Simply download the file into your own project, tweak the frames, labels, colors or timings to your liking, give it your own `name` (e.g. `my_custom_spinner`), and import it into your application.

> **Before you start:** install the library in your project — `npm install thought-stream` — then copy any snippet below, save it as a `.js` file, and run it with `node`.

### 1. A list of frames

<!-- test:plugin-1 -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'my_spinner',            // how you start it: stream.start('my_spinner')
  category: 'custom',            // used for filtering, e.g. startRandom({ category })
  description: 'A quarter-circle spinner.',
  interval: 120,                 // hold time of every frame, in ms
  frames: ['◐', '◓', '◑', '◒'],
});

new ThoughtStream(process.stdout).start('my_spinner');
```

Save it as `my-spinner.js` and run `node my-spinner.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-01-list.svg" alt="Terminal preview of my_spinner" width="720">
</p>

The complete file, with every optional field and a frame of several lines: [`01-list.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/01-list.js).

### 2. Frames that change speed

A frame can be an object. `frame` is the text; `interval` or `pause` sets how long that one frame stays, relative to the
others. The speed of the stream then multiplies all of them together:

<!-- test:plugin-2 -->
```js
ThoughtStream.register({
  name: 'upload',
  interval: 100,                                      // default for every frame
  frames: [
    '[          ]',
    '[###       ]',
    '[######    ]',
    { frame: '[#########]', interval: 300 },          // slow down near the end
    { frame: '[##########] done', pause: 1500 },      // hold 1.5 s, then loop
  ],
});

new ThoughtStream(process.stdout).start('upload');
```

Save it as `upload.js` and run `node upload.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-02-timing.svg" alt="Terminal preview of upload" width="720">
</p>

Runnable, with a way to hold a frame for an exact time: [`02-timing.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/02-timing.js).

### 3. Generated frames and parameters

`frames` can be a function. It receives the parameters given to `start()` and returns the array:

<!-- test:plugin-3 -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'countdown',
  category: 'custom',
  description: 'Counts down from N to 0.',
  interval: 1000,
  cache: true,                                               // build the frames once, with the parameters given to start()
  options: { from: 'number — first value (default 5)' },    // documentation for users and tooling
  frames(opts = {}, stream) {
    const from = opts.from ?? 5;
    return Array.from({ length: from + 1 }, (_, i) => `T-minus ${from - i}`);
  },
});

new ThoughtStream(process.stdout).start('countdown', { from: 3 });
```

Save it as `countdown.js` and run `node countdown.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-03-generator.svg" alt="Terminal preview of countdown" width="720">
</p>

The function runs when the stream starts, with the parameters given to `start()`. Give `opts` a default (`opts = {}`): tools such as `ThoughtStream.info()` may call a generator without arguments. Runnable: [`03-generator.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/03-generator.js).

**Keep `cache: true` on a generator that has heavy frames.** With `cache: true` the frames are built once, so your parameters hold on every loop, and heavy generators cost nothing after the first pass. Without it, the engine calls the function again at each loop with the initial parameters. That is the right choice when you want fresh random frames on every pass; if you need to remember custom dynamic state per stream:

<!-- test:weakmap -->
```js
const ThoughtStream = require('thought-stream');

const remembered = new WeakMap();                    // stream -> the parameters of its start() call

ThoughtStream.register({
  name: 'fresh_noise',
  interval: 100,
  frames(opts = {}, stream) {
    if (stream && Object.keys(opts).length) remembered.set(stream, opts);
    const { length = 8 } = (stream && remembered.get(stream)) || opts;
    return Array.from({ length: 4 }, () => Array.from({ length }, () => '░▒▓█'[Math.floor(Math.random() * 4)]).join(''));
  },
});

new ThoughtStream(process.stdout).start('fresh_noise', { length: 20 });
```

Save it as `fresh-noise.js` and run `node fresh-noise.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-03b-fresh-noise.svg" alt="Terminal preview of fresh_noise" width="720">
</p>


The helpers in `ThoughtStream.SDK` build common frame lists for you:

<!-- test:sdk -->
```js
const ThoughtStream = require('thought-stream');
const { frames, chars, string, math } = ThoughtStream.SDK;

frames.progressBar('Uploading', 24, 40);           // 41 frames, 0 % to 100 %:  Uploading [████░░░░░░░░░░░░░░░░░░░░]  17%
frames.typewriter('Hello, world', '▌', true);      // types the text, then erases it
frames.dotReveal('Loading', 3);                    // Loading · Loading. · Loading.. · Loading...
frames.spinner(chars.moon, ' Moon phases');        // spin using any character set (braille, moon, clock, arrows...)
frames.gradientPulse(16, 20);                      // 20-frame shimmering intensity pulse
frames.bounce(['⠋', '⠙', '⠹', '⠸']);              // plays forward, then backward: ⠋ ⠙ ⠹ ⠸ ⠹ ⠙
string.box('SYSTEM READY');                        // draws an ASCII/Unicode border box around text
string.padLeft('42%', 6);                          // aligns columns and numbers neatly: "   42%"
math.sinWave(3, 12, 1);                            // 0..1 value at step 3 of 12 — for smooth pulses
```

Here is what the helper animations look like in the terminal:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-03c-sdk-helpers.svg" alt="Terminal preview of ThoughtStream.SDK helpers" width="720">
</p>

To combine SDK helpers with your own handmade frames, dynamic parameters, and scenes with `duration`, use `ThoughtStream.compileTracks()`. Notice how each track runs at its own distinct interval so every element moves with its own rhythm:

```js
const ThoughtStream = require('thought-stream');
const { frames, chars } = ThoughtStream.SDK;

// 1. Handmade local frames (rising and falling wave)
const wave = [' ', '▂', '▃', '▄', '▅', '▆', '▇', '█', '█', '▆', '▄', '▂'];

ThoughtStream.register({
  name: 'mission_control',
  interval: 80,
  cache: true,                                         // build the tracks once with the given options
  frames(opts = {}) {
    const len = opts.length ?? 12;

    // 2. Combine everything into one multitrack line:
    return ThoughtStream.compileTracks({
      template: '{wave}  {spin} {data}  [{time}]',
      interval: 80,
      tracks: {
        wave: { frames: wave, interval: 140 },         // A. Gentle wave at 140 ms
        spin: { frames: frames.spinner(chars.braille, ''), interval: 80 }, // B. Crisp spinner at 80 ms
        data: {                                        // C. Telemetry noise at 250 ms
          frames: Array.from({ length: 4 }, () =>
            Array.from({ length: len }, () => '░▒▓█'[Math.floor(Math.random() * 4)]).join('')
          ),
          interval: 250,
        },
        time: { type: 'counter', from: 0, to: 10, interval: 1000, format: 'clock' }, // D. Steady clock at 1000 ms
      },
      scenes: [
        { duration: 4000 },                            // active phase runs for 4 s...
        { duration: 2000, tracks: { wave: '■', spin: '✔', data: 'SYNC COMPLETE' } }, // ...then settles for 2 s
      ],
    });
  },
});

new ThoughtStream(process.stdout).start('mission_control', { length: 12 });
```

Save it as `mission-control.js` and run `node mission-control.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-03d-mission-control.svg" alt="Terminal preview of mission_control" width="720">
</p>

### Styling, colours, and text formatting

Frames can be richly styled and coloured using `ThoughtStream.SDK.color.paint()`. It works identically in **Node.js terminals** (24-bit TrueColor ANSI codes) and in **browsers** (translated to styled `<span>` tags automatically).

| Option | Values | Meaning |
|---|---|---|
| `color` (or `fg`) | `'#00ff88'`, `'#ff5555'`, `'cyan'`, `'red'` | Foreground text colour |
| `bg` (or `background`) | `'#000000'`, `'#1e1e2e'`, `'black'` | Background colour |
| `bold` | `true` | Bold / bright text |
| `dim` | `true` | Faint, dimmed text (useful for labels and secondary details) |
| `italic` | `true` | Cursive italic text |
| `underline` | `true` | Underlined text (links, highlights) |
| `blink` | `true` | Blinking text — classic retro terminal alert (animated via CSS in browsers) |
| `invert` | `true` | Swaps foreground and background colours (ideal for badges) |

#### Three ways to use colour:

1. **Colour an entire animation:**
   Transform every frame in one line with `.map()`:
   ```js
   const { color } = ThoughtStream.SDK;
   const frames = ['◐', '◓', '◑', '◒'].map((f) => color.paint(f, { color: '#00ff88', bold: true }));
   // Or use fast terminal shortcuts: frames.map(color.neon) or frames.map(color.cyan)
   ```

2. **Compose multi-styled, multicolour lines:**
   Mix painted tags, dimmed labels, italics, and `string.padLeft` to keep columns aligned:

<!-- test:styling -->
```js
const ThoughtStream = require('thought-stream');
const { color, string } = ThoughtStream.SDK;

const spinner = ['◐', '◓', '◑', '◒'].map((f) =>
  color.paint(f, { color: '#00ff88', bold: true })
);

ThoughtStream.register({
  name: 'server_monitor',
  interval: 120,
  defaultFg: 248,                                        // default colour for unpainted text
  frames: spinner.map((icon, i) => {
    const badge = color.paint('[PROD]', { color: '#a855f7', bold: true });
    const label = color.paint('CPU', { dim: true });
    const note  = color.paint('(live)', { italic: true, dim: true });
    const alert = color.paint('ALERT', { color: 'red', bold: true, blink: true });
    const pct   = string.padLeft((40 + i * 15) + '%', 4);
    const link  = color.paint('logs', { color: 'cyan', underline: true });

    return `${icon} ${badge} ${label} ${pct}  ${note}  ${i === 3 ? alert : link}`;
  }),
});

new ThoughtStream(process.stdout).start('server_monitor');
```

Save it as `server-monitor.js` and run `node server-monitor.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-03e-styling.svg" alt="Terminal preview of server_monitor" width="720">
</p>

3. **Pre-coloured animations & forcing a monochrome palette:**
   - **Catalog & Durdraw plugins:** Built-in ANSI colours are rendered automatically everywhere.
   - **Forcing a single colour:** To tint an existing multi-coloured plugin into monochrome, strip existing ANSI codes first:
     ```js
     const base = ThoughtStream.get('spinner_dots');
     const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');
     const monoFrames = base.frames.map((f) => color.paint(stripAnsi(f), { color: '#00ff88' }));
     ```
   - **In the browser with CSS:** Uncoloured text inherits the container's CSS `color`. To override all embedded colours:
     ```css
     #status, #status span { color: #f59e0b !important; }
     ```

### 4. Placeholders you can update live

Put `{names}` in the frames, then fill them while the animation runs with `setTrack(name, value)`. Set a value before `start()` so that no raw `{label}` is ever shown:

<!-- test:plugin-4 -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'status',
  interval: 90,
  frames: ['⠋ {label}', '⠙ {label}', '⠹ {label}', '⠸ {label}', '⠼ {label}', '⠴ {label}', '⠦ {label}', '⠧ {label}'],
});

const stream = new ThoughtStream(process.stdout);
stream.setTrack('label', 'Uploading');
stream.start('status');

setTimeout(() => stream.setTrack('label', 'Verifying'), 2000);
```

Save it as `upload-status.js` and run `node upload-status.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-04-placeholders.svg" alt="Terminal preview of status" width="720">
</p>

Placeholders also work inside frame objects (`{ frame: 'Uploading {label}', interval: 200 }`), but then add `multitrack: false` to the plugin. Otherwise the engine takes it for a multitrack template and logs an *Unmapped template placeholders* warning. Runnable: [`04-placeholders.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/04-placeholders.js). To give a plugin methods of its own, such as `stream.plugin('gauge').setLevel(60)`, see [`06-api.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/06-api.js).

### Multi-line dashboards: composing multiple animations

The terminal window at the top of this page is not a static mockup — it is four real ThoughtStream plugins running simultaneously. Because `ThoughtStream` natively supports multiline frames (`\n`), it rewinds the cursor (`\x1b[NA\r`) and updates all lines in place without flicker.

Here is the exact code that drives the 4-row dashboard:

```js
const ThoughtStream = require('thought-stream');
const { color } = ThoughtStream.SDK;

// Load the 4 catalog plugins
require('thought-stream/plugins/catalog/tokenizer');
require('thought-stream/plugins/catalog/flash-attention');
require('thought-stream/plugins/catalog/wandb-sparkline');
require('thought-stream/plugins/catalog/kv-cache');

const pTokenizer = ThoughtStream.get('tokenizer');
const pAttention = ThoughtStream.get('flash_attention');
const pSparkline = ThoughtStream.get('wandb_sparkline');
const pKvCache   = ThoughtStream.get('kv_cache');

const f1 = typeof pTokenizer.frames === 'function' ? pTokenizer.frames() : pTokenizer.frames;
const f2 = typeof pAttention.frames === 'function' ? pAttention.frames() : pAttention.frames;
const f3 = typeof pSparkline.frames === 'function' ? pSparkline.frames() : pSparkline.frames;
const f4 = typeof pKvCache.frames   === 'function' ? pKvCache.frames()   : pKvCache.frames;

ThoughtStream.register({
  name: 'hero_dashboard',
  interval: 65,
  frames() {
    const combined = [];
    const WIDTH = 68;
    for (let i = 0; i < 60; i++) {
      const r1 = (f1[i % f1.length].frame || f1[i % f1.length]).slice(0, 48);
      const r2 = (f2[i % f2.length].frame || f2[i % f2.length]).slice(0, 48);
      const r3 = (f3[i % f3.length].frame || f3[i % f3.length]).slice(0, 48);
      const r4 = (f4[i % f4.length].frame || f4[i % f4.length]).slice(0, 48);

      const l1 = color.paint(r1, { fg: '#79c0ff' }) + ' '.repeat(Math.max(2, WIDTH - r1.length - 9)) + color.paint('tokenizer', { dim: true });
      const l2 = r2 + ' '.repeat(Math.max(2, WIDTH - r2.length - 15)) + color.paint('flash_attention', { dim: true });
      const l3 = color.paint(r3, { fg: '#56d364' }) + ' '.repeat(Math.max(2, WIDTH - r3.length - 15)) + color.paint('wandb_sparkline', { dim: true });
      const l4 = color.paint(r4, { fg: '#e3b341' }) + ' '.repeat(Math.max(2, WIDTH - r4.length - 8)) + color.paint('kv_cache', { dim: true });

      combined.push(l1 + '\n' + l2 + '\n' + l3 + '\n' + l4);
    }
    return combined;
  }
});

const stream = new ThoughtStream(process.stdout);
stream.start('hero_dashboard');
```

Save it as `dashboard.js` and run `node dashboard.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/hero.svg" alt="A terminal window animating four ThoughtStream plugins at once: a tokenizer, an attention progress bar, a loss sparkline and a KV-cache gauge" width="720">
</p>

### 5. Pixel art

Generate frames with a [Braille or half-block canvas](#pixel-art-in-text-braille-and-half-blocks). Mark a half-block plugin `fontScale: 'dense'` and the browser paints it on a `<canvas>`:

<!-- test:plugin-5 -->
```js
const { BrailleCanvas, BlockCanvas } = ThoughtStream.SDK;

// Braille: a scrolling sine wave
ThoughtStream.register({
  name: 'sine_scope',
  category: 'custom',
  description: 'A scrolling sine wave drawn with Braille dots.',
  interval: 50,
  cache: true,
  frames(opts = {}) {
    const canvas = BrailleCanvas(opts.cols ?? 40, opts.rows ?? 8);
    const mid = (canvas.pixelHeight - 1) / 2;
    return Array.from({ length: 60 }, (_, t) =>
      canvas.fill((x, y) => ({                    // called once per dot
        on: Math.abs(y - (mid + mid * 0.9 * Math.sin(x / 6 + t / 5))) < 1,
        color: '#00ff88',
      })).render());
  },
});

// Half-blocks: a rolling colour field, painted on a <canvas> in the browser
ThoughtStream.register({
  name: 'colour_field',
  category: 'custom',
  description: 'A rolling colour field in solid half-block pixels.',
  interval: 60,
  fontScale: 'dense',
  cache: true,
  frames(opts = {}) {
    const canvas = BlockCanvas(opts.cols ?? 80, opts.rows ?? 24);
    const hex = (n) => Math.round(n).toString(16).padStart(2, '0');
    return Array.from({ length: 48 }, (_, t) =>
      canvas.fill((x, y) => {
        const v = Math.sin(x / 8 + t / 7) + Math.sin(y / 5 - t / 9);
        return '#' + hex(127 + 60 * v) + hex(80 + 40 * v) + hex(200 - 50 * v);
      }).render());
  },
});

new ThoughtStream(process.stdout).start('sine_scope');
```

Save it as `sine-scope.js` and run `node sine-scope.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-05-pixel.svg" alt="Terminal preview of sine_scope" width="720">
</p>

Runnable: [`15-braille.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/15-braille.js) (three ways to draw with dots) and [`16-block.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) (pixels, mirrors and pictures from a list of colours).

### 6. Multitrack timelines

When several things must move at different speeds on one line — a spinner, a counter, a scrambling hash — describe them as independent **tracks** inside a **template** and let the engine interleave them:

<!-- test:plugin-6 -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'deploy',
  category: 'custom',
  interval: 50,
  template: '{spin} Deploying {pct}%',
  tracks: {
    spin: { frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], interval: 80 },
    pct:  { type: 'counter', from: 0, to: 100, step: 1, interval: 60 },
  },
  scenes: [
    { duration: 6000 },                                       // the tracks run for 6 s…
    { pause: 1500, tracks: { spin: '✔', pct: 100 } },         // …then a closing scene holds for 1.5 s
  ],
});

new ThoughtStream(process.stdout).start('deploy');
```

Save it as `deploy.js` and run `node deploy.js` — here's what you'll see:

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/dennysjmarquez/thought-stream@main/docs/assets/example-06-multitrack.svg" alt="Terminal preview of deploy" width="720">
</p>

Track types, scenes and timing are covered in [docs/multitrack.md](https://github.com/dennysjmarquez/thought-stream/blob/main/docs/multitrack.md). Runnable: [`05-tracks.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/05-tracks.js).

#### `duration` vs `pause` in scenes

Both look similar but do different things:

| Field | What it does | Practical meaning |
|---|---|---|
| `duration` | How long the scene **runs** — ticks advance, tracks animate | "play this phase for 4 s" |
| `pause` | How long the **last frame is frozen** after the scene ends | "hold the closing message for 1.5 s before looping" |

A scene with only `pause` runs for exactly one tick, then holds. A scene with both runs for `duration` ms and then holds for an extra `pause` ms. The `deploy` example above uses both: the first scene runs for 6 s, the second runs for one tick (showing `✔ 100%`) and then holds for 1.5 s.

`pause` also exists on a **frame object** (`{ frame: 'done', pause: 1500 }`), where it means the same as `interval` — it sets how long that one frame stays on screen. Use `pause` there to signal intent ("this is a deliberate hold"), `interval` for rhythm.

#### Track options: `mode` and `delay`

A frame-sequence track has two options that are not visible in the main example:

| Option | Default | What it does |
|---|---|---|
| `mode: 'loop'` | default | the track loops back to the first frame when it reaches the end |
| `mode: 'once'` | — | the track **stops on its last frame** and stays there while the other tracks keep running |
| `delay` | `0` | ms to wait before this track starts; the other tracks are already running during that time |

`mode: 'once'` is how you "freeze one track while the others continue" — for example a countdown that stops at zero while the spinner keeps spinning:

<!-- test:track-options -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'handshake',
  interval: 100,
  template: '{spin} {step}',
  tracks: {
    spin: { frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'], interval: 80 },     // loops forever
    step: { frames: ['Connecting', 'Authenticating', 'Ready'], interval: 600, mode: 'once' }, // stops at 'Ready'
  },
  scenes: [{ duration: 6000 }],
});

new ThoughtStream(process.stdout).start('handshake');
```

`delay` lets a track enter late — for example a label that appears after a spinner has been running for a moment:

<!-- test:track-delay -->
```js
const ThoughtStream = require('thought-stream');

ThoughtStream.register({
  name: 'staged',
  interval: 80,
  template: '{spin}{label}',
  tracks: {
    spin: { frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'], interval: 80 },
    label: { frames: ['', ' Loading…'], interval: 80, delay: 500, mode: 'once' },   // appears after 500 ms
  },
  scenes: [{ duration: 2000 }],
});

new ThoughtStream(process.stdout).start('staged');
```

### Where plugin files live

A plugin file only has to register itself. This version works in a browser (`<script>`), in Node, and in bundlers:

```js
// src/animations/my-spinner.js
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  ThoughtStream.register({ name: 'my_spinner', interval: 120, frames: ['◐', '◓', '◑', '◒'] });
});
```

The smallest file that works this way is [`00-template.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/00-template.js). With ES modules it is shorter: `import ThoughtStream from 'thought-stream'; ThoughtStream.register({ … });`.
To share plugins, publish them as their own package (for example `thought-stream-plugin-yourname`) with `thought-stream` as a peer dependency.

Plugin names are case-sensitive, and `snake_case` and `kebab-case` are interchangeable: `start('my_spinner')` and `start('my-spinner')` find the same plugin.

### Plugin definition reference

| Field | Type | Meaning |
|---|---|---|
| `name` | string, required | unique id used by `start(name)` |
| `category` | string | grouping for `startRandom({ category })` and for catalogs |
| `description` | string | one-line summary |
| `frames` | array or function | the animation: strings, `{ frame, interval?, pause? }` objects, or `(opts, stream) => array` |
| `interval` | number (ms) | default hold time of a frame |
| `options` | object | documents the parameters `frames(opts)` understands (`name → description`); documentation only — the engine does not validate it |
| `cache` | boolean | build generated frames only once instead of at every loop |
| `fontScale` | `'dense'` \| `'ultra'` | the plugin draws a large half-block scene (only `▀ ▄ █` and spaces, in true colour); the browser paints it on a `<canvas>` |
| `preview` | string | the representative frame: drawn for users who prefer reduced motion, and returned by `ThoughtStream.info()` so generator plugins need not run |
| `api` | object | live-control methods, called as `stream.plugin(name).method(...)`; each receives the stream first |
| `template`, `tracks`, `scenes` | | multitrack timeline — see [docs/multitrack.md](https://github.com/dennysjmarquez/thought-stream/blob/main/docs/multitrack.md) |
| `multitrack` | `false` | never treat the frames as a template: for literal art that happens to contain `{braces}`, and for frame objects that carry live `{placeholders}` |
| `defaultFg` | number 0–255 | colour for glyphs that carry no colour of their own |

## Learn by example

The files in `dist/` are minified. The [`examples/`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/) folder is the part of the repository that is meant to be read: 20 short, runnable plugin files with one idea each, so that a question such as "how do I use `dither.bayer8`?" ends in a few lines of working code that you can copy. Between them they use every function of `ThoughtStream.SDK`, every field of a plugin definition and every kind of frame, and the header of each file says what it covers.

| Example | What it shows |
| --- | --- |
| [`00-template.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/00-template.js) | The smallest plugin file: copy it and change the frames. |
| [`01-list.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/01-list.js) | A plugin is a name and a list of frames; the other fields are optional. |
| [`02-timing.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/02-timing.js) | Hold one frame longer, or change the speed of a single frame. |
| [`03-generator.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/03-generator.js) | Build the frames with a function and take parameters from `start()`. |
| [`04-placeholders.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/04-placeholders.js) | Leave `{slots}` in the frames and fill them while the animation runs. |
| [`05-tracks.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/05-tracks.js) | Several parts of one line, each at its own speed, changing in scenes. |
| [`06-api.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/06-api.js) | Give the plugin its own methods, such as `stream.plugin(name).setLevel(60)`. |
| [`07-registry.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/07-registry.js) | Register many plugins, find them again and describe them without playing them. |
| [`08-frames.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/08-frames.js) | Ready-made frame lists: progress bars, typewriter, spinners, rain and more. |
| [`09-chars.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/09-chars.js) | Character sets that are already spinners: Braille, blocks, arrows, moons… |
| [`10-math.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/10-math.js) | Easing, waves, noise and random picks for smooth motion. |
| [`11-string.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/11-string.js) | Pad, cut, wrap and box text, and shrink a multi-line frame. |
| [`12-color.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/12-color.js) | Colour in the terminal and in the browser with one call. |
| [`13-palette.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/13-palette.js) | Colour ramps, Bayer dithering and Floyd–Steinberg dithering. |
| [`14-events.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/14-events.js) | A small message bus, so plugins and your app can talk to each other. |
| [`15-braille.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/15-braille.js) | Draw with Braille dots: three ways to fill a canvas. |
| [`16-block.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) | Draw with coloured half-blocks, and turn a list of colours into a picture. |
| [`17-diff.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/17-diff.js) | Send a terminal only what changed since the last frame. |
| [`18-retro.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/18-retro.js) | Read DOS `.BIN` art, CP437 text and Durdraw `.dur` animations. |
| [`19-typescript.ts`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/19-typescript.ts) | The same kind of plugin in TypeScript, checked by the package types. |

Play them without writing anything. In a terminal:

```bash
node examples/run.js              # list every plugin
node examples/run.js 08           # play the plugins of example 08
```

or open [`examples/index.html`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/index.html) in a browser and pick a plugin from the list. [`examples/README.md`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/README.md) has the full table, with what each file covers, and explains how the files are built. They are tested before every release, so they keep working.

## Playing third-party art (Durdraw)

ThoughtStream can play animations made with **[Durdraw](https://durdraw.org/)**, the terminal ASCII/ANSI art editor and animator. Drop in a `.dur` file and it becomes a plugin like any other:

<!-- test:dur -->
```js
// In an ES module or an async function. The source can be a URL, a path (Node), bytes,
// a File from <input type="file">, JSON text or an object.
const plugin = await ThoughtStream.importDur('/art/logo.dur', {
  name: 'logo',
});

new ThoughtStream('#out').start('logo');
```

`importDur` validates the file, converts it, registers the plugin and resolves with it. Set `register: false` to get the plugin without registering it. Errors carry a stable `code` (`DUR_NOT_DUR`, `DUR_BAD_FORMAT`, `DUR_TOO_BIG`, …), and size limits protect you from hostile files.
In the browser, Durdraw art is drawn on a canvas by the engine itself — block and mosaic characters, shades, box drawing and the rest of the symbols as cells on a fixed grid — so it looks the same in every browser, whatever fonts are installed. As page text it would show seams between rows, and the mosaics that most fonts lack would be replaced by wider glyphs from another font. `importDur` gives every plugin the `retro` category (change it with `category`), and that is what turns this on: you do not need `fontScale`. In a terminal the art is ordinary coloured text.

`ThoughtStream.importArt(source)` is the general entry point; it chooses the format from the file extension or the content. Today it reads `.dur`; support for more formats is on the [roadmap](#roadmap).

**Where do `.dur` files come from?** You make them: install [Durdraw](https://durdraw.org/) (free), draw your frames and save the animation as a `.dur` file. The art in Durdraw's gallery belongs to its artists, so play files you made, or files whose licence lets you redistribute them, and credit the author. Durdraw art is usually several lines tall, so it looks its best in the browser; for a terminal see [Known limitations](#known-limitations).

**Durdraw's own example animations work out of the box.** The Durdraw repository includes a folder of them, [`examples/`](https://github.com/durdraw/durdraw/tree/master/examples), and ThoughtStream imports all 18 of its `.dur` files without a warning (tested on 5 November 2026). Durdraw is released under the BSD 3-Clause licence and its examples are distributed with it, so you can use them. They are the work of several artists: credit the author whenever you show one, keep Durdraw's copyright and licence notice if you redistribute the files, and never present your project as endorsed by Durdraw or its author. To play one straight from GitHub:

<!-- test:dur-github -->
```js
// In an ES module or an async function, in a browser or in Node 18 and later.
const plugin = await ThoughtStream.importDur(
  'https://raw.githubusercontent.com/durdraw/durdraw/master/examples/rain.dur',
  { name: 'rain' },
);

new ThoughtStream('#out').start('rain');
```

Durdraw is a project we admire — please see [Acknowledgements](#acknowledgements).

## API reference

### `new ThoughtStream(target?, options?)` · `ThoughtStream.create(target, options?)`

`create` is the same as `new`; use whichever reads better in your framework.

| Option | Default | Meaning |
|---|---|---|
| `speed` | plugin's `interval` (1x) | how fast the piece's rhythm plays: ms for frames that set no time of their own, and a multiplier for those that do |
| `loop` | `true` | wrap around at the end; `false` stops and calls `onComplete` |
| `plugin` | — | start this plugin immediately (`new ThoughtStream(el, { plugin: 'pacman' })`) |
| `random` | `false` | start random rotation immediately |
| `randomInterval` | `2600` | ms between plugins in random rotation |
| `smoothTransitions` | `true` | short fade/blur when the plugin changes; writes `opacity`, `filter` and `transition` on the container — set `false` if you manage those styles yourself |
| `onFrame(index, frame, name)` | — | called for every frame |
| `onLoop(name)` | — | the last frame was reached |
| `onComplete(name)` | — | `loop` is `false` and the animation ended |
| `onChange(name, plugin)` | — | a plugin started |
| `onItem(track, index)` | — | a playlist item started |

### Instance methods

| Method | What it does |
|---|---|
| `start(name \| { name, … }, params?)` | start a plugin; `params` go to the plugin. Throws if the plugin is not registered. Returns the stream |
| `stop()` | stop; the last frame stays visible |
| `pause()` · `resume()` · `toggle()` | pause and resume without losing position |
| `seek(index)` · `prev()` · `next()` | show a specific frame; use after `pause()`. To step forward use `seek(i + 1)`: in the current release `next()` on a paused stream keeps showing the same frame |
| `setSpeed(ms)` | change the speed on the fly |
| `setText(text)` | forward a new text to a plugin that supports it |
| `setTrack(name, value)` | fill a `{name}` placeholder, live |
| `plugin(name)` | the bound `api` of a plugin: `stream.plugin('text-reveal').setText('…')` |
| `phrase(text, { dotSpeed })` | show a text; if it ends in dots (`"Thinking..."`) they pulse (default 400 ms) |
| `succeed(text?)` · `fail(text?)` · `warn(text?)` · `info(text?)` | stop and show `✔`, `✖`, `⚠` or `ℹ` with a message |
| `playCustom(frames, name?, opts?)` | play an array of frames that is not a registered plugin |
| `playlist(items, { loop, duration, onItem })` | play items in order — see [Playlists](#playlists-and-random-rotation) |
| `playlistNext()` · `playlistPrev()` · `playlistGoto(i)` · `pausePlaylist()` · `resumePlaylist()` · `stopPlaylist()` | playlist control |
| `startRandom(plugins? \| { plugins, category, filter, interval, hold })` · `stopRandom()` | rotate randomly with shuffle deck and optional visual hold |
| `destroy()` | stop and release timers, observers and listeners |

Read-only properties: `isPaused`, `isRandom`, `isPlaylist`, `frameCount`, `currentName`. Settable: `loop`, `speed`.

### Static methods

| Method | What it does |
|---|---|
| `ThoughtStream.register(plugin)` · `use(plugin)` · `registerAll(list \| map)` | add plugins; chainable |
| `ThoughtStream.get(name)` · `has(name)` · `names()` · `randomName()` | look plugins up |
| `ThoughtStream.info(name)` · `listInfo()` | metadata without running a plugin: name, category, description, preview, frame count, interval, `fontScale`, size |
| `ThoughtStream.getSnippets(name, opts?)` · `hasSnippets(name)` | ready-to-paste usage snippets for a plugin (vanilla, React, Vue, Angular, Node) |
| `ThoughtStream.importDur(source, opts?)` · `importArt(source, opts?)` | [play Durdraw art](#playing-third-party-art-durdraw) |
| `ThoughtStream.compileTracks(plugin)` | turn a multitrack definition into plain frames |

Runnable examples: [`07-registry.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/07-registry.js) for `register`, `registerAll`, `use`, `get`, `has`, `names`, `randomName`, `info`, `listInfo`, `getSnippets` and `hasSnippets`; [`05-tracks.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/05-tracks.js) for `compileTracks`; [`18-retro.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/18-retro.js) for `importDur` and `importArt`.

### `ThoughtStream.SDK`

| Namespace | Contents |
|---|---|
| [`frames`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/08-frames.js) | `progressBar`, `typewriter`, `dotReveal`, `spinner`, `gradientPulse`, `matrixRain`, `bounce`, `reverse`, `repeat`, `sequence`, `hold`, `crossfade`, `heartbeat` |
| [`chars`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/09-chars.js) | curated Unicode sets: `braille`, `blocks`, `vbars`, `hbars`, `box`, `arrows`, `clock`, `moon`, `dots`, … |
| [`math`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/10-math.js) | `lerp`, `clamp`, `map`, `sinWave`, `easeIn`, `easeOut`, `easeInOut`, `randInt`, `pick`, `shuffle`, `linspace`, `noise2D` |
| [`string`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/11-string.js) | `center`, `padLeft`, `truncate`, `wordWrap`, `fill`, `box`, `scaleFrame` |
| [`color`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/12-color.js) | `paint(text, { color, bg, bold, dim, italic, underline, blink, invert })` works everywhere — Node terminal and browser. `color` and `bg` take `'#rgb'`, `'#rrggbb'` or one of `black red green yellow blue magenta cyan white`; any other value is ignored. `green`, `cyan`, `neon`, … colour only in a Node terminal and return plain text elsewhere |
| [`BrailleCanvas`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/15-braille.js) · [`BlockCanvas`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) | [pixel canvases](#pixel-art-in-text-braille-and-half-blocks) |
| [`DiffCanvas`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/17-diff.js) | terminal-only: send just the cells that changed since the last frame |
| [`fromPixels`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) | turn a pixel array into a half-block frame, with optional dithering and palette |
| [`palette`, `dither`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/13-palette.js) | colour ramps and Bayer / Floyd–Steinberg dithering |
| [`events`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/14-events.js) | a tiny pub/sub bus shared by plugins: `on`, `off`, `once`, `emit`, `clear` |
| [`retro`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/18-retro.js) | retro-art tools: `palette16`, the CP437 table, `fromBin(bytes, width = 80)` (decodes a `.BIN` text-mode dump into an ANSI frame), `modemDraw(frame, { linesPerStep, interval })` (returns frames that reveal a picture a couple of lines at a time, like a dial-up BBS) and the Durdraw readers behind `importDur` |

TypeScript definitions ship with the package (`import ThoughtStream from 'thought-stream'`); [`19-typescript.ts`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/19-typescript.ts) is a plugin written against them.

### Colour in frames

Frames can carry ANSI colour codes. A terminal understands all of them; the browser renderer understands this subset:

| Supported in the browser | Codes |
|---|---|
| reset, bold, dim, italic, underline, blink, invert | `0` `1` `2` `3` `4` `5` `7` |
| foreground, 8 colours | `30`–`37`, plus bright `91` `92` `93` `97` |
| background, 7 colours | `40`–`44`, `46`, `47` |
| 256 colours | `38;5;n` · `48;5;n` |
| true colour | `38;2;r;g;b` · `48;2;r;g;b` |

Three things to know. Each escape sequence starts from a clean slate, so combine attributes in **one** sequence (`ESC[1;31m`, which is what `paint` emits) rather than `ESC[1m` followed by `ESC[31m`. A sequence that contains `0` is treated as a plain reset, so write `ESC[0m` on its own and never `ESC[0;31m` (a habit of classic ANSI art). And the basic colours use ThoughtStream's own palette (for example `32` is a bright green, `#00ff88`). Codes outside the table, such as `45` or `90`, are ignored. Use `38;2` or `38;5` when a colour has to look identical everywhere.

## Accessibility and performance

- **Screen readers read the text of every frame**, and Braille characters are read aloud as noise. Give the container `role="img"` and an `aria-label`, or `aria-hidden="true"` next to a short visible message. Use `aria-live="polite"` only for text that carries meaning, such as `text-reveal`.
- **Reduced motion** is honoured: with `prefers-reduced-motion: reduce` a single static frame is drawn — the plugin's `preview` if it declares one, otherwise its last frame — and nothing moves. The preference is read when the library loads.
- **No wasted work**: hidden tabs and scrolled-out elements are paused; the browser renderer rewrites only the rows that changed; frames are batched with `requestAnimationFrame`.
- **Clean-up**: always call `destroy()` when a component unmounts.
- **Container styles**: with `smoothTransitions` on (the default) the engine sets `opacity`, `filter` and `transition` on the container when a plugin starts. Turn it off if you animate those yourself.

## Known limitations

These are behaviours of the engine that surprise people. Each has a workaround, and each workaround is run by this README's test-suite.

| You will notice | Why | What to do |
|---|---|---|
| `next()` keeps showing the same frame on a paused stream | `next()` shows the following frame without moving the position | step with `seek(i + 1)` |
| A very wide plugin wraps in a narrow terminal | the engine does not clip frames to the terminal width | check the *Size* column of the [catalog](https://github.com/dennysjmarquez/thought-stream/blob/main/docs/catalog.md), or choose a narrower plugin |
| `DiffCanvas` draws gaps and stray characters when it is given `BlockCanvas` frames | `BlockCanvas` writes one colour code for a whole run of equal cells, while `DiffCanvas` expects one code per cell | use `DiffCanvas` with `BrailleCanvas` frames, with or without colour: [`17-diff.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/17-diff.js) |
| `dither.floydSteinberg` without a palette, and `fromPixels` with `dither: true`, turn white and other very bright colours black | the default quantiser rounds a colour channel of 240 or more (counting the error it carries over from its neighbours) up to 256, which wraps to 0; `fromPixels` snaps to your `palette` first and then dithers without it | call `dither.floydSteinberg(pixels, width, height, palette)` yourself, with a palette, and pass the result to `fromPixels` without `dither`: [`16-block.js`](https://github.com/dennysjmarquez/thought-stream/blob/main/examples/plugins/16-block.js) |
| `window.mainStream` appears in the browser | every new stream publishes itself under that name | ignore it; it is simply the most recent stream |

**Custom multi-line terminal rendering** — in addition to native automatic multiline playback, you can run headless and control cursor placement manually:

<!-- test:multiline-terminal -->
```js
const ThoughtStream = require('thought-stream');
require('thought-stream/plugins/catalog/braille-plasma');

let rows = 0;
const stream = new ThoughtStream(null, {
  onFrame(index, frame) {
    const lines = String(frame).split('\n');
    // back to the first row of the previous frame, then overwrite every row
    process.stdout.write('\r' + (rows > 1 ? `\x1b[${rows - 1}A` : '') + lines.map((l) => l + '\x1b[K').join('\n'));
    rows = lines.length;
  },
});
stream.start('braille_plasma');
```

## Roadmap

- **More art formats** for `importArt`: `.ans` (ANSI art) and `.bin` (binary text-mode dumps). The low-level `.BIN` decoder, `ThoughtStream.SDK.retro.fromBin`, is already available if you want to wrap one yourself.
- A plugin builder of our own is planned.
- More plugins and categories.

## Acknowledgements

ThoughtStream stands on a tradition of text-mode art that it deeply respects.

**[Durdraw](https://durdraw.org/)** — the terminal ASCII/ANSI art editor and animator by Sam Foster, released under the BSD 3-Clause licence — defines the `.dur` format that ThoughtStream can play. Several plugins in the `retro` category are converted from artworks in Durdraw's example collection; the Durdraw project credits the artists cmang, H7, LDA, HK and LnLcFlx. Their licence and credits are reproduced in [THIRD_PARTY_NOTICES.md](https://github.com/dennysjmarquez/thought-stream/blob/main/THIRD_PARTY_NOTICES.md).

ThoughtStream is an independent project. It is **not affiliated with, endorsed by or sponsored by** Durdraw or any of those artists; their names are used only to give credit. If you enjoy this kind of work, please support Durdraw (donations are accepted on [durdraw.org](https://durdraw.org/)) and the artists who keep the scene alive. If you are an author and would like your credit worded differently, or your work removed, open an issue and it will be handled promptly.

## Author

ThoughtStream is created and maintained by **Dennys José Márquez Reyes**, a front-end web developer.

[Website](https://dennysjmarquez.dev/) · [LinkedIn](https://www.linkedin.com/in/dennysjmarquez/) · [GitHub](https://github.com/dennysjmarquez) · [X](https://x.com/infocodes)

Questions, bug reports and ideas are welcome: [open an issue](https://github.com/dennysjmarquez/thought-stream/issues).

## Support

ThoughtStream is free and stays free. If it saved you a morning, you can
[buy me a coffee](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SC7UXSK6B76L4). A star, an issue or a pull request
helps just as much, and it is what moves the roadmap.

## License

Released under the MIT licence — see [LICENSE](https://github.com/dennysjmarquez/thought-stream/blob/main/LICENSE). Third-party components keep their own licences — see [THIRD_PARTY_NOTICES.md](https://github.com/dennysjmarquez/thought-stream/blob/main/THIRD_PARTY_NOTICES.md).
