# Third-party notices

thought-stream is released under the MIT licence (see [LICENSE](LICENSE)). The package also contains the third-party
material listed below, which keeps its own licence and credits. Nothing here changes the licence of the rest of the package.

## Durdraw example artworks — BSD 3-Clause

[Durdraw](https://durdraw.org/) is a terminal ASCII/ANSI art editor and animator by Sam Foster
([source repository](https://github.com/durdraw/durdraw)). Its repository contains animations in the `.dur` format
(the `examples/` folder, and `help/inferno.dur` inside the `durdraw` package folder).
The following plugins of the `retro` category were converted, frame by frame, from those files
(the converter recorded a SHA-1 of each source file; they match the files in the repository):

| Plugin | Converted from (Durdraw repository) |
| --- | --- |
| `cm_doge` | `examples/cm-doge.dur` |
| `cm_eye` | `examples/cm-eye.dur` |
| `dogeblink` | `examples/dogeblink.dur` |
| `dopehax` | `examples/dopehax.dur` |
| `dur_welcome1` | `examples/dur-welcome1.dur` |
| `dur_welcome2` | `examples/dur-welcome2.dur` |
| `dur_welcome3` | `examples/dur-welcome3.dur` |
| `file_id` | `examples/file_id.dur` |
| `indyz_linuxfire` | `examples/indyz-linuxfire.dur` |
| `indyz_space_shaman` | `examples/indyz-space-shaman.dur` |
| `indyz_xmas` | `examples/indyz-xmas.dur` |
| `tux_pizza` | `examples/tux-pizza.dur` |
| `mane` | `examples/mane.dur` |
| `rain` | `examples/rain.dur` |
| `inferno` | `durdraw/help/inferno.dur` |
| `durdraw_2_neon` | `examples/dur-welcome1.dur`, with its own frame timing |

The Durdraw project credits the following ANSI and ASCII artists: `cmang`, `H7`, `LDA`, `HK` and `LnLcFlx`.
Four of the pieces carry the name `indyZ`, in the file name or signed inside the artwork: `indyz_linuxfire`, `indyz_space_shaman`, `indyz_xmas` and `tux_pizza`.
Apart from those signatures, this notice does not attribute any work to any artist; for that, please consult the Durdraw project.

The Durdraw licence, reproduced as its terms require:

```text
BSD 3-Clause License

Copyright (c) 2009-2026, Sam Foster

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

thought-stream is an independent project. It is not affiliated with, endorsed by or sponsored by Durdraw, Sam Foster or any of the artists
named above; their names appear only to give credit. If you are an author and would like your credit worded differently, or a work
removed, please [open an issue](https://github.com/dennysjmarquez/thought-stream/issues) and it will be handled promptly.
