# Changelog

Every release of thought-stream, newest first. Versions follow [Semantic Versioning](https://semver.org/).

## [1.0.0-rc.5](https://github.com/dennysjmarquez/thought-stream/releases/tag/v1.0.0-rc.5) - 2026-11-08

ThoughtStream 1.0.0-rc.5 — native in-place terminal multiline playback, clean cursor lifecycle, and evergreen documentation floor

This release candidate brings native multiline in-place playback for CLI and terminal output, complete terminal cursor and auto-wrap lifecycle management with graceful exit handlers, and establishes an evergreen documentation policy backed by automated floor verification.

What changed

- In-place terminal multiline rendering: Terminal stream playback (`new ThoughtStream(process.stdout)`) now performs VT100 cursor rewind (`\x1b[<n>A\r`) instead of single-line carriage return. Multiline animations such as `bbs_acid_intro`, `dur_welcome1`, and ASCII/ANSI art compositions update smoothly in place without cascading downward.
- Clean cursor and terminal lifecycle: The terminal cursor is automatically hidden (`\x1b[?25l`) upon stream playback and cleanly restored (`\x1b[?25h`) when stopped, paused, completed, or destroyed. Handlers on `process.once('SIGINT')`, `SIGTERM`, and `exit` guarantee the cursor and terminal auto-wrap (`\x1b[?7h`) are immediately restored if the user interrupts playback with Ctrl+C.
- Scroll-freeze and viewport safety: Disabled auto-wrap (`\x1b[?7l`) during active playback prevents wide lines from breaking the terminal grid, and output height is strictly clamped to `rows - 1` to prevent VT100 hardware viewport scrolling when rendering tall ASCII/ANSI art.
- Dynamic height sweep: Leftover lines from taller preceding frames are erased in place (`\x1b[K`) so variable-height animations transition cleanly without ghost artifacts.
- Evergreen documentation policy: Public README and package description now advertise an evergreen «250+ ready-made text animations» floor instead of volatile exact counts, backed by an automated tooling guard test (`test/tooling/readme.test.js`) ensuring the catalog count never lies.

This is a pre-release published under the «next» tag: `npm install thought-stream@next` installs it; `npm install thought-stream` keeps waiting for the stable 1.0.0.

## [1.0.0-rc.4](https://github.com/dennysjmarquez/thought-stream/releases/tag/v1.0.0-rc.4) - 2026-11-07

ThoughtStream 1.0.0-rc.4 — cinematic random mode, OWASP security suite, and the cosmic singularity showcase

This release candidate introduces cycle-aware random playback, an automated OWASP security verification suite, and a definitive showcase animation that exercises the entire graphics SDK in a single composition.

What changed

- Random mode runs to completion: `startRandom()` now observes the natural duration of each animation loop instead of cutting frames mid-cycle. Each animation reaches its final frame, pauses for a visual hold (730 ms by default), and smoothly transitions to the next item with a 300 ms fade.
- Fisher-Yates shuffle deck: Random rotation now shuffles the entire catalog without replacement, guaranteeing that all animations play once before any repeats, with collision guards across cycle boundaries.
- OWASP security suite: A dedicated 12-check test suite validates resilience against cross-site scripting (A03), prototype pollution (A08), regular expression denial of service (A04), memory leaks, and zero runtime dependencies (A06). Available via `npm run test:security`.
- Showcase plugin (`cosmic_singularity`): An all-in-one terminal animation in the `space` category demonstrating 100% of the ThoughtStream SDK (48 surfaces) across four acts: sub-pixel Braille particle collapse, hybrid Braille/HalfBlock fusion with Bayer dithering, 60 FPS event horizon telemetry HUD, and Floyd-Steinberg supernova with CP437 typography. Total animations in catalog: 259.

This is a pre-release published under the «next» tag: `npm install thought-stream@next` installs it; `npm install thought-stream` keeps waiting for the stable 1.0.0.

## [1.0.0-rc.3](https://github.com/dennysjmarquez/thought-stream/releases/tag/v1.0.0-rc.3) - 2026-11-06

ThoughtStream 1.0.0-rc.3 — the snippets people copy load the engine again

The library is exactly the same as 1.0.0-rc.2: same engine, same 258 animations, same files. What changes is the readme once more, and this time it is the part everyone copies.

Eight links loaded the engine from a CDN as `thought-stream@1/dist/...`. That `@1` means «any stable 1.x», and the only versions on npm are release candidates, so the range resolved to nothing and jsDelivr answered 404: the three copy-and-paste snippets — the plain page, the browser plugin and the parameter example — were dead on arrival. They now carry no version at all, so `/npm/thought-stream/dist/...` always serves the newest published package and keeps working after every release, the next one included.

One more link was still relative: the licence badge pointed at LICENSE, and npm prefixes relative links with its own site, so it failed there too. It points at the repository now, which leaves the readme with no relative links at all: 128 links, every one of them absolute.

Nothing else moves: same install, same API, same known limitations — written down under «Limitations», each with its test.

This is a pre-release, so it goes out under the «next» tag: `npm install thought-stream@next` gets it, while `npm install thought-stream` keeps waiting for the stable 1.0.0.

## [1.0.0-rc.2](https://github.com/dennysjmarquez/thought-stream/releases/tag/v1.0.0-rc.2) - 2026-11-06

ThoughtStream 1.0.0-rc.2 — the readme that npm shows now works

The library is exactly the same as 1.0.0-rc.1: same engine, same 258 animations, same files. What changes is the readme on the package page. npm rewrites every relative path of a readme to its own site, so on 1.0.0-rc.1 the illustration at the top did not load and 61 links were dead: the 20 examples, the plugin catalog, the licence and the third-party notices. They now point at the repository, so they open from npm exactly as they do from GitHub.

Nothing else moves: same install, same API, same known limitations — written down under «Limitations», each with its test.

This is a pre-release, so it goes out under the «next» tag: `npm install thought-stream@next` gets it, while `npm install thought-stream` keeps waiting for the stable 1.0.0.

## [1.0.0-rc.1](https://github.com/dennysjmarquez/thought-stream/releases/tag/v1.0.0-rc.1) - 2026-11-06

ThoughtStream 1.0.0-rc.1 — terminal animations for Node and the browser

ThoughtStream plays small animated scenes made of text: spinners, waves, rain, a galloping horse, a game of Pac-Man. You give it a place on the page, or a stream in your terminal, and a name:

    import ThoughtStream from 'thought-stream';

    const stream = new ThoughtStream('#status');
    await stream.start('pacman');

What is in this first release

- One engine with no dependencies, for Node.js and the browser: 258 animations ready to use, from one-line spinners to full ANSI and BBS art.
- Everything is written as frames, so it runs wherever text does: DOM text, a pixel canvas, or a Node stream.
- TypeScript types included, with examples for React, Vue and Angular, and an ES module, a CommonJS build and a single-file build for the browser.
- A plugin system: your own animation is one object with a list of frames, and it joins the catalogue like any other.
- Playlists and random rotation, speed control, pause and resume, and a sizer that fits the art to its box.
- A demo that runs the whole catalogue in the browser, and 48 examples from the documentation executed on every commit.

What "rc" means here

The contract of the engine is steady enough for someone who has not read the source. Two details are still being polished before 1.0.0: the exact length of some pauses, and what next() does right after seek(). Both are written down under "Limitations" in the README, each with its test.

Thanks

If it makes you smile, the project stays free: the repository and the README both carry a support button, and issues and pull requests are just as welcome.

The npm package follows this release, built from this very tag.
