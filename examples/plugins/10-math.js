/**
 * SDK math: smooth motion and a little chance
 *
 * ThoughtStream.SDK.math holds the small helpers animations keep needing: blending numbers, easing, waves,
 * noise and random picks. Most plugins below turn a number between 0 and 1 into a bar, so you can see it.
 *
 * @summary Easing, waves, noise and random picks for smooth motion.
 * @covers math.* ThoughtStream.register field:name field:interval field:frames
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { math } = ThoughtStream.SDK;
  // A number from 0 to 1 as a bar 24 characters wide
  const bar = (v) => '█'.repeat(Math.round(v * 24)).padEnd(24, '░');
  // `count` frames; t goes from 0 to 1 and i counts 0, 1, 2…
  const run = (count, fn) => Array.from({ length: count }, (_, i) => fn(i / (count - 1), i));
  const add = (name, list, interval = 50) =>
    ThoughtStream.register({ name: 'sample_math_' + name, interval, frames: list });

  // lerp(a, b, t): the number t of the way from a to b
  add('lerp', run(30, (t) => bar(math.lerp(0.1, 0.9, t))));
  // clamp(x, min, max): never outside the limits
  add('clamp', run(30, (t) => bar(math.clamp(t, 0.25, 0.75))));
  // map(x, inMin, inMax, outMin, outMax): here 0 → 1 becomes 1 → 0
  add('map', run(30, (t) => bar(math.map(t, 0, 1, 1, 0))));
  // linspace(n): n evenly spaced numbers from 0 to 1
  add('linspace', math.linspace(30).map(bar));
  // easeIn starts slow, easeOut ends slow, easeInOut does both
  add('ease_in', run(30, (t) => bar(math.easeIn(t))));
  add('ease_out', run(30, (t) => bar(math.easeOut(t))));
  add('ease_in_out', run(30, (t) => bar(math.easeInOut(t))));
  // sinWave(step, steps, cycles): 0 to 1 and back, `cycles` times over `steps` frames
  add('sin_wave', run(48, (t, i) => bar(math.sinWave(i, 48, 2))));
  // noise2D(x, y): smooth random numbers from -1 to 1
  add('noise2d', run(60, (t, i) => bar((math.noise2D(i * 0.12, 0) + 1) / 2)), 70);

  // Chance: the frames are different every time the plugin starts.
  // randInt(min, max): a whole number, both ends included
  add('rand_int', run(16, () => `You rolled a ${math.randInt(1, 6)}`), 150);
  // pick(list): one random element
  add('pick', run(16, () => math.pick(['◜', '◝', '◞', '◟']).repeat(3)), 120);
  // shuffle(list): a new, mixed list
  add('shuffle', run(16, () => math.shuffle(['A', 'B', 'C', 'D']).join(' ')), 150);
});
