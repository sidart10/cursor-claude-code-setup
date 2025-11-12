# Cursor IDE Keyboard Shortcuts - Quick Reference

**Print this page and keep at your desk!**

---

## Essential Shortcuts (Use Daily)

### AI Features

| Shortcut           | Action              | Use Case                         |
| ------------------ | ------------------- | -------------------------------- |
| **Tab**            | Accept autocomplete | Function generation, boilerplate |
| **Esc**            | Reject suggestion   | When AI is wrong                 |
| **Cmd+K** / Ctrl+K | Inline edit         | Transform selected code          |
| **Cmd+L** / Ctrl+L | Open chat           | Ask questions, get explanations  |
| **Cmd+I** / Ctrl+I | Quick edit          | Similar to Cmd+K                 |
| **Shift+Tab** (2x) | Plan Mode           | Research without editing         |

### Model Selection

| Shortcut                                 | Action                               |
| ---------------------------------------- | ------------------------------------ |
| Click model name in chat                 | Switch between GPT-5, Claude, Gemini |
| **Cmd+Shift+P** → "Cursor: Select Model" | Model picker                         |

---

## Editor Shortcuts

### Navigation

| Shortcut                       | Action               |
| ------------------------------ | -------------------- |
| **Cmd+P** / Ctrl+P             | Quick file open      |
| **Cmd+Shift+F** / Ctrl+Shift+F | Search in all files  |
| **Cmd+G** / Ctrl+G             | Go to line           |
| **Cmd+Click**                  | Go to definition     |
| **Cmd+Shift+O**                | Go to symbol in file |

### Editing

| Shortcut                       | Action                 |
| ------------------------------ | ---------------------- |
| **Cmd+D** / Ctrl+D             | Select next occurrence |
| **Cmd+/** / Ctrl+/             | Toggle line comment    |
| **Cmd+Shift+K** / Ctrl+Shift+K | Delete line            |
| **Alt+↑/↓**                    | Move line up/down      |
| **Cmd+Shift+D** / Ctrl+Shift+D | Duplicate line         |

### Multi-Cursor

| Shortcut                       | Action                    |
| ------------------------------ | ------------------------- |
| **Cmd+Alt+↑/↓** / Ctrl+Alt+↑/↓ | Add cursor above/below    |
| **Cmd+Shift+L** / Ctrl+Shift+L | Select all occurrences    |
| **Alt+Click**                  | Add cursor at click point |

---

## Advanced Features

### Agent Mode

| Shortcut                       | Action           |
| ------------------------------ | ---------------- |
| **Cmd+Shift+A** / Ctrl+Shift+A | Open agent panel |
| In agent chat: **/**           | Slash commands   |
| In agent chat: **@**           | Reference files  |

### Browser Integration

| Shortcut                       | Action                |
| ------------------------------ | --------------------- |
| **Cmd+Shift+B** / Ctrl+Shift+B | Open embedded browser |

### Terminal

| Shortcut                       | Action          |
| ------------------------------ | --------------- |
| **Cmd+`** / Ctrl+`             | Toggle terminal |
| **Cmd+Shift+`** / Ctrl+Shift+` | New terminal    |

---

## Cursor-Specific Tips

**Tab Autocomplete**:

- Wait 1-2 seconds after typing (AI needs time to predict)
- More context = better predictions (add comments above code)
- Reject and retry if first suggestion isn't right

**Cmd+K Best Practices**:

- Select exactly what you want to change (precise selection)
- Be specific in your instruction ("Add error handling for network requests")
- Use "Fix this bug: [describe]" for debugging
- Can chain: Accept first change, Cmd+K again for next

**Chat Effective Use**:

- Ask conceptual questions ("How should I structure this?")
- Get multiple approaches ("Suggest 3 ways to implement this")
- Debugging help ("Why doesn't this work? [paste code]")
- Architecture guidance ("Should I use Redux or Context API?")

---

## Model Selection Guide

### When to Use Which Model

**GPT-5** (Slower, Smarter):

- Complex architecture decisions
- System design
- Difficult debugging
- Learning/explanations

**Claude Sonnet 4.5** (Balanced):

- Code refactoring
- Code quality improvements
- General development
- **Recommended default**

**Gemini 2.5 Pro** (Creative):

- Exploration
- Multiple approaches
- Creative solutions
- Brainstorming

**Composer** (Cursor's Model):

- Multi-file changes
- Project-wide edits
- Batch operations
- **4x faster than others**

---

## Workflow Patterns

### Pattern 1: Quick Code Generation

```
1. Type function signature
2. Press Tab
3. Review
4. Accept or refine with Cmd+K
```

### Pattern 2: Refactoring

```
1. Select code block
2. Cmd+K
3. Type transformation (e.g., "use async/await")
4. Review diff
5. Accept
```

### Pattern 3: Debug Workflow

```
1. Select buggy code
2. Cmd+K
3. Type: "Fix this bug: [describe issue]"
4. OR use Chat: "Why doesn't this work?"
5. Apply fix
6. Test
```

### Pattern 4: Learning

```
1. Select unfamiliar code
2. Cmd+L (open chat)
3. Ask: "Explain this code"
4. Read explanation
5. Ask follow-ups
```

---

## Common Issues

**Tab Not Working**:

- Check: Settings → AI → Enable Auto Suggestions
- Try: Adding comment above code for context
- Switch: To different model

**Cmd+K Not Responding**:

- Select code first (must have selection)
- Check: Model is responding (try in chat)
- Try: More specific instruction

**Slow Responses**:

- Switch to faster model (Composer, Gemini)
- Reduce context (close unused files)
- Check internet connection

---

## Quick Commands

**In Cursor's Command Palette** (Cmd+Shift+P):

```
> Cursor: Select Model
> Cursor: Clear Chat History
> Cursor: Enable/Disable AI Features
> Cursor: Show AI Logs
> Cursor: Restart AI Connection
```

---

**Print Version**: Export as PDF, 1 page, landscape orientation
**Digital Version**: Keep open in second monitor
**Course**: Context Engineering Mastery | Module 1
**Updated**: November 2025 | [Your URL]
