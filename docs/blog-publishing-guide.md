# Blog Publishing Guide

Xun can publish blog posts directly to static site blogs hosted on GitHub with Cloudflare Pages deployment.

## Creating a Blog Post

Type `===` and press Enter to insert a blog post template:

```markdown
===
---
blog: ""
title: ""
subtitle: ""
publishDate: "2026-01-03"
tags: [""]
---

Your blog content here...
===
```

## Frontmatter Fields

| Field | Description |
|-------|-------------|
| `blog` | Name of the blog to publish to (must match a blog configured in Settings) |
| `title` | Post title - also determines the filename (e.g., "My Post" → `my-post.md`) |
| `subtitle` | Short subtitle for SEO/previews |
| `publishDate` | Publication date in YYYY-MM-DD format (auto-filled with today's date) |
| `tags` | Array of tags for the post |
| `slug` | Auto-set after publish - tracks filename for rename detection |
| `published` | Auto-set to `true` after successful publish |

## Tag Format (Standard Frontmatter)

Tags use YAML array format with quoted strings:

```yaml
tags: ["javascript"]              # one tag
tags: ["js", "react"]             # two tags
tags: ["web development"]         # one multi-word tag
tags: ["how to", "tutorial"]      # two tags, first has a space
```

- Each quoted string is one tag
- Commas separate tags (spaces after commas are optional)
- Quotes preserve spaces for multi-word tags

## @ Post Format (Alternative)

Instead of the `=== ... ===` block format, you can use the @ decorator format for a more compact syntax:

```markdown
@myblog post
@title My Blog Post Title
@subtitle A short description
@tags javascript, react, webdev
@publishDate 2026-01-04

Your blog content here...
---
```

### @ Decorator Fields

| Field | Description |
|-------|-------------|
| `@blogname post` | Start a post for the named blog (must match Settings) |
| `@title` | Post title (required) |
| `@subtitle` | Short subtitle for SEO/previews |
| `@publishDate` | Publication date (YYYY-MM-DD). If omitted, uses current date |
| `@tags` | Comma-separated list of tags (one word each, spaces ignored) |
| `@slug` | Auto-set after publish |
| `@published` | Auto-set to `true` after successful publish |

### @ Tags Format

The `@tags` field accepts a simple comma-separated list:

```markdown
@tags javascript, react, tutorial
```

- Tags are separated by commas
- Spaces around tags are ignored
- Only single-word tags are supported
- Square brackets and quotes are optional and will be stripped

## Publishing Workflow

1. **Write your post** inside the `=== ... ===` block
2. **Fill in the frontmatter** (blog name, title, etc.)
3. **Click the rocket icon** next to "blog post" header
4. **Watch the progress popup** - shows preparing, pushing, building, deploying
5. **Green checkmark appears** when published successfully

## Republishing

To update an already-published post:

1. Make your edits to the content
2. Click the **green checkmark** - it switches to a rocket icon
3. Click the **rocket** to republish
4. The post overwrites the previous version

**Title changes are handled automatically:** If you change the title, the old file is deleted and a new one is created with the new name. The `slug` field in frontmatter tracks the original filename.

## Two Publishing Methods

### 1. Direct Publishing (Blog Block)

- Write a standalone post in a `=== ... ===` block
- Publish that exact content
- Best for: writing a complete blog post from scratch

### 2. Tag-Based Publishing

- Tag sections across multiple daily notes with `#my-topic`
- Go to Tags sidebar → click the tag → click Publish
- All content tagged with `#my-topic` gets aggregated into one post
- Best for: collecting scattered notes/thoughts into a cohesive post

Example of tagged sections in daily notes:

```markdown
// In 2026-01-01.md
#my-project
Started building the authentication system today...
---

// In 2026-01-02.md
#my-project
Added OAuth support and fixed the login bug...
---

// In 2026-01-03.md
#my-project
Finished testing, ready for deployment.
---
```

Then publish all `#my-project` content as a single blog post from the tag view.

## Tag Section Format

For tag-based publishing, sections are delimited by:

- **Opening:** `#tag-name` on its own line
- **Closing:** `---` (three dashes) OR another `#tag` OR end of file

The `---` separator is optional if the tagged content goes to the end of the file.
