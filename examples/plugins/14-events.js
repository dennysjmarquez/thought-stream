/**
 * SDK events: a small message bus
 *
 * `events` lets plugins, and your app, talk without knowing each other: one side emits an event and every
 * listener gets it. The plugin below plays a short story with all five calls and shows what was heard.
 *
 * @summary A small message bus, so plugins and your app can talk to each other.
 * @covers events.* ThoughtStream.register field:name field:interval field:frames field:preview
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  const { events } = ThoughtStream.SDK;

  ThoughtStream.register({
    name: 'sample_events_story',
    preview: 'on · once · emit · off · clear',
    interval: 900,
    frames() {
      const story = [];
      const note = (line) => story.push(line);
      const hello = (name) => note(`   heard: hello, ${name}`);

      note('on("greet", hello)  and  once("greet", first)');
      // on(event, listener): keeps listening (and returns a function that stops it)
      events.on('greet', hello);
      // once(event, listener): listens for the first event only
      events.once('greet', (name) => note(`   heard first: ${name}`));

      // emit(event, data): calls every listener
      note('emit("greet", "Ada")');
      events.emit('greet', 'Ada');
      note('emit("greet", "Grace")');
      events.emit('greet', 'Grace');

      // off(event, listener): removes one listener
      note('off("greet", hello)');
      events.off('greet', hello);
      note('emit("greet", "Linus")  (nobody is listening)');
      events.emit('greet', 'Linus');

      // clear(event): removes every listener of an event
      note('on(...), then clear("greet")');
      events.on('greet', hello);
      events.clear('greet');
      note('emit("greet", "Margaret")  (nobody is listening)');
      events.emit('greet', 'Margaret');

      return story;
    },
  });
});
