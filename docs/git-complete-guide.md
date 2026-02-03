# Complete Git Guide

## Overview
Git workflow for the Xin project, designed for both learning and development.

## Core Principles

### 1. Learning-First Commits
- Commit after understanding each concept, not just after working features
- One gitmoji + one sentence per commit
- Small, logical commits that show progression

### 2. Safe Experimentation
- Use branches for exploration
- Never fear breaking things - git keeps everything safe
- Encourage trying different approaches

### 3. Commit Message Rules (CRITICAL)
- **One sentence** prepended with a gitmoji
- **Never** use bullet lists, heredoc multiline, or multi-paragraph bodies
- **Always** commit as Mark McDermott, never as Claude/AI
- **Never** include any AI attribution (no co-author, no signatures)

## Branch Strategy

### Core Branches

#### `main`
- Production-ready code
- Completed learning milestones
- Protected: no direct commits for complex changes

### Working Branches

#### `learn/[topic]`
**Examples**: `learn/electron-ipc`, `learn/react-hooks`, `learn/typescript-generics`
- Active learning work
- 1-2 weeks typically
- Merge to main after completion

#### `experiment/[topic]`
**Examples**: `experiment/zustand-middleware`, `experiment/codemirror-plugin`
- Safe exploration of ideas
- Expected to potentially fail
- Cherry-pick successes to learning branches

#### `feat/[name]` / `fix/[issue]`
- New features or bug fixes for Xin itself
- Standard development workflow

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
git commit -m ":books: Deep dive into Electron IPC invoke/handle pattern"
git commit -m ":memo: Update curriculum with completed React hooks lesson"
```

## Daily Learning Session

```bash
# Start session
git checkout learn/[current-topic]

# Work and commit frequently
git add <specific-files>
git commit -m ":books: Understand useEffect cleanup and dependency arrays"

# End session
git push origin learn/[current-topic]
# Update docs/learning-progress.md
```

## Error Recovery

### Experimental Branch Gone Wrong
```bash
git checkout learn/[topic]          # Return to safe state
git branch -D experiment/[failed]   # Delete failed experiment
git checkout -b experiment/[retry]  # Try different approach
```

### Find Lost Commits
```bash
git reflog                          # Find the commit hash
git cherry-pick <hash>              # Recover it
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

## Integration with Learning

### Before Each Session
- Check `docs/learning-progress.md` for current status
- Review last commit messages for context

### After Each Session
- Update `docs/learning-progress.md` with accomplishments
- Push all work to remote
- Tag significant milestones
