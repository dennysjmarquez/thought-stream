/**
 * SDK color: colour in the terminal and in the browser
 *
 * `paint(text, options)` is the one to use: the same call colours text in a Node terminal and in the browser.
 * The other helpers are shortcuts for the terminal; anywhere else they return the text unchanged.
 *
 * @summary Colour in the terminal and in the browser with one call.
 * @covers color.* ThoughtStream.register field:name field:interval field:frames field:defaultFg
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { color } = ThoughtStream.SDK;
  const add = (name, list, interval = 500, extra = {}) =>
    ThoughtStream.register({ name: 'sample_color_' + name, interval, frames: list, ...extra });

  // paint(text, { color, bg, bold, dim, italic, underline, blink, invert })
  // Colours are '#rgb', '#rrggbb' or a basic name such as 'red'.
  add('paint', ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'].map(
    (name) => color.paint(`● ${name}`, { color: name, bold: true }),
  ));

  const mint = '#00ff88';
  add('paint_styles', [
    color.paint('bold', { color: mint, bold: true }),
    color.paint('dim', { color: mint, dim: true }),
    color.paint('italic', { color: mint, italic: true }),
    color.paint('underline', { color: mint, underline: true }),
    color.paint('blink', { color: mint, blink: true }),
    color.paint('invert', { color: mint, invert: true }),
    color.paint(' on a background ', { color: '#000000', bg: '#c89c16' }),
  ], 800);

  // Shortcuts for the terminal. Each one returns plain text when the output is not a terminal.
  add('shortcuts', [
    color.green('green'), color.cyan('cyan'), color.yellow('yellow'), color.red('red'),
    color.magenta('magenta'), color.blue('blue'), color.white('white'),
  ]);
  // bold and dim change the weight and keep the colour the terminal already uses
  add('weight', [color.bold('bold'), color.dim('dim')], 700);
  // The library's own favourite colours
  add('themes', [color.neon('neon'), color.amber('amber'), color.synthwave('synthwave')], 700);
  // ansi(code, text): any SGR code, or several joined with semicolons
  add('ansi', [
    color.ansi('1;4;36', 'bold, underlined, cyan'),
    color.ansi('7;33', 'inverted yellow'),
    color.ansi('3;35', 'italic magenta'),
  ], 700);
  // fg256(n, text): one of the 256 terminal colours
  add('fg256', Array.from({ length: 36 }, (_, i) => color.fg256(16 + i, '████████')), 60);

  // Plain glyphs in a frame that also has colour take the terminal's own colour.
  // `defaultFg` (0 to 255) gives them one.
  add('default_fg', ['red', 'green'].map(
    (name) => `${color.paint('●', { color: name })} plain text`,
  ), 700, { defaultFg: 248 });
});
