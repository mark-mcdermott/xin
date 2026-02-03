# Lessons Directory

This directory contains the structured curriculum for deeply understanding Xun's codebase and building FAANG-level engineering skills.

## Structure

```
lessons/
|-- 00-curriculum-outline.md    # Master progress tracker
|-- README.md                   # This file
```

Lesson files will be created as each section is started. The curriculum outline is the source of truth.

## Workflow

### Starting a Lesson
1. Open the curriculum outline and find the next planned lesson
2. Use `/lesson-start [topic]` to initialize the session
3. Read the lesson description and objectives
4. Work through the lesson interactively with Claude

### Completing a Lesson
1. Verify understanding through synthesis questions
2. Create notes in `docs/notes/` from student perspective
3. Update `00-curriculum-outline.md` status marker to `[x]`
4. Commit with `/commit`

### Adding a Lesson Request
If during learning you realize "we should cover X":
1. Add to "Lesson Request Queue" in `00-curriculum-outline.md`
2. Note which section it probably belongs in
3. Continue with the current lesson

## Progress Tracking

The `00-curriculum-outline.md` file is the source of truth for:
- Overall curriculum structure (6 parts, 21 sections)
- Completion status per lesson
- Lesson requests waiting to be placed
- Historical progress log
