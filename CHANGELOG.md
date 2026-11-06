# Changelog

Every release of thought-stream, newest first. Versions follow [Semantic Versioning](https://semver.org/).

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
