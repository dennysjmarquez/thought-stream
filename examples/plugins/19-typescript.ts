/**
 * A plugin written in TypeScript
 *
 * The package ships its own type definitions, so `ThoughtStream.PluginDefinition` checks your plugin while you
 * type it: a misspelt field, a frame that is not a string or an object, or a generator with the wrong parameters
 * is an error in your editor instead of a surprise at run time.
 *
 * @summary The same kind of plugin in TypeScript, checked by the package types.
 * @covers ThoughtStream.register field:name field:description field:interval field:options field:frames
 * @covers frame:function frame:string frame:object frame:pause
 */
import ThoughtStream from 'thought-stream';

// The parameters of start(), as your generator receives them.
interface CountdownOptions {
  from?: number;
  label?: string;
}

const countdown: ThoughtStream.PluginDefinition = {
  name: 'sample_typescript_countdown',
  description: 'A countdown with a start value and a label.',
  interval: 700,
  options: { from: 'number: first value (default 3)', label: 'string: text before the number' },
  frames(opts: CountdownOptions = {}): ThoughtStream.Frame[] {
    const from = opts.from ?? 3;
    const label = opts.label ?? 'Launch in';
    const numbers: ThoughtStream.Frame[] = [];
    for (let n = from; n > 0; n--) numbers.push(`${label} ${n}`);          // a frame can be a string...
    const liftoff: ThoughtStream.FrameObject = { frame: 'Liftoff!', pause: 1500 };  // ...or an object
    return [...numbers, liftoff];
  },
};

ThoughtStream.register(countdown);

// Your editor now rejects mistakes such as these:
//   ThoughtStream.register({ frames: ['a'] });                  // error: a plugin needs a name
//   ThoughtStream.register({ name: 'x', interval: '80' });       // error: interval is a number
//   const stream = new ThoughtStream(null, { loopp: true });     // error: unknown option
