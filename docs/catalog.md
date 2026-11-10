# Plugin catalog

Every plugin that ships in the package, generated from the code that is published — 261 plugins in 13 categories.

- **Frames** and **Size** describe the default output (a generator reports what it produces with no options). **Size** is columns × lines of the widest/tallest frame.
- Wider than 80 columns, or taller than one line, means it is meant for a browser or a roomy terminal; the terminal section of the [README](../README.md) explains what happens in a narrow one.
- Use a plugin by importing its file (`thought-stream/plugins/catalog/<file>`) or its whole category (`thought-stream/plugins/<category>`), then `start('<name>')`.

| Category | Plugins |
| --- | ---: |
| [ai-models](#ai-models) | 50 |
| [algorithms](#algorithms) | 7 |
| [braille](#braille) | 4 |
| [classic](#classic) | 51 |
| [featured](#featured) | 11 |
| [fun](#fun) | 17 |
| [iconic](#iconic) | 24 |
| [nature](#nature) | 20 |
| [physics](#physics) | 6 |
| [retro](#retro) | 19 |
| [space](#space) | 2 |
| [terminal-fx](#terminal-fx) | 49 |
| [text](#text) | 1 |

## ai-models

`require('thought-stream/plugins/ai-models')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `activation_recomp` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/activation-recomp` |
| `ai_overthinking` | An AI overthinks a simple "hola" greeting into an unpredictable multi-thousand-dollar existential crisis. | 227 | 65 ms | 142×1 | `plugins/catalog/ai-overthinking` |
| `ai_thinking` | Robot procesando una petición paso a paso hasta responder. | 8 | 300 ms | 22×1 | `plugins/catalog/ai-thinking` |
| `attention_heads` |  | 96 | 62.5 ms | 48×1 | `plugins/catalog/attention-heads` |
| `beam_search` | Beam search tree exploration 9 frames | 9 | 120 ms | 14×1 | `plugins/catalog/beam-search` |
| `bpe_merge` |  | 56 | 62.5 ms | 48×1 | `plugins/catalog/bpe-merge` |
| `bradley_terry` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/bradley-terry` |
| `chain_of_thought` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/chain-of-thought` |
| `checkpoint` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/checkpoint` |
| `conformal_coverage` |  | 64 | 62.5 ms | 48×1 | `plugins/catalog/conformal-coverage` |
| `conformal_set` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/conformal-set` |
| `context_window` | Context window filling 9 frames | 9 | 80 ms | 23×1 | `plugins/catalog/context-window` |
| `dataloader` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/dataloader` |
| `elo_battle` |  | 64 | 400 ms | 48×1 | `plugins/catalog/elo-battle` |
| `embedding_search` | Embedding vector search 9 frames | 9 | 80 ms | 16×1 | `plugins/catalog/embedding-search` |
| `flash_attention` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/flash-attention` |
| `gpu_util` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/gpu-util` |
| `grad_accumulation` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/grad-accumulation` |
| `gradient_clipping` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/gradient-clipping` |
| `hallucination_check` |  | 50 | 62.5 ms | 18×1 | `plugins/catalog/hallucination-check` |
| `inference_pipeline` | Pipeline de inferencia: prompt → encode → attention → MLP → output. | 7 | 160 ms | 29×1 | `plugins/catalog/inference-pipeline` |
| `kv_cache` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/kv-cache` |
| `layer_norm` | LayerNorm computation 8 frames | 8 | 80 ms | 21×1 | `plugins/catalog/layer-norm` |
| `lora_merge` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/lora-merge` |
| `loss_curve` | Curva de entrenamiento convergiendo — loss bajando con barras. | 14 | 150 ms | 32×1 | `plugins/catalog/loss-curve` |
| `loss_goes_nan` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/loss-goes-nan` |
| `mixed_precision` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/mixed-precision` |
| `moe_routing` | Mixture of Experts routing 7 frames | 7 | 80 ms | 33×1 | `plugins/catalog/moe-routing` |
| `nan_propagation` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/nan-propagation` |
| `nccl_allreduce` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/nccl-allreduce` |
| `neural_awakening` | A neural network bootstraps from noise — synapses fire, cortex layers come online, identity crystallizes. | 29 | 300 ms | 46×1 | `plugins/catalog/neural-awakening` |
| `neural_fire` | Red neuronal activándose capa por capa hasta generar el token final. | 11 | 120 ms | 29×1 | `plugins/catalog/neural-fire` |
| `nucleus_sampling` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/nucleus-sampling` |
| `perplexity` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/perplexity` |
| `pipeline_parallel` |  | 64 | 62.5 ms | 48×1 | `plugins/catalog/pipeline-parallel` |
| `quantization` |  | 56 | 62.5 ms | 42×1 | `plugins/catalog/quantization` |
| `rag_pipeline` | Pipeline RAG: ingestión, chunking, embedding e indexación. | 9 | 180 ms | 31×1 | `plugins/catalog/rag-pipeline` |
| `rejection_sampling` |  | 64 | 62.5 ms | 48×1 | `plugins/catalog/rejection-sampling` |
| `reward_model` |  | 60 | 62.5 ms | 8×1 | `plugins/catalog/reward-model` |
| `rlhf_kl` |  | 64 | 62.5 ms | 26×1 | `plugins/catalog/rlhf-kl` |
| `rope_encoding` | RoPE positional encoding 8 frames | 8 | 100 ms | 17×1 | `plugins/catalog/rope-encoding` |
| `slurm_queue` |  | 54 | 62.5 ms | 48×1 | `plugins/catalog/slurm-queue` |
| `softmax_race` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/softmax-race` |
| `speculative_decode` | Speculative decoding verify/accept 9 frames | 9 | 100 ms | 17×1 | `plugins/catalog/speculative-decode` |
| `temperature` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/temperature` |
| `token_budget` | Token budget countdown 13 frames | 13 | 100 ms | 25×1 | `plugins/catalog/token-budget` |
| `token_stream` | Texto que se genera token a token como un LLM respondiendo. | 16 | 100 ms | 16×1 | `plugins/catalog/token-stream` |
| `tokenizer` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/tokenizer` |
| `wandb_sparkline` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/wandb-sparkline` |
| `weight_decay` |  | 48 | 62.5 ms | 48×1 | `plugins/catalog/weight-decay` |

## algorithms

`require('thought-stream/plugins/algorithms')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `binary_search` | Binary search 5 frames | 5 | 180 ms | 19×1 | `plugins/catalog/binary-search` |
| `dijkstra_live` | Dijkstra's shortest path — relaxation, priority queue, optimal route. | 12 | 550 ms | 60×1 | `plugins/catalog/dijkstra-live` |
| `fibonacci` | Fibonacci unrolling 8 frames | 8 | 300 ms | 17×1 | `plugins/catalog/fibonacci` |
| `game_of_life` | Conway's Game of Life — glider birth, R-pentomino chaos, still life. | 14 | 250 ms | 70×1 | `plugins/catalog/game-of-life` |
| `prime_sieve` | Sieve of Eratosthenes 5 frames | 5 | 200 ms | 20×1 | `plugins/catalog/prime-sieve` |
| `quicksort_live` | Quicksort partitioning live — pivot selection, swap, recurse. | 12 | 500 ms | 52×1 | `plugins/catalog/quicksort-live` |
| `sorting_bubble` | Bubble sort visualization 10 frames | 10 | 120 ms | 14×1 | `plugins/catalog/sorting-bubble` |

## braille

`require('thought-stream/plugins/braille')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `braille_aurora` | Radiant aurora plasma with glowing complementary background bands and Braille density matrix. | 80 | 42 ms | 48×12 | `plugins/catalog/braille-aurora` |
| `braille_julia` | Animated Julia set fractal rendered in TrueColor Braille sub-pixels with Bayer dithered chaos filaments. | 64 | 50 ms | 48×12 | `plugins/catalog/braille-julia` |
| `braille_nebula` | Sub-pixel cosmic plasma with organic moving voids and glowing Braille stars. | 80 | 42 ms | 48×12 | `plugins/catalog/braille-nebula` |
| `braille_plasma` | Demo-scene plasma shader rendered as Braille sub-pixel art. 96×48 TrueColor pixels in a 48×12 terminal cell canvas. | 80 | 42 ms | 48×12 | `plugins/catalog/braille-plasma` |

## classic

`require('thought-stream/plugins/classic')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `aesthetic_fill` | Barra estética fill/drain 8 frames | 8 | 80 ms | 7×1 | `plugins/catalog/aesthetic-fill` |
| `apollo_mission` | Full Apollo mission — T-10 countdown, liftoff, lunar landing, splashdown. | 58 | 500 ms | 66×1 | `plugins/catalog/apollo-mission` |
| `arc_spin` | Arc spinner geométrico 6 frames | 6 | 100 ms | 1×1 | `plugins/catalog/arc-spin` |
| `audio_eq` | Ecualizador de audio — barras de frecuencia subiendo y bajando. | 9 | 80 ms | 16×1 | `plugins/catalog/audio-eq` |
| `bar_blocks` | Barra de progreso clásica con bloques llenos y vacíos. | 11 | 120 ms | 10×1 | `plugins/catalog/bar-blocks` |
| `bar_retro` | Barra de progreso estilo retro DOS con signos igual. | 11 | 150 ms | 27×1 | `plugins/catalog/bar-retro` |
| `bar_smooth` | Barra de progreso con sub-bloques Unicode para transición suave. | 17 | 150 ms | 16×1 | `plugins/catalog/bar-smooth` |
| `bar_wave` | Ola de bloques que sube y baja continuamente. | 8 | 80 ms | 15×1 | `plugins/catalog/bar-wave` |
| `battery` | Batería cargándose desde 0% hasta 100%. | 12 | 200 ms | 21×1 | `plugins/catalog/battery` |
| `bouncingBar` |  | 16 | 62.5 ms | 7×1 | `plugins/catalog/bouncin-ar` |
| `braille_double` | Braille double-sweep 24 frames | 24 | 80 ms | 1×1 | `plugins/catalog/braille-double` |
| `braille_spin` | Braille spinner clásico 10 frames | 10 | 80 ms | 1×1 | `plugins/catalog/braille-spin` |
| `braille_wave` | Braille wave 8 frames | 8 | 80 ms | 1×1 | `plugins/catalog/braille-wave` |
| `breathing` |  | 27 | 62.5 ms | 9×1 | `plugins/catalog/breathing` |
| `circle_spin` | Circle halves spin 4 frames | 4 | 120 ms | 1×1 | `plugins/catalog/circle-spin` |
| `city_skyline` | A living city at sunset — windows light up, traffic flows, neon signs glow. | 25 | 280 ms | 64×1 | `plugins/catalog/city-skyline` |
| `clock` |  | 16 | 62.5 ms | 13×1 | `plugins/catalog/clock` |
| `dna` |  | 12 | 62.5 ms | 17×1 | `plugins/catalog/dna` |
| `equalizer` |  | 12 | 62.5 ms | 17×1 | `plugins/catalog/equalizer` |
| `film_countdown` | Cinema leader countdown — Academy numbers, beep, white flash, PICTURE. | 14 | 900 ms | 41×1 | `plugins/catalog/film-countdown` |
| `fish_swim` | Pez nadando 25 frames | 25 | 80 ms | 20×1 | `plugins/catalog/fish-swim` |
| `hospital_monitor` | Cardiac monitor — normal rhythm, crisis, flatline, defib shock, ROSC. | 28 | 220 ms | 60×1 | `plugins/catalog/hospital-monitor` |
| `hourglass` |  | 15 | 62.5 ms | 10×1 | `plugins/catalog/hourglass` |
| `lava_lamp` | 70s lava lamp — blobs rising, merging, splitting in hypnotic slow motion. | 19 | 400 ms | 37×1 | `plugins/catalog/lava-lamp` |
| `matrix` |  | 12 | 62.5 ms | 19×1 | `plugins/catalog/matrix` |
| `orbit` |  | 12 | 62.5 ms | 13×1 | `plugins/catalog/orbit` |
| `orchestra_tuning` | Pre-concert orchestra tuning — sections warm up, A440 alignment, conductor, downbeat. | 21 | 350 ms | 73×1 | `plugins/catalog/orchestra-tuning` |
| `pendulum` |  | 16 | 62.5 ms | 19×1 | `plugins/catalog/pendulum` |
| `pong_game` | Pong game 30 frames | 30 | 80 ms | 10×1 | `plugins/catalog/pong-game` |
| `pulse` |  | 17 | 62.5 ms | 12×1 | `plugins/catalog/pulse` |
| `radar_sweep` | Classic radar sweep scanning the horizon. | 9 | 160 ms | 37×1 | `plugins/catalog/radar-sweep` |
| `rhombus_stretch` | La Barra de Carga Romboide Elástica. Glifos diagonales limpios en cinta continua. | 12 | 90 ms | 12×1 | `plugins/catalog/rhombus-stretch` |
| `shark` | Tiburón nadando 26 frames | 26 | 120 ms | 16×1 | `plugins/catalog/shark` |
| `signal_lost` | Old TV losing signal — static noise, interference, blackout. | 17 | 80 ms | 30×1 | `plugins/catalog/signal-lost` |
| `spinner_arc` | Arco giratorio — cuartos de círculo rotando. | 6 | 100 ms | 1×1 | `plugins/catalog/spinner-arc` |
| `spinner_arrow` | Flechas rotando en 8 direcciones. | 8 | 100 ms | 1×1 | `plugins/catalog/spinner-arrow` |
| `spinner_bounce2` | Pelota rebotando dentro de paréntesis. | 10 | 80 ms | 8×1 | `plugins/catalog/spinner-bounce2` |
| `spinner_classic` | El spinner de terminal clásico: pipe, slash, dash, backslash. | 4 | 250 ms | 1×1 | `plugins/catalog/spinner-classic` |
| `spinner_dots` | Braille dots spinner — el más usado en CLI moderno. | 10 | 80 ms | 1×1 | `plugins/catalog/spinner-dots` |
| `spinner_dots2` | Braille dots variante 2 — más denso y agresivo. | 8 | 80 ms | 1×1 | `plugins/catalog/spinner-dots2` |
| `spinner_pong` | Pelota de pong rebotando entre dos bordes. | 30 | 60 ms | 10×1 | `plugins/catalog/spinner-pong` |
| `spinner_star` | Estrella parpadeante con variaciones Unicode. | 6 | 100 ms | 1×1 | `plugins/catalog/spinner-star` |
| `square_corners` | Square corners rotation 4 frames | 4 | 180 ms | 1×1 | `plugins/catalog/square-corners` |
| `stock_market` | A full trading day — open, rally, crash, circuit breaker, close. | 18 | 400 ms | 56×1 | `plugins/catalog/stock-market` |
| `triangle_spin` | Triangle corner sweep 4 frames | 4 | 100 ms | 1×1 | `plugins/catalog/triangle-spin` |
| `tsunami_warning` | Seismic detection → tsunami model → alert cascade → evacuation. Pure tension. | 27 | 350 ms | 85×1 | `plugins/catalog/tsunami-warning` |
| `typewriter_cursor` | Blinking cursor — the eternal pause before the words arrive. | 12 | 530 ms | 1×1 | `plugins/catalog/typewriter-cursor` |
| `vintage_radio` | Shortwave radio tuning — static, numbers station, morse, BBC broadcast, silence. | 23 | 300 ms | 79×1 | `plugins/catalog/vintage-radio` |
| `vinyl_player` | A vinyl record spinning up — needle drops, grooves crackle, music floods in. | 30 | 220 ms | 40×1 | `plugins/catalog/vinyl-player` |
| `wave` |  | 12 | 62.5 ms | 12×1 | `plugins/catalog/wave` |
| `wifi_signal` | Señal WiFi creciendo barra a barra hasta cobertura total. | 6 | 200 ms | 19×1 | `plugins/catalog/wifi-signal` |

## featured

`require('thought-stream/plugins/featured')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `bbs_acid_intro` | Authentic 1990s MS-DOS BBS intro screen in vibrant CGA/EGA 16-color ANSI art with cycling palette borders. | 24 | 100 ms | 80×12 | `plugins/catalog/bbs-acid-intro` |
| `boreal_odyssey` | BOREAL ODYSSEY: a six-act Braille short film (night, aurora, comet, dawn) with letterbox, parallax mountains, lake reflections, dot-font titles and a live HUD. Every run is unique. | 278 | 42 ms | 64×21 | `plugins/catalog/boreal-odyssey` |
| `chess_checkmate` | Single-line chess animation with independent rhythms, staggered bursts, holds, tactical discovery and checkmate. | 534 | 65 ms | 132×1 | `plugins/catalog/chess-checkmate` |
| `event_horizon` | Kerr black hole with gravitational lensing, Doppler-boosted accretion disk, photon ring, and deflected starfield. | 60 | 50 ms | 48×13 | `plugins/catalog/event-horizon` |
| `mixture_of_experts` | MoE routing: 4 experts compute in parallel with fluctuating loads. | 166 | 65 ms | 109×1 | `plugins/catalog/mixture-of-experts` |
| `norton_surface_scan` | MS-DOS ScanDisk-style linear surface scan. Each loop generates a new disk map, cluster layout and defect distribution. | 55 | 340 ms | 120×1 | `plugins/catalog/norton-surface-scan` |
| `rlhf_arena` | RLHF Chatbot Arena: Blind Ingestion -> Streaming -> Human Preference -> DPO Convergence. | 210 | 65 ms | 135×1 | `plugins/catalog/rlhf-arena` |
| `twilight_fjord` | Scandinavian twilight fjord in full-widescreen ultra-high-definition (270×84 micro-pixels): expansive sunset gradient, 3-layer parallax mountains, rocky pine islet, rippling reflections, and migratory cranes. | 36 | 50 ms | 270×42 | `plugins/catalog/twilight-fjord` |
| `voyager_last_transmission` | The final transmission of Voyager 1: 47 years, 24.3 billion km, one last sign-off. | 322 | 65 ms | 104×1 | `plugins/catalog/voyager-last-transmission` |
| `whirlwind_warp` | Moving stars acted upon by 16 force fields — faithful JS port of XScreenSaver WhirlwindWarp (Paul 'Joey' Clark). Verified against the original C by a parity test. | 5 | 50 ms | 80×23 | `plugins/catalog/whirlwind-warp` |
| `whirlwind_warp_blocks` | WhirlWindWarp drawn with solid half-block pixels (one colour per pixel); the browser paints it on a <canvas>. Same simulation as whirlwind_warp. | 5 | 50 ms | 80×23 | `plugins/catalog/whirlwind-warp` |

## fun

`require('thought-stream/plugins/fun')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `bouncing_dvd` | Logo DVD rebotando — ¿tocará la esquina? 👀 | 16 | 80 ms | 20×1 | `plugins/catalog/bouncing-dvd` |
| `btc_price` | Precio de Bitcoin fluctuando en tiempo real. | 7 | 300 ms | 25×1 | `plugins/catalog/btc-price` |
| `chess_game` | A blitz chess game — openings, tactics, check, and checkmate. | 20 | 600 ms | 43×1 | `plugins/catalog/chess-game` |
| `coffee_brew` | Brewing the perfect espresso — grind, tamp, extract, crema. ☕ | 16 | 350 ms | 53×1 | `plugins/catalog/coffee-brew` |
| `countdown2` | Cuenta regresiva del 5 al GO! con cohete. | 6 | 500 ms | 6×1 | `plugins/catalog/countdown2` |
| `elevator` | Elevator ride B2→PH — door close, floor ticks, awkward stranger, penthouse. | 24 | 600 ms | 66×1 | `plugins/catalog/elevator` |
| `finger_dance` | Baile de dedos 6 frames | 6 | 160 ms | 2×1 | `plugins/catalog/finger-dance` |
| `fist_bump` | Choque de puños 7 frames | 7 | 80 ms | 10×1 | `plugins/catalog/fist-bump` |
| `hello_world` | Hello World en 9 idiomas del mundo. | 9 | 400 ms | 16×1 | `plugins/catalog/hello-world` |
| `mindblown` | Mente explotando 14 frames | 14 | 160 ms | 3×1 | `plugins/catalog/mindblown` |
| `music_notes` | Notas musicales desplazándose en bucle. | 4 | 200 ms | 13×1 | `plugins/catalog/music-notes` |
| `rube_goldberg` | Rube Goldberg machine to butter toast — dominoes, cat malfunction, explosion, perfection. | 31 | 400 ms | 85×1 | `plugins/catalog/rube-goldberg` |
| `slot_machine` | Vegas slot machine — reels spin, near-miss, then jackpot! | 19 | 90 ms | 40×1 | `plugins/catalog/slot-machine` |
| `soccer_header` | Cabezazo de fútbol 12 frames | 12 | 80 ms | 12×1 | `plugins/catalog/soccer-header` |
| `speedrun` | Video game speedrun — wrong warp, clip, boss skip, credits warp, world record by 0.2s. | 22 | 200 ms | 86×1 | `plugins/catalog/speedrun` |
| `spinner_shark` | Tiburón moviéndose de lado a lado como aleta. | 26 | 80 ms | 17×1 | `plugins/catalog/spinner-shark` |
| `writer_block` | Writer's block — confident start, wall, rage-delete, breakthrough, perfection. | 80 | 150 ms | 69×1 | `plugins/catalog/writer-block` |

## iconic

`require('thought-stream/plugins/iconic')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `bios_post` | BIOS POST de la IBM PC original. El arranque que cambió el mundo. 1981. | 11 | 250 ms | 20×1 | `plugins/catalog/bios-post` |
| `commodore64` | El arranque del Commodore 64. El ordenador más vendido de todos. 1982. | 14 | 300 ms | 20×1 | `plugins/catalog/commodore64` |
| `dos_loading` | La barra de carga clásica de DOS/Windows. La más vista del mundo. 1980s-90s. | 10 | 100 ms | 20×1 | `plugins/catalog/dos-loading` |
| `git_commit_flow` | El flujo de git commit+push. Lo más repetido en la historia del dev. | 12 | 220 ms | 20×1 | `plugins/catalog/git-commit-flow` |
| `htop_cpu` | htop monitoreando CPU. El monitor de procesos más elegante de la terminal. | 14 | 80 ms | 20×1 | `plugins/catalog/htop-cpu` |
| `kernel_panic` | Kernel Panic. El momento más temido de Linux. Fatal exception. | 17 | 150 ms | 20×1 | `plugins/catalog/kernel-panic` |
| `matrix_rain` | Matrix digital rain con el mensaje "Wake up, Neo". 1999. | 16 | 60 ms | 19×1 | `plugins/catalog/matrix-rain` |
| `modem_dialup` | Modem dial-up conectando. El sonido más nostálgico de los 90s. | 12 | 200 ms | 20×1 | `plugins/catalog/modem-dialup` |
| `nokia_snake` | Snake del Nokia 3310. El juego más jugado de todos los tiempos (1998). | 13 | 180 ms | 20×1 | `plugins/catalog/nokia-snake` |
| `npm_install` | npm install. El ritual de los 847 packages y sus vulnerabilidades. 2010s. | 14 | 180 ms | 20×1 | `plugins/catalog/npm-install` |
| `nuclear_countdown` | Countdown nuclear. WarGames (1983). The only winning move is not to play. | 19 | 500 ms | 20×1 | `plugins/catalog/nuclear-countdown` |
| `pacman` | Pac-Man comiendo puntos. El icónico personaje de Namco (1980). | 34 | 150 ms | 20×1 | `plugins/catalog/pacman` |
| `ping_pong` | Ping rebotando hasta 8.8.8.8. El diagnóstico de red más universal. | 15 | 100 ms | 20×1 | `plugins/catalog/ping-pong` |
| `pipes_screensaver` | Tuberías del screensaver de Windows NT. El más visto de la historia. | 21 | 100 ms | 20×1 | `plugins/catalog/pipes-screensaver` |
| `rocket_launch` | T-minus countdown, ignition, liftoff — the full drama of a launch. | 20 | 500 ms | 60×1 | `plugins/catalog/rocket-launch` |
| `space_invaders` | Space Invaders. El arcade que lo comenzó todo. Taito, 1978. | 15 | 120 ms | 20×1 | `plugins/catalog/space-invaders` |
| `stackoverflow` | El ritual de copiar de Stack Overflow. La realidad del desarrollo. 2008. | 13 | 300 ms | 20×1 | `plugins/catalog/stackoverflow` |
| `starwars_telnet` | Star Wars en ASCII. towel.blinkenlights.nl — la obra maestra del telnet. | 14 | 200 ms | 20×1 | `plugins/catalog/starwars-telnet` |
| `sudo_ritual` | sudo y su ritual de autenticación. El poder absoluto de Unix. | 13 | 300 ms | 20×1 | `plugins/catalog/sudo-ritual` |
| `tetris_fall` | Tetris. Las piezas icónicas cayendo. Alexey Pajitnov, 1984. | 16 | 150 ms | 20×1 | `plugins/catalog/tetris-fall` |
| `unix_spinner` | El spinner original de Unix. El primer spinner de la historia. 1970s. | 4 | 130 ms | 2×1 | `plugins/catalog/unix-spinner` |
| `vim_modes` | Los modos de Vim. El editor que nadie puede cerrar desde 1991. | 15 | 400 ms | 20×1 | `plugins/catalog/vim-modes` |
| `wget_download` | wget descargando un archivo. El comando más icónico de Linux. | 13 | 120 ms | 27×1 | `plugins/catalog/wget-download` |
| `zx_spectrum` | Las rayas de carga del ZX Spectrum. El sonido y las rayas. Sinclair, 1982. | 16 | 50 ms | 20×1 | `plugins/catalog/zx-spectrum` |

## nature

`require('thought-stream/plugins/nature')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `aurora_borealis` | Northern lights — shimmering curtains of color across a dark sky. | 12 | 200 ms | 41×1 | `plugins/catalog/aurora-borealis` |
| `aurora_storm` | Geomagnetic storm aurora — faint shimmer to raging curtains of crimson and violet. | 14 | 350 ms | 67×1 | `plugins/catalog/aurora-storm` |
| `black_hole` | El Agujero Negro / Colisionador Cuántico. Materia colapsando hacia el punto cero. | 8 | 80 ms | 41×1 | `plugins/catalog/black-hole` |
| `black_hole_accretion` | Matter spiraling into a black hole — accretion disk and event horizon. | 14 | 220 ms | 36×1 | `plugins/catalog/black-hole-accretion` |
| `cell_divide` | Célula creciendo y dividiéndose en dos. | 9 | 150 ms | 9×1 | `plugins/catalog/cell-divide` |
| `dna_helix` | El Escáner de ADN / Cadena Cruzada. Simula dos hebras biológicas cruzándose. | 10 | 120 ms | 17×1 | `plugins/catalog/dna-helix` |
| `dna_replication` | DNA unwinding, base-pair matching, and strand synthesis — molecular biology live. | 15 | 300 ms | 45×1 | `plugins/catalog/dna-replication` |
| `earth_spin` | Tierra girando 3 frames | 3 | 180 ms | 2×1 | `plugins/catalog/earth-spin` |
| `earthquake` | Seismic event — quiet baseline, P-wave arrival, main quake, aftershocks. | 18 | 180 ms | 34×1 | `plugins/catalog/earthquake` |
| `heart_beat` | Latido de corazón dibujado con caracteres ASCII curvos. | 9 | 80 ms | 14×1 | `plugins/catalog/heart-beat` |
| `moon_phases` | Fases de la luna 8 frames | 8 | 80 ms | 2×1 | `plugins/catalog/moon-phases` |
| `ocean_wave` | Ola del océano acercándose y alejándose con caracteres especiales. | 12 | 100 ms | 17×1 | `plugins/catalog/ocean-wave` |
| `rain2` | Lluvia con gotas cayendo en posiciones aleatorias. | 6 | 120 ms | 17×1 | `plugins/catalog/rain2` |
| `runner` | Runner animado 2 frames | 2 | 140 ms | 2×1 | `plugins/catalog/runner` |
| `solar_system` | Solar system in ASCII motion — planets orbit at scaled speeds. Loops forever. | 21 | 300 ms | 85×1 | `plugins/catalog/solar-system` |
| `stars_twinkle` | Estrellas parpadeando con distintos símbolos Unicode. | 5 | 200 ms | 17×1 | `plugins/catalog/stars-twinkle` |
| `supernova` | A massive star collapsing and exploding — Type II supernova. | 18 | 300 ms | 43×1 | `plugins/catalog/supernova` |
| `time_travel` | Reloj viajando en el tiempo 12 frames | 12 | 100 ms | 2×1 | `plugins/catalog/time-travel` |
| `weather_cycle` | Ciclo meteorológico 16 frames | 16 | 100 ms | 4×1 | `plugins/catalog/weather-cycle` |
| `wormhole` | Spacetime tunnel — approaching, traversing, emerging on the other side. | 19 | 200 ms | 51×1 | `plugins/catalog/wormhole` |

## physics

`require('thought-stream/plugins/physics')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `diamond_pulse` | Diamante pulsando — expansión y contracción geométrica. | 9 | 100 ms | 9×1 | `plugins/catalog/diamond-pulse` |
| `double_pendulum` | Chaotic double pendulum — deterministic chaos, Lyapunov unstable. | 20 | 140 ms | 39×1 | `plugins/catalog/double-pendulum` |
| `kepler_orbit` | Keplerian celestial mechanics: multi-body elliptical orbits, velocity acceleration at periapsis, and ion wake trails. | 72 | 45 ms | 48×13 | `plugins/catalog/kepler-orbit` |
| `newton_cradle` | El Péndulo de Newton Balístico. Simulación física simplificada con transferencia de energía. | 4 | 100 ms | 10×1 | `plugins/catalog/newton-cradle` |
| `spring` | Resorte comprimiéndose y expandiéndose con paréntesis anidados. | 8 | 100 ms | 14×1 | `plugins/catalog/spring` |
| `wave_collapse` | Quantum wave function collapsing — superposition, measurement, eigenstate. | 13 | 250 ms | 35×1 | `plugins/catalog/wave-collapse` |

## retro

`require('thought-stream/plugins/retro')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `cm_doge` | Durdraw art (79×23, 4 frames). | 4 | 500 ms | 79×23 | `plugins/catalog/cm-doge` |
| `cm_eye` | Durdraw art (79×23, 16 frames). | 16 | 100 ms | 79×23 | `plugins/catalog/cm-eye` |
| `dogeblink` | Durdraw art (80×23, 4 frames). | 4 | 167 ms | 80×23 | `plugins/catalog/dogeblink` |
| `dopehax` | Durdraw art (79×23, 5 frames). | 5 | 83 ms | 79×23 | `plugins/catalog/dopehax` |
| `dur_welcome1` | Durdraw art (80×24, 101 frames). | 101 | 50 ms | 80×24 | `plugins/catalog/dur-welcome1` |
| `dur_welcome2` | Durdraw art (80×21, 82 frames). | 82 | 50 ms | 80×21 | `plugins/catalog/dur-welcome2` |
| `dur_welcome3` | Durdraw art (80×26, 90 frames). | 90 | 50 ms | 80×26 | `plugins/catalog/dur-welcome3` |
| `durdraw_2_neon` | Official Durdraw neon logo in CP437/Unicode ANSI demoscene art. | 101 | 34 ms | 80×24 | `plugins/catalog/durdraw-2-neon` |
| `durdraw_3_neon` | Durdraw art (80×24, 101 frames). | 101 | 34 ms | 80×24 | `plugins/catalog/durdraw-3-neon` |
| `durdraw_neon` | Official Durdraw neon logo in CP437/Unicode ANSI demoscene art. | 101 | 34 ms | 80×24 | `plugins/catalog/durdraw-neon` |
| `durdraw_plasma` | Demoscene psychedelic plasma animation in 256-color ANSI from Durdraw | 90 | 50 ms | 80×26 | `plugins/catalog/durdraw-plasma` |
| `file_id` | Durdraw art (80×26, 1 frames). | 1 | 125 ms | 80×26 | `plugins/catalog/file-id` |
| `indyz_linuxfire` | The Linux wordmark burning in pixel flames — Durdraw example art by indyZ. | 3 | 91 ms | 80×23 | `plugins/catalog/indyz-linuxfire` |
| `indyz_space_shaman` | A blue-helmeted space shaman against the stars — Durdraw example art by indyZ. | 5 | 143 ms | 80×26 | `plugins/catalog/indyz-space-shaman` |
| `indyz_xmas` | A Christmas tree beside a glowing fireplace — Durdraw example art by indyZ. | 12 | 143 ms | 87×25 | `plugins/catalog/indyz-xmas` |
| `inferno` | Hell's inferno, the hidden "heat code" easter egg of Durdraw. | 30 | 100 ms | 94×34 | `plugins/catalog/inferno` |
| `mane` | ASCII line art with a flowing mane — Durdraw example art. | 2 | 111 ms | 79×23 | `plugins/catalog/mane` |
| `rain` | Light ASCII rain — Durdraw example art. | 5 | 125 ms | 79×23 | `plugins/catalog/rain` |
| `tux_pizza` | Tux the penguin and pizza slices on a teal grid — Durdraw example art by indyZ. | 15 | 59 ms | 83×30 | `plugins/catalog/tux-pizza` |

## space

`require('thought-stream/plugins/space')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `cosmic_singularity` | The definitive ThoughtStream showcase: 4-act animation covering all 48 SDK surfaces. Gravitational collapse → hybrid Braille/Block fusion → 60 FPS event horizon HUD → supernova credits. | 686 | 50 ms | 52×14 | `plugins/catalog/cosmic-singularity` |
| `pulsar_core` | Magnetized rotating neutron star with sweeping synchrotron radiation jets and dipole field loops. | 60 | 50 ms | 48×13 | `plugins/catalog/pulsar-core` |

## terminal-fx

`require('thought-stream/plugins/terminal-fx')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `api_latency` | Dashboard de latencia de endpoints API con barras proporcionales. | 6 | 200 ms | 27×1 | `plugins/catalog/api-latency` |
| `bandwidth_meter` | Medidor de ancho de banda subida/bajada con barras animadas. | 9 | 150 ms | 38×1 | `plugins/catalog/bandwidth-meter` |
| `bar_race` |  | 10 | 62.5 ms | 20×1 | `plugins/catalog/bar-race` |
| `boot_sequence` | Secuencia de arranque de sistema detectando hardware. | 10 | 200 ms | 32×1 | `plugins/catalog/boot-sequence` |
| `bounce_ball` |  | 16 | 62.5 ms | 9×1 | `plugins/catalog/bounce-ball` |
| `brute_force_leak` | Cinematic brute-force decryption with frame-precise burst, crawl, and pause timing. | 16 | 450 ms | 45×1 | `plugins/catalog/brute-force-leak` |
| `build_compile` | Build compilation progress 12 frames | 12 | 100 ms | 17×1 | `plugins/catalog/build-compile` |
| `competition_bars` |  | 19 | 62.5 ms | 48×1 | `plugins/catalog/competition-bars` |
| `cpu_cores` | Uso de cada núcleo de CPU con barras individuales. | 8 | 200 ms | 32×1 | `plugins/catalog/cpu-cores` |
| `cpu_spike` | CPU spike monitor 10 frames | 10 | 80 ms | 18×1 | `plugins/catalog/cpu-spike` |
| `deploy_pipeline` | Pipeline CI/CD: build → test → scan → deploy. | 13 | 200 ms | 32×1 | `plugins/catalog/deploy-pipeline` |
| `digital_clock` |  | 12 | 62.5 ms | 12×1 | `plugins/catalog/digital-clock` |
| `docker_build` | Build de imagen Docker capa por capa. | 10 | 180 ms | 30×1 | `plugins/catalog/docker-build` |
| `docker_pull` | Docker pull simulation 7 frames | 7 | 120 ms | 19×1 | `plugins/catalog/docker-pull` |
| `equalizer_bars` |  | 12 | 62.5 ms | 15×1 | `plugins/catalog/equalizer-bars` |
| `git_push` | Git push progress 8 frames | 8 | 180 ms | 16×1 | `plugins/catalog/git-push` |
| `hacker_manifesto` | The Mentor's Hacker Manifesto (1986) typed live — terminal cadence at 2am. | 32 | 120 ms | 80×1 | `plugins/catalog/hacker-manifesto` |
| `heartbeat_line` |  | 12 | 62.5 ms | 9×1 | `plugins/catalog/heartbeat-line` |
| `k8s_pods` | Pods de Kubernetes arrancando de Pending a Running a Ready. | 9 | 250 ms | 30×1 | `plugins/catalog/k8s-pods` |
| `loading_dots` |  | 10 | 62.5 ms | 9×1 | `plugins/catalog/loading-dots` |
| `matrix_glitch` |  | 13 | 62.5 ms | 28×1 | `plugins/catalog/matrix-glitch` |
| `matrix_reboot` | The Matrix rebooting — glitch artifacts, the choice, Neo awakens. | 20 | 120 ms | 53×1 | `plugins/catalog/matrix-reboot` |
| `neon_sign` | Neon bar sign flickers to life — letter by letter, buzz, flicker, and full glow. | 20 | 180 ms | 67×1 | `plugins/catalog/neon-sign` |
| `network_io` | Network IO monitor 8 frames | 8 | 100 ms | 21×1 | `plugins/catalog/network-io` |
| `nuclear_core` | El Reactor de Fusión de Datos. Núcleo de plasma elástico y destellos simétricos. | 8 | 70 ms | 39×1 | `plugins/catalog/nuclear-core` |
| `packet_flow` | Paquete viajando de SRC a DST a través de la red. | 7 | 100 ms | 23×1 | `plugins/catalog/packet-flow` |
| `password_forge` | Password creation — weak to fortress, entropy meter, crack-time punchline. | 19 | 200 ms | 76×1 | `plugins/catalog/password-forge` |
| `ping_seq` | Secuencia de ping a 8.8.8.8 con tiempos de respuesta realistas. | 7 | 250 ms | 46×1 | `plugins/catalog/ping-seq` |
| `ping_sweep` | Ping sweep con confirmación 8 frames | 8 | 120 ms | 12×1 | `plugins/catalog/ping-sweep` |
| `plasma_bolt` | La Barra de Carga Overclock Eléctrica. Barra densa potenciada con estática y rayos. | 8 | 60 ms | 43×1 | `plugins/catalog/plasma-bolt` |
| `port_scan` | Escaneo de puertos mostrando servicios abiertos y cerrados. | 9 | 200 ms | 29×1 | `plugins/catalog/port-scan` |
| `progress_fill` |  | 21 | 62.5 ms | 22×1 | `plugins/catalog/progress-fill` |
| `pulse_ring` |  | 9 | 62.5 ms | 15×1 | `plugins/catalog/pulse-ring` |
| `satellite_ping` | La Transmisión Satelital / Escáner de Frecuencias. Ondas de propagación simétricas. | 12 | 110 ms | 37×1 | `plugins/catalog/satellite-ping` |
| `scan_line` |  | 9 | 62.5 ms | 20×1 | `plugins/catalog/scan-line` |
| `shooting_star` |  | 16 | 62.5 ms | 21×1 | `plugins/catalog/shooting-star` |
| `sinewave` | El Cargador Sísmico / Osciloscopio. Señal de audio o pulso eléctrico. | 6 | 80 ms | 11×1 | `plugins/catalog/sinewave` |
| `ssh_connect` | SSH connection progress 8 frames | 8 | 150 ms | 16×1 | `plugins/catalog/ssh-connect` |
| `submarine_sonar` | Submarine sonar — ping, passive contact, bearing resolution, battle stations. | 23 | 400 ms | 70×1 | `plugins/catalog/submarine-sonar` |
| `temperature_gauge` | Temperatura de CPU subiendo hasta el límite y bajando. | 8 | 200 ms | 33×1 | `plugins/catalog/temperature-gauge` |
| `terminal_type` |  | 18 | 62.5 ms | 8×1 | `plugins/catalog/terminal-type` |
| `test_runner` | Suite de tests corriendo con resultado mix pass/fail. | 9 | 180 ms | 32×1 | `plugins/catalog/test-runner` |
| `text_appear` |  | 14 | 62.5 ms | 11×1 | `plugins/catalog/text-appear` |
| `text_reveal` |  | 7 | 62.5 ms | 11×1 | `plugins/catalog/text-reveal` |
| `three_dots` |  | 9 | 62.5 ms | 3×1 | `plugins/catalog/three-dots` |
| `typewriter` | Efecto máquina de escribir tecleando Hello, World! con cursor. | 16 | 100 ms | 16×1 | `plugins/catalog/typewriter` |
| `voting_bars` |  | 14 | 62.5 ms | 17×1 | `plugins/catalog/voting-bars` |
| `vpn_connect` | Handshake VPN con intercambio de claves y tunnel establecido. | 9 | 200 ms | 29×1 | `plugins/catalog/vpn-connect` |
| `wave_text` |  | 7 | 62.5 ms | 10×1 | `plugins/catalog/wave-text` |

## text

`require('thought-stream/plugins/text')`

| Name | Description | Frames | Interval | Size | File |
| --- | --- | ---: | ---: | ---: | --- |
| `text-reveal` | Texto estático a la izquierda con puntos progresivos (. .. ...) a 400ms | 4 | 400 ms | 11×1 | `plugins/text-reveal` |
