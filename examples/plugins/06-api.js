/**
 * Methods your plugin adds to the stream
 *
 * `api` gives a plugin its own controls. The app calls them as stream.plugin(name).method(...), and each
 * one receives the stream first, so it can change the animation while it runs.
 *
 * @summary Give the plugin its own methods, such as `stream.plugin(name).setLevel(60)`.
 * @covers ThoughtStream.register field:name field:interval field:frames field:api frame:placeholder
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const bar = (percent) => '█'.repeat(Math.round(percent / 10)).padEnd(10, '░') + ` ${percent}%`;

  ThoughtStream.register({
    name: 'sample_api_gauge',
    interval: 120,
    frames: spinner.map((s) => `${s} {level}`),
    api: {
      // A method that returns nothing hands the stream back, so calls can be chained:
      //   stream.plugin('sample_api_gauge').setLevel(60)
      setLevel(stream, percent) {
        stream.setTrack('level', bar(percent));
      },
      // A method can return a value instead:
      //   stream.plugin('sample_api_gauge').bar(30)   →   '███░░░░░░░ 30%'
      bar(stream, percent) {
        return bar(percent);
      },
    },
  });

  // A method named `setText` is special: stream.setText('…') calls it on the plugin that is playing.
});
