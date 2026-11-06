/**
 * Generated frames and parameters
 *
 * `frames` can be a function. The engine calls it when the stream starts and passes it the parameters of
 * `start()`. Give `opts` a default value: tools such as ThoughtStream.info() call the function with nothing.
 *
 * @summary Build the frames with a function and take parameters from `start()`.
 * @covers ThoughtStream.register field:name field:interval field:frames field:options field:cache
 * @covers frame:function
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  ThoughtStream.register({
    name: 'sample_generator_countdown',
    interval: 1000,
    // Documentation for people and tools; the engine does not check it
    options: {
      from: 'number: first value (default 5)',
      label: 'string: text before the number (default "T-minus")',
    },
    // Build the frames once, with the parameters of start(), instead of again at every loop
    cache: true,
    // opts: the parameters of start().
    // stream: the stream that started the plugin, or null when a tool such as info() asks for the frames.
    frames(opts = {}, stream) {
      const from = opts.from ?? 5;
      const label = opts.label ?? 'T-minus';
      return Array.from({ length: from + 1 }, (_, i) => `${label} ${from - i}`);
    },
  });

  // To play it with your own parameters:
  //   stream.start('sample_generator_countdown', { from: 3, label: 'Launch in' });
});
