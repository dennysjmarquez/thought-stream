/**
 * SDK frames: ready-made lists of frames
 *
 * ThoughtStream.SDK.frames builds the lists you would otherwise type by hand. Every function returns an array
 * that goes straight into `frames`, and some take a list and return a new one, so you can combine them.
 *
 * @summary Ready-made frame lists: progress bars, typewriter, spinners, rain and more.
 * @covers frames.* ThoughtStream.register field:name field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { frames, chars } = ThoughtStream.SDK;
  const add = (name, list, interval = 80) =>
    ThoughtStream.register({ name: 'sample_frames_' + name, interval, frames: list });

  // Lists built from a few numbers or some text:
  add('progress_bar', frames.progressBar('Loading', 20, 30));          // progressBar(label, width, steps)
  add('typewriter', frames.typewriter('Hello, world', '▌', true), 90); // typewriter(text, cursor, erase)
  add('dot_reveal', frames.dotReveal('Thinking', 3), 350);             // dotReveal(text, maxDots)
  add('spinner', frames.spinner(chars.braille, ' Working'));           // spinner(characters, suffix)
  add('gradient_pulse', frames.gradientPulse(30, 40));                 // gradientPulse(width, steps)
  add('matrix_rain', frames.matrixRain(24, 5, 30), 100);               // matrixRain(columns, rows, steps)
  add('heartbeat', frames.heartbeat(30, 'ECG'), 100);                  // heartbeat(steps, label)

  // Functions that take lists of frames and return a new list:
  add('bounce', frames.bounce(chars.hbars));                           // forward, then backward
  add('reverse', frames.reverse(frames.progressBar('Unloading', 20, 30))); // backward
  add('repeat', frames.repeat(chars.geo, 4), 60);                      // every frame 4 times: slower
  add('sequence', frames.sequence(                                     // one list after another
    frames.typewriter('Loading', '▌'),
    frames.progressBar('Loading', 12, 12),
  ));
  add('hold', frames.sequence(frames.dotReveal('Saving', 3), frames.hold('✔ Saved', 8)), 250); // one frame, 8 times
  add('crossfade', frames.crossfade(                                   // two lists, interleaved
    frames.progressBar('A', 10, 8),
    frames.progressBar('B', 10, 8),
    8,
  ), 120);
});
