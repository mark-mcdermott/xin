# Changelog

## [0.0.3] - 2026-03-14

### Added
- Cmd+K keyboard shortcut to wrap selected text in a markdown link with autocomplete-style popup
- Cmd+A inside a code block now selects only that block's content
- Midnight detection to auto-create today's daily note when the app stays open past midnight
- Duplicate note title detection with toast warning and auto-revert
- Windows build target with NSIS installer and release CI workflow

### Fixed
- Add to Dictionary not dismissing the spellcheck popup
- Disabled native browser spellcheck to prevent double-underlining

### Changed
- Increased editor body font size, weight, and tightened line-height
- Unified breadcrumb into single inline element with consistent spacing

## [0.0.2] - 2026-03-12

### Added
- Auto-update on release
- Delete multiple notes functionality
- Note title placeholder behavior with cursor positioning
- In-app merch store
- Walkthrough video in README

### Fixed
- Back button navigation bug
- Various small UX fixes

## [0.0.1] - Initial Release

### Added
- Markdown note-taking with daily notes
- Tags, wikilinks, and internal linking
- Blog CMS with one-click publishing to Cloudflare Pages
- Spellcheck and grammar check
- CodeMirror 6 live markdown editor
- macOS desktop app (Electron)
