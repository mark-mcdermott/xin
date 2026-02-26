![Claude Generated](https://img.shields.io/badge/Claude-Generated-db7758.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTYgMTI3Ij48cGF0aCBmaWxsPSIjZGI3NzU4IiBkPSJNOTcuOTUgOTEuNTlsLTM5Ljg4LS4wNHYyOC43N2wtMTMuMzIuMDctLjAyLTI4LjgtMTMuMjctLjAyLS4wMiAyOC44SDE4LjExdi01Ny42M2wtMTMuMjYtLjAzLS4wMi0yOC44MSAxMy4zMS0uMDYuMDgtMjguNzRoMTE5LjcxdjI4LjY4bDEzLjI2LjE1djI4LjgxbC0xMy4yNi4wNnY1Ny41NGwtMTMuMy4wMy0uMDItMjguOC0xMy4yOC0uMDN2MjguODFsLTEzLjMzLjAyLS4wMi0yOC44LS4wMi4wMlpNMzAuNTEgNTEuNTJsMTcuOTItNy40LS4xNy02LjE5LTE4LjA0LTcuMzQuMSA2LjI2IDEwLjc0IDQuMjYtMTAuNzUgMy44NS4xOSA2LjU3Wk0xMjUuNzQgNDUuMjdsLTEwLjk5LTMuOTYgMTEuMDUtNC4xLjA0LTYuMjYtMTcuNDggNy4zNS0uMTYgNi4yIDE3LjQgNy4zOWMuMTctMi4zLjI1LTQuMzkuMTMtNi42M1oiLz48L3N2Zz4%3D) [![Tests](https://github.com/mark-mcdermott/xin/actions/workflows/test.yml/badge.svg)](https://github.com/mark-mcdermott/xin/actions/workflows/test.yml) 

<div align="center">
  <h1><img src="src/renderer/assets/pink-and-gray-mech-right.png" width="35" /> Xin</h1> 
  <p>A desktop mac app for note-taking and publishing blog posts</p>
</div>

https://github.com/user-attachments/assets/f0e51ec8-fdf1-4676-ae60-e9661869eac6

## Features

### Note-taking Features
- your notes are saved to `.md` files on your computer
- `#tags`: categorize notes by topic/status
- `[[internal links]]`: Clicked internal links go to a note of that title and create it if it doesn't exist
- markdown: `# headers`, `[external links](https://url.com)`, `**bold**`, `*italic*`, `- bullet lists`, etc should all work as expected
- daily notes: each day starts with a blank note where you can write stream-of-consciousness style all day in one place, tagging each section of the note for easy access later by category.
- Xin runs spell check and grammar check automatically

### Blog CMS
- draft blog posts two ways, even in your daily note
  - `===` followed by enter creates blank post template
  - `@<your blog name> post` is an even quicker way to start a post
- both methods show a rocket icon button that will publish the post instantly and show progress bar of publish status
- easily specify which blog to send a post to, if you have more than one blog
- import and sync all your blog's posts for full CMS edit and delete post functionality

## Quick Start
1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/mark-mcdermott/xin.git
   cd xin
   pnpm install
   ```
2. Build the app:
   ```bash
   pnpm run package
   ```
3. Open the generated `.dmg` from the `release/` folder
4. Drag Xin into your Applications folder
5. Open Xin from Applications

## About

### Motivation
I used to write notes, both personal and work related, in Obsidian. I write everything each day in one daily note, but I need to be able to easily delete an entire tag's content throughout the whole app without losing the rest of the daily notes. I also need a desktop CMS that has one-click publishing with a progress bar. Obsidian sort of did some of this, but not by default and not gracefully. So I built Xin.

### Vibe Coded
I vibe coded the Xin MVP in Claude over two weeks of evenings and weekends. Over the next month I used Claude and added more features, refined micro-interactions, etc. The process taught me a lot about TypeScript, Electron, CodeMirror and coding for e-commerce.

### Support
If you wear clothes or know someone who does, please buy a comfy Xin hoodie in the in-app store (click the cart icon in the left sidebar). Or buy me a coffee in-app or file a bug report (click the gear icon towards the bottom). Starring this repo also helps, as would contributing any code for bugfixes or new features.

### Documentation
Xin has detailed in-app documentation. Click the book icon in the left sidebar.

### Roadmap
I'll be rebuilding Xin from scratch on the `rebuild` branch without Claude, just to learn more and have a cleaner, more logical and more secure codebase.
Possible other future plans:
- adaptors for publishing to blog platforms besides Cloudflare Pages (only if other people need them--I don't)
- Xin web and mobile apps with cross-platform content sync
- landing page website
- a spinoff featuring Pedro Pascal

### License
[MIT](LICENSE)