/**
 * SDK string: padding, cutting, wrapping and boxes
 *
 * ThoughtStream.SDK.string holds the text helpers that frames keep needing. Each plugin below uses one of
 * them, so you can see what it does to a piece of text.
 *
 * @summary Pad, cut, wrap and box text, and shrink a multi-line frame.
 * @covers string.* ThoughtStream.register field:name field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { string } = ThoughtStream.SDK;
  const count = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
  const add = (name, list, interval = 150) =>
    ThoughtStream.register({ name: 'sample_string_' + name, interval, frames: list });

  // One line of text...
  // center(text, width): pad both sides
  add('center', ['ready', 'set', 'go!'].map((word) => `[${string.center(word, 14)}]`), 600);
  // padLeft(text, width): pad the left side, so numbers line up
  add('pad_left', count(21, (i) => `Progress ${string.padLeft(i * 5 + '%', 4)}`));
  // truncate(text, maxLength): cut it short, with an ellipsis
  add('truncate', count(24, (i) => string.truncate('A sentence that gets cut short', i + 4)), 100);
  // fill(char, n): a character repeated n times
  add('fill', count(24, (i) => string.fill('=', i) + '>'), 60);

  // ...and several lines.
  const text = 'ThoughtStream turns a list of strings into a living line of text.';
  // wordWrap(text, width): an array of lines
  add('word_wrap', [18, 24, 32, 44].map((width) => string.wordWrap(text, width).join('\n')), 900);
  // box(text): a frame around it
  add('box', ['Hello', 'Hello, world', 'ThoughtStream'].map((label) => string.box(label)), 700);

  // scaleFrame(frame, maxColumns, maxRows): shrink a multi-line frame and keep its proportions
  const face = [
    '    ████████    ',
    '  ████████████  ',
    ' ██████████████ ',
    '████  ████  ████',
    '████████████████',
    ' ██  ██████  ██ ',
    '  ████    ████  ',
    '    ████████    ',
  ].join('\n');
  const sizes = [[16, 8], [12, 6], [8, 4], [6, 3]];
  add('scale_frame', sizes.map(([columns, rows]) => string.scaleFrame(face, columns, rows)), 700);
});
