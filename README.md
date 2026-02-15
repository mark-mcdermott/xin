[![Tests](https://github.com/mark-mcdermott/xun/actions/workflows/test.yml/badge.svg)](https://github.com/mark-mcdermott/xun/actions/workflows/test.yml) 

<div align="center">
  <img src="src/renderer/assets/pink-and-gray-mech-right.png" width="50" />
  <h1>Xun</h1>
  <p>A desktop mac app for note-taking and publishing blog posts</p>
  <p><em>Vibe coded--use at your own risk!!</em></p>
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