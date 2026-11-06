/**
 * SDK DiffCanvas: send only what changed
 *
 * Redrawing a whole picture on every frame wastes time and makes a terminal flicker. DiffCanvas remembers
 * the last frame and returns only the characters that changed, each with the cursor move that puts it in
 * place. It is made for writing straight to a terminal, so this plugin does not draw with it: it counts
 * what it saves. Experimental: it is exact with BrailleCanvas frames, as used here (colour or not);
 * BlockCanvas frames are not diffed correctly yet.
 *
 * @summary Send a terminal only what changed since the last frame.
 * @covers DiffCanvas DiffCanvas#* ThoughtStream.register field:name field:interval field:cache field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { BrailleCanvas, DiffCanvas } = ThoughtStream.SDK;

  ThoughtStream.register({
    name: 'sample_diff_savings',
    interval: 1000,
    cache: true,
    frames() {
      // The picture: one dot that moves
      const canvas = BrailleCanvas(40, 6);
      // Remembers what the terminal already shows
      const screen = DiffCanvas(40, 6);
      const draw = (t) => {
        canvas.clear();
        canvas.setPixel((t * 3) % 80, 12 + Math.round(8 * Math.sin(t / 3)), true);
      };
      const less = (sent, whole) => `${Math.round(100 - (100 * sent) / whole)}% less`;
      const lines = [];

      draw(0);
      // The whole picture, in characters
      const whole = canvas.render().length;
      // renderToTerminal(canvas): the first frame, complete
      lines.push(`renderToTerminal(): ${screen.renderToTerminal(canvas).length} characters, the first time`);

      for (let t = 1; t <= 3; t++) {
        draw(t);
        // diff(canvas): only what changed since the last call
        const sent = screen.diff(canvas).length;
        lines.push(`diff(): ${sent} instead of ${whole} (${less(sent, whole)})`);
      }

      draw(4);
      // diffFrame(text): the same, from a frame you rendered yourself
      const again = screen.diffFrame(canvas.render()).length;
      lines.push(`diffFrame(): ${again} instead of ${whole} (${less(again, whole)})`);
      lines.push(`diff() when nothing changed: ${screen.diff(canvas).length} characters`);

      // clear(): forget the last frame, for example after the window was resized
      screen.clear();
      lines.push(`after clear(): ${screen.diff(canvas).length} characters, everything again`);
      return lines;
    },
  });

  // In a real terminal program you write the result yourself:
  //   const screen = DiffCanvas(40, 6);
  //   process.stdout.write(screen.renderToTerminal(canvas));   // first frame: hides the cursor, draws it all
  //   process.stdout.write(screen.diff(canvas));               // every frame after that
});
