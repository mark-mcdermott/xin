# Commit Skill

Quick git commits with conversation context.

## When to Use
- After completing a piece of work (feature, fix, learning milestone)
- For checkpoint commits during learning sessions
- **Not for**: complex git operations (use git-manager agent)

## Workflow
1. Run `git status` to see changes
2. Run `npm run lint` and `npm run test:e2e` if applicable
3. Stage relevant files (`git add <specific files>`)
4. Commit with gitmoji + one-sentence message

## Commit Message Rules (CRITICAL)

- **One sentence** prepended with a gitmoji. Mention the one main change/focus.
- **Never** use bullet lists, heredoc multiline messages, or multi-paragraph bodies.
- **Always** commit as Mark McDermott (from git config), never as Claude or any AI.
- **Never** include any AI attribution whatsoever (no co-author lines, no signatures, no references).

## Commit Types & Gitmoji

| Type | Gitmoji | When |
|------|---------|------|
| New feature | `:sparkles:` | Adding new functionality |
| Bug fix | `:bug:` | Fixing broken behavior |
| Refactor | `:recycle:` | Restructuring without behavior change |
| Learning | `:books:` | Learning milestone or study notes |
| Docs | `:memo:` | Documentation updates |
| Style/UI | `:lipstick:` | Visual/styling changes |
| Performance | `:zap:` | Performance improvements |
| Tests | `:white_check_mark:` | Adding or updating tests |
| Config | `:wrench:` | Configuration changes |
| Cleanup | `:fire:` | Removing code or files |
| WIP | `:construction:` | Work in progress checkpoint |
| Experiment | `:alembic:` | Experimental code |

## Examples

```bash
git commit -m ":sparkles: Add blog publish progress bar with Cloudflare status polling"
git commit -m ":bug: Fix tag view not updating after content deletion"
git commit -m ":recycle: Extract markdown rendering into dedicated hook"
git commit -m ":books: Add spaced repetition tracking for React hooks"
git commit -m ":memo: Update curriculum with Electron IPC lesson plan"
git commit -m ":construction: WIP sidebar drag-to-resize"
```

## What NOT to Do

```bash
# BAD: multiline / bullet list
git commit -m "$(cat <<'EOF'
Add new feature

- Updated component
- Fixed styling
- Added tests

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# BAD: AI attribution
git commit -m ":sparkles: Add feature" --author="Claude <noreply@anthropic.com>"

# BAD: vague message
git commit -m ":sparkles: Updates"
```
