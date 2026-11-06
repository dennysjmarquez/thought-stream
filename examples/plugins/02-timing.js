/**
 * Frames that change speed
 *
 * A frame can be an object: `frame` is the text, and `interval` or `pause` sets how long that one frame
 * stays on screen. Every other frame uses the plugin's `interval`.
 *
 * Those per-frame times are the rhythm of the piece; the speed of the stream (`setSpeed`, `start(name, { speed })`)
 * multiplies them all, so `setSpeed(200)` plays this plugin at half speed: 200 ms per frame, 600 ms for the slow one
 * and 3 s for the last hold.
 *
 * @summary Hold one frame longer, or change the speed of a single frame.
 * @covers ThoughtStream.register field:name field:interval field:frames
 * @covers frame:string frame:object frame:interval frame:pause
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  ThoughtStream.register({
    name: 'sample_timing_upload',
    // The default: every frame stays 100 ms
    interval: 100,
    frames: [
      '[          ]',
      '[###       ]',
      '[######    ]',
      // This one stays 300 ms: slow down near the end
      { frame: '[#########]', interval: 300 },
      // Hold this one 1.5 s before the animation starts again
      { frame: '[##########] done', pause: 1500 },
    ],
  });

  // Careful: a frame that follows a shorter one is held a little longer than you asked for (see
  // "The timing model" in the README). When the hold must be exact, repeat the frame instead:
  const hold = (frame, count) => Array(count).fill(frame);

  ThoughtStream.register({
    name: 'sample_timing_exact',
    interval: 100,
    // 15 identical frames × 100 ms = exactly 1.5 s
    frames: ['[          ]', '[###       ]', '[######    ]', ...hold('[##########] done', 15)],
  });
});
