#!/usr/bin/env node
/**
 * ThoughtStream CLI — Interactive Terminal Dashboard & Animation Runner
 *
 * Runs text, ASCII, and Unicode animations for AI agents, modern CLIs,
 * and web applications directly in the terminal without installing dependencies.
 *
 * Usage:
 *   npx thought-stream
 *   npx thought-stream play tree_of_thought_mcts
 *   npx thought-stream list ai-models
 *   npx thought-stream info mcp_handshake
 *   npx thought-stream random
 */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ── 1. Locate engine & plugin catalog ──────────────────────────
const ROOT = path.resolve(__dirname, '..');

function resolveEngine() {
  const candidates = [
    path.join(ROOT, 'index.js'),
    path.join(ROOT, 'thought-stream.js'),
    path.join(ROOT, 'dist', 'thought-stream.js')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error('ThoughtStream engine not found at ' + candidates.join(' or '));
}

function resolvePluginBundle() {
  const candidates = [
    path.join(ROOT, 'plugins', 'all.js'),
    path.join(ROOT, 'dist', 'plugins', 'all.js')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const enginePath = resolveEngine();
const ThoughtStream = require(enginePath);
const bundlePath = resolvePluginBundle();

if (bundlePath) {
  try {
    require(bundlePath);
  } catch (e) {
    // Fail silently, individual plugins can still be resolved on demand
  }
}

// Ensure catalog is populated; if not, scan catalog directory
function ensureCatalog() {
  if (ThoughtStream.names && ThoughtStream.names().length > 0) return;
  const catalogDirs = [
    path.join(ROOT, 'dist', 'plugins', 'catalog'),
    path.join(ROOT, 'plugins', 'catalog')
  ];
  for (const d of catalogDirs) {
    if (fs.existsSync(d)) {
      const files = fs.readdirSync(d).filter(f => f.endsWith('.js'));
      for (const f of files) {
        try { require(path.join(d, f)); } catch (e) {}
      }
      break;
    }
  }
}

function getAllPlugins() {
  ensureCatalog();
  const names = ThoughtStream.names ? ThoughtStream.names() : [];
  const list = [];
  for (let i = 0; i < names.length; i++) {
    const p = ThoughtStream.get(names[i]);
    if (p) list.push(p);
  }
  return list;
}

// ── 2. Argument Parsing ────────────────────────────────────────
const argv = process.argv.slice(2);
const options = {};
const positional = [];

for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg === '-h' || arg === '--help') {
    options.help = true;
  } else if (arg === '-v' || arg === '--version') {
    options.version = true;
  } else if (arg === '--once') {
    options.once = true;
  } else if (arg === '--json') {
    options.json = true;
  } else if (arg.startsWith('--speed=')) {
    options.speed = Number(arg.slice(8));
  } else if (arg === '-s' && argv[i + 1]) {
    options.speed = Number(argv[++i]);
  } else if (arg.startsWith('--category=')) {
    options.category = arg.slice(11);
  } else if (arg === '-c' && argv[i + 1]) {
    options.category = argv[++i];
  } else if (arg.startsWith('--text=')) {
    options.text = arg.slice(7);
  } else if (arg === '-t' && argv[i + 1]) {
    options.text = argv[++i];
  } else if (arg.startsWith('--loop=')) {
    options.loop = Number(arg.slice(7));
  } else if (arg.startsWith('--')) {
    const eq = arg.indexOf('=');
    if (eq !== -1) {
      options[arg.slice(2, eq)] = arg.slice(eq + 1);
    } else {
      options[arg.slice(2)] = true;
    }
  } else {
    positional.push(arg);
  }
}

// ── 3. CLI Static Output ───────────────────────────────────────

function getPublicVersion() {
  try {
    const lvPath = path.join(__dirname, '..', 'internal', 'config', 'last-version.json');
    if (fs.existsSync(lvPath)) {
      const lv = JSON.parse(fs.readFileSync(lvPath, 'utf8'));
      if (lv && lv.version) return lv.version;
    }
  } catch (e) {}
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg && pkg.version && !pkg.version.endsWith('-dev') && pkg.version !== '0.0.0') {
        return pkg.version;
      }
    }
  } catch (e) {}
  return '1.1.0';
}

function printHeader() {
  const v = getPublicVersion();
  console.log('\x1b[1m\x1b[36m⚡ ThoughtStream\x1b[0m \x1b[90mv' + v + '\x1b[0m — \x1b[1mThe zero-dependency animation runtime\x1b[0m');
  console.log('\x1b[90m   From retro MS-DOS & BBS to AI agents & modern CLIs · Zero dependencies · Terminal & Browser\x1b[0m\n');
}

function showHelp() {
  printHeader();
  console.log('\x1b[1mUsage:\x1b[0m');
  console.log('  npx thought-stream [command] [plugin] [options]\n');
  console.log('\x1b[1mCommands:\x1b[0m');
  console.log('  \x1b[32mplay <plugin>\x1b[0m        Play an animation in the terminal (default if plugin given)');
  console.log('  \x1b[32mlist [category]\x1b[0m      List available plugins (e.g. list ai-models)');
  console.log('  \x1b[32minfo <plugin>\x1b[0m        Show metadata, options, and code snippets for a plugin');
  console.log('  \x1b[32mrandom\x1b[0m               Play a randomly selected plugin');
  console.log('  \x1b[32mcategories\x1b[0m           List all plugin categories and counts\n');
  console.log('\x1b[1mOptions:\x1b[0m');
  console.log('  -s, --speed <ms>     Override frame interval speed in milliseconds');
  console.log('  -t, --text <str>     Custom task text / prompt parameter');
  console.log('  -c, --category <cat> Filter list or random selection by category');
  console.log('  --once               Play one full iteration cycle and exit cleanly');
  console.log('  --loop <n>           Run exactly n animation loops');
  console.log('  -v, --version        Print version');
  console.log('  -h, --help           Show this help manual\n');
  console.log('\x1b[1mExamples:\x1b[0m');
  console.log('  npx thought-stream tree_of_thought_mcts');
  console.log('  npx thought-stream play mcp_handshake --speed=100');
  console.log('  npx thought-stream list ai-models');
  console.log('  npx thought-stream                   # Launch interactive terminal browser\n');
}

function showVersion() {
  console.log('thought-stream v' + getPublicVersion());
}

function normalizePluginName(name) {
  if (!name) return null;
  name = name.replace(/\.js$/, '');
  ensureCatalog();
  if (ThoughtStream.has(name)) return name;
  const under = name.replace(/-/g, '_');
  if (ThoughtStream.has(under)) return under;
  const dash = name.replace(/_/g, '-');
  if (ThoughtStream.has(dash)) return dash;
  return name;
}

function playPlugin(rawName, opts) {
  ensureCatalog();
  const name = normalizePluginName(rawName);

  if (!ThoughtStream.has(name)) {
    console.error('\x1b[31m[error] Plugin not found:\x1b[0m ' + rawName);
    console.log('\x1b[90mRun `npx thought-stream list` to see all available plugins.\x1b[0m');
    process.exit(1);
  }

  const p = ThoughtStream.get(name);
  const speed = opts.speed || p.interval || 100;

  console.log('\x1b[36m⚡ ThoughtStream Play:\x1b[0m \x1b[1m' + p.name + '\x1b[0m \x1b[90m[' + (p.category || 'general') + ']\x1b[0m (' + speed + 'ms/frame)');
  console.log('\x1b[90mPress Ctrl+C to exit\x1b[0m\n');

  if (process.stdout.isTTY) {
    process.stdout.write('\x1b[?25l');
  }

  const cleanup = function () {
    try {
      if (process.stdout.isTTY) process.stdout.write('\x1b[?25h\n');
    } catch (e) {}
  };

  process.once('exit', cleanup);
  process.once('SIGINT', function () {
    cleanup();
    process.exit(0);
  });
  process.once('SIGTERM', function () {
    cleanup();
    process.exit(0);
  });

  const stream = new ThoughtStream(process.stdout, { speed: speed });
  const pluginOptions = Object.assign({}, opts);
  delete pluginOptions.speed;
  delete pluginOptions.once;
  delete pluginOptions.loop;

  if (opts.once) {
    const frames = typeof p.frames === 'function' ? p.frames(pluginOptions) : (p.frames || []);
    let totalDuration = 0;
    for (let f of frames) {
      totalDuration += (typeof f === 'object' && f.delay) ? f.delay : speed;
    }
    stream.start(name, pluginOptions);
    setTimeout(function () {
      stream.destroy();
      cleanup();
      process.exit(0);
    }, Math.max(totalDuration, 500));
  } else {
    stream.start(name, pluginOptions);
  }
}

function formatCategory(cat) {
  if (Array.isArray(cat)) return cat.join(', ');
  return String(cat || 'general');
}

function matchesPlugin(p, query) {
  if (!p) return false;
  if (!query) return true;
  const q = String(query).toLowerCase().trim();
  if (!q) return true;

  const rawName = String(p.name || '').toLowerCase();
  const desc = String(p.description || '').toLowerCase();
  const cat = Array.isArray(p.category) ? p.category.join(' ').toLowerCase() : String(p.category || '').toLowerCase();

  // 1. Substring search anywhere in the name, description, or category
  if (rawName.includes(q) || desc.includes(q) || cat.includes(q)) return true;

  // 2. Normalize dashes / underscores / spaces (e.g. "tree of thought" matches "tree_of_thought_mcts")
  const normName = rawName.replace(/[-_]/g, ' ');
  const normQ = q.replace(/[-_]/g, ' ');
  if (normName.includes(normQ)) return true;

  // 3. Multi-word search (all terms must appear)
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const haystack = rawName + ' ' + desc + ' ' + cat;
    if (words.every(w => haystack.includes(w))) return true;
  }

  return false;
}

function listCategories() {
  ensureCatalog();
  const names = ThoughtStream.names();
  const catMap = {};
  for (const n of names) {
    const p = ThoughtStream.get(n);
    if (!p) continue;
    const cats = Array.isArray(p.category) ? p.category : [String(p.category || 'general')];
    for (const c of cats) {
      catMap[c] = (catMap[c] || 0) + 1;
    }
  }
  printHeader();
  console.log('\x1b[1mAvailable Categories:\x1b[0m\n');
  const sorted = Object.keys(catMap).sort((a, b) => {
    if (a === 'ai-models') return -1;
    if (b === 'ai-models') return 1;
    return catMap[b] - catMap[a];
  });
  for (const cat of sorted) {
    const isAi = cat === 'ai-models';
    const tag = isAi ? '\x1b[1m\x1b[36m' : '\x1b[32m';
    console.log('  ' + tag + cat.padEnd(20) + '\x1b[0m \x1b[90m(' + catMap[cat] + ' plugins)\x1b[0m' + (isAi ? '  ★ FEATURED' : ''));
  }
  console.log('\n\x1b[90mRun `npx thought-stream list <category>` to view plugins inside a category.\x1b[0m\n');
}

function listPlugins(categoryFilter) {
  ensureCatalog();
  const names = ThoughtStream.names();
  let filter = String(categoryFilter || '').toLowerCase().trim();
  if (filter === 'ai') filter = 'ai-models';

  const matched = [];
  for (const n of names) {
    const p = ThoughtStream.get(n);
    if (!p) continue;
    if (matchesPlugin(p, filter)) {
      matched.push(p);
    }
  }

  printHeader();
  if (filter) {
    console.log('\x1b[1mPlugins matching "\x1b[36m' + filter + '\x1b[0m":\x1b[0m (' + matched.length + ' found)\n');
  } else {
    console.log('\x1b[1mAll Catalog Plugins:\x1b[0m (' + matched.length + ' total)\n');
  }

  if (matched.length === 0) {
    console.log('\x1b[33mNo plugins found matching that filter.\x1b[0m');
    console.log('\x1b[90mRun `npx thought-stream categories` to see valid category names.\x1b[0m\n');
    return;
  }

  for (const p of matched) {
    const isAi = p.category && String(formatCategory(p.category)).includes('ai-models');
    const nameColor = isAi ? '\x1b[1m\x1b[36m' : '\x1b[1m';
    const desc = p.description || '(no description)';
    console.log('  ' + nameColor + p.name.padEnd(28) + '\x1b[0m \x1b[90m[' + formatCategory(p.category) + ']\x1b[0m ' + desc);
  }

  console.log('\n\x1b[90mTo play any animation: \x1b[36mnpx thought-stream <plugin-name>\x1b[0m\n');
}

function showInfo(rawName) {
  ensureCatalog();
  const name = normalizePluginName(rawName);

  if (!ThoughtStream.has(name)) {
    console.error('\x1b[31m[error] Plugin not found:\x1b[0m ' + rawName);
    process.exit(1);
  }

  const p = ThoughtStream.get(name);
  const snippets = ThoughtStream.getSnippets ? ThoughtStream.getSnippets(name) : null;
  const frames = typeof p.frames === 'function' ? p.frames() : (p.frames || []);

  printHeader();
  console.log('\x1b[1mPlugin:\x1b[0m       \x1b[36m' + p.name + '\x1b[0m');
  console.log('\x1b[1mCategory:\x1b[0m     ' + (p.category || 'general'));
  console.log('\x1b[1mInterval:\x1b[0m     ' + (p.interval || 100) + ' ms');
  console.log('\x1b[1mFrames:\x1b[0m       ' + frames.length + ' frames');
  if (p.description) {
    console.log('\x1b[1mDescription:\x1b[0m  ' + p.description);
  }

  if (p.options && Object.keys(p.options).length > 0) {
    console.log('\n\x1b[1mConfigurable Options:\x1b[0m');
    for (const [k, v] of Object.entries(p.options)) {
      console.log('  \x1b[32m' + k.padEnd(16) + '\x1b[0m ' + v);
    }
  }

  if (snippets && snippets.nodejs) {
    console.log('\n\x1b[1mNode.js Usage:\x1b[0m');
    console.log('\x1b[90m' + snippets.nodejs.trim() + '\x1b[0m');
  }

  console.log('\n\x1b[90mRun in terminal now: \x1b[36mnpx thought-stream ' + p.name + '\x1b[0m\n');
}

function randomPlugin(categoryFilter) {
  ensureCatalog();
  let names = ThoughtStream.names();
  if (categoryFilter) {
    names = names.filter(n => {
      const p = ThoughtStream.get(n);
      return p && p.category && p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    });
  }
  if (!names.length) {
    console.error('\x1b[31mNo plugins found for random selection.\x1b[0m');
    process.exit(1);
  }
  const chosen = names[Math.floor(Math.random() * names.length)];
  playPlugin(chosen, options);
}

// ── 4. Interactive Terminal Dashboard (TUI) ────────────────────

function clearTerminal() {
  process.stdout.write('\x1b[2J\x1b[3J\x1b[H');
}

function runSelectMenu(title, items, callback, onCancel) {
  if (!process.stdin.isTTY) {
    showHelp();
    return;
  }

  let selected = 0;
  try {
    process.stdin.resume();
  } catch (e) {}
  readline.emitKeypressEvents(process.stdin);
  try {
    process.stdin.setRawMode(true);
  } catch (e) {
    showHelp();
    return;
  }

  process.stdout.write('\x1b[?25l'); // Hide cursor

  let lastLineCount = 0;

  function render(first) {
    if (!first && lastLineCount > 0) {
      process.stdout.write('\x1b[' + lastLineCount + 'A\r');
    }
    let out = '\x1b[1m\x1b[36m? ' + title + '\x1b[0m \x1b[90m(↑/↓ to navigate, Enter to select, Esc to go back)\x1b[0m\x1b[K\n';
    for (let i = 0; i < items.length; i++) {
      const isSel = i === selected;
      const prefix = isSel ? '  \x1b[36m❯\x1b[0m \x1b[1m\x1b[32m' : '    \x1b[90m';
      const suffix = '\x1b[0m\x1b[K\n';
      out += prefix + items[i].label + suffix;
    }
    process.stdout.write(out);
    lastLineCount = items.length + 1;
  }

  render(true);

  function cleanup() {
    process.stdout.write('\x1b[?25h'); // Restore cursor
    try {
      if (process.stdin.isTTY) process.stdin.setRawMode(false);
    } catch (e) {}
    process.stdin.removeListener('keypress', onKey);
  }

  function onKey(ch, key) {
    if (!key) return;
    if (key.ctrl && key.name === 'c') {
      cleanup();
      process.stdout.write('\n');
      process.exit(0);
    }
    if (key.name === 'escape') {
      cleanup();
      process.stdout.write('\n');
      if (typeof onCancel === 'function') {
        onCancel();
      } else {
        process.exit(0);
      }
      return;
    }
    if (key.name === 'up') {
      selected = (selected - 1 + items.length) % items.length;
      render(false);
    } else if (key.name === 'down') {
      selected = (selected + 1) % items.length;
      render(false);
    } else if (key.name === 'return' || key.name === 'enter') {
      cleanup();
      process.stdout.write('\n');
      callback(items[selected]);
    }
  }

  process.stdin.on('keypress', onKey);
}

// ── 4.1 Interactive Animation Player — preview.js-identical tick loop ──
//
// Uses the EXACT same scaleAnsiFrame + setTimeout tick as scripts/preview.js.
// Does NOT use ThoughtStream.prototype.start() to avoid engine rewind collisions
// on multi-line / canvas animations (twilight_fjord, tux_pizza, etc.).

function playInteractive(name, onReturn) {
  clearTerminal();
  const p = ThoughtStream.get(name);
  if (!p) {
    onReturn();
    return;
  }

  const baseInterval = options.speed || p.interval || 100;

  // ── Window title ──────────────────────────────────────────────
  function setTitle(paused) {
    if (!process.stdout.isTTY) return;
    process.stdout.write(paused
      ? '\x1b]0;⏸ PAUSED — ' + p.name + '\x07'
      : '\x1b]0;▶ ' + p.name + ' — ThoughtStream\x07');
  }

  // ── Header (printed once; controls bar is row 3) ──────────────
  const CTRL_PLAYING = '\x1b[33m[q / Esc]\x1b[0m Back to Dashboard  ·  \x1b[33m[r]\x1b[0m Restart  ·  \x1b[33m[Space]\x1b[0m Pause/Resume';
  const CTRL_PAUSED  = '\x1b[33m[q / Esc]\x1b[0m Back to Dashboard  ·  \x1b[33m[r]\x1b[0m Restart  ·  \x1b[32m\x1b[1m[Space] ⏸ PAUSED (Press Space to resume)\x1b[0m';

  // Header line 1 — plugin info + category + speed
  process.stdout.write(
    '\x1b[1m\x1b[36m⚡ ThoughtStream Live:\x1b[0m \x1b[1m' + p.name + '\x1b[0m' +
    ' \x1b[90m[' + (Array.isArray(p.category) ? p.category.join(',') : (p.category || 'general')) + ']\x1b[0m' +
    ' (' + baseInterval + 'ms/frame)\n'
  );
  // Header line 2 — description truncated to one terminal line (no wrap = no offset drift)
  if (p.description) {
    const cols = (process.stdout.columns || 80) - 1;
    const desc = p.description.length > cols ? p.description.slice(0, cols - 1) + '…' : p.description;
    process.stdout.write('\x1b[90m' + desc + '\x1b[0m\n');
  }
  // Header line 3 (last) — controls bar; frame starts on the very next line
  process.stdout.write(CTRL_PLAYING + '\n');

  if (process.stdout.isTTY) process.stdout.write('\x1b[?25l');
  setTitle(false);

  // ── Frames ────────────────────────────────────────────────────
  let frames = typeof p.frames === 'function' ? p.frames(options) : (p.frames || []);
  if (!frames.length) {
    if (process.stdout.isTTY) process.stdout.write('\x1b[?25h\n');
    onReturn();
    return;
  }

  // ── State ─────────────────────────────────────────────────────
  let frameIdx    = 0;
  let lastLineCount = 0;
  let isPaused    = false;
  let runningTimer = null;

  // ── scaleAnsiFrame — verbatim copy from scripts/preview.js ────
  function scaleAnsiFrame(text, maxCols, maxRows) {
    if (!text) return '';
    const rawLines = text.split('\n');
    const srcH = rawLines.length;
    if (srcH === 0) return text;

    const grid = [];
    let maxW = 0;

    for (let y = 0; y < srcH; y++) {
      const line = rawLines[y];
      const row = [];
      let currentStyle = '';
      let inEsc = false;
      let escBuf = '';

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '\x1b') { inEsc = true; escBuf = ch; continue; }
        if (inEsc) {
          escBuf += ch;
          if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            inEsc = false;
            if (escBuf === '\x1b[0m') { currentStyle = ''; }
            else { currentStyle += escBuf; }
            escBuf = '';
          }
          continue;
        }
        if (ch === '\r') continue;
        let charToAdd = ch;
        const code = ch.charCodeAt(0);
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < line.length) {
          charToAdd += line[i + 1];
          i++;
        }
        row.push({ char: charToAdd, style: currentStyle });
      }
      grid.push(row);
      if (row.length > maxW) maxW = row.length;
    }

    if (maxW === 0) return text;

    const scaleX = maxCols / maxW;
    const scaleY = maxRows / srcH;
    const scale  = Math.min(scaleX, scaleY);

    // If it already fits, return raw (no color loss)
    if (scale >= 1.0) return text;

    const dstW = Math.max(1, Math.floor(maxW * scale));
    const dstH = Math.max(1, Math.floor(srcH * scale));
    const resultLines = [];

    for (let dy = 0; dy < dstH; dy++) {
      const sy     = Math.min(srcH - 1, Math.floor(dy / scale));
      const srcRow = grid[sy] || [];
      let lineOut  = '';
      let lastStyle = null;

      for (let dx = 0; dx < dstW; dx++) {
        const sx   = Math.min(srcRow.length - 1, Math.floor(dx / scale));
        const cell = (sx >= 0 && sx < srcRow.length) ? srcRow[sx] : { char: ' ', style: '' };
        if (cell.style !== lastStyle) {
          if (cell.style)      { lineOut += (lastStyle ? '\x1b[0m' : '') + cell.style; }
          else if (lastStyle)  { lineOut += '\x1b[0m'; }
          lastStyle = cell.style;
        }
        lineOut += cell.char;
      }
      if (lastStyle) lineOut += '\x1b[0m';
      resultLines.push(lineOut);
    }
    return resultLines.join('\n');
  }

  // ── Tick loop — verbatim logic from scripts/preview.js ────────
  function tick() {
    if (isPaused) return;

    const item  = frames[frameIdx];
    let text    = typeof item === 'string' ? item : (item && item.frame ? item.frame : '');
    let delay   = baseInterval;
    if (item && typeof item === 'object') {
      if (item.interval) delay = item.interval;
      if (item.pause)    delay = item.pause;
    }

    // Rewind cursor to top of previous frame
    if (lastLineCount > 1) {
      process.stdout.write('\x1b[' + (lastLineCount - 1) + 'A\r');
    }

    const curCols = (process.stdout.columns) || (process.env.COLUMNS ? parseInt(process.env.COLUMNS, 10) : 80);
    const curRows = (process.stdout.rows)    || (process.env.LINES   ? parseInt(process.env.LINES,   10) : 24);
    const maxCols = Math.max(20, curCols - 1);
    const maxRows = Math.max(6,  curRows - 4);   // 4 rows reserved for header

    const renderedText = scaleAnsiFrame(text, maxCols, maxRows);
    const lines = renderedText.split('\n');

    process.stdout.write(lines.map(l => '\r\x1b[K' + l).join('\n'));

    // Clear leftover lines from a taller previous frame
    if (lastLineCount > lines.length) {
      for (let i = lines.length; i < lastLineCount; i++) {
        process.stdout.write('\n\r\x1b[K');
      }
      process.stdout.write('\x1b[' + (lastLineCount - lines.length) + 'A\r');
    }

    lastLineCount = lines.length;

    frameIdx++;
    if (frameIdx >= frames.length) {
      frameIdx = 0;
      if (typeof p.frames === 'function' && !p.cache) {
        frames = p.frames(options);
      }
    }
    runningTimer = setTimeout(tick, delay);
  }

  // ── Keyboard handler ──────────────────────────────────────────
  function cleanupPlayer() {
    if (runningTimer) { clearTimeout(runningTimer); runningTimer = null; }
    setTitle(false);
    try {
      if (process.stdout.isTTY) process.stdout.write('\x1b[?25h\n');
      if (process.stdin.isTTY)  process.stdin.setRawMode(false);
    } catch (e) {}
    process.stdin.removeListener('keypress', onPlayerKey);
  }

  // Update the controls bar in-place.
  // The controls line sits immediately above the frame block:
  //   header line(s) ... controls ... [lastLineCount frame lines] ← cursor here
  // So we need to go up exactly lastLineCount lines to reach the controls line.
  function updateControlsBar(paused) {
    setTitle(paused);
    if (!process.stdout.isTTY || lastLineCount < 1) return;
    process.stdout.write(
      '\x1b[' + lastLineCount + 'A\r\x1b[K' +
      (paused ? CTRL_PAUSED : CTRL_PLAYING) +
      '\x1b[' + lastLineCount + 'B\r\x1b[?25l'
    );
  }

  function onPlayerKey(ch, key) {
    if (!key) return;
    if (key.ctrl && key.name === 'c') { cleanupPlayer(); process.exit(0); }

    if (key.name === 'escape' || ch === 'q' || ch === 'Q') {
      cleanupPlayer();
      onReturn();
      return;
    }
    if (ch === 'r' || ch === 'R') {
      cleanupPlayer();
      playInteractive(name, onReturn);
      return;
    }
    if (key.name === 'space') {
      isPaused = !isPaused;
      updateControlsBar(isPaused);
      if (!isPaused) {
        // Resume: restart tick
        runningTimer = setTimeout(tick, baseInterval);
      } else {
        // Pause: stop tick, keep cursor hidden
        if (runningTimer) { clearTimeout(runningTimer); runningTimer = null; }
        if (process.stdout.isTTY) process.stdout.write('\x1b[?25l');
      }
    }
  }

  try { process.stdin.resume(); } catch (e) {}
  readline.emitKeypressEvents(process.stdin);
  try { if (process.stdin.isTTY) process.stdin.setRawMode(true); } catch (e) {}
  process.stdin.on('keypress', onPlayerKey);

  // Kick off
  tick();
}

// ── 4.2 Paginated Plugin Explorer ──────────────────────────────

const PAGE_SIZE = 7;

function browsePaginatedPlugins(title, plugins, page, onBack) {
  clearTerminal();
  printHeader();

  const totalPages = Math.max(1, Math.ceil(plugins.length / PAGE_SIZE));
  const currentPage = Math.max(0, Math.min(page, totalPages - 1));
  const start = currentPage * PAGE_SIZE;
  const slice = plugins.slice(start, start + PAGE_SIZE);

  const menuTitle = title + ' \x1b[33m(Page ' + (currentPage + 1) + '/' + totalPages + ' · ' + plugins.length + ' items)\x1b[0m';
  const items = [];

  for (let i = 0; i < slice.length; i++) {
    const p = slice[i];
    const isAi = p.category && String(p.category).includes('ai-models');
    const badge = isAi ? '🧠 ' : '✨ ';
    const desc = p.description ? (' \x1b[90m— ' + p.description.slice(0, 42) + '...\x1b[0m') : '';
    items.push({
      id: p.name,
      type: 'plugin',
      label: badge + '\x1b[1m' + p.name.padEnd(24) + '\x1b[0m' + desc
    });
  }

  if (currentPage < totalPages - 1) {
    const remaining = plugins.length - (currentPage + 1) * PAGE_SIZE;
    items.push({
      id: '__next__',
      type: 'nav',
      label: '❯ Next Page (' + Math.min(PAGE_SIZE, remaining) + ' more...)'
    });
  }

  if (currentPage > 0) {
    items.push({
      id: '__prev__',
      type: 'nav',
      label: '❮ Previous Page'
    });
  }

  items.push({
    id: '__search__',
    type: 'nav',
    label: '🔍 Filter in these results'
  });

  items.push({
    id: '__back__',
    type: 'nav',
    label: '⬅ Back'
  });

  runSelectMenu(menuTitle, items, function (choice) {
    if (choice.id === '__next__') {
      browsePaginatedPlugins(title, plugins, currentPage + 1, onBack);
    } else if (choice.id === '__prev__') {
      browsePaginatedPlugins(title, plugins, currentPage - 1, onBack);
    } else if (choice.id === '__search__') {
      promptFilterQuery(title, plugins, onBack);
    } else if (choice.id === '__back__') {
      onBack();
    } else {
      // Play selected plugin
      playInteractive(choice.id, function () {
        browsePaginatedPlugins(title, plugins, currentPage, onBack);
      });
    }
  }, onBack);
}

function promptTextInput(promptText, onDone, onCancel) {
  clearTerminal();
  printHeader();

  process.stdout.write(promptText);
  if (process.stdout.isTTY) {
    process.stdout.write('\x1b[?25h'); // Show cursor for typing
  }

  try {
    process.stdin.resume();
  } catch (e) {}
  readline.emitKeypressEvents(process.stdin);
  try {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
  } catch (e) {}

  let buffer = '';

  function cleanupPrompt() {
    process.stdin.removeListener('keypress', onPromptKey);
    if (process.stdout.isTTY) {
      process.stdout.write('\x1b[?25l'); // Hide cursor for menus
    }
  }

  function onPromptKey(ch, key) {
    if (!key) return;

    if (key.ctrl && key.name === 'c') {
      cleanupPrompt();
      process.stdout.write('\x1b[?25h\n');
      process.exit(0);
    }

    if (key.name === 'escape') {
      cleanupPrompt();
      process.stdout.write('\n');
      if (typeof onCancel === 'function') onCancel();
      return;
    }

    if (key.name === 'return' || key.name === 'enter') {
      cleanupPrompt();
      process.stdout.write('\n');
      onDone(buffer.trim());
      return;
    }

    if (key.name === 'backspace') {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, -1);
        process.stdout.write('\r\x1b[K' + promptText + buffer);
      }
      return;
    }

    if (key.name === 'up' || key.name === 'down' || key.name === 'left' || key.name === 'right') {
      return;
    }

    if (!key.ctrl && !key.meta && ch && !/^(\x1b)/.test(ch)) {
      const clean = ch.replace(/[\x00-\x1f\x7f]/g, '');
      if (clean.length > 0) {
        buffer += clean;
        process.stdout.write(clean);
      }
    }
  }

  process.stdin.on('keypress', onPromptKey);
}

function promptFilterQuery(title, plugins, onBack) {
  const promptText = '\x1b[1m\x1b[36mEnter search keyword \x1b[90m(Esc to go back)\x1b[36m:\x1b[0m ';
  promptTextInput(promptText, function (q) {
    if (!q) {
      browsePaginatedPlugins(title, plugins, 0, onBack);
      return;
    }
    const filtered = plugins.filter(p => matchesPlugin(p, q));

    if (filtered.length === 0) {
      console.log('\n\x1b[33mNo animations matched "' + q + '".\x1b[0m');
      setTimeout(function () {
        browsePaginatedPlugins(title, plugins, 0, onBack);
      }, 1500);
    } else {
      browsePaginatedPlugins(title + ' [Filtered: "' + q + '"]', filtered, 0, function () {
        browsePaginatedPlugins(title, plugins, 0, onBack);
      });
    }
  }, function () {
    browsePaginatedPlugins(title, plugins, 0, onBack);
  });
}

function globalSearchInteractive(onBack) {
  const promptText = '\x1b[1m\x1b[36m🔍 Search (e.g. tree, mcp, rag, norton, matrix) \x1b[90m[Esc to cancel]\x1b[36m:\x1b[0m ';
  promptTextInput(promptText, function (q) {
    if (!q) {
      onBack();
      return;
    }

    const all = getAllPlugins();
    const filtered = all.filter(p => matchesPlugin(p, q));

    if (filtered.length === 0) {
      console.log('\n\x1b[33mNo animations matched "' + q + '".\x1b[0m');
      setTimeout(function () {
        globalSearchInteractive(onBack);
      }, 1500);
    } else {
      browsePaginatedPlugins('Search Results: "' + q + '"', filtered, 0, function () {
        globalSearchInteractive(onBack);
      });
    }
  }, onBack);
}

function browseCategoriesInteractive(onBack) {
  clearTerminal();
  printHeader();
  ensureCatalog();

  const names = ThoughtStream.names();
  const catMap = {};
  for (const n of names) {
    const p = ThoughtStream.get(n);
    if (!p) continue;
    const cats = Array.isArray(p.category) ? p.category : [String(p.category || 'general')];
    for (const c of cats) {
      catMap[c] = (catMap[c] || 0) + 1;
    }
  }

  const sorted = Object.keys(catMap).sort((a, b) => {
    if (a === 'ai-models') return -1;
    if (b === 'ai-models') return 1;
    return catMap[b] - catMap[a];
  });

  const items = sorted.map(c => {
    const isAi = c === 'ai-models';
    const icon = isAi ? '🧠 ' : '📂 ';
    return {
      id: c,
      label: icon + c.padEnd(20) + ' \x1b[90m(' + catMap[c] + ' animations)\x1b[0m' + (isAi ? ' \x1b[36m★ FEATURED\x1b[0m' : '')
    };
  });

  items.push({ id: '__back__', label: '⬅ Back to Main Menu' });

  runSelectMenu('Select a category to browse:', items, function (choice) {
    if (choice.id === '__back__') {
      onBack();
    } else {
      const all = getAllPlugins();
      const filtered = all.filter(p => {
        if (!p) return false;
        if (Array.isArray(p.category)) return p.category.includes(choice.id);
        return String(p.category || '').toLowerCase() === choice.id.toLowerCase();
      });
      browsePaginatedPlugins('Category: ' + choice.id, filtered, 0, function () {
        browseCategoriesInteractive(onBack);
      });
    }
  }, onBack);
}

function interactiveMainMenu() {
  clearTerminal();
  printHeader();

  const menuItems = [
    { id: 'search',     label: '🔍 Search Animations (Instant keyword search)' },
    { id: 'featured',   label: '✨ Featured Animations (Top picks across all categories)' },
    { id: 'categories', label: '📂 Browse by Category' },
    { id: 'random',     label: '🎲 Play a Random Animation' },
    { id: 'all',        label: '📋 View All Animations (Paginated catalog)' },
    { id: 'help',       label: '📖 CLI Commands & Options Manual' },
    { id: 'exit',       label: '🚪 Exit' }
  ];

  runSelectMenu('ThoughtStream Dashboard:', menuItems, function (choice) {
    if (choice.id === 'search') {
      globalSearchInteractive(interactiveMainMenu);
    } else if (choice.id === 'featured') {
      const all = getAllPlugins();
      const featured = all.filter(p => {
        if (!p) return false;
        if (Array.isArray(p.category)) return p.category.includes('featured');
        return String(p.category || '').toLowerCase() === 'featured';
      });
      browsePaginatedPlugins('Featured Animations', featured, 0, interactiveMainMenu);
    } else if (choice.id === 'categories') {
      browseCategoriesInteractive(interactiveMainMenu);
    } else if (choice.id === 'random') {
      const all = getAllPlugins();
      if (all.length > 0) {
        const p = all[Math.floor(Math.random() * all.length)];
        playInteractive(p.name, interactiveMainMenu);
      }
    } else if (choice.id === 'all') {
      const all = getAllPlugins();
      browsePaginatedPlugins('All Animations', all, 0, interactiveMainMenu);
    } else if (choice.id === 'help') {
      clearTerminal();
      showHelp();
      console.log('\x1b[36mPress any key to return to Dashboard...\x1b[0m');
      readline.emitKeypressEvents(process.stdin);
      try { if (process.stdin.isTTY) process.stdin.setRawMode(true); } catch (e) {}
      process.stdin.once('keypress', function () {
        try { if (process.stdin.isTTY) process.stdin.setRawMode(false); } catch (e) {}
        interactiveMainMenu();
      });
    } else {
      process.exit(0);
    }
  });
}

// ── 5. Main Dispatcher ─────────────────────────────────────────

function main() {
  if (options.version) {
    showVersion();
    return;
  }

  if (options.help) {
    showHelp();
    return;
  }

  const cmd = positional[0];
  const target = positional[1];

  if (!cmd) {
    interactiveMainMenu();
    return;
  }

  switch (cmd) {
    case 'play':
    case 'run':
      if (!target) {
        console.error('\x1b[31m[error] Please specify a plugin name to play.\x1b[0m');
        process.exit(1);
      }
      playPlugin(target, options);
      break;

    case 'list':
    case 'ls':
      listPlugins(target || options.category);
      break;

    case 'categories':
    case 'cats':
      listCategories();
      break;

    case 'info':
    case 'show':
      if (!target) {
        console.error('\x1b[31m[error] Please specify a plugin name.\x1b[0m');
        process.exit(1);
      }
      showInfo(target);
      break;

    case 'random':
    case 'rand':
      randomPlugin(target || options.category);
      break;

    default:
      // If positional[0] is not a command, treat it as plugin name:
      // e.g. `npx thought-stream tree_of_thought_mcts`
      playPlugin(cmd, options);
      break;
  }
}

main();
