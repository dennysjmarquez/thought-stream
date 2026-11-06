/**
 * The smallest plugin file
 *
 * Copy this file, change the name and the frames, and you have your own plugin. The four lines on top and
 * the one at the bottom make it work in Node, in bundlers and in a browser <script>. Every file in this
 * folder starts and ends the same way.
 *
 * @summary The smallest plugin file: copy it and change the frames.
 * @covers ThoughtStream.register field:name field:frames frame:string
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  ThoughtStream.register({
    // How you start it: stream.start('sample_template_spinner')
    name: 'sample_template_spinner',
    // What it shows: one string per frame
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  });
});

// To play it:
//   const stream = new ThoughtStream(process.stdout);   // Node: draw in the terminal
//   const stream = new ThoughtStream('#out');           // browser: draw into <pre id="out"></pre>
//   stream.start('sample_template_spinner');
//
// With ES modules the file is shorter. Drop the wrapper and write:
//   import ThoughtStream from 'thought-stream';
//   ThoughtStream.register({ name: '…', frames: ['…'] });
