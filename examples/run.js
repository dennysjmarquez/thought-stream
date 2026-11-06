#!/usr/bin/env node
'use strict';
/**
 * Plays the example plugins in your terminal.
 *
 *   node examples/run.js                          list every plugin, grouped by example
 *   node examples/run.js 08                       play the plugins of example 08, one after the other
 *   node examples/run.js sample_frames_spinner    play one plugin
 *   node examples/run.js --all                    play all of them
 *   node examples/run.js 08 --seconds 6           how long each plugin plays (default 3)
 *
 * Run it from a clone of the repository (it uses the built engine in ../dist), or copy the examples folder into a
 * project where `npm install thought-stream` was run. Use a terminal at least 80 columns wide.
 */
const fs = require('fs');
const path = require('path');

let ThoughtStream;
try { ThoughtStream = require('thought-stream'); } catch (error) { ThoughtStream = require('../dist/thought-stream.js'); }

const folder = path.join(__dirname, 'plugins');
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const samples = fs.readdirSync(folder).filter((file) => /^\d\d-.+\.(js|ts)$/.test(file)).sort();

// 07-registry.js registers sample_registry_*, so the plugins of a file are the names that start with its topic.
const topic = (file) => 'sample_' + file.slice(3).replace(/\.\w+$/, '').replace(/-/g, '_');
const pluginsOf = (file) => ThoughtStream.names().filter((n) => n === topic(file) || n.startsWith(topic(file) + '_'));

function list() {
  console.log('Pick an example number, a plugin name or --all. For instance:  node examples/run.js 08\n');
  for (const file of samples) {
    const names = file.endsWith('.js') ? pluginsOf(file) : [];
    console.log(file);
    console.log(names.length ? '  ' + names.join('\n  ') : '  (TypeScript: copy it into your project)');
  }
}

// The {names} that a plugin leaves open: the runner fills them with a number that keeps changing.
function slotsOf(plugin) {
  const slots = new Set();
  for (const frame of Array.isArray(plugin.frames) ? plugin.frames : []) {
    const text = typeof frame === 'string' ? frame : frame.frame || frame.text || '';
    for (const match of text.matchAll(/\{([A-Za-z_][\w-]*)\}/g)) slots.add(match[1]);
  }
  return slots;
}

function play(name, seconds) {
  const file = samples.find((f) => f.endsWith('.js') && pluginsOf(f).includes(name));
  console.log(`\n▶ ${name}   (${file}, ${seconds} s)`);
  return new Promise((resolve) => {
    const interactive = process.stdout.isTTY;
    let height = 0;

    // A headless stream hands every frame to onFrame, and we draw it in place: back up to the first line of the
    // previous frame, wipe from there down, and write the new one. That also works for frames of several lines.
    const stream = new ThoughtStream(null, {
      onFrame(index, frame) {
        if (!interactive) { if (index === 0) console.log(frame); return; }
        if (height) process.stdout.write(`\x1b[${height - 1}A\r\x1b[J`);
        process.stdout.write(frame);
        height = frame.split('\n').length;
      },
    });

    const slots = slotsOf(ThoughtStream.get(name));
    let tick = 0;
    slots.forEach((slot) => stream.setTrack(slot, 0));
    stream.start(name);
    const counter = setInterval(() => slots.forEach((slot) => stream.setTrack(slot, (tick += 7) % 101)), 150);

    setTimeout(() => {
      clearInterval(counter);
      stream.destroy();
      if (interactive) process.stdout.write('\n');
      resolve();
    }, interactive ? seconds * 1000 : 50);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const at = args.indexOf('--seconds');
  const seconds = at >= 0 ? Number(args.splice(at, 2)[1]) || 3 : 3;

  samples.filter((f) => f.endsWith('.js')).forEach((file) => require(path.join(folder, file)));
  await wait(100);                                    // importDur() and friends finish in a moment

  const [what] = args;
  if (!what) return list();
  const queue = what === '--all' ? ThoughtStream.names().filter((n) => n.startsWith('sample_'))
    : /^\d+$/.test(what) ? pluginsOf(samples.find((f) => f.startsWith(what.padStart(2, '0') + '-')) || '')
    : ThoughtStream.has(what) ? [what] : [];
  if (!queue.length) { console.error(`Nothing to play for "${what}". Run the script without arguments to see the list.`); process.exitCode = 1; return; }

  // A cursor left hidden or a half-drawn frame would be a poor goodbye.
  process.on('SIGINT', () => { process.stdout.write('\n'); process.exit(130); });
  for (const name of queue) await play(name, seconds);
}

main();
