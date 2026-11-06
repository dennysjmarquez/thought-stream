/**
 * SDK retro: DOS art, CP437 and Durdraw files
 *
 * The retro tools read old text-mode formats: MS-DOS .BIN dumps, the IBM PC character set (CP437) and the
 * .dur animations saved by Durdraw. A .dur normally comes from a file or a URL; to keep this example in one
 * file it is a tiny object here. Durdraw's own animations play too: the README says where to find them
 * and how to credit them.
 *
 * @summary Read DOS `.BIN` art, CP437 text and Durdraw `.dur` animations.
 * @covers retro.* ThoughtStream.importDur ThoughtStream.importArt
 * @covers ThoughtStream.register field:name field:description field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { retro, color } = ThoughtStream.SDK;

  // 1. .BIN: two bytes per cell. First a CP437 character, then its colour: the low 4 bits are the text
  //    colour and the next 3 bits the background. fromBin(bytes, width) decodes it into a coloured frame,
  //    and modemDraw(frame) reveals that frame line by line, the way a modem used to.
  const cells = (text, fg, bg) =>
    [...text].flatMap((ch) => [retro.cp437Table.indexOf(ch), fg | (bg << 4)]);
  const bin = Uint8Array.from([
    ...cells('╔══════════╗', 14, 0),
    ...cells('║', 14, 0), ...cells('  RETRO!  ', 15, 1), ...cells('║', 14, 0),
    ...cells('╚══════════╝', 14, 0),
  ]);

  ThoughtStream.register({
    name: 'sample_retro_modem',
    interval: 400,
    frames: retro.modemDraw(retro.fromBin(bin, 12), { linesPerStep: 1, interval: 400 }),
  });

  // 2. CP437 characters (cp437ToUnicode) painted with the 16 DOS colours (palette16).
  ThoughtStream.register({
    name: 'sample_retro_cp437',
    interval: 120,
    // 0xB0 to 0xDF: shades and box-drawing characters, then the code in grey
    frames: Array.from({ length: 0x30 }, (_, i) => {
      const code = 0xb0 + i;
      const glyphs = retro.cp437ToUnicode(code).repeat(10);
      return (
        color.paint(glyphs, { color: retro.palette16[1 + (i % 15)] }) +
        color.paint(` 0x${code.toString(16)}`, { color: '#a8a8a8' })
      );
    }),
  });

  // 3. .dur: a tiny movie in Durdraw's format (version 8, 16 colours): two frames of a blinking face.
  const face = (eyes) => ['  ___  ', ` (${eyes}) `, '  \\_/  '];
  const dur = {
    DurMovie: {
      formatVersion: 8,
      colorFormat: '16',
      framerate: 2,
      columns: 7,
      lines: 3,
      name: 'blink',
      artist: 'you',
      frames: [face('o o'), face('- -')].map((lines, i) => ({
        frameNumber: i + 1,
        delay: 0,
        contents: lines,
        colorMap: lines.map((line) => [...line].map(() => [11, 0])),
      })),
    },
  };

  // The same animation, from low level to high level. Pick the one that does what you need.
  // fromDur(data): parsed data → frames
  ThoughtStream.register({ name: 'sample_retro_converted', frames: retro.fromDur(dur) });

  // parseDur(source): read a file path, a URL, text or bytes → data
  retro.parseDur(dur).then((data) => {
    ThoughtStream.register({ name: 'sample_retro_parsed', frames: retro.fromDur(data) });
  });

  // loadDur(source): read, convert and describe: { frames, meta }
  retro.loadDur(dur).then(({ frames, meta }) => {
    const description = `${meta.name}, ${meta.frameCount} frames`;
    ThoughtStream.register({ name: 'sample_retro_loaded', description, frames });
  });

  // importDur(source, options): all of it, and registered. It returns a promise.
  ThoughtStream.importDur(dur, { name: 'sample_retro_imported' });

  // importArt(source, options): the same, for any format the engine reads (.dur, .bin, .ans…)
  ThoughtStream.importArt(dur, { name: 'sample_retro_art' });
});
