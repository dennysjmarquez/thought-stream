# Examples

Readable plugins, one small file per idea. Find the one closest to what you want to build, copy it, and change it. The files in `dist/` are minified; these are the ones meant to be read.

Every function of the SDK, every field of a plugin and every kind of frame appears in at least one of the 20 files below.

## Try them

| Where | How |
| --- | --- |
| Terminal | `node examples/run.js` lists the plugins. `node examples/run.js 08` plays the plugins of example 08, `node examples/run.js sample_frames_spinner` plays one, and `--seconds 6` makes each last longer. |
| Browser | Open `examples/index.html` (double-click it; no server needed) and pick a plugin from the list. |

Both use the built engine in `dist/`, so run them from a clone of the repository. To try a file in your own project, run `npm install thought-stream` there and copy the file in.

## The examples

Start with 00 and 01; the rest can be read in any order.

| # | Example | What it shows | Covers |
| ---: | --- | --- | --- |
| 00 | [`00-template.js`](plugins/00-template.js) | The smallest plugin file: copy it and change the frames. | ThoughtStream: `register` · fields: `name` `frames` · frames: `string` |
| 01 | [`01-list.js`](plugins/01-list.js) | A plugin is a name and a list of frames; the other fields are optional. | ThoughtStream: `register` · fields: `name` `frames` `category` `description` `interval` `preview` · frames: `string` |
| 02 | [`02-timing.js`](plugins/02-timing.js) | Hold one frame longer, or change the speed of a single frame. | ThoughtStream: `register` · fields: `name` `interval` `frames` · frames: `string` `object` `interval` `pause` |
| 03 | [`03-generator.js`](plugins/03-generator.js) | Build the frames with a function and take parameters from `start()`. | ThoughtStream: `register` · fields: `name` `interval` `frames` `options` `cache` · frames: `function` |
| 04 | [`04-placeholders.js`](plugins/04-placeholders.js) | Leave `{slots}` in the frames and fill them while the animation runs. | ThoughtStream: `register` · fields: `name` `interval` `frames` `multitrack` · frames: `string` `object` `interval` `placeholder` |
| 05 | [`05-tracks.js`](plugins/05-tracks.js) | Several parts of one line, each at its own speed, changing in scenes. | ThoughtStream: `register` `compileTracks` · fields: `name` `interval` `template` `tracks` `scenes` `preview` |
| 06 | [`06-api.js`](plugins/06-api.js) | Give the plugin its own methods, such as `stream.plugin(name).setLevel(60)`. | ThoughtStream: `register` · fields: `name` `interval` `frames` `api` · frames: `placeholder` |
| 07 | [`07-registry.js`](plugins/07-registry.js) | Register many plugins, find them again and describe them without playing them. | ThoughtStream: `register` `registerAll` `use` `get` `has` `names` `randomName` `info` `listInfo` `getSnippets` `hasSnippets` · fields: `name` `category` `frames` `interval` `preview` |
| 08 | [`08-frames.js`](plugins/08-frames.js) | Ready-made frame lists: progress bars, typewriter, spinners, rain and more. | `frames.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` |
| 09 | [`09-chars.js`](plugins/09-chars.js) | Character sets that are already spinners: Braille, blocks, arrows, moons… | `chars.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` |
| 10 | [`10-math.js`](plugins/10-math.js) | Easing, waves, noise and random picks for smooth motion. | `math.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` |
| 11 | [`11-string.js`](plugins/11-string.js) | Pad, cut, wrap and box text, and shrink a multi-line frame. | `string.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` |
| 12 | [`12-color.js`](plugins/12-color.js) | Colour in the terminal and in the browser with one call. | `color.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` `defaultFg` |
| 13 | [`13-palette.js`](plugins/13-palette.js) | Colour ramps, Bayer dithering and Floyd–Steinberg dithering. | `palette.*` `dither.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` |
| 14 | [`14-events.js`](plugins/14-events.js) | A small message bus, so plugins and your app can talk to each other. | `events.*` · ThoughtStream: `register` · fields: `name` `interval` `frames` `preview` |
| 15 | [`15-braille.js`](plugins/15-braille.js) | Draw with Braille dots: three ways to fill a canvas. | `BrailleCanvas` `BrailleCanvas#*` · ThoughtStream: `register` · fields: `name` `interval` `cache` `frames` |
| 16 | [`16-block.js`](plugins/16-block.js) | Draw with coloured half-blocks, and turn a list of colours into a picture. | `BlockCanvas` `HalfBlockCanvas` `BlockCanvas#*` `fromPixels` · ThoughtStream: `register` · fields: `name` `interval` `cache` `frames` `fontScale` |
| 17 | [`17-diff.js`](plugins/17-diff.js) | Send a terminal only what changed since the last frame. | `DiffCanvas` `DiffCanvas#*` · ThoughtStream: `register` · fields: `name` `interval` `cache` `frames` |
| 18 | [`18-retro.js`](plugins/18-retro.js) | Read DOS `.BIN` art, CP437 text and Durdraw `.dur` animations. | `retro.*` · ThoughtStream: `importDur` `importArt` `register` · fields: `name` `description` `interval` `frames` |
| 19 | [`19-typescript.ts`](plugins/19-typescript.ts) | The same kind of plugin in TypeScript, checked by the package types. | ThoughtStream: `register` · fields: `name` `description` `interval` `options` `frames` · frames: `function` `string` `object` `pause` |

## How the files are built

- **The header** says what the file is about and which parts of the library it uses (`@covers`).
- **The wrapper**: the four lines on top and the last line of every `.js` file make it work in Node, in bundlers and in a browser `<script>`. With ES modules, drop it and write `import ThoughtStream from 'thought-stream'`.
- **The names**: a file called `07-registry.js` registers plugins called `sample_registry_…`, so they never collide with yours or with the catalog.
- **They are tested**: before each release every example is run against the engine that ships, the list of what it covers is checked against what it really calls, and every plugin it registers is played. If a file stops working, the release does not happen.

The full guide to writing a plugin is in the [README](https://github.com/dennysjmarquez/thought-stream#create-your-own-plugin).
