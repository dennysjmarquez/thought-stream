/**
 * Registering, finding and describing plugins
 *
 * The engine can register several plugins at once, find them again and describe them without playing them.
 * The plugin below shows what each of those calls returns.
 *
 * @summary Register many plugins, find them again and describe them without playing them.
 * @covers ThoughtStream.register ThoughtStream.registerAll ThoughtStream.use ThoughtStream.get
 * @covers ThoughtStream.has ThoughtStream.names ThoughtStream.randomName ThoughtStream.info ThoughtStream.listInfo
 * @covers ThoughtStream.getSnippets ThoughtStream.hasSnippets
 * @covers field:name field:category field:frames field:interval field:preview
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) factory(require('thought-stream'));
  else factory(root.ThoughtStream);
})(typeof self !== 'undefined' ? self : this, function (ThoughtStream) {
  // registerAll() takes an array, or an object whose values are plugins.
  ThoughtStream.registerAll([
    { name: 'sample_registry_one', category: 'sample', frames: ['1'] },
    { name: 'sample_registry_two', category: 'sample', frames: ['2', '2'] },
  ]);

  // use() is register() under another name; it reads well when a file exports its plugin.
  ThoughtStream.use({ name: 'sample_registry_three', category: 'sample', frames: ['3', '3', '3'] });

  ThoughtStream.register({
    name: 'sample_registry_report',
    interval: 1800,
    // info() and listInfo() run a generator to measure it, unless the plugin has a `preview`.
    // This generator calls listInfo() itself, so without a preview it would call itself for ever.
    preview: 'names() · randomName() · has() · get() · info() · listInfo() · getSnippets()',
    frames() {
      const two = 'sample_registry_two';
      const ours = (name) => name.startsWith('sample_registry_');
      const info = ThoughtStream.info(two);
      return [
        `names(): ${ThoughtStream.names().filter(ours).length} names start with sample_registry_`,
        `randomName(): any registered name, such as "${ThoughtStream.randomName()}"`,
        `has('${two}'): ${ThoughtStream.has(two)}`,
        `get('${two}'): the plugin, with ${ThoughtStream.get(two).frames.length} frames`,
        `info('${two}'): category "${info.category}", ${info.frames} frames`,
        `listInfo(): ${ThoughtStream.listInfo().filter((item) => ours(item.name)).length} of its entries are ours`,
        `hasSnippets('${two}'): ${ThoughtStream.hasSnippets(two)}`,
        `getSnippets('${two}'): ${Object.keys(ThoughtStream.getSnippets(two)).slice(4).join(', ')}`,
      ];
    },
  });
});
