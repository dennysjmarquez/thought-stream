/**
 * SDK BlockCanvas: solid, square pixels
 *
 * BlockCanvas(cols, rows) draws coloured pixels with half-block characters: two pixels per character, so a
 * canvas has cols × (rows × 2) pixels. HalfBlockCanvas is the same function under a clearer name, and
 * fromPixels() turns an array of colours into a picture. Add `fontScale: 'dense'` to a big picture and the
 * browser paints it on a <canvas>.
 *
 * @summary Draw with coloured half-blocks, and turn a list of colours into a picture.
 * @covers BlockCanvas HalfBlockCanvas BlockCanvas#* fromPixels ThoughtStream.register
 * @covers field:name field:interval field:cache field:frames field:fontScale
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { BlockCanvas, HalfBlockCanvas, fromPixels, dither } = ThoughtStream.SDK;
  // A colour from three numbers: rgb(r, g, b) → '#rrggbb'
  const hex = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  const rgb = (r, g, b) => '#' + hex(r) + hex(g) + hex(b);

  // 1. fill(shader): your function returns a colour for every pixel ('#rrggbb', or null for "empty").
  ThoughtStream.register({
    name: 'sample_block_field',
    interval: 60,
    cache: true,
    // In a browser, paint this on a <canvas>
    fontScale: 'dense',
    frames() {
      // 48 × 16 pixels
      const canvas = BlockCanvas(48, 8);
      return Array.from({ length: 48 }, (_, t) =>
        canvas
          .fill((x, y) => {
            const v = Math.sin(x / 6 + t / 7) + Math.sin(y / 3 - t / 9);
            return rgb(127 + 60 * v, 80 + 40 * v, 200 - 50 * v);
          })
          .render());
    },
  });

  // 2. setPixel(x, y, colour), getPixel(x, y) and clear(colour): work one pixel at a time.
  //    The left half is drawn, then mirrored into the right half by reading it back.
  ThoughtStream.register({
    name: 'sample_block_mirror',
    interval: 50,
    cache: true,
    fontScale: 'dense',
    frames() {
      // 32 × 16 pixels
      const canvas = HalfBlockCanvas(32, 8);
      return Array.from({ length: 64 }, (_, t) => {
        // clear(colour): start from a background colour
        canvas.clear('#101030');
        for (let i = 0; i < 24; i++) {
          const x = Math.round(7 + 6 * Math.sin((t + i) / 9));
          const y = Math.round(7.5 + 6.5 * Math.cos((t + i) / 5));
          canvas.setPixel(x, y, rgb(255 - i * 9, 60 + i * 6, 120));
        }
        for (let y = 0; y < canvas.pixelHeight; y++) {
          for (let x = 0; x < 16; x++) canvas.setPixel(31 - x, y, canvas.getPixel(x, y));
        }
        return canvas.render();
      });
    },
  });

  // 3. fromPixels(pixels, width, height, { palette }): a picture from a list of colours, row by row.
  //    (A 2D array of rows works too; then width and height are not needed.)
  //    Here a gradient, then the same gradient with only three colours, then dithered with those three.
  const W = 32;
  const H = 12;
  const gradient = Array.from({ length: W * H }, (_, i) => {
    const x = (i % W) / (W - 1);
    const y = Math.floor(i / W) / (H - 1);
    return rgb(32 + 192 * x, 64 + 112 * y, 224 - 192 * x);
  });
  const three = ['#ff3c00', '#7f7f7f', '#00b4ff'];

  ThoughtStream.register({
    name: 'sample_block_image',
    interval: 1200,
    frames: [
      fromPixels(gradient, W, H),
      fromPixels(gradient, W, H, { palette: three }),
      // Dither with your own palette, then draw the result. (fromPixels has a `dither` option too, but it
      // dithers without your palette and turns bright colours black: see "Known limitations" in the README.)
      fromPixels(dither.floydSteinberg(gradient, W, H, three), W, H),
    ],
  });
});
