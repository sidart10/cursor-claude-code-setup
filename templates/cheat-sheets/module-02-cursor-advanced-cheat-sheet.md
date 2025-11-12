# Cursor 2.0 Advanced - Quick Reference Cheat Sheet

**Module 2 | Context Engineering Mastery 2025**

---

## 🚀 MULTI-AGENT EXECUTION

### Setup

```
1. Settings → Features → Multi-Agent: ON
2. Max agents: 4 (start), up to 8 (advanced)
3. Requires: Git repo with 1+ commit
```

### Run Multi-Agent

```
Cmd+Shift+K → Multi-Agent mode → Set count → Paste prompt → Run
```

### When to Use

✅ Hard problems (single agent failed)
✅ Architecture decisions (compare approaches)
✅ Learning (see different patterns)
❌ Simple tasks (single agent faster)

### Merging Strategies

1. **Pick One**: Choose best complete solution
2. **Cherry-Pick**: Merge best features from each
3. **Git Merge**: Advanced (resolve conflicts manually)

---

## ⚡ COMPOSER MODEL

### Quick Facts

- **Speed**: 4x faster than GPT-5/Claude
- **Response**: <5s typical, <30s max
- **Tradeoff**: 5-7% less accurate on hardest problems
- **Best For**: Boilerplate, refactoring, brownfield

### When to Use Composer

✅ Prototyping (speed > perfection)
✅ CRUD operations & API routes
✅ Codebase-wide refactoring
✅ Standard implementations
❌ Novel algorithms (use Claude)
❌ Critical security (use Claude)

### Model Selection Strategy

```
Task Complexity: Low → Medium → High
Model:          Composer → GPT-5 → Claude

Dev Phase:      Prototype → Production
Model:          Composer → Claude
```

### Semantic Search Power

- Searches entire codebase automatically
- Finds existing patterns
- Matches your project's style
- Understands symbol relationships

**Boost it**: Use `@Codebase` for explicit search

---

## 🌐 BROWSER INTEGRATION

### Open Browser

```
Method 1: Cmd+Shift+P → "Cursor: Open Browser"
Method 2: Right-click HTML file → "Open with Cursor Browser"
```

### Device Testing (Fast)

```
Device selector → iPhone / iPad / Desktop / Custom
```

Common sizes:

- iPhone SE: 375x667
- iPhone 14 Pro: 393x852
- iPad Pro: 1024x1366
- Desktop: 1920x1080
- 4K: 3840x2160

### Screenshot-Driven Debugging

```
1. Browser → Screenshot tool
2. Chat → Attach screenshot
3. Ask: "What's wrong with this layout?"
4. AI diagnoses → Apply fix
5. Browser refreshes → Verify
```

### Key Workflows

- **Responsive testing**: Switch devices, screenshot issues
- **Accessibility**: Screenshot → "Check for WCAG violations"
- **Design extraction**: Screenshot competitor → "Generate CSS"
- **Performance**: DevTools → Screenshot flame graph → "Optimize"

---

## 📝 .CURSORRULES MASTERY

### File Location

```
.cursorrules (in project root)
```

### Essential Sections

**1. Project Context**

```markdown
## Project Overview

- Purpose: [what you're building]
- Stack: [tech stack]
- Architecture: [patterns]
```

**2. Code Style** (Most Important)

```markdown
## Code Style

- Indentation: 2 spaces
- Quotes: single
- Semicolons: required
- Line length: 100 chars
```

**3. Framework Patterns**

```markdown
## Architecture

- Components: /components/
- Utils: /lib/
- Types: /types/
- Tests: \*.test.ts
```

**4. Quality Standards**

```markdown
## Requirements

- JSDoc for all functions
- Error handling mandatory
- TypeScript strict mode
- 70%+ test coverage
```

**5. Anti-Patterns**

```markdown
## Avoid

- ❌ No `any` types
- ❌ No console.log in production
- ❌ No inline styles
```

### Test Your Rules

```
1. Create .cursorrules
2. Cmd+K → "Create component"
3. Verify output follows rules
4. Adjust rules if needed
```

---

## ⚡ CUSTOM SLASH COMMANDS

### Create Command

```
1. Create: .cursor/commands/[name].md
2. Write prompt template
3. Save file
4. Use: /[name] in Cursor
```

### Essential Commands

**/component** - Generate React component

```markdown
Generate React component with:

- TypeScript props interface
- Tailwind styling
- Accessibility (ARIA labels)
- Test file
```

**/api** - Generate API route

```markdown
Create API route with:

- Request/response types
- Validation (Zod)
- Error handling
- Rate limiting
```

**/test** - Generate test file

```markdown
Create tests for selected code:

- Happy path
- Error cases
- Edge cases
- 80%+ coverage
```

**/debug** - Debug assistance

```markdown
Analyze code for:

- Bugs
- Performance issues
- Security vulnerabilities
- Accessibility problems
```

**/optimize** - Performance optimization

```markdown
Optimize for:

- React re-renders
- Bundle size
- Load time
- Memory usage
```

---

## 🎤 VOICE MODE

### Setup

```
Settings → Voice → Enable
- Trigger: "Hey Cursor"
- Submit: "Execute"
- Language: English (US)
- Mic: Select device
```

### Usage

```
1. Say trigger word: "Hey Cursor"
2. Speak instruction: "Create fibonacci function"
3. Say submit word: "Execute"
4. AI generates code
```

### Best Practices

✅ Speak clearly (reduce transcription errors)
✅ Use technical terms (AI understands)
✅ Complete sentences (better context)
✅ Review transcript before submitting

### Use Cases

- Rapid prototyping (speak faster than type)
- Accessibility (RSI, injuries)
- Pair programming (talk through code)

---

## 👥 TEAM FEATURES (Enterprise)

### Team Commands

```
Dashboard → Team Settings → Commands
- Define command
- Syncs to all members
- Centralized management
```

### Shared .cursorrules

```
Upload to team dashboard
→ Auto-applied to all developers
→ Consistency guaranteed
```

### Usage Analytics

```
Dashboard → Analytics
- Model usage
- Acceptance rates
- Cost per developer
- Top commands
```

---

## 🎯 DECISION FRAMEWORKS

### Which Feature to Use?

**Tab**: Next-line prediction (boilerplate)
**Cmd+K**: Transform existing code
**Cmd+Shift+K**: Multi-file changes
**Multi-Agent**: Compare approaches (hard problems)
**Browser**: Visual testing
**Voice**: Hands-free coding

### Which Model to Use?

**Composer**: 80% of tasks (fast prototyping)
**GPT-5**: 15% of tasks (balanced)
**Claude**: 5% of tasks (complex logic)

**Decision tree**:

```
Is task simple/standard?
├─ YES → Composer (4x faster)
└─ NO → Did Composer fail?
         ├─ NO → Great!
         └─ YES → Use Claude
```

---

## ⌨️ KEYBOARD SHORTCUTS

### Core AI Features

- `Tab`: Accept autocomplete
- `Cmd+K`: Inline edit
- `Cmd+L`: Open chat
- `Cmd+Shift+K`: Composer (multi-file)
- `Cmd+Shift+M`: Multi-agent mode

### Browser

- `Cmd+Shift+B`: Open browser
- `Cmd+Shift+D`: Device selector
- `Cmd+Shift+S`: Screenshot
- `Cmd+Shift+I`: DevTools

### Navigation

- `Cmd+P`: Quick file open
- `Cmd+Shift+F`: Search all files
- `Cmd+Shift+E`: File explorer
- `Cmd+Shift+G`: Source control

### Editing

- `Cmd+/`: Toggle comment
- `Cmd+D`: Select next occurrence
- `Cmd+Shift+L`: Select all occurrences
- `Cmd+]`: Indent
- `Cmd+[`: Unindent

---

## 🎓 MODULE 2 QUICK WINS

### Multi-Agent Pattern

```
Hard problem → 3 agents → Compare → Merge best → Done
(Saves hours of trial-and-error)
```

### Speed Optimization

```
Simple task → Composer (4s)
Complex task → Claude (20s)
(4x faster on 80% of work)
```

### Visual Testing

```
Code → Save → Browser refreshes → AI debugs → Fix
(15-20% time savings, zero switching)
```

### Workflow Automation

```
Repetitive task → Slash command → One trigger
(10x faster than retyping)
```

---

## 📊 PERFORMANCE BENCHMARKS

### Time Savings (Module 2 Techniques)

**Traditional vs Cursor Advanced**:

| Task            | Manual  | With Module 2 | Savings   |
| --------------- | ------- | ------------- | --------- |
| Multi-approach  | 3 hours | 30 min        | 83%       |
| Model selection | Random  | Optimal       | 4x faster |
| Visual testing  | 20 min  | 3 min         | 85%       |
| Boilerplate     | 30 min  | 2 min         | 93%       |

**Cumulative**: ~60% faster development with Module 2 techniques

---

## 🐛 TROUBLESHOOTING

### Multi-Agent Issues

**"Cannot create worktree"**:
→ Commit/stash changes: `git stash`

**Agents produce same code**:
→ Task too simple (use single agent)

**Agent timeout**:
→ Break task into smaller pieces

### Browser Issues

**Browser won't open**:
→ Update Cursor to 2.0+
→ Check browser feature enabled in settings

**Auto-refresh not working**:
→ Settings → Browser → "Auto-refresh on save": ON

### Voice Mode Issues

**Poor transcription**:
→ Speak more slowly
→ Use better microphone
→ Check language setting

**Not activating**:
→ Check trigger word spelling
→ Verify microphone permissions

---

## 🔗 QUICK LINKS

**Documentation**:

- Cursor 2.0 Changelog: cursor.com/changelog
- Multi-Agent Guide: [course-repo]/guides/multi-agent
- .cursorrules Templates: [course-repo]/resources/cursorrules
- Command Library: [course-repo]/resources/commands

**Community**:

- Discord: #module-2
- GitHub Discussions: Ask questions
- Office Hours: Weekly Q&A

---

**Print this cheat sheet and keep it visible during development!**

**Version**: 1.0 | **Last Updated**: Nov 6, 2025
