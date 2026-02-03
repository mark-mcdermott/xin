# Curriculum Outline

> **Progress**: Phase 1 - Understanding What You Built (not started)
> **Last Updated**: 2026-02-03

## Learning Philosophy

- **Reverse-engineer first**: Understand every piece of Xin before learning new things
- **Theory-to-practice bridge**: Leverage MS in SE theory, connect to real implementation
- **QA-informed learning**: Use testing instincts as a superpower for understanding systems
- **FAANG-oriented**: Every topic connects to what top-tier companies expect
- **Project-driven**: Learn through the app you already built, not abstract exercises
- **Progressive depth**: Understand -> fundamentals -> patterns -> scale -> interview

## How to Use This Document

- **Status markers**: `[ ]` Planned | `[>]` In Progress | `[x]` Complete
- **Lesson requests**: Add to appropriate section with `[?]` marker for review
- **Tangents**: Curiosity-driven explorations go in `tangents-queue.md`

---

## PART 1: Understanding What You Built

The goal: be able to explain every line of Xin to a FAANG interviewer and justify every architectural decision.

### Section 01: Electron Architecture

How Xin works as a desktop app. The process model, IPC, and why Electron is built this way.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Electron Process Model | `[ ]` | Main vs renderer vs preload - why three processes? How Chromium works under the hood. Security model. |
| 02 | Xin's Main Process Deep Dive | `[ ]` | Walk through `src/main/index.ts` line by line. App lifecycle, BrowserWindow creation, menu setup. |
| 03 | The Preload Bridge | `[ ]` | `src/preload/index.ts` - contextBridge, contextIsolation, why this security layer exists. |
| 04 | IPC Communication Patterns | `[ ]` | invoke/handle vs send/on. Map every IPC channel in Xin. Understand the data flow. |
| 05 | Xin's IPC Handlers | `[ ]` | Walk through `src/main/ipc/` - file operations, vault management, blog publishing channels. |
| 06 | Native macOS Integration | `[ ]` | Menus, dialogs, notifications, file system access. How Electron bridges to native APIs. |

### Section 02: React & Component Architecture

How the UI works. React's mental model, Xin's component tree, and state management.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | React's Mental Model | `[ ]` | Rendering as snapshots. The component tree. Virtual DOM reconciliation. Why React works this way. |
| 02 | Xin's Component Tree | `[ ]` | Map App.tsx -> every component. Parent-child relationships. Props flow. |
| 03 | Hooks in Xin | `[ ]` | Every useState, useEffect, useRef, useCallback in the codebase. Why each one. Common mistakes. |
| 04 | Custom Hooks | `[ ]` | Walk through `src/renderer/hooks/`. Composable logic extraction patterns. |
| 05 | State Management with Zustand | `[ ]` | `src/renderer/stores/` - global state design. Selectors. Why Zustand over Redux/Context. |
| 06 | The CodeMirror-React Bridge | `[ ]` | How CodeMirror 6 integrates with React. State separation. Ref-based integration. |

### Section 03: The Editor

CodeMirror 6 internals and how Xin uses it for markdown editing.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | CodeMirror 6 Architecture | `[ ]` | State vs View. Extensions. Transactions. The functional design. |
| 02 | Xin's Editor Setup | `[ ]` | Extension chain. Language support. Theme. Keybindings. |
| 03 | Markdown Processing Pipeline | `[ ]` | How markdown goes from text -> AST -> rendered HTML. remark/rehype plugins. |
| 04 | Live Preview & Split Pane | `[ ]` | react-markdown rendering. Scroll sync. Split pane implementation. |
| 05 | Custom Editor Features | `[ ]` | Blog post macro (===), tag detection, frontmatter handling. |

### Section 04: Styling & Build System

Tailwind CSS, Vite, and the build pipeline.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Tailwind CSS 4 Deep Dive | `[ ]` | Utility-first philosophy. How classes become CSS. Configuration. v4 vs v3 changes. |
| 02 | Vite Internals | `[ ]` | Dev server (ESM), build (Rollup). HMR. Plugin system. Why Vite over webpack. |
| 03 | Vite + Electron Integration | `[ ]` | vite-plugin-electron. Multi-process bundling. Path aliases. |
| 04 | TypeScript Configuration | `[ ]` | tsconfig.json decoded. Strict mode. Module resolution. Path mapping. |
| 05 | ESLint & Prettier | `[ ]` | Linting config. Code formatting. How they work together. |

### Section 05: Blog Publishing System

The most complex feature in Xin - understand it completely.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Publishing Architecture | `[ ]` | `src/main/publish/` and `src/main/cms/`. The full data flow from editor to deployed blog. |
| 02 | GitHub API Integration | `[ ]` | How Xin pushes content to GitHub repos. Authentication. File creation/update. |
| 03 | Cloudflare Pages Deployment | `[ ]` | Build triggers. Status polling. How the progress bar works. |
| 04 | Frontmatter Parsing | `[ ]` | YAML frontmatter. The === block format. The @ decorator format. Parsing logic. |

### Section 06: Testing & CI/CD

Playwright testing and GitHub Actions.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Playwright Fundamentals | `[ ]` | Selectors, assertions, page model. How E2E testing works. |
| 02 | Testing Electron Apps | `[ ]` | Special considerations for desktop apps. IPC mocking. Window management. |
| 03 | Xin's Test Suite | `[ ]` | Walk through every test. What's covered, what's not. |
| 04 | GitHub Actions CI | `[ ]` | `.github/workflows/test.yml` decoded. Matrix testing. Caching. Artifacts. |

---

## PART 2: Frontend Fundamentals Deep Dive

Fill the gaps between "I can use it" and "I deeply understand it."

### Section 07: JavaScript/TypeScript Mastery

The language underneath everything.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Event Loop | `[ ]` | Call stack, task queue, microtasks. Why async works the way it does. FAANG interview staple. |
| 02 | Closures & Scope | `[ ]` | Lexical scope, closures in practice. Why React hooks depend on closures. |
| 03 | Prototypes & Classes | `[ ]` | JavaScript's object model. Prototype chain. Class syntax as sugar. |
| 04 | Async Patterns | `[ ]` | Callbacks -> Promises -> async/await. Error handling. Promise combinators. |
| 05 | ES Modules | `[ ]` | import/export, dynamic imports, tree shaking. How bundlers use this. |
| 06 | TypeScript Type System | `[ ]` | Generics, conditional types, mapped types, template literals. Type-level programming. |
| 07 | TypeScript Advanced Patterns | `[ ]` | Discriminated unions, branded types, builder pattern. Type inference. |
| 08 | Error Handling Patterns | `[ ]` | Try/catch, Result types, error boundaries. Defensive vs. optimistic. |

### Section 08: React Deep Dive

Beyond the basics - understand React like a framework contributor.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | React Fiber Architecture | `[ ]` | How React schedules work. The fiber tree. Reconciliation algorithm. |
| 02 | Hooks Internals | `[ ]` | How hooks actually work. The linked list. Rules of hooks explained mechanically. |
| 03 | useEffect Deep Dive | `[ ]` | Synchronization, not lifecycle. Cleanup. Dependency arrays. Common traps. |
| 04 | useRef Beyond DOM | `[ ]` | Refs as mutable containers. Instance variables. Escape hatch from render cycle. |
| 05 | useMemo & useCallback | `[ ]` | When they help (rarely). When they hurt. Profiling to decide. |
| 06 | Context API | `[ ]` | When to use, when not to. Performance implications. Provider pattern. |
| 07 | React Patterns | `[ ]` | Composition, render props, HOCs, compound components. When to use each. |
| 08 | React 19 Features | `[ ]` | Server components, actions, use(), transitions. The future of React. |
| 09 | Performance Profiling | `[ ]` | React DevTools profiler. Identifying re-renders. Measuring impact. |

### Section 09: CSS & Layout Mastery

Beyond "it looks right" - understand WHY it looks right.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Box Model & Layout | `[ ]` | Block, inline, flexbox, grid. How the browser calculates layout. |
| 02 | Flexbox Deep Dive | `[ ]` | Main axis, cross axis, flex-grow/shrink/basis. Every property explained. |
| 03 | CSS Grid | `[ ]` | Grid template, areas, auto-flow. When grid vs flexbox. |
| 04 | Positioning & Stacking | `[ ]` | Static, relative, absolute, fixed, sticky. z-index and stacking contexts. |
| 05 | Responsive Design | `[ ]` | Media queries, container queries, fluid typography. Mobile-first approach. |
| 06 | CSS Custom Properties | `[ ]` | Variables, theming, dynamic styles. How Tailwind uses them under the hood. |
| 07 | Animations & Transitions | `[ ]` | CSS transitions, keyframes, transform. Performance (compositor vs main thread). |

### Section 10: Browser Internals

How the platform works underneath.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | How Browsers Render | `[ ]` | Parse -> Style -> Layout -> Paint -> Composite. Critical rendering path. |
| 02 | The DOM & CSSOM | `[ ]` | Document Object Model. How HTML becomes a tree. How CSS is applied. |
| 03 | Web APIs | `[ ]` | Storage, fetch, Web Workers, Intersection Observer, Mutation Observer. |
| 04 | Browser DevTools Mastery | `[ ]` | Performance tab, memory profiler, network waterfall, coverage. |
| 05 | Security in the Browser | `[ ]` | Same-origin policy, CORS, CSP, XSS, CSRF. How Electron changes the model. |

---

## PART 3: Computer Science Fundamentals

Strengthen the foundation. Bridge MS theory to FAANG interview expectations.

### Section 11: Data Structures

The building blocks. Emphasis on implementation AND when to use each.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Arrays & Strings | `[ ]` | Contiguous memory. Time complexity. Two pointers, sliding window. |
| 02 | Hash Maps & Sets | `[ ]` | Hashing, collision resolution. When O(1) isn't really O(1). |
| 03 | Linked Lists | `[ ]` | Singly, doubly. Runner technique. Why they still matter. |
| 04 | Stacks & Queues | `[ ]` | LIFO, FIFO. Monotonic stack. BFS queue. Implementation choices. |
| 05 | Trees & BSTs | `[ ]` | Binary trees, BST property, traversals (in/pre/post/level). Balanced trees. |
| 06 | Heaps & Priority Queues | `[ ]` | Min/max heap. Heapify. Top-K problems. |
| 07 | Graphs | `[ ]` | Representations (adjacency list/matrix). Directed, weighted, DAGs. |
| 08 | Tries | `[ ]` | Prefix trees. Autocomplete. Word search. |

### Section 12: Algorithms

Pattern recognition for problem solving.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Big O Analysis | `[ ]` | Time and space complexity. Amortized analysis. Practical implications. |
| 02 | Sorting Algorithms | `[ ]` | Merge sort, quick sort, counting sort. Stability. When to use which. |
| 03 | Binary Search | `[ ]` | Not just sorted arrays. Search space reduction. Bisect patterns. |
| 04 | BFS & DFS | `[ ]` | Graph traversal. Tree traversal. When to use which. Iterative vs recursive. |
| 05 | Dynamic Programming | `[ ]` | Overlapping subproblems. Optimal substructure. Top-down vs bottom-up. |
| 06 | Greedy Algorithms | `[ ]` | Greedy choice property. Interval scheduling. Huffman coding. |
| 07 | Backtracking | `[ ]` | Constraint satisfaction. Permutations, combinations, subsets. Pruning. |
| 08 | Two Pointers & Sliding Window | `[ ]` | Fast/slow pointers. Expand/contract window. Pattern recognition. |
| 09 | Topological Sort | `[ ]` | DAG ordering. Course scheduling. Build systems. |
| 10 | Union-Find | `[ ]` | Disjoint sets. Path compression. Union by rank. Connected components. |

### Section 13: System Design Fundamentals

Think at scale. Critical for senior/staff FAANG interviews.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | System Design Framework | `[ ]` | Requirements -> high-level -> deep dive -> bottlenecks -> tradeoffs. |
| 02 | Scaling Fundamentals | `[ ]` | Horizontal vs vertical. Load balancing. Caching layers. CDNs. |
| 03 | Databases | `[ ]` | SQL vs NoSQL. Indexing. Sharding. Replication. CAP theorem. |
| 04 | Caching | `[ ]` | Cache strategies (LRU, LFU). Write-through, write-back. Cache invalidation. |
| 05 | Message Queues | `[ ]` | Pub/sub, point-to-point. Kafka, RabbitMQ concepts. Event-driven architecture. |
| 06 | API Design | `[ ]` | REST, GraphQL, gRPC. Versioning. Rate limiting. Pagination. |
| 07 | Distributed Systems | `[ ]` | Consistency models. Leader election. Consensus. Failure modes. |
| 08 | System Design Practice | `[ ]` | Design a note-taking app (like Xin!) at scale. Design a CMS. Design a real-time editor. |

---

## PART 4: Software Engineering Practices

What separates a coder from an engineer.

### Section 14: Testing Mastery

Leverage your QA superpower and formalize it as engineering practice.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Testing Philosophy | `[ ]` | Test pyramid. What to test, what not to. ROI of different test types. |
| 02 | Unit Testing with Vitest | `[ ]` | Setup, mocking, assertions. Testing React hooks. Testing pure functions. |
| 03 | Component Testing | `[ ]` | React Testing Library. User-centric testing. Avoiding implementation details. |
| 04 | E2E Testing Mastery | `[ ]` | Playwright advanced patterns. Page objects. Fixtures. Parallel execution. |
| 05 | Testing Electron Apps | `[ ]` | IPC testing. Main process testing. Integration patterns. |
| 06 | Test-Driven Development | `[ ]` | Red-green-refactor. When TDD helps, when it doesn't. Practical application. |
| 07 | Property-Based Testing | `[ ]` | Generating test cases. Shrinking. Finding edge cases automatically. |

### Section 15: Code Quality & Architecture

Design patterns and principles for maintainable code.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | SOLID Principles in Practice | `[ ]` | Each principle with TypeScript/React examples from Xin. |
| 02 | Design Patterns for Frontend | `[ ]` | Observer, Strategy, Factory, Adapter. Applied to React/Electron. |
| 03 | Clean Code Principles | `[ ]` | Naming, functions, comments, formatting. Code as communication. |
| 04 | Refactoring Techniques | `[ ]` | Extract function, move module, introduce abstraction. When NOT to refactor. |
| 05 | Code Review Skills | `[ ]` | What to look for. How to give feedback. Reading others' code efficiently. |
| 06 | Error Handling Architecture | `[ ]` | Error boundaries, fallbacks, retry logic. Graceful degradation. |

### Section 16: DevOps & Deployment

CI/CD, packaging, and operational concerns.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Git Advanced Workflows | `[ ]` | Rebase vs merge. Cherry-pick. Bisect. Reflog. Interactive rebase. |
| 02 | GitHub Actions Deep Dive | `[ ]` | Workflow syntax. Matrix strategies. Secrets. Artifacts. Caching. |
| 03 | Electron Packaging | `[ ]` | electron-builder config. Code signing. Auto-updates. Platform targets. |
| 04 | Monitoring & Observability | `[ ]` | Error tracking, logging, performance monitoring. What to measure. |

---

## PART 5: FAANG Interview Preparation

Specific preparation for top-tier engineering interviews.

### Section 17: Coding Interview Practice

Pattern-based problem solving practice.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Array/String Problems | `[ ]` | 15-20 curated problems. Pattern recognition. Time management. |
| 02 | Hash Map Problems | `[ ]` | 10-15 curated problems. Two-sum family. Frequency counting. |
| 03 | Tree/Graph Problems | `[ ]` | 15-20 curated problems. Traversal patterns. Recursive thinking. |
| 04 | Dynamic Programming Problems | `[ ]` | 10-15 curated problems. State definition. Transition identification. |
| 05 | System Design Mock Interviews | `[ ]` | Practice designing systems. Time-boxed. Structured approach. |
| 06 | Frontend-Specific Interviews | `[ ]` | Build a component live. DOM manipulation. Event handling. Accessibility. |

### Section 18: Behavioral & Communication

The other half of the interview.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | STAR Method | `[ ]` | Situation, Task, Action, Result. Preparing stories from QA and dev experience. |
| 02 | Technical Communication | `[ ]` | Explaining complex systems clearly. Whiteboard skills. Thinking out loud. |
| 03 | Leadership Principles | `[ ]` | Amazon LPs, Google values, Meta culture. Mapping your experience. |
| 04 | Negotiation Basics | `[ ]` | Compensation structure. Leveling. How to evaluate and negotiate offers. |

---

## PART 6: Advanced & Elective Topics

Choose based on interest and career goals.

### Section 19: Performance Engineering

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Web Performance Fundamentals | `[ ]` | Core Web Vitals. Lighthouse. Performance budgets. |
| 02 | React Performance | `[ ]` | Profiling. Code splitting. Lazy loading. Virtualization. |
| 03 | Bundle Optimization | `[ ]` | Tree shaking. Dynamic imports. Analyzing bundle size. |
| 04 | Memory Management | `[ ]` | Garbage collection. Memory leaks in React. Heap snapshots. |

### Section 20: Accessibility

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | WCAG Fundamentals | `[ ]` | Perceivable, operable, understandable, robust. A/AA/AAA levels. |
| 02 | Semantic HTML | `[ ]` | Landmarks, headings, ARIA. Screen reader testing. |
| 03 | Keyboard Navigation | `[ ]` | Focus management. Tab order. Skip links. |
| 04 | Accessible React Components | `[ ]` | ARIA in React. Focus traps. Live regions. |

### Section 21: Node.js & Backend Fundamentals

Useful for full-stack understanding and system design interviews.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Node.js Event Loop | `[ ]` | libuv, phases, timers. How Node.js handles concurrency. |
| 02 | HTTP & Networking | `[ ]` | TCP/IP, HTTP/2, WebSockets. Request/response cycle. |
| 03 | REST API Design | `[ ]` | Resource modeling. Status codes. Authentication. Middleware. |
| 04 | Database Fundamentals | `[ ]` | SQL queries, joins, indexes. ORM patterns. When to use NoSQL. |

---

## Lesson Request Queue

Lessons suggested during learning that need to be placed in the outline.

| Topic | Suggested Placement | Status |
|-------|---------------------|--------|
| *(none yet)* | | |

---

## Progress Log

| Date | Section | Lesson | Notes |
|------|---------|--------|-------|
| | | | |

---

## Appendix A: Recommended Resources

### Books
- **Eloquent JavaScript** (Marijn Haverbeke) - JS fundamentals, free online
- **Learning React** (Eve Porcello & Alex Banks) - React patterns
- **Designing Data-Intensive Applications** (Martin Kleppmann) - System design bible
- **Cracking the Coding Interview** (Gayle McDowell) - Interview prep classic
- **The Pragmatic Programmer** (Hunt & Thomas) - Software engineering mindset

### Courses & Platforms
- **NeetCode.io** - Curated DSA problems by pattern
- **Frontend Masters** - Deep dive courses (React, TypeScript, Node.js)
- **Educative.io** - Grokking the System Design Interview
- **Kent C. Dodds** - Epic React, Testing JavaScript

### Practice
- **LeetCode** - Focus on Blind 75, then NeetCode 150
- **Xin Codebase** - The best learning tool is the app you built
- **Open Source** - Contribute to React/Electron ecosystem projects

## Appendix B: Complexity Ratings

- Level 1: Concept review, mental model building
- Level 2: Hands-on with guidance, following patterns
- Level 3: Independent implementation, applied understanding
- Level 4: Architecture decisions, tradeoff analysis
- Level 5: Teaching others, system design, interview performance

## Appendix C: FAANG Readiness Checklist

### Technical Skills
- [ ] Can explain every piece of Xin's architecture to an interviewer
- [ ] Can solve Medium LeetCode problems in 25 minutes
- [ ] Can solve Hard LeetCode problems in 40 minutes (for some patterns)
- [ ] Can design a system like Xin at web scale (multi-tenant, millions of users)
- [ ] Can write clean TypeScript/React from scratch without AI assistance
- [ ] Can debug any frontend issue systematically
- [ ] Can explain React's reconciliation algorithm
- [ ] Can explain Electron's security model
- [ ] Can discuss tradeoffs in state management approaches
- [ ] Can write comprehensive tests (unit, integration, E2E)

### Soft Skills
- [ ] Can explain technical decisions in plain English
- [ ] Can walk through code on a whiteboard
- [ ] Can discuss past projects with STAR format
- [ ] Can ask clarifying questions in ambiguous situations
- [ ] Can estimate scope and identify risks
- [ ] Can give and receive code review feedback constructively
