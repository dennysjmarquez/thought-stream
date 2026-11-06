# Security policy

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Use GitHub's private reporting instead: open the **Security** tab of this repository and choose **Report a vulnerability**
([direct link](https://github.com/dennysjmarquez/thought-stream/security/advisories/new)). You will get an answer there, and nothing is made public until a fix is released.

## Supported versions

Only the latest release of `thought-stream` receives fixes.

## What is in scope

`thought-stream` is a client-side animation library. It renders the frames you give it; in the browser the text is HTML-escaped before it
becomes markup. It makes no network request and reads no file on its own: the only code paths that do are
`ThoughtStream.importDur()` / `importArt()` when *you* hand them a URL or (in Node) a file path, and those enforce size limits.

Reports about the published package contents, the integrity of a release, a way to inject markup through a frame, or a way to make the
library fetch or read something you did not ask for are all welcome.
