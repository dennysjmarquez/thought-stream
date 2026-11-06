/**
 * Several things moving at different speeds on one line
 *
 * Describe the line as a `template` with {slots}. Each slot is a track with its own rhythm, and `scenes`
 * change the line as time goes by. When you register it, the engine turns all of it into ordinary frames.
 * Every kind of track and every option is in docs/multitrack.md.
 *
 * @summary Several parts of one line, each at its own speed, changing in scenes.
 * @covers ThoughtStream.register ThoughtStream.compileTracks
 * @covers field:name field:interval field:template field:tracks field:scenes field:preview
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const deploy = {
    name: 'sample_tracks_deploy',
    // One tick of the clock, in milliseconds
    interval: 50,
    template: '{spin} Deploying {pct}%  {hash}',
    tracks: {
      // A loop of frames
      spin: { frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], interval: 80 },
      // A number that counts
      pct: { type: 'counter', from: 0, to: 100, step: 1, interval: 60 },
      // Characters that scramble
      hash: { type: 'burst', length: 6, chars: '0123456789abcdef' },
    },
    scenes: [
      // The tracks run for 6 seconds...
      { duration: 6000 },
      // ...then this closing scene holds for 1.5 seconds
      { pause: 1500, tracks: { spin: '✔', pct: 100, hash: 'done' } },
    ],
  };

  // compileTracks() shows the frames the engine builds, without registering anything.
  // Here its last frame becomes the plugin's `preview`.
  const compiled = ThoughtStream.compileTracks(deploy);

  ThoughtStream.register({ ...deploy, preview: compiled[compiled.length - 1].frame });
});
