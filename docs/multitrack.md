# Multitrack timelines

A multitrack plugin describes **one line of text** as a `template` with `{slots}`. Each slot is a **track** that changes over time, and **scenes** change the line as the animation moves on. When the plugin is registered the engine *compiles* the description into an ordinary list of frames — `ThoughtStream.get(name).frames` is that list — and from then on it behaves like any other plugin.

You can preview a compilation without registering anything: `ThoughtStream.compileTracks(spec)` returns the frames as `{ frame, interval, pause? }` objects. The examples below use it, and every example on this page is executed by the project's test-suite, so the output shown is the real output.

```js
const frames = (spec) => ThoughtStream.compileTracks(spec).map((f) => f.frame);
```

## The idea in one example

<!-- test:run -->
```js
const spec = {
  interval: 100,                                          // the clock ticks every 100 ms
  template: '{spin} {pct}%',
  tracks: {
    spin: { frames: ['-', '\\', '|', '/'], interval: 100 },
    pct: { type: 'counter', from: 0, to: 100, step: 10, interval: 200 },
  },
  scenes: [{ duration: 800 }],                            // 800 ms = 8 ticks
};
console.log(ThoughtStream.compileTracks(spec).map((f) => f.frame).join(' | '));
```
<!-- expect -->
```text
- 0% | \ 0% | | 10% | / 10% | - 20% | \ 20% | | 30% | / 30%
```

Every tick the engine renders the template once: `spin` advances every 100 ms and `pct` every 200 ms, so the two move at different speeds on the same line.

## Plugin fields

| Field | Meaning |
|---|---|
| `template` | the line, with `{name}` slots. A scene may override it with its own `frame` string that contains a `{slot}` |
| `interval` | the length of one tick in ms (default 65). A scene may set its own |
| `tracks` | the slots that exist from the very start (see [clocks](#clocks-when-does-a-track-start)) |
| `scenes` | a list of `{ duration, interval, pause, frame, tracks }` played one after the other |

## Track types

| A track is | Written as | Options |
|---|---|---|
| a constant | `'text'` or `42` | — |
| a frame sequence | `{ frames: [...] }` | `interval` (default: the scene's tick), `mode: 'loop'` (default) or `'once'` (stop on the last frame), `delay` (ms before it starts) |
| a counter | `{ type: 'counter', from, to }` | `step` (default ±1, pointing from `from` to `to`), `interval` (ms per step, default **1000**), `format`, `easing` + `duration` |
| a scramble | `{ type: 'burst' }` | `length` (default 10), `chars` (default `0123456789`) |
| a progress bar | `{ type: 'bar', progress }` | `progress` 0–1 (a fixed value), `width` (default 10), `fill` (default `█`), `empty` (default `░`) |

**Counter formats:** `'clock'` shows seconds as `m:ss`, `'centiseconds'` as `m:ss.cc`, `'fixed:N'` as a number with N decimals; the default is the plain number.

<!-- test:run -->
```js
const frames = (spec) => ThoughtStream.compileTracks(spec).map((f) => f.frame);

// a countdown from 1:30, 30 s per tick
console.log(frames({ template: '{t}', interval: 1000,
  tracks: { t: { type: 'counter', from: 90, to: 0, step: -30, format: 'clock' } },
  scenes: [{ duration: 4000 }] }).join(' '));

// easing: an ease-out ramp from 0 to 10 over 2 s, with one decimal
console.log(frames({ template: '{n}', interval: 500,
  tracks: { n: { type: 'counter', from: 0, to: 10, duration: 2000, easing: 'easeOut', format: 'fixed:1' } },
  scenes: [{ duration: 2000 }] }).join(' '));
```
<!-- expect -->
```text
1:30 1:00 0:30 0:00
0.0 4.4 7.5 9.4
```

A **bar** shows a fixed `progress`; to make it move, change `progress` from scene to scene (or put the number in a placeholder and update it with `setTrack`). A **burst** scrambles `length` characters picked from `chars`; it looks random but is a pure function of time, so it is the same on every run:

<!-- test:run -->
```js
const frames = (spec) => ThoughtStream.compileTracks(spec).map((f) => f.frame);
console.log(frames({ template: '{bar} {code}', interval: 100,
  tracks: { bar: { type: 'bar', progress: 0.5, width: 8 }, code: { type: 'burst', length: 4, chars: 'ab' } },
  scenes: [{ duration: 300 }] }).join(' | '));
```
<!-- expect -->
```text
████░░░░ abab | ████░░░░ baba | ████░░░░ baba
```

## Scenes

A scene plays for `duration` ms (default: one tick) at its own `interval` (default: the plugin's). Tracks are **inherited**: a scene only lists what it changes. `pause` holds the scene's last frame for that many extra milliseconds, which is how you make a closing message linger.

<!-- test:run -->
```js
ThoughtStream.register({
  name: 'mt_scenes',
  interval: 100,
  template: '{icon} {msg}',
  tracks: { icon: { frames: ['◐', '◓', '◑', '◒'], interval: 100 } },
  scenes: [
    { duration: 300, tracks: { msg: 'working' } },
    { duration: 200, pause: 1000, tracks: { icon: '✔', msg: 'done' } },
  ],
});
console.log(JSON.stringify(ThoughtStream.get('mt_scenes').frames));
```
<!-- expect -->
```text
[{"frame":"◐ working","interval":100},{"frame":"◓ working","interval":100},{"frame":"◑ working","interval":100},{"frame":"✔ done","interval":100},{"frame":"✔ done","interval":100,"pause":1000}]
```

## Clocks: when does a track start?

A track needs a start time to know which frame it is on. The rules are the same everywhere and never change:

1. A track declared in the root `tracks` is born at **t = 0**. It runs on the global clock, and its `delay` counts from 0.
2. A track that first appears in a **scene** is born at the **start of that scene**. Its `delay` counts from there.
3. Redefining a track in a later scene does **not** restart it, and an inherited track does not jump when a scene ends.
4. `global: true` forces a track onto the global clock (born at 0); `global: false` forces it to be born at the start of the current scene.

<!-- test:run -->
```js
const frames = (spec) => ThoughtStream.compileTracks(spec).map((f) => f.frame);
const spec = (extra) => ({
  template: '{n}',
  interval: 100,
  tracks: { n: { frames: ['0', '1', '2', '3', '4', '5'], interval: 100 } },    // root track: global clock
  scenes: [
    { duration: 300 },
    { duration: 300, frame: '{n}{t}', tracks: { t: { frames: ['a', 'b', 'c', 'd', 'e', 'f'], interval: 100, ...extra } } },
  ],
});
console.log(frames(spec({})).join(' '));                 // t is born with scene 2, so it starts at 'a'
console.log(frames(spec({ global: true })).join(' '));   // forced onto the global clock: 'd', 'e', 'f'
```
<!-- expect -->
```text
0 1 2 3a 4b 5c
0 1 2 3d 4e 5f
```

## Good to know

- A `{slot}` that no track fills is left in the text and the engine logs *Unmapped template placeholders*. If you meant a literal brace, or you use `{label}` in a frame **object**, add `multitrack: false` to the plugin (see [placeholders](../README.md#4-placeholders-you-can-update-live)).
- Constant tracks are also what `stream.setTrack('name', value)` changes at run time: set a value before `start()` so the raw `{name}` is never shown.
- A multitrack plugin is compiled once, at registration. Everything on this page therefore costs nothing while the animation runs.
