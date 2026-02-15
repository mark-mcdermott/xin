![100% vibe coded](https://img.shields.io/badge/100%25-vibe%20coded-db7758.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTYgMTI3Ij48cGF0aCBmaWxsPSIjZGI3NzU4IiBkPSJNOTcuOTUgOTEuNTlsLTM5Ljg4LS4wNHYyOC43N2wtMTMuMzIuMDctLjAyLTI4LjgtMTMuMjctLjAyLS4wMiAyOC44SDE4LjExdi01Ny42M2wtMTMuMjYtLjAzLS4wMi0yOC44MSAxMy4zMS0uMDYuMDgtMjguNzRoMTE5LjcxdjI4LjY4bDEzLjI2LjE1djI4LjgxbC0xMy4yNi4wNnY1Ny41NGwtMTMuMy4wMy0uMDItMjguOC0xMy4yOC0uMDN2MjguODFsLTEzLjMzLjAyLS4wMi0yOC44LS4wMi4wMlpNMzAuNTEgNTEuNTJsMTcuOTItNy40LS4xNy02LjE5LTE4LjA0LTcuMzQuMSA2LjI2IDEwLjc0IDQuMjYtMTAuNzUgMy44NS4xOSA2LjU3Wk0xMjUuNzQgNDUuMjdsLTEwLjk5LTMuOTYgMTEuMDUtNC4xLjA0LTYuMjYtMTcuNDggNy4zNS0uMTYgNi4yIDE3LjQgNy4zOWMuMTctMi4zLjI1LTQuMzkuMTMtNi42M1oiLz48L3N2Zz4%3D) [![Tests](https://github.com/mark-mcdermott/xun/actions/workflows/test.yml/badge.svg)](https://github.com/mark-mcdermott/xun/actions/workflows/test.yml) 

<div align="center">
  <h1><img src="src/renderer/assets/pink-and-gray-mech-right.png" width="35" /> Xun</h1>
  <p>A desktop mac app for note-taking and publishing blog posts</p>
</div>

## Features

### Note-taking Features
- your notes that are saved to `.md` files on your computer
- `#tags`: categorize notes by topic/status
- `[[internal links]]`: Clicked internal links go to a note of that title and create it if it doesn't exist
- markdown: `# headers`, `[external links](https://url.com)`, `**bold**`, `*italic*`, `- bullet lists`, etc should all work as expected
- daily notes: each day starts with a blank note where you can write stream-of-consciousness style all day in one place, tagging each section of the note for easy access later by category.
- Xun runs spell check and grammar check automatically

### Blog CMS
- draft blog posts two ways, even in your daily note
  - `===` followed by enter creates blank post template
  - `@<your blog name> post` is an even quicker way to start a post
- both methods show a rocket icon button that will publish the post instantly and show progress bar of publish status
- easily specify which blog to send a post to, if you have more than one blog
- import and sync all your blog's posts for full CMS edit and delete post functionality

## Quick Start
1. Download the latest `.dmg` under Releases in the right sidebar of the GitHub repo
2. Open the `.dmg` file
3. Drag Xun into your Applications folder
4. Open Xun from Applications
5. On first launch, macOS may block it — go to System Settings → Privacy & Security and click "Open Anyway"

## About

### Why I Built Xun
I used to write notes, both personal and work related, in Obsidian. I write everything each day in one daily note, but I need to be able to easily delete an entire tag's content throughout the whole app without losing the rest of the daily notes. I also need a desktop CMS that has one-click publishing with a progress bar. Obsidian sort of did some of this, but not by default and not gracefully. So I built Xun.

### Pure Vibes
I vibe coded the Xun MVP in Claude over two weeks of evenings and weekends. Over the next month I used Claude and added more features, refined micro-interactions, etc. The process taught me a lot about TypeScript, Electron, CodeMirror and coding for e-commerce.

### Support The Project
If you wear clothes or know someone who does, please buy a comfy Xun hoodie in the in-app store (click the cart icon in the left sidebar). Or buy me a coffee in-app or file a bug report (click the gear icon towards the bottom). Starring this repo also helps, as would contributing any code for bugfixes or new features.

### Documentation
Xun has detailed in-app documentation. Click the book icon in the left sidebar.

### Roadmap
I'll start work on the `rebuild` branch soon, redoing Xun from scratch without Claude just to learn more.
Possible other future plans:
- adaptors for publishing to blog platforms besides Cloudflare Pages (only if other people need them--I don't)
- Xun web and mobile apps with cross-platform content sync
- landing page website
- a spinoff featuring Pedro Pascal

### License
[MIT](https://opensource.org/license/mit), see included `LICENSE.md`