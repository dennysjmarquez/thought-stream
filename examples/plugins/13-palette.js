/**
 * Colour ramps and dithering
 *
 * `palette` blends colours (`lerp`) and builds gradients (`ramp`). `dither` turns smooth values into a few
 * tones: ordered dithering with the Bayer matrices, or error diffusion with Floyd–Steinberg.
 *
 * @summary Colour ramps, Bayer dithering and Floyd–Steinberg dithering.
 * @covers palette.* dither.* ThoughtStream.register field:name field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { palette, dither, color } = ThoughtStream.SDK;
  const add = (name, list, interval = 80) =>
    ThoughtStream.register({ name: 'sample_palette_' + name, interval, frames: list });
  const WIDTH = 32;

  // lerp(colourA, colourB, t): the colour t of the way from A to B. Colours are '#rrggbb' strings.
  add('lerp', Array.from({ length: 24 }, (_, i) =>
    color.paint('█'.repeat(WIDTH), { color: palette.lerp('#ff0055', '#00ccff', i / 23) })));

  // ramp(stops, size): `size` colours that pass through every stop. Each frame shifts the strip by one step.
  const ramp = palette.ramp(['#1b0036', '#ff0055', '#ffcc00', '#ffffff'], WIDTH);
  add('ramp', ramp.map((_, shift) =>
    ramp.map((_, i) => color.paint('█', { color: ramp[(i + shift) % WIDTH] })).join('')));

  // Ordered dithering: a dot is lit where the brightness beats the matrix value at that spot.
  // Left: the 4×4 Bayer matrix (16 shades). Right: the 8×8 one (64 shades). The brightness rises from 0 to 1.
  const half = (matrix, level, y) => Array.from({ length: 16 }, (_, x) =>
    (level > matrix[y % matrix.length][x % matrix.length] ? '█' : '░')).join('');
  add('bayer', Array.from({ length: 33 }, (_, step) => Array.from({ length: 8 }, (_, y) =>
    `${half(dither.bayer4, step / 32, y)}  ${half(dither.bayer8, step / 32, y)}`).join('\n')), 90);

  // Error diffusion: floydSteinberg(pixels, width, height, palette) snaps every pixel to the palette and
  // spreads the error to its neighbours. Here a smooth black-to-white gradient gets 2, 3 and then 5 greys.
  const HEIGHT = 6;
  const gradient = Array.from({ length: WIDTH * HEIGHT }, (_, i) =>
    palette.lerp('#000000', '#ffffff', (i % WIDTH) / (WIDTH - 1)));
  const shade = (hex) => ' ░▒▓█'[Math.round((parseInt(hex.slice(1, 3), 16) / 255) * 4)];
  add('floyd_steinberg', [2, 3, 5].map((tones) => {
    const greys = palette.ramp(['#000000', '#ffffff'], tones);
    const pixels = dither.floydSteinberg(gradient, WIDTH, HEIGHT, greys);
    return Array.from({ length: HEIGHT }, (_, y) =>
      pixels.slice(y * WIDTH, (y + 1) * WIDTH).map(shade).join('')).join('\n');
  }), 1200);
});
