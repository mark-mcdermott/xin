# Xin Notes

[![Tests](https://github.com/mark-mcdermott/xin/actions/workflows/test.yml/badge.svg)](https://github.com/mark-mcdermott/xin/actions/workflows/test.yml)

<div align="center">
  <img src="src/renderer/assets/pink-and-gray-mech-right.png" width="75" />
  <h1>Xin</h1>
  <p>A desktop mac app for note-taking and publishing blog posts</p>
  <p>100% vibe coded and not heavily reviewed/hardened. Use at your own risk!!</p>
</div>

## Quick Start

1. Download the latest `.dmg` file from GitHub Releases
2. Open the `.dmg` file
3. Drag Xin into your Applications folder
4. Open Xin from Applications
5. On first launch, macOS may block it — go to System Settings → Privacy & Security and click "Open Anyway"

## Features

### Note-taking
- Like Obsidian, you can write notes in live preview markdown style and they are saved to `.md` files on your computer.
- Unlike Obsidian, Xin for note-taking is very simple and only does a few things (but tries to do them well):
  - `#tags`: tags in Xin start with a `#` and categorize your notes by topic
  - `[[internal links]]`: internal links in Xin have the `[[<note name>]]` format. A clicked internal link will take you to that note or create it if it doesn't exist.
  - markdown support: `# headers`, `[external links](https://url.com)`, `**bold**`, `*italic*`, `- bullet lists`, etc should all work as expected
  - daily notes: each date a blank note titled with the date is created. You can write stream-of-consciousness style all day in one place, tagging each section of the note for easy access later by category.

### Blog CMS
- Xin makes it easy to quickly draft or write full blog posts throughout your day, without logging into a separate system or even navigate away from what you're doing.
- You can even write a blog post inside your daily note, without messing up the rest of your notes for that day.
- Xin has two ways to start a blog post in your daily note or anywhere else:
  - type `===` and hit enter and you have a blank post template to fill in
  - or type `@<your blog name> post`, then write your post and when you're done type `---` and hit enter to fence it off from your other writings in the same note
  - either post style will show a rocket icon you can click to instantly publish to your blog
- For the above to work, you have to fill in your blog site details in the Settings page. Only markdown-style static site blogs are supported and must have their own github repo and must be hosted on CloudFlare Pages (free). It's a workflow I've come to love over time, so that's how I set it up. If others want adaptors for other blog hosts, it's always a possibility down the road.
- Xin supports multiple blogs and multiple blog sites. If you have more than one blog you publish to, you can easily specify which blog each post will publish to. 
- You can easily edit old blog posts with Xin. It supports full importing/syncing of all your blog's posts.

## Why Build Xin (For Notes)?
I've used Obsidian and Notion on and off for years for daily notes for work and programming learning. At one point, I wanted to write both work and personal notes in my daily note, but wanted to be able to easily delete an entire tag an have all writings tagged with that tag to dissapear without breaking the other parts of my daily notes that had other tags. At that time, Obsidian couldn't do that easily (I believe it's possible now with extensions, etc), so I built this. I wanted to be able to write notes I could keep forever but be able to quickly delete all work notes if I got another computer or left my job or something like that. So I built Xin and love it and use it everyday.

## Why Build Xin (As A CMS)?
I've liked the idea of a desktop blog post publishing app for a long time. I looked into what was availble and there wan't much and what there was I didn't really like. I looked into Obsidian as CMS, but thought I needed more of a "one-click publish" features with a progress bar showing the publish status. So I built this and use it for blog post publishing all the time.

## The Xin Story
I vibe coded a working version of this in Claude over two weeks of evening/weekend work. Then over the next month I vibe coded refinements in the micro-interactions, added more features, etc. to get this project to where it is now. It was my first vibe-coded application done to this level of detail and usability. I learned a lot about Electron, TypeScript, CodeMirror, e-commerce and a lot more. I do plan to slowly rebuild this by hand to drill down and learn more.

## Support The Project
Do you wear clothes or know someone who does? If so, consider buying a comfy Xin hoodie and supporting this project. There is a cart button in the app where you can see the hoodies and stickers with the cool, quirky Xin mech logo. There is also a place there to just buy me a coffee or file a bug report if you feel so inclined. Starring the repo in Github is a free way to support the project, as well as any contributing code for any new features you might have in mind.

## More Info
Xin has detailed documentation in-app. Click the book icon in the left sidebar.