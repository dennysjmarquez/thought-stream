/**
 * A list of frames
 *
 * The plain form: an array of strings, shown one after another and then repeated. Only `name` and
 * `frames` are required; the other fields describe the plugin and set its speed.
 *
 * @summary A plugin is a name and a list of frames; the other fields are optional.
 * @covers ThoughtStream.register frame:string
 * @covers field:name field:frames field:category field:description field:interval field:preview
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  ThoughtStream.register({
    name: 'sample_list_quarters',
    // A group name: startRandom({ category: 'sample' }) picks from it
    category: 'sample',
    // One line, returned by ThoughtStream.info(name)
    description: 'A quarter-circle spinner.',
    // How long each frame stays on screen, in milliseconds
    interval: 120,
    // The frame drawn for people who turned motion off (see "Accessibility" in the README)
    preview: '◐',
    frames: ['◐', '◓', '◑', '◒'],
  });

  // A frame can have several lines: write \n inside the string, or use a template literal.
  ThoughtStream.register({
    name: 'sample_list_blink',
    interval: 500,
    frames: [
      ` ,___,\n (o,o)\n /)_)\n  " "`,
      ` ,___,\n (-,-)\n /)_)\n  " "`,
    ],
  });
});
