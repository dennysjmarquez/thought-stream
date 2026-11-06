/**
 * SDK BrailleCanvas: drawing with dots
 *
 * One terminal character holds a 2 × 4 grid of Braille dots, so BrailleCanvas(cols, rows) gives you
 * (cols × 2) × (rows × 4) tiny pixels made of text. There are three ways to draw; each plugin uses one.
 *
 * @summary Draw with Braille dots: three ways to fill a canvas.
 * @covers BrailleCanvas BrailleCanvas#* ThoughtStream.register
 * @covers field:name field:interval field:cache field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { BrailleCanvas } = ThoughtStream.SDK;

  // 1. fill(shader): your function is asked about every dot and says whether it is lit, and in which colour.
  ThoughtStream.register({
    name: 'sample_braille_wave',
    interval: 50,
    // Draw the frames once, not again at every loop
    cache: true,
    frames() {
      // 40 × 6 characters = 80 × 24 dots
      const canvas = BrailleCanvas(40, 6);
      const middle = canvas.pixelHeight / 2;
      return Array.from({ length: 60 }, (_, t) =>
        canvas
          .fill((x, y) => ({ on: Math.abs(y - (middle + 8 * Math.sin(x / 6 + t / 5))) < 1, color: '#00ff88' }))
          // render(): the picture as a string
          .render());
    },
  });

  // 2. setPixel(x, y, on) lights or clears one dot, clear() wipes the canvas, and setColor(col, row, fg, bg)
  //    colours a whole character. A character holds 2 × 4 dots: the one with dot (x, y) is at (x >> 1, y >> 2).
  ThoughtStream.register({
    name: 'sample_braille_comet',
    interval: 40,
    cache: true,
    frames() {
      const canvas = BrailleCanvas(40, 6);
      // Where the comet is at time t: a dot that swings left and right while it bobs up and down
      const at = (t) => [
        Math.round(((Math.sin(t / 20) + 1) / 2) * (canvas.pixelWidth - 1)),
        Math.round(((Math.cos(t / 7) + 1) / 2) * (canvas.pixelHeight - 1)),
      ];
      return Array.from({ length: 126 }, (_, t) => {
        canvas.clear();
        for (let tail = 0; tail < 12; tail++) canvas.setPixel(...at(t - tail), true);
        const [x, y] = at(t);
        canvas.setColor(x >> 1, y >> 2, '#ffcc00');
        return canvas.render();
      });
    },
  });

  // 3. fillDensity(shader): for every character, how many of its 8 dots are lit (0 to 1), and a colour.
  //    There are no gaps, so it suits smooth fields.
  ThoughtStream.register({
    name: 'sample_braille_density',
    interval: 60,
    cache: true,
    frames() {
      const canvas = BrailleCanvas(40, 6);
      return Array.from({ length: 63 }, (_, t) =>
        canvas
          .fillDensity((x, y) => ({
            density: (Math.sin(x / 5 + t / 8) + Math.sin(y / 1.5 - t / 6) + 2) / 4,
            color: '#ff66cc',
          }))
          .render());
    },
  });
});
