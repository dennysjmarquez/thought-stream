/**
 * Placeholders you can update live
 *
 * Put {names} in the frames, then fill them while the animation runs with stream.setTrack(name, value).
 * Give a placeholder a value before start(), so that the raw {name} is never shown.
 *
 * @summary Leave `{slots}` in the frames and fill them while the animation runs.
 * @covers ThoughtStream.register field:name field:interval field:frames field:multitrack
 * @covers frame:string frame:object frame:interval frame:placeholder
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

  ThoughtStream.register({
    name: 'sample_placeholders_upload',
    interval: 90,
    frames: spinner.map((s) => `${s} Uploading {pct}%`),
  });

  // Placeholders also work inside frame objects, but then add `multitrack: false`. Otherwise the engine
  // takes the frames for a multitrack template (example 05) and warns about the unknown {label}.
  ThoughtStream.register({
    name: 'sample_placeholders_object',
    interval: 90,
    multitrack: false,
    frames: spinner.map((s) => ({ frame: `${s} {label}`, interval: 90 })),
  });

  // In your code:
  //   const stream = new ThoughtStream(process.stdout);
  //   stream.setTrack('pct', 0);                  // give it a value first...
  //   stream.start('sample_placeholders_upload');
  //   stream.setTrack('pct', 42);                 // ...then update it whenever you like
});
