/**
 * SDK chars: character sets worth having at hand
 *
 * ThoughtStream.SDK.chars holds curated sets. Most are plain arrays, so each one is already a spinner:
 * put it in `frames`. Two are objects with named parts: `box` (lines and corners) and `status` (✔ ✖ ⚠).
 *
 * @summary Character sets that are already spinners: Braille, blocks, arrows, moons…
 * @covers chars.* ThoughtStream.register field:name field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { chars } = ThoughtStream.SDK;
  const add = (name, list, interval = 120) =>
    ThoughtStream.register({ name: 'sample_chars_' + name, interval, frames: list });

  add('braille', chars.braille, 80);         // ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
  add('braille_all', chars.brailleAll, 40);  // all 64 six-dot patterns: a twinkle
  add('blocks', chars.blocks, 200);          // ░ ▒ ▓ █
  add('vbars', chars.vbars, 100);            // ▁ ▂ ▃ ▄ ▅ ▆ ▇ █   a bar that grows upward
  add('hbars', chars.hbars, 100);            // ▏ ▎ ▍ ▌ ▋ ▊ ▉ █   a bar that grows to the right
  add('pipe', chars.pipe, 100);              // | / - \
  add('arrows', chars.arrows, 120);          // ← ↖ ↑ ↗ → ↘ ↓ ↙
  add('clock', chars.clock, 200);            // 🕛 🕐 🕑 …   emoji are two columns wide
  add('moon', chars.moon, 200);              // 🌑 🌒 🌓 …
  add('dots', chars.dots, 250);              // ·  ··  ···
  add('geo', chars.geo, 150);                // ◐ ◓ ◑ ◒
  add('math', chars.math, 200);              // ∑ ∫ ∂ ∇ √ ∞ …
  add('neural', chars.neural, 200);          // ⦿ ◉ ◎ ○ ◌ …

  // `status` is an object: { ok, error, warn, info, bullet, star }
  add('status', Object.entries(chars.status).map(([name, glyph]) => `${glyph} ${name}`), 700);

  // `box` is an object too: h and v (lines), tl, tr, bl and br (corners), and the joints cross, T, B, L, R.
  const { h, v, tl, tr, bl, br } = chars.box;
  const box = (width) => [tl + h.repeat(width) + tr, v + ' '.repeat(width) + v, bl + h.repeat(width) + br].join('\n');
  add('box', Array.from({ length: 14 }, (_, i) => box(i * 2)), 80); // a box that grows
});
