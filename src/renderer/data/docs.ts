// Documentation structure and content for Xin

export interface DocSection {
  id: string;
  title: string;
  children?: DocSection[];
}

export interface DocPage {
  id: string;
  title: string;
  content: string;
}

// Tree structure for navigation
export const docsTree: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    children: [
      { id: 'overview', title: 'Overview' },
      { id: 'quick-start', title: 'Quick Start' },
    ],
  },
  {
    id: 'daily-notes',
    title: 'Daily Notes',
    children: [
      { id: 'daily-notes-intro', title: 'Introduction' },
      { id: 'file-format', title: 'File Format' },
      { id: 'markdown-support', title: 'Markdown Support' },
      { id: 'wikilinks', title: 'Wikilinks' },
      { id: 'tips-workflows', title: 'Tips & Workflows' },
    ],
  },
  {
    id: 'tags',
    title: 'Tags',
    children: [
      { id: 'tag-syntax', title: 'Tag Syntax' },
      { id: 'tag-sections', title: 'Tag Sections' },
      { id: 'viewing-tags', title: 'Viewing Tagged Content' },
      { id: 'deleting-tags', title: 'Deleting Tagged Content' },
    ],
  },
  {
    id: 'blog-publishing',
    title: 'Blog Publishing',
    children: [
      { id: 'blog-overview', title: 'Overview' },
      { id: 'setting-up-blog', title: 'Setting Up a Blog' },
      { id: 'env-auto-setup', title: 'Auto-Setup from .env' },
      { id: 'writing-posts', title: 'Writing Blog Posts' },
      { id: 'publishing', title: 'Publishing' },
      { id: 'multiple-blogs', title: 'Multiple Blogs' },
    ],
  },
  {
    id: 'cms',
    title: 'CMS Features',
    children: [
      { id: 'remote-posts', title: 'Remote Post Management' },
      { id: 'editing-posts', title: 'Editing Published Posts' },
      { id: 'drafts', title: 'Draft Management' },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    children: [
      { id: 'vault-management', title: 'Vault Management' },
      { id: 'blog-config', title: 'Blog Configuration' },
      { id: 'github-setup', title: 'GitHub Setup' },
      { id: 'cloudflare-setup', title: 'Cloudflare Pages Setup' },
    ],
  },
];

// Documentation content
export const docPages: Record<string, DocPage> = {
  // Getting Started
  overview: {
    id: 'overview',
    title: 'Overview',
    content: `# Welcome to Xin

Xin is a lightweight desktop note-taking, journaling, and blog publishing application. It's designed for a specific workflow: daily notes with tag-based organization and integrated blog publishing.

## Philosophy

Xin is opinionated and streamlined. Rather than trying to be everything to everyone, it focuses on doing a few things well:

- [Daily notes](doc:daily-notes-intro) as the primary way to capture thoughts
- [Tags](doc:tag-syntax) to organize and filter content across notes
- [One-click publishing](doc:publishing) to your blog hosted on GitHub and Cloudflare Pages

## Key Features

### Mix Work and Personal Notes

Use tags to seamlessly mix different types of content in your daily notes. When you leave a job or finish a project, [delete all content for that tag](doc:deleting-tags) with just a couple of clicks.

### Blog from Your Notes

[Write blog posts](doc:writing-posts) directly in your daily notes using a simple format. Publish them with one click to any of your configured blogs.

### Multiple Blogs

Xin supports [multiple blogs](doc:multiple-blogs). When you create a blog post, simply select which blog it should be published to.

### GitHub + Cloudflare Pages

Xin is built specifically for blogs hosted on [GitHub](doc:github-setup) and deployed via [Cloudflare Pages](doc:cloudflare-setup). This opinionated approach means less configuration and a streamlined publishing experience.`,
  },

  'quick-start': {
    id: 'quick-start',
    title: 'Quick Start',
    content: `# Quick Start Guide

Get up and running with Xin in just a few minutes.

## 1. Create Your First Daily Note

Click the "Today" button (the page icon at the top of the far left sidebar) to create today's daily note. Start writing!

## 2. Add [Tags](doc:tag-syntax) to Organize Content

Add tags to your notes to organize content:

\`\`\`
#work

Standup notes:
- API refactor is almost done, PR ready for review
- Sarah is blocked on the auth issue, waiting on DevOps
- Sprint ends Friday, need to wrap up the dashboard tickets

#personal

Need to call mom for her birthday Sunday
Pick up dry cleaning before 6pm
Look into flights for thanksgiving
\`\`\`

## 3. [Set Up a Blog](doc:setting-up-blog) (Optional)

If you want to publish blog posts:

1. Go to Settings (gear icon at the bottom of the inner-left sidebar)
2. Click "Add Blog"
3. Enter your GitHub repository details
4. Optionally add Cloudflare Pages configuration

## 4. [Write](doc:writing-posts) and [Publish](doc:publishing) a Blog Post

In any daily note, create a blog post:

\`\`\`
===
---
title: "My First Post"
subtitle: "Getting started with Xin"
date: "2024-01-15"
tags: ["intro", "xin"]
---

This is my first blog post written in Xin!

===
\`\`\`

Click the publish icon next to the post to send it to your blog.`,
  },

  // Daily Notes
  'daily-notes-intro': {
    id: 'daily-notes-intro',
    title: 'Daily Notes Introduction',
    content: `# Daily Notes

Daily notes are the heart of Xin. Each day gets its own note, automatically named with the date (YYYY-MM-DD format).

## Why Daily Notes?

Daily notes provide a natural way to capture thoughts, tasks, and ideas as they happen. Instead of organizing by topic upfront, you write first and organize later with [tags](doc:tag-syntax).

## Creating Daily Notes

To create today's daily note, click the page icon at the top of the far-left sidebar. The file is saved in the \`daily-notes\` folder of your vault.

## Structure

A typical daily note might look like this:

\`\`\`markdown
# 2024-01-15

#work

- Finished the API refactor
- Code review for PR #123

---

#personal

- Call dentist for appointment
- Pick up groceries

---

#blog

===
---
title: "Working with APIs"
---
Today I learned about...
===
\`\`\`

The \`---\` separators divide content into [tagged sections](doc:tag-sections) that can be viewed and managed independently.`,
  },

  'file-format': {
    id: 'file-format',
    title: 'File Format',
    content: `# File Format

Understanding how Xin stores your daily notes.

## File Naming

Daily notes are automatically named using the ISO date format:

\`\`\`
YYYY-MM-DD.md
\`\`\`

For example:
- \`2024-01-15.md\`
- \`2024-12-31.md\`

This format ensures notes sort chronologically in any file browser.

## Storage Location

All daily notes are stored in the \`daily-notes\` folder inside your vault:

\`\`\`
YourVault/
  daily-notes/
    2024-01-15.md
    2024-01-16.md
    2024-01-17.md
\`\`\`

## File Contents

Each note is a plain Markdown file. You can open and edit these files with any text editor if needed.

The first line is typically a heading with the date, followed by your tagged content sections.`,
  },

  'markdown-support': {
    id: 'markdown-support',
    title: 'Markdown Support',
    content: `# Markdown Support

Xin uses standard Markdown syntax for formatting your notes.

## Basic Formatting

- **Bold** - \`**text**\` or \`__text__\`
- *Italic* - \`*text*\` or \`_text_\`
- ~~Strikethrough~~ - \`~~text~~\`

## Headings

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
\`\`\`

## Lists

\`\`\`markdown
- Unordered item
- Another item

1. Ordered item
2. Another item
\`\`\`

## Links

\`\`\`markdown
[Link text](https://example.com)
\`\`\`

## Code

Wrap inline code with single backticks: \`code\`

For code blocks, use triple backticks on their own lines before and after your code.

\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Blockquotes

\`\`\`markdown
> This is a quote
\`\`\`

## Horizontal Rules

Use three dashes to create a divider (also used for tag sections):

\`\`\`markdown
---
\`\`\``,
  },

  'wikilinks': {
    id: 'wikilinks',
    title: 'Wikilinks',
    content: `# Wikilinks

Link between your notes using \`[[note name]]\` syntax, inspired by Obsidian.

## Creating a Wikilink

Type \`[[\` to open the autocomplete dropdown, then select a note name. The closing \`]]\` is inserted automatically.

You can also type the full syntax manually:

\`\`\`markdown
Check out [[my other note]] for more details.
\`\`\`

## How They Look

When your cursor is away from a wikilink, the \`[[\` and \`]]\` markers are hidden and the note name is displayed as a styled link. Move your cursor into the wikilink to reveal the full syntax for editing.

## Existing vs Missing Notes

- **Existing notes** appear as accent-colored links, just like tags
- **Missing notes** appear dimmer with a dashed underline, indicating the note doesn't exist yet

## Clicking Wikilinks

Click a wikilink to navigate to that note:

- If the note **exists**, it opens in a new tab
- If the note **doesn't exist**, Xin creates it for you and opens it

## Autocomplete

Typing \`[[\` triggers an autocomplete dropdown showing all notes in your vault. As you type, the list filters to match. Select a note to insert its name with the closing \`]]\`.`,
  },

  'tips-workflows': {
    id: 'tips-workflows',
    title: 'Tips & Workflows',
    content: `# Tips & Workflows

Get the most out of your daily notes with these tips.

## Morning Routine

Start each day by opening today's note and capturing:
- Top priorities for the day
- Any meetings or appointments
- Thoughts from the morning

## Capture Everything

Don't overthink organization. Just write under the appropriate tag and let the tag system handle organization for you.

## Use Consistent Tags

Stick to a small set of tags you use regularly:
- \`#work\` - Professional tasks and notes
- \`#personal\` - Personal life items
- \`#ideas\` - Random thoughts to revisit
- \`#project-name\` - Specific project notes

## End of Day Review

Before closing Xin, scan through what you wrote. This helps reinforce memory and catch any loose ends.

## Weekly Review

Use the [tag browser](doc:viewing-tags) to review what you accomplished each week. This is great for standups, status updates, or personal reflection.

## Blog as You Go

If you have a [blog set up](doc:setting-up-blog), wrap interesting content in [\`===\` blocks](doc:writing-posts) as you write. Publishing becomes effortless since the content is already written.`,
  },

  // Tags
  'tag-syntax': {
    id: 'tag-syntax',
    title: 'Tag Syntax',
    content: `# Tag Syntax

Tags in Xin use a simple format that's easy to type and read.

## Basic Format

Tags start with \`#\` followed by the tag name:

\`\`\`
#work
#personal
#blog
#project-alpha
\`\`\`

## Rules

- Tags must be on their own line
- Tag names can contain letters, numbers, and hyphens
- Tags are case-insensitive (\`#Work\` and \`#work\` are the same)
- Avoid spaces in tag names (use hyphens instead)

## Examples

\`\`\`markdown
#work

Today's tasks:
- Review pull requests
- Update documentation

---

#side-project

Ideas for the weekend project...
\`\`\``,
  },

  'tag-sections': {
    id: 'tag-sections',
    title: 'Tag Sections',
    content: `# Tag Sections

Content in Xin is organized into sections using tags and separators.

## Section Format

A section starts with a tag line and ends at the next separator (\`---\`), at another tag (\`#next-tag\`), or end of file:

\`\`\`markdown
#work

This content belongs to the #work tag.
Multiple paragraphs are fine.

- Lists work too
- Everything until the separator

---

#personal

This is a different section with a different tag.
\`\`\`

## Multiple Tags in One File

You can have as many tagged sections as you want in a single file. This is perfect for daily notes where you mix different types of content.

## Separators

Use three or more hyphens on their own line to separate sections:

\`\`\`
---
\`\`\`

The separator marks the end of one section and prepares for the next.`,
  },

  'viewing-tags': {
    id: 'viewing-tags',
    title: 'Viewing Tagged Content',
    content: `# Viewing Tagged Content

Xin makes it easy to view all content associated with a specific tag across all your notes.

## Tag Browser

Click the Tags icon in the far-left sidebar to open the tag browser. You'll see a list of all tags used in your vault.

## Viewing a Tag

Click any tag to view all content sections tagged with it. The tag view shows:

- All sections from all files with that tag
- The source file path for each section
- Content sorted by date (oldest first)

## Editing in Tag View

You can edit content directly in the tag view. Changes are saved back to the original files.`,
  },

  'deleting-tags': {
    id: 'deleting-tags',
    title: 'Deleting Tagged Content',
    content: `# Deleting Tagged Content

One of Xin's most powerful features is the ability to delete all content for a tag at once.

## Use Case: Work/Personal Separation

Imagine you mix work notes into your daily notes alongside personal content. When you leave your job, you might want to remove all work-related content while keeping everything else.

With Xin, you can:

1. Open the [tag view](doc:viewing-tags) for \`#work\`
2. Click the delete button
3. Confirm the deletion
4. All work content is removed from all files

## How It Works

When you delete a tag's content:

- All sections tagged with that tag are removed from their files
- The tag line itself is removed
- Separators are cleaned up appropriately
- Other content in the same files is preserved

## Warning

**This action is permanent.** Content is deleted from the files, not moved to a trash folder. Make sure you have backups if you're unsure.

## Confirmation Dialog

Before deletion, you'll see a confirmation dialog showing:

- The number of sections that will be deleted
- The number of files that will be modified

Review this carefully before confirming.`,
  },

  // Blog Publishing
  'blog-overview': {
    id: 'blog-overview',
    title: 'Blog Publishing Overview',
    content: `# Blog Publishing Overview

Xin includes a built-in CMS for publishing blog posts to your GitHub-hosted blog.

## The Xin Approach

Xin is opinionated about blog infrastructure:

- [GitHub](doc:github-setup) for content storage
- [Cloudflare Pages](doc:cloudflare-setup) for hosting and deployment

This focused approach means less configuration and a streamlined experience.

## How It Works

1. [Write blog posts](doc:writing-posts) in your daily notes using a special format
2. Click publish to send the post to GitHub
3. Cloudflare Pages automatically deploys your updated site

## Multiple Blogs

Xin supports [multiple blogs](doc:multiple-blogs). [Configure each one](doc:setting-up-blog) in Settings, and when you publish a post, select which blog it should go to.

## Why This Approach?

- **No lock-in**: Your content lives in a standard Git repository
- **Version control**: Full history of all changes
- **Free hosting**: GitHub and Cloudflare Pages are free for most use cases
- **Fast**: Cloudflare's edge network delivers your content quickly`,
  },

  'setting-up-blog': {
    id: 'setting-up-blog',
    title: 'Setting Up a Blog',
    content: `# Setting Up a Blog

Before you can publish, you need to configure at least one blog in Xin.

## Prerequisites

You'll need:

1. A public GitHub repository (or if you're using Cloudflare Pages, the GitHub repo can be public or private)
2. A [GitHub Personal Access Token](doc:github-setup) with repo permissions
3. (Optional) A [Cloudflare Pages project](doc:cloudflare-setup) connected to your repository

## Adding a Blog

1. Open Settings (gear icon in the left sidebar)
2. Scroll to the Blogs section
3. Click "Add Blog"
4. All existing blog posts are fetched and will now show in the inner-left sidebar above the file tree

## Compatibility

Xin works with any static site generator that uses markdown files with YAML frontmatter, including Astro, Jekyll, Hugo, Gatsby, Eleventy, and Next.js.

## Configuration Fields

### Required

- **Blog Name**: A display name for this blog
- **Repository**: Your GitHub repo in \`username/repo\` format
- **Branch**: Usually \`main\`
- **Personal Access Token**: Your GitHub PAT
- **Backend Content Path**: Where posts are stored (e.g., \`src/content/posts/\`)
- **Filename Template**: How files are named (e.g., \`{slug}.md\`)

### Optional

- **Site URL**: Your blog's public URL
- **Live Post Path**: URL path to posts (e.g., \`/posts/\`)

### Cloudflare Pages (Optional)

- **Account ID**: From your Cloudflare dashboard
- **Project Name**: Your Cloudflare Pages project name
- **API Token**: Cloudflare API token

If configured, Xin will show deployment progress after publishing.

## Auto-Setup from .env

You can also [auto-import blog configurations from a .env file](doc:env-auto-setup) in your vault root — useful when setting up a new machine or sharing a project.`,
  },

  'env-auto-setup': {
    id: 'env-auto-setup',
    title: 'Auto-Setup from .env',
    content: `# Auto-Setup from .env

Xin can automatically import blog configurations from a \`.env\` file in your vault root on app startup. This is useful when cloning a project or setting up a new machine.

## How It Works

1. On startup, Xin checks for a \`.env\` file in your vault root
2. It reads any \`XIN_BLOG_<N>_*\` keys, grouped by blog number
3. Each valid group is imported as a new blog configuration
4. Blogs that already exist (matched by GitHub repo) are skipped
5. A toast notification shows what was imported or if errors occurred

## .env Location

Place the \`.env\` file in the root of your vault folder (the same folder that contains \`.xin/\`).

## Format

Use numbered prefixes to define one or more blogs:

\`\`\`
XIN_BLOG_1_NAME=My Blog
XIN_BLOG_1_GITHUB_REPO=username/blog-repo
XIN_BLOG_1_GITHUB_BRANCH=main
XIN_BLOG_1_GITHUB_TOKEN=ghp_your_token
XIN_BLOG_1_CONTENT_PATH=src/content/posts/
XIN_BLOG_1_CONTENT_FORMAT=single-file
\`\`\`

## Required Fields

| Field | Description |
|-------|-------------|
| \`NAME\` | Display name for the blog |
| \`GITHUB_REPO\` | Repository in \`username/repo\` format |
| \`GITHUB_BRANCH\` | Branch name (usually \`main\`) |
| \`GITHUB_TOKEN\` | GitHub Personal Access Token |
| \`CONTENT_PATH\` | Path to posts in the repo |
| \`CONTENT_FORMAT\` | \`single-file\` or \`multi-file\` |

## Optional Fields

| Field | Description |
|-------|-------------|
| \`SITE_URL\` | Blog's public URL |
| \`CONTENT_FILENAME\` | Filename template (e.g., \`{slug}.md\`) |
| \`CONTENT_LIVE_POST_PATH\` | URL path to posts (e.g., \`/posts/\`) |
| \`CLOUDFLARE_ACCOUNT_ID\` | Cloudflare account ID |
| \`CLOUDFLARE_PROJECT_NAME\` | Cloudflare Pages project name |
| \`CLOUDFLARE_TOKEN\` | Cloudflare API token |

## Duplicate Detection

Xin matches blogs by GitHub repository. If a blog with the same repo already exists in your configuration, the .env entry is silently skipped. This makes the import idempotent — restarting the app won't create duplicates.

## Error Handling

- Each blog is validated independently — one invalid blog won't prevent others from importing
- Missing required fields are reported per blog
- Errors and successes are shown as toast notifications

## Security Note

The \`.env\` file is already included in Xin's \`.gitignore\`. Never commit \`.env\` files containing tokens to version control. See \`.env.example\` in the project root for a template you can copy.`,
  },

  'writing-posts': {
    id: 'writing-posts',
    title: 'Writing Blog Posts',
    content: `# Writing Blog Posts

Blog posts in Xin can be written using two different formats within your notes.

## Method 1: @blogname post

Type \`@\` and select your blog name from the autocomplete, then add \`post\`:

\`\`\`
@myblog post
@title My Post Title
@subtitle An optional subtitle
@date 2024-01-15
@tags tag1, tag2

Your post content goes here.

You can use **Markdown** formatting.

---
\`\`\`

The block ends at \`---\`, a \`#tag\`, or end of file.

### @ Fields

- \`@title\` (required): The post title
- \`@subtitle\` (optional): A subtitle or description
- \`@date\` (optional): Publication date in YYYY-MM-DD format (defaults to today)
- \`@tags\` (optional): Comma-separated tags
- \`@slug\` (optional): Custom URL slug

## Method 2: === Block (With Frontmatter)

For more control, wrap your blog post in \`===\` markers with YAML frontmatter:

\`\`\`
===
---
title: "Your Post Title"
subtitle: "An optional subtitle"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

Your post content goes here.

You can use **Markdown** formatting, including:

- Lists
- Links
- Images
- Code blocks

===
\`\`\`

## Frontmatter Fields (=== method only)

- **title** (required): The post title
- **subtitle** (optional): A subtitle or description
- **date** (optional): Publication date in YYYY-MM-DD format (defaults to today)
- **tags** (optional): An array of tags for the post

## Writing Tips

- Write your posts directly in [daily notes](doc:daily-notes-intro)
- Blog blocks can appear anywhere in your note
- Mix blog content with other [tagged sections](doc:tag-sections)
- Preview your [markdown formatting](doc:markdown-support) before publishing`,
  },

  publishing: {
    id: 'publishing',
    title: 'Publishing',
    content: `# Publishing Blog Posts

Once you've written a blog post, publishing is just one click away.

## Publishing a Post

1. [Write your blog post](doc:writing-posts) using the \`===\` block format
2. Click the publish icon (a rocket) that appears next to the block
3. Select which blog to publish to (if you have multiple)
4. Watch the progress as your post is published

## What Happens During Publishing

1. **Content Preparation**: Your post is formatted with proper frontmatter
2. **GitHub Push**: The post is committed to your repository
3. **Deployment** (if configured): [Cloudflare Pages](doc:cloudflare-setup) builds and deploys your site

## Progress Tracking

During publishing, you'll see:

- A progress bar
- Status for each step

## Updating Posts

Updating a live post is easy:

1. Edit the blog block in your notes
2. Publish again
3. The existing file will be updated (not duplicated)

The slug (URL path) is generated from the post date and title. If you change the title, a new file will be created and the original will be deleted.`,
  },

  'multiple-blogs': {
    id: 'multiple-blogs',
    title: 'Multiple Blogs',
    content: `# Managing Multiple Blogs

Xin supports publishing to multiple blogs from the same vault.

## Adding Multiple Blogs

In [Settings](doc:setting-up-blog), you can add as many blogs as you need. Each blog has its own:

- GitHub repository
- Content path configuration
- Cloudflare Pages project (optional)

## Publishing to Different Blogs

When you publish a post, you'll be prompted to select which blog it should go to. This happens each time you publish, so you can direct different posts to different blogs.

## Use Cases

- **Personal and professional**: Separate blogs for different audiences
- **Different topics**: A tech blog and a personal blog
- **Multiple sites**: Manage content for several websites

## Tips

- Give your blogs clear, descriptive names
- Keep your access tokens organized
- Remember that each blog can have different frontmatter requirements`,
  },

  // CMS Features
  'remote-posts': {
    id: 'remote-posts',
    title: 'Remote Post Management',
    content: `# Remote Post Management

Xin can display and manage posts that are already published to your blogs.

## Viewing Remote Posts

In the file tree, you'll see a section for each [configured blog](doc:setting-up-blog) showing its published posts. These are fetched from GitHub and cached locally.

## Refresh

Posts are automatically refreshed periodically.

## Organization

Remote posts are organized by blog, making it easy to see what's published where. Click any remote post to view and edit its content.`,
  },

  'editing-posts': {
    id: 'editing-posts',
    title: 'Editing Published Posts',
    content: `# Editing Published Posts

You can edit published posts directly in Xin without leaving the app.

## Opening a Published Post

Click any post in the [remote posts](doc:remote-posts) section of the file tree. The content will be loaded from GitHub and displayed in the editor.

## Making Changes

Edit the content just like any other file. Your changes are saved locally as a draft until you publish.

## Publishing Updates

After editing, click the publish button to push your changes to GitHub. Xin tracks the file's SHA to ensure safe updates without conflicts.

## Conflict Detection

If someone else has modified the file on GitHub since you loaded it, Xin will warn you before overwriting their changes.`,
  },

  drafts: {
    id: 'drafts',
    title: 'Draft Management',
    content: `# Draft Management

When you edit a remote post, your changes are saved as a draft until published.

## How Drafts Work

- Drafts are stored in memory while the app is running
- The original content from GitHub is preserved
- You can see which posts have unsaved changes

## Important Note

**Drafts are not persisted.** If you close Xin before publishing, your draft changes will be lost. This is by design to keep the local/remote distinction clear.

## Best Practice

When editing remote posts:

1. Make your changes
2. Review them carefully
3. Publish immediately when ready
4. Don't leave unpublished drafts overnight`,
  },

  // Settings
  'vault-management': {
    id: 'vault-management',
    title: 'Vault Management',
    content: `# Vault Management

A vault is a folder on your computer where Xin stores your notes.

## Multiple Vaults

Xin supports multiple vaults, allowing you to:

- Separate work and personal notes completely
- Have different vaults for different projects
- Switch between contexts easily

## Adding a Vault

1. Open Settings
2. Click "Add Vault"
3. Select a folder on your computer

## Switching Vaults

Click on any vault in the list to switch to it. The app will reload with the new vault's content.

## Vault Contents

Each vault contains:

- \`daily-notes/\` - Your [daily notes](doc:daily-notes-intro)
- \`notes/\` - Other markdown files
- Configuration is stored separately (not in the vault)`,
  },

  'blog-config': {
    id: 'blog-config',
    title: 'Blog Configuration',
    content: `# Blog Configuration

Each blog in Xin needs to be configured with details about where and how to publish.

## Required Settings

### Blog Name
A friendly name for the blog, shown in the UI.

### Repository
Your GitHub repository in \`username/repo\` format.

### Branch
The branch to publish to (usually \`main\`).

### Personal Access Token
A GitHub PAT with \`repo\` scope. Keep this secret!

### Backend Content Path
Where in your repository blog posts are stored. For example:
- \`src/content/posts/\`
- \`content/blog/\`
- \`_posts/\`

### Filename Template
How post files are named. Use \`{slug}\` as a placeholder:
- \`{slug}.md\`
- \`{slug}/index.md\`

## Optional Settings

### Site URL
Your blog's public URL (e.g., \`https://myblog.com\`)

### Live Post Path
The URL path where posts appear (e.g., \`/posts/\` or \`/blog/\`)`,
  },

  'github-setup': {
    id: 'github-setup',
    title: 'GitHub Setup',
    content: `# GitHub Setup

Xin publishes to GitHub repositories. Here's how to set up the connection.

## Creating a Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Xin Blog Publishing")
4. Select the \`repo\` scope (full control of repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)

## Security Tips

- Never share your Personal Access Token
- Use a token specifically for Xin
- Consider using fine-grained tokens for better security
- Revoke tokens you no longer use

## Repository Setup

Your blog repository should:

- Have a content folder for posts
- Be connected to [Cloudflare Pages](doc:cloudflare-setup) (optional but recommended)
- Have your static site generator configured`,
  },

  'cloudflare-setup': {
    id: 'cloudflare-setup',
    title: 'Cloudflare Pages Setup',
    content: `# Cloudflare Pages Setup

Cloudflare Pages integration is optional but recommended for tracking deployments.

## Why Cloudflare Pages?

- Automatic deployments on push
- Global CDN for fast loading
- Free for most personal blogs
- Easy custom domain setup

## Configuration

To enable deployment tracking, you need:

### Account ID
Found in your Cloudflare dashboard URL or account settings.

### Project Name
The name of your Cloudflare Pages project (not your domain).

### API Token
A Cloudflare API token with Pages permissions.

## Creating an API Token

1. Go to Cloudflare Dashboard → My Profile → API Tokens
2. Click "Create Token"
3. Use the "Edit Cloudflare Pages" template or create custom
4. Select the specific account and project
5. Copy the token

## What This Enables

With Cloudflare configured, after publishing you'll see:

- Deployment status in real-time
- Build progress
- The final live URL of your post`,
  },
};

// Helper function to get all doc IDs for navigation
export function getAllDocIds(): string[] {
  const ids: string[] = [];

  function traverse(sections: DocSection[]) {
    for (const section of sections) {
      if (section.children) {
        traverse(section.children);
      } else {
        ids.push(section.id);
      }
    }
  }

  traverse(docsTree);
  return ids;
}

// Helper to find a doc's parent section
export function findParentSection(docId: string): string | null {
  for (const section of docsTree) {
    if (section.children?.some(child => child.id === docId)) {
      return section.id;
    }
  }
  return null;
}
