# Docs Audit Skill

Comprehensive documentation architecture audit.

## Philosophy
- Each context should be self-sufficient
- No unnecessary loading of unrelated docs
- Clear hierarchy: CLAUDE.md -> agents/skills/rules -> docs/

## Audit Procedure

1. **Check all @ references** in CLAUDE.md and .claude/ files - verify targets exist
2. **Find orphaned files** in docs/ not referenced from anywhere
3. **Identify stale content** - docs that don't match current codebase
4. **Validate skill registration** - all skills in skills/ are listed in skills/README.md
5. **Validate agent registration** - all agents in agents/ are listed in agents/README.md
6. **Check curriculum accuracy** - lesson status matches actual progress
7. **Review learning-progress.md** - ensure it reflects current state

## Output Format

```markdown
## Documentation Audit Results

### References
- [OK/BROKEN] list of @ references checked

### Orphaned Files
- Files in docs/ not referenced anywhere

### Stale Content
- Docs that don't match current codebase state

### Registration
- Skills: [all registered / missing: X]
- Agents: [all registered / missing: X]

### Recommendations
- Specific actions to fix issues found
```

## Common Issues
- @ reference pointing to moved/renamed file
- Curriculum showing lessons as "pending" that were completed
- Learning progress not updated after session
- Skills created but not registered in README
- Agents created but not listed in CLAUDE.md
