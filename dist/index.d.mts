/*! thought-stream v1.0.1 | (c) 2026 Dennys José Márquez Reyes | https://github.com/dennysjmarquez/thought-stream | see LICENSE */
/**
 * ThoughtStream — TypeScript declarations.
 *
 *   import ThoughtStream from 'thought-stream';          // ES modules, bundlers, TypeScript
 *   const ThoughtStream = require('thought-stream');     // CommonJS
 *   <script src="thought-stream.js">                     // browser global: ThoughtStream
 *
 * No DOM or Node typings are required. `PluginName` and `PluginCategory` list the plugins and categories that ship with the
 * package (generated at build time); any other string is accepted as well, so your own plugins type-check too.
 */

declare class ThoughtStream {
  /** Engine version (the package version). */
  static readonly version: string;
  /** Helpers for writing plugins: pixel canvases, frame builders, colour, math and text. */
  static readonly SDK: ThoughtStream.SDK;

  /** Same as `new ThoughtStream(target, options)`. */
  static create(target?: ThoughtStream.TargetElement, options?: ThoughtStream.ThoughtStreamOptions): ThoughtStream;
  static register(plugin: ThoughtStream.PluginDefinition): typeof ThoughtStream;
  static use(plugin: ThoughtStream.PluginDefinition): typeof ThoughtStream;
  static registerAll(plugins: ThoughtStream.PluginDefinition[] | Record<string, ThoughtStream.PluginDefinition>): typeof ThoughtStream;
  static get(name: ThoughtStream.PluginName): ThoughtStream.PluginDefinition | null;
  static has(name: ThoughtStream.PluginName): boolean;
  static names(): string[];
  static randomName(): string;
  /** Metadata without running the plugin; `null` when the plugin is not registered. */
  static info(name: ThoughtStream.PluginName): ThoughtStream.PluginInfo | null;
  static listInfo(): ThoughtStream.PluginInfo[];
  /** Ready-to-paste usage snippets (vanilla, React, Vue, Angular, Node). */
  static getSnippets(name: ThoughtStream.PluginName, opts?: Record<string, unknown>): ThoughtStream.Snippets | null;
  static hasSnippets(name: ThoughtStream.PluginName): boolean;
  /** Load a Durdraw `.dur` animation (URL, path, bytes, File/Blob, JSON text or parsed object) as a plugin. */
  static importDur(source: ThoughtStream.ArtSource, opts?: ThoughtStream.ImportOptions): Promise<ThoughtStream.PluginDefinition>;
  /** General entry point for third-party art: the format comes from `opts.format`, the file extension or the content. */
  static importArt(source: ThoughtStream.ArtSource, opts?: ThoughtStream.ImportOptions & { format?: string }): Promise<ThoughtStream.PluginDefinition>;
  /** Turn a multitrack definition (template, tracks, scenes) into plain frames. */
  static compileTracks(plugin: ThoughtStream.PluginDefinition): ThoughtStream.FrameObject[];
  /** Wrap a Promise or async task with an automatic spinner (Ora compatibility). */
  static promise<T>(action: Promise<T> | (() => Promise<T>), options?: ThoughtStream.PromiseOptions<T> | string): Promise<T>;

  constructor(target?: ThoughtStream.TargetElement, options?: ThoughtStream.ThoughtStreamOptions);

  /** The container element, or `null` in a terminal or headless. */
  readonly el: ThoughtStream.ElementLike | null;
  readonly isPaused: boolean;
  readonly isRandom: boolean;
  readonly isPlaylist: boolean;
  readonly isSpinning: boolean;
  readonly isRunning: boolean;
  readonly frameCount: number;
  readonly currentName: string | null;
  loop: boolean;
  speed: number | null;
  text: string;
  prefixText: string;
  suffixText: string;
  color: string | ThoughtStream.PaintOptions;

  /** Start a plugin; `params` go to the plugin. Throws if the plugin is not registered. */
  start(nameOrOptions: ThoughtStream.PluginName | { name: ThoughtStream.PluginName; speed?: number; [key: string]: unknown }, params?: Record<string, any>): this;
  /** Stop; the last frame stays visible. */
  stop(): this;
  pause(): this;
  resume(): this;
  toggle(): this;
  /** Stop and release timers, observers and listeners. */
  destroy(): null;

  seek(index: number): this;
  next(): this;
  prev(): this;
  setSpeed(ms: number): this;
  /** Forward a new text to a plugin that supports it. */
  setText(text: string, opts?: Record<string, any>): this;
  /** Fill a `{name}` placeholder, live. */
  setTrack(name: string, value: string | number): this;
  /** The bound `api` of a plugin: `stream.plugin('text-reveal').setText('…')`. */
  plugin(name: ThoughtStream.PluginName): ThoughtStream.PluginApi;
  /** Show a text; when it ends in dots they pulse. */
  phrase(text: string, opts?: { dotSpeed?: number }): this;
  succeed(text?: string): this;
  fail(text?: string): this;
  warn(text?: string): this;
  info(text?: string): this;
  /** Clear the output line/container without stopping. */
  clear(): this;
  /** Re-render the current frame immediately. */
  render(): this;
  /** Return the string content of the current frame. */
  frame(): string;
  /** Stop the spinner and persist a custom symbol and text (Ora compatibility). */
  stopAndPersist(options?: ThoughtStream.StopAndPersistOptions): this;
  /** Run a Promise or async task with automatic spinner management (Ora compatibility). */
  promise<T>(action: Promise<T> | (() => Promise<T>), options?: ThoughtStream.PromiseOptions<T> | string): Promise<T>;
  /** Play an array of frames that is not a registered plugin. */
  playCustom(frames: ThoughtStream.Frame[], name?: string, opts?: { speed?: number; loop?: boolean }): this;

  startRandom(arg1?: ThoughtStream.PluginName[] | ThoughtStream.RandomOptions | number, arg2?: ThoughtStream.RandomOptions | number): this;
  stopRandom(): this;

  playlist(items: Array<ThoughtStream.PluginName | ThoughtStream.PlaylistItem>, opts?: ThoughtStream.PlaylistOptions): this;
  stopPlaylist(): this;
  pausePlaylist(): this;
  resumePlaylist(): this;
  playlistGoto(index: number): this;
  playlistNext(): this;
  playlistPrev(): this;
}

declare namespace ThoughtStream {
  /** The plugins that ship with the package. */
  type BuiltinPluginName =
    | 'activation_recomp'
    | 'aesthetic_fill'
    | 'ai_overthinking'
    | 'ai_thinking'
    | 'api_latency'
    | 'apollo_mission'
    | 'arc_spin'
    | 'attention_heads'
    | 'audio_eq'
    | 'aurora_borealis'
    | 'aurora_storm'
    | 'bandwidth_meter'
    | 'bar_blocks'
    | 'bar_race'
    | 'bar_retro'
    | 'bar_smooth'
    | 'bar_wave'
    | 'battery'
    | 'bbs_acid_intro'
    | 'beam_search'
    | 'binary_search'
    | 'bios_post'
    | 'black_hole'
    | 'black_hole_accretion'
    | 'boot_sequence'
    | 'boreal_odyssey'
    | 'bounce_ball'
    | 'bouncingBar'
    | 'bouncing_dvd'
    | 'bpe_merge'
    | 'bradley_terry'
    | 'braille_aurora'
    | 'braille_double'
    | 'braille_julia'
    | 'braille_nebula'
    | 'braille_plasma'
    | 'braille_spin'
    | 'braille_wave'
    | 'breathing'
    | 'brute_force_leak'
    | 'btc_price'
    | 'build_compile'
    | 'cell_divide'
    | 'chain_of_thought'
    | 'checkpoint'
    | 'chess_checkmate'
    | 'chess_game'
    | 'circle_spin'
    | 'city_skyline'
    | 'clock'
    | 'cm_doge'
    | 'cm_eye'
    | 'coffee_brew'
    | 'commodore64'
    | 'competition_bars'
    | 'conformal_coverage'
    | 'conformal_set'
    | 'context_window'
    | 'cosmic_singularity'
    | 'countdown2'
    | 'cpu_cores'
    | 'cpu_spike'
    | 'dataloader'
    | 'deploy_pipeline'
    | 'diamond_pulse'
    | 'digital_clock'
    | 'dijkstra_live'
    | 'dna'
    | 'dna_helix'
    | 'dna_replication'
    | 'docker_build'
    | 'docker_pull'
    | 'dogeblink'
    | 'dopehax'
    | 'dos_loading'
    | 'double_pendulum'
    | 'dur_welcome1'
    | 'dur_welcome2'
    | 'dur_welcome3'
    | 'durdraw_2_neon'
    | 'durdraw_3_neon'
    | 'durdraw_neon'
    | 'durdraw_plasma'
    | 'earth_spin'
    | 'earthquake'
    | 'elevator'
    | 'elo_battle'
    | 'embedding_search'
    | 'equalizer'
    | 'equalizer_bars'
    | 'event_horizon'
    | 'fibonacci'
    | 'file_id'
    | 'film_countdown'
    | 'finger_dance'
    | 'fish_swim'
    | 'fist_bump'
    | 'flash_attention'
    | 'game_of_life'
    | 'git_commit_flow'
    | 'git_push'
    | 'gpu_util'
    | 'grad_accumulation'
    | 'gradient_clipping'
    | 'hacker_manifesto'
    | 'hallucination_check'
    | 'heart_beat'
    | 'heartbeat_line'
    | 'hello_world'
    | 'hospital_monitor'
    | 'hourglass'
    | 'htop_cpu'
    | 'indyz_linuxfire'
    | 'indyz_space_shaman'
    | 'indyz_xmas'
    | 'inference_pipeline'
    | 'inferno'
    | 'k8s_pods'
    | 'kepler_orbit'
    | 'kernel_panic'
    | 'kv_cache'
    | 'lava_lamp'
    | 'layer_norm'
    | 'loading_dots'
    | 'lora_merge'
    | 'loss_curve'
    | 'loss_goes_nan'
    | 'mane'
    | 'matrix'
    | 'matrix_glitch'
    | 'matrix_rain'
    | 'matrix_reboot'
    | 'mindblown'
    | 'mixed_precision'
    | 'mixture_of_experts'
    | 'modem_dialup'
    | 'moe_routing'
    | 'moon_phases'
    | 'music_notes'
    | 'nan_propagation'
    | 'nccl_allreduce'
    | 'neon_sign'
    | 'network_io'
    | 'neural_awakening'
    | 'neural_fire'
    | 'newton_cradle'
    | 'nokia_snake'
    | 'norton_surface_scan'
    | 'npm_install'
    | 'nuclear_core'
    | 'nuclear_countdown'
    | 'nucleus_sampling'
    | 'ocean_wave'
    | 'orbit'
    | 'orchestra_tuning'
    | 'packet_flow'
    | 'pacman'
    | 'password_forge'
    | 'pendulum'
    | 'perplexity'
    | 'ping_pong'
    | 'ping_seq'
    | 'ping_sweep'
    | 'pipeline_parallel'
    | 'pipes_screensaver'
    | 'plasma_bolt'
    | 'pong_game'
    | 'port_scan'
    | 'prime_sieve'
    | 'progress_fill'
    | 'pulsar_core'
    | 'pulse'
    | 'pulse_ring'
    | 'quantization'
    | 'quicksort_live'
    | 'radar_sweep'
    | 'rag_pipeline'
    | 'rain'
    | 'rain2'
    | 'rejection_sampling'
    | 'reward_model'
    | 'rhombus_stretch'
    | 'rlhf_arena'
    | 'rlhf_kl'
    | 'rocket_launch'
    | 'rope_encoding'
    | 'rube_goldberg'
    | 'runner'
    | 'satellite_ping'
    | 'scan_line'
    | 'shark'
    | 'shooting_star'
    | 'signal_lost'
    | 'sinewave'
    | 'slot_machine'
    | 'slurm_queue'
    | 'soccer_header'
    | 'softmax_race'
    | 'solar_system'
    | 'sorting_bubble'
    | 'space_invaders'
    | 'speculative_decode'
    | 'speedrun'
    | 'spinner_arc'
    | 'spinner_arrow'
    | 'spinner_bounce2'
    | 'spinner_classic'
    | 'spinner_dots'
    | 'spinner_dots2'
    | 'spinner_pong'
    | 'spinner_shark'
    | 'spinner_star'
    | 'spring'
    | 'square_corners'
    | 'ssh_connect'
    | 'stackoverflow'
    | 'stars_twinkle'
    | 'starwars_telnet'
    | 'stock_market'
    | 'submarine_sonar'
    | 'sudo_ritual'
    | 'supernova'
    | 'temperature'
    | 'temperature_gauge'
    | 'terminal_type'
    | 'test_runner'
    | 'tetris_fall'
    | 'text-reveal'
    | 'text_appear'
    | 'text_reveal'
    | 'three_dots'
    | 'time_travel'
    | 'token_budget'
    | 'token_stream'
    | 'tokenizer'
    | 'triangle_spin'
    | 'tsunami_warning'
    | 'tux_pizza'
    | 'twilight_fjord'
    | 'typewriter'
    | 'typewriter_cursor'
    | 'unix_spinner'
    | 'vim_modes'
    | 'vintage_radio'
    | 'vinyl_player'
    | 'voting_bars'
    | 'voyager_last_transmission'
    | 'vpn_connect'
    | 'wandb_sparkline'
    | 'wave'
    | 'wave_collapse'
    | 'wave_text'
    | 'weather_cycle'
    | 'weight_decay'
    | 'wget_download'
    | 'wifi_signal'
    | 'wormhole'
    | 'writer_block'
    | 'zx_spectrum';
  /** A shipped plugin (autocompleted) or any name you registered yourself. */
  type PluginName = BuiltinPluginName | (string & {});
  type PluginCategory =
    | 'ai-models'
    | 'algorithms'
    | 'braille'
    | 'cinema'
    | 'classic'
    | 'fun'
    | 'iconic'
    | 'nature'
    | 'physics'
    | 'retro'
    | 'space'
    | 'terminal-fx'
    | 'text'
    | (string & {});

  /** Anything with a DOM node shape (an HTMLElement); keeps these typings free of the DOM lib. */
  interface ElementLike { readonly nodeType: number }
  /** `process.stdout`, a TTY stream or any object with a `write` method. */
  interface WritableStreamLike { write(chunk: string): unknown }
  /** A CSS selector, a DOM element, a React ref, a writable stream (terminal) or `null` (headless: use `onFrame`). */
  type TargetElement = string | ElementLike | { current: ElementLike | null } | WritableStreamLike | null | undefined;

  interface FrameObject {
    frame?: string;
    text?: string;
    /** Hold time of this frame in ms. */
    interval?: number;
    /** Extra pause after this frame in ms. */
    pause?: number;
  }
  type Frame = string | FrameObject;

  /** A slot filled by a list of values that repeats (or stops on the last one with `mode: 'once'`). */
  interface FrameSequenceTrack {
    frames: string[];
    interval?: number;
    delay?: number;
    mode?: 'loop' | 'once';
    global?: boolean;
  }
  interface CounterTrack {
    type: 'counter';
    from?: number;
    to?: number;
    step?: number;
    /** ms per step (default 1000). */
    interval?: number;
    duration?: number;
    easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    /** `'clock'` (m:ss), `'centiseconds'` (m:ss.cc) or `'fixed:N'`. */
    format?: 'clock' | 'centiseconds' | `fixed:${number}` | (string & {});
    delay?: number;
    global?: boolean;
  }
  interface BurstTrack {
    type: 'burst';
    length?: number;
    chars?: string;
    delay?: number;
    global?: boolean;
  }
  interface BarTrack {
    type: 'bar';
    /** 0 to 1. */
    progress?: number;
    width?: number;
    fill?: string;
    empty?: string;
    delay?: number;
    global?: boolean;
  }
  type TrackDefinition = string | number | FrameSequenceTrack | CounterTrack | BurstTrack | BarTrack;

  interface SceneConfig {
    /** How long the scene plays, in ms (default: one tick). */
    duration?: number;
    interval?: number;
    /** Extra hold of the scene's last frame, in ms. */
    pause?: number;
    /** A template for this scene only. */
    frame?: string;
    tracks?: Record<string, TrackDefinition>;
  }

  interface PluginDefinition {
    name: string;
    category?: PluginCategory;
    description?: string;
    /** Default hold time of a frame, in ms. */
    interval?: number;
    frames?: Frame[] | ((opts: Record<string, any>, stream: ThoughtStream | null) => Frame[]);
    /** The representative frame (reduced motion, `info()`). */
    preview?: string;
    /** Documents the parameters `frames(opts)` understands; the engine does not validate it. */
    options?: Record<string, unknown>;
    /** Build generated frames once instead of at every loop. */
    cache?: boolean;
    /** The plugin draws a large half-block scene; the browser paints it on a `<canvas>`. */
    fontScale?: 'dense' | 'ultra';
    /** Live-control methods, called as `stream.plugin(name).method(...)`; each receives the stream first. */
    api?: Record<string, (stream: ThoughtStream, ...args: any[]) => unknown>;
    template?: string;
    line?: string;
    format?: string;
    tracks?: Record<string, TrackDefinition>;
    scenes?: SceneConfig[];
    /** `false`: never treat the frames as a multitrack template. */
    multitrack?: boolean;
    /** Colour (0 to 255) for glyphs that carry none. */
    defaultFg?: number;
  }

  interface PluginInfo {
    name: string;
    category: string;
    description: string;
    preview: unknown;
    frames: number;
    interval: number;
    fontScale: unknown;
    width: number;
    height: number;
    multiline: boolean;
  }

  interface Snippets {
    name: string;
    category: string;
    interval: number;
    options: unknown;
    vanilla: string;
    react: string;
    angular: string;
    vue: string;
    nodejs: string;
  }

  interface PluginApi {
    start(params?: Record<string, any>): ThoughtStream;
    raw: PluginDefinition;
    [method: string]: any;
  }

  type ArtSource = string | Uint8Array | ArrayBuffer | object;
  interface ImportOptions {
    name?: string;
    category?: string;
    fontScale?: string;
    description?: string;
    preview?: string;
    /** `false`: return the plugin without registering it. */
    register?: boolean;
    /** Allow replacing an already registered plugin of the same name. */
    overwrite?: boolean;
    onWarning?: (warning: unknown) => void;
    colorDepth?: unknown;
    delayMode?: unknown;
    dedupe?: unknown;
  }

  interface ThoughtStreamOptions {
    /** Hold time in ms for frames that do not set their own. */
    speed?: number;
    /** Wrap around at the end (default `true`). */
    loop?: boolean;
    smoothTransitions?: boolean;
    /** ms between plugins in random rotation (default 2600). */
    randomInterval?: number;
    /** Start this plugin immediately. */
    plugin?: PluginName;
    animation?: PluginName;
    /** Start random rotation immediately. */
    random?: boolean;
    category?: PluginCategory;
    color?: string | PaintOptions;
    prefixText?: string;
    suffixText?: string;
    onFrame?: (index: number, frame: string, name: string) => void;
    onComplete?: (name: string) => void;
    onLoop?: (name: string) => void;
    onChange?: (name: string, plugin: PluginDefinition) => void;
    onItem?: (item: PlaylistItem, index: number) => void;
  }

  interface PromiseOptions<T = any> {
    name?: PluginName;
    spinner?: PluginName;
    text?: string;
    successText?: string | ((result: T) => string);
    failText?: string | ((err: any) => string);
    color?: string | PaintOptions;
    prefixText?: string;
    suffixText?: string;
  }

  interface StopAndPersistOptions {
    symbol?: string;
    text?: string;
    prefixText?: string;
  }

  interface PlaylistItem {
    name?: PluginName;
    duration?: number;
    frames?: Frame[];
    opts?: Record<string, any>;
  }
  interface PlaylistOptions {
    duration?: number;
    loop?: boolean;
    onItem?: (item: PlaylistItem, index: number) => void;
  }
  interface RandomOptions {
    interval?: number;
    hold?: number;
    pauseAfter?: number;
    category?: PluginCategory;
    plugins?: PluginName[];
    filter?: (name: string, plugin: PluginDefinition) => boolean;
  }

  /* ───────────────────────── SDK ───────────────────────── */
  type SdkFunction = (...args: any[]) => any;

  interface PaintOptions {
    /** `'#rgb'`, `'#rrggbb'` or black red green yellow blue magenta cyan white. */
    color?: string;
    bg?: string;
    bold?: boolean;
    dim?: boolean;
    italic?: boolean;
    underline?: boolean;
    blink?: boolean;
    invert?: boolean;
  }

  /** A grid of braille dots: 2 × 4 dots per character cell. */
  interface BrailleCanvasInstance {
    readonly cols: number;
    readonly rows: number;
    readonly pixelWidth: number;
    readonly pixelHeight: number;
    setPixel(x: number, y: number, on?: boolean): unknown;
    setColor(cellX: number, cellY: number, fg?: string, bg?: string): unknown;
    /** Calls `fn(x, y)` once per dot; return `true`, or `{ on, color, bg }`. */
    fill(fn: (x: number, y: number) => unknown, opts?: Record<string, unknown>): this;
    fillDensity(fn: SdkFunction, opts?: Record<string, unknown>): this;
    clear(): unknown;
    render(): string;
  }

  /** A grid of half-block pixels: 1 × 2 pixels per character cell. */
  interface BlockCanvasInstance {
    readonly cols: number;
    readonly rows: number;
    readonly pixelWidth: number;
    readonly pixelHeight: number;
    setPixel(x: number, y: number, color: string | null): unknown;
    getPixel(x: number, y: number): unknown;
    /** Calls `fn(x, y)` once per pixel; return a colour such as `'#ff8800'`. */
    fill(fn: (x: number, y: number) => unknown, opts?: Record<string, unknown>): this;
    clear(color?: string | null): unknown;
    render(): string;
  }

  interface SDK {
    frames: {
      progressBar: SdkFunction; typewriter: SdkFunction; dotReveal: SdkFunction; spinner: SdkFunction;
      gradientPulse: SdkFunction; matrixRain: SdkFunction; bounce: SdkFunction; reverse: SdkFunction;
      repeat: SdkFunction; sequence: SdkFunction; hold: SdkFunction; crossfade: SdkFunction; heartbeat: SdkFunction;
      [name: string]: SdkFunction;
    };
    /** Curated Unicode sets: braille, blocks, vbars, hbars, box, arrows, clock, moon, dots, … */
    chars: Record<string, any>;
    math: {
      lerp(a: number, b: number, t: number): number;
      clamp(value: number, min: number, max: number): number;
      map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
      easeIn(t: number): number;
      easeOut(t: number): number;
      easeInOut(t: number): number;
      randInt(min: number, max: number): number;
      pick<T>(list: ArrayLike<T>): T;
      shuffle<T>(list: T[]): T[];
      noise2D(x: number, y: number): number;
      sinWave: SdkFunction;
      linspace: SdkFunction;
      [name: string]: SdkFunction;
    };
    string: {
      center: SdkFunction; padLeft: SdkFunction; truncate: SdkFunction; wordWrap: SdkFunction;
      fill: SdkFunction; box: SdkFunction; scaleFrame: SdkFunction;
      [name: string]: SdkFunction;
    };
    color: {
      /** Works everywhere: Node terminal and browser. */
      paint(text: string, options?: PaintOptions): string;
      ansi: SdkFunction; fg256: SdkFunction;
      green(text: string): string; cyan(text: string): string; yellow(text: string): string; red(text: string): string;
      magenta(text: string): string; blue(text: string): string; white(text: string): string;
      bold(text: string): string; dim(text: string): string;
      neon(text: string): string; amber(text: string): string; synthwave(text: string): string;
    };
    BrailleCanvas(cols: number, rows: number, options?: Record<string, unknown>): BrailleCanvasInstance;
    BlockCanvas(cols: number, rows: number, options?: Record<string, unknown>): BlockCanvasInstance;
    HalfBlockCanvas: SdkFunction;
    /** Terminal-only: send just the cells that changed since the last frame. */
    DiffCanvas: SdkFunction;
    /** Turn a pixel array into a half-block frame, with optional dithering and palette. */
    fromPixels: SdkFunction;
    palette: { lerp: SdkFunction; ramp: SdkFunction; [name: string]: unknown };
    dither: { bayer4: unknown; bayer8: unknown; floydSteinberg: SdkFunction; [name: string]: unknown };
    /** A tiny pub/sub bus shared by plugins. */
    events: {
      on(event: string, listener: (...args: any[]) => void): unknown;
      off(event: string, listener: (...args: any[]) => void): unknown;
      once(event: string, listener: (...args: any[]) => void): unknown;
      emit(event: string, ...args: any[]): unknown;
      clear(event?: string): unknown;
    };
    retro: {
      palette16: unknown;
      cp437Table: unknown;
      cp437ToUnicode: SdkFunction;
      /** Decode a `.BIN` text-mode dump into an ANSI frame (default width 80). */
      fromBin(bytes: ArrayLike<number> | ArrayBuffer, width?: number): string;
      fromDur: SdkFunction; parseDur: SdkFunction; loadDur: SdkFunction;
      /** Frames that reveal a picture a couple of lines at a time, like a dial-up BBS. */
      modemDraw(frame: string, options?: { linesPerStep?: number; interval?: number }): Frame[];
    };
  }
}

export default ThoughtStream;
export { ThoughtStream };
export type BuiltinPluginName = ThoughtStream.BuiltinPluginName;
export type PluginName = ThoughtStream.PluginName;
export type PluginCategory = ThoughtStream.PluginCategory;
export type ElementLike = ThoughtStream.ElementLike;
export type WritableStreamLike = ThoughtStream.WritableStreamLike;
export type TargetElement = ThoughtStream.TargetElement;
export type FrameObject = ThoughtStream.FrameObject;
export type Frame = ThoughtStream.Frame;
export type FrameSequenceTrack = ThoughtStream.FrameSequenceTrack;
export type CounterTrack = ThoughtStream.CounterTrack;
export type BurstTrack = ThoughtStream.BurstTrack;
export type BarTrack = ThoughtStream.BarTrack;
export type TrackDefinition = ThoughtStream.TrackDefinition;
export type SceneConfig = ThoughtStream.SceneConfig;
export type PluginDefinition = ThoughtStream.PluginDefinition;
export type PluginInfo = ThoughtStream.PluginInfo;
export type Snippets = ThoughtStream.Snippets;
export type PluginApi = ThoughtStream.PluginApi;
export type ArtSource = ThoughtStream.ArtSource;
export type ImportOptions = ThoughtStream.ImportOptions;
export type ThoughtStreamOptions = ThoughtStream.ThoughtStreamOptions;
export type PromiseOptions = ThoughtStream.PromiseOptions;
export type StopAndPersistOptions = ThoughtStream.StopAndPersistOptions;
export type PlaylistItem = ThoughtStream.PlaylistItem;
export type PlaylistOptions = ThoughtStream.PlaylistOptions;
export type RandomOptions = ThoughtStream.RandomOptions;
export type SdkFunction = ThoughtStream.SdkFunction;
export type PaintOptions = ThoughtStream.PaintOptions;
export type BrailleCanvasInstance = ThoughtStream.BrailleCanvasInstance;
export type BlockCanvasInstance = ThoughtStream.BlockCanvasInstance;
export type SDK = ThoughtStream.SDK;
