# PRP Methodology - Quick Reference

**Writing AI-Optimized Documentation for Better Code Generation**

---

## What is PRP?

**Product Requirements Prompts** = Structured documentation methodology that creates context-optimized specs for AI agents

**Not**: Just another requirements doc format
**Is**: Documentation specifically designed for AI consumption and code generation

**Origin**: Context engineering community (Rasmus Wielding, Cole Medin)
**Use**: Any development with AI tools (not just agent building)

---

## The 5-Step PRP Process

### Step 1: Foundation Setup (10 min)

**Define**:

- Project scope and requirements
- Tech stack and dependencies
- Quality standards
- Success criteria

**Output**: Clear understanding of what you're building

---

### Step 2: Create INITIAL.md (15 min)

**The Requirements Specification**

```markdown
## FEATURE

[Clear, detailed description of what you're building]
[More detail = better AI results]

## TOOLS

[Specific functionality, arguments, return values]
[Be precise - AI will implement exactly this]

## DEPENDENCIES

[Environment variables, API keys, database connections]
[Everything the code needs to run]

## SYSTEM PROMPT(S)

[Instructions for AI behavior]
[Can be complete prompt or general guidance]

## EXAMPLES

[Reference to similar implementations]
[Existing patterns to follow]

## DOCUMENTATION

[Links to official docs, APIs, libraries]
[Context for AI to reference]

## OTHER CONSIDERATIONS

[Gotchas, security concerns, best practices]
[Edge cases and error handling]
```

**Key**: Specific > Vague, Complete > Partial

---

### Step 3: Generate Detailed Specs (15 min)

**Create 3 specification files**:

**prompts.md**: AI behavior instructions (100-300 words)
**tools.md**: Tool specifications (2-3 tools, detailed)
**dependencies.md**: Environment and config requirements

**Can be done**:

- Manually (write yourself)
- With AI help (use BMAD or Claude Code)
- With Agent Factory (automated via subagents)

---

### Step 4: Validation (CRITICAL - Don't Skip!)

**Review checklist**:

- [ ] INITIAL.md has all sections complete
- [ ] Feature description is specific (not vague)
- [ ] Tools are well-defined (args, returns, errors)
- [ ] Dependencies are complete (all env vars)
- [ ] Examples are relevant and accessible
- [ ] Documentation links work
- [ ] No scope creep (stayed focused)

**The "Don't Be That Guy" Rule**:
Don't skip validation and hope AI figures it out.
Bad specs = bad code (garbage in, garbage out)

---

### Step 5: Execute & Deliver (Variable time)

**Implementation**:

- Use specs to guide development
- AI generates code from PRP documents
- Validate against INITIAL.md requirements
- Test and refine

**Delivery**:

- Code that matches specs
- Documentation
- Tests
- Deployment guide

---

## PRP Document Templates

### INITIAL.md Template

```markdown
## FEATURE: [Project/Feature Name]

[2-3 paragraph detailed description]
[Include: purpose, users, key functionality]
[Be specific: "JWT authentication with refresh tokens" not "auth"]

## TOOLS:

### Tool 1: [Name]

**Purpose**: [What it does]
**Arguments**:

- arg1 (type): description
- arg2 (type): description
  **Returns**: [Return type and structure]
  **Errors**: [Error handling approach]

### Tool 2: [Name]

[Same structure]

[2-3 tools maximum for simplicity]

## DEPENDENCIES

**Environment Variables**:

- API_KEY: [Description and where to get]
- DATABASE_URL: [Connection string format]
- [Essential vars only]

**External Services**:

- Service 1: [API, library, database]
- Service 2: [Purpose and configuration]

**Python Packages** (or npm, etc.):

- package1==version
- package2==version
  [Minimal list]

## SYSTEM PROMPT(S)

[If building agent, write the system prompt here]
[If building feature, write coding guidelines]

Example:
"You are a helpful assistant that validates user inputs,
handles errors gracefully, and follows REST API best practices.
Always return structured JSON responses."

## EXAMPLES:

Reference these existing implementations:

- examples/similar-project/feature.py
- https://github.com/org/repo (specific file/pattern)
- Internal: /path/to/reference/code

## DOCUMENTATION:

Official docs to reference:

- Library docs: https://docs.library.com
- API reference: https://api.service.com/docs
- Best practices: [relevant guide]

## OTHER CONSIDERATIONS:

**Security**:

- Validate all inputs
- Use environment variables for secrets
- Follow OWASP Top 10

**Performance**:

- Cache frequently accessed data
- Use connection pooling
- Implement rate limiting

**Testing**:

- Unit tests for all functions
- Integration tests for workflows
- 80%+ coverage target

**Gotchas**:

- [Known issues or edge cases]
- [Platform-specific concerns]
- [Common mistakes to avoid]
```

---

## When to Use PRP

### ✅ Use PRP For:

- **Agent development** (original use case)
- **Complex features** (multi-component)
- **API design** (clear specifications needed)
- **Team collaboration** (shared context)
- **AI-assisted development** (optimize for code generation)

### ⏭️ Skip PRP For:

- **Simple bug fixes** (overkill)
- **Quick prototypes** (iterate faster without docs)
- **Exploratory coding** (don't know requirements yet)
- **One-file changes** (too lightweight)

**Rule of Thumb**: If feature takes >2 hours to build, use PRP

---

## PRP Best Practices

### Be Specific

❌ **Vague**:

```
## FEATURE: Build authentication

Add auth to the app.
```

✅ **Specific**:

```
## FEATURE: JWT Authentication with Refresh Tokens

Implement JWT-based authentication supporting:
- User login with email/password
- Access tokens (15min expiry)
- Refresh tokens (7 day expiry)
- Token validation middleware
- Password hashing with bcrypt
- Rate limiting on login endpoint (5 attempts/15min)
```

---

### Keep Tools Minimal

❌ **Too Many**:

```
## TOOLS: (listing 10 different tools)
```

✅ **Focused**:

```
## TOOLS: (2-3 essential tools only)

Focus on core functionality
Add more later if needed
```

**Agent Factory pattern**: 2-3 tools for MVP

---

### Make It Actionable

❌ **Abstract**:

```
## SYSTEM PROMPT: Be helpful
```

✅ **Actionable**:

```
## SYSTEM PROMPT:

You validate user inputs using Pydantic models.
You return structured JSON responses.
You handle errors with try-catch and meaningful messages.
You log operations for debugging.
You follow REST API conventions (GET, POST, PUT, DELETE).
```

---

## PRP + Other Tools

### PRP + BMAD

```
1. Use BMAD PM agent to create project vision
2. Write PRP INITIAL.md from PM output
3. Use BMAD Developer agent with PRP specs
4. Developer agent implements from optimized context
```

**Benefit**: Systematic planning + optimized execution

---


```
1. Write INITIAL.md
2. Use to research implementation patterns
3. Add findings to DOCUMENTATION section
4. Implement with complete context
```

**Benefit**: Research-backed specifications

---

### PRP + Serena

```
1. Write PRP specs for refactoring task
2. Use Serena to find existing symbols
3. Analyze current implementation
4. Refactor using PRP as guide
```

**Benefit**: Surgical changes with clear requirements

---

## Agent Factory Pattern (PRP Example)

**Uses PRP methodology to build Pydantic AI agents**:

**Phase 1**: Planner creates INITIAL.md
**Phase 2**: Subagents create prompts.md, tools.md, dependencies.md (parallel!)
**Phase 3**: Main agent implements from specs
**Phase 4**: Validator tests against INITIAL.md

**Time**: 10-15 minutes for complete agent
**Result**: Production-ready with 80%+ test coverage

**Lesson**: Good specs (PRP) → Good code (automated)

---

## PRP Template Checklist

**Before calling your PRP complete**:

**INITIAL.md**:

- [ ] Feature description: Detailed and specific
- [ ] Tools: 2-3 defined with args/returns
- [ ] Dependencies: All env vars and services listed
- [ ] System prompt: Actionable instructions
- [ ] Examples: At least 2 relevant references
- [ ] Documentation: Key URLs included
- [ ] Considerations: Security, performance, gotchas

**Validation Questions**:

- [ ] Could someone implement this without asking questions?
- [ ] Are technical details specific (not generic)?
- [ ] Have you covered edge cases and errors?
- [ ] Is scope clear (what's IN and OUT)?

**If you answered "no" to any**: Refine your PRP!

---

## Common Mistakes

**Mistake 1: Too Vague**

```
❌ "Build a web scraper"
✅ "Build a web scraper using BeautifulSoup that:
   - Accepts URL and CSS selectors
   - Returns structured data as JSON
   - Handles HTTP errors and timeouts
   - Respects robots.txt"
```

**Mistake 2: Too Broad**

```
❌ Trying to spec entire application in one INITIAL.md
✅ Break into features, one PRP per feature
```

**Mistake 3: Skipping Validation**

```
❌ Write INITIAL.md → immediately code
✅ Write → Review → Refine → THEN code
```

**Mistake 4: No Examples**

```
❌ "Figure it out"
✅ Point to similar implementations for patterns
```

---

## Quick Reference Card

**PRP in 60 Seconds**:

```
1. Write INITIAL.md:
   - FEATURE (what)
   - TOOLS (how)
   - DEPENDENCIES (needs)
   - SYSTEM PROMPT (behavior)
   - EXAMPLES (patterns)
   - DOCUMENTATION (references)
   - CONSIDERATIONS (gotchas)

2. Validate completeness

3. Implement (AI generates from specs)

4. Test against requirements

Result: Better code, faster development
```

**The PRP Promise**:

- 📝 Clearer requirements
- 🤖 Better AI code generation
- ⚡ Faster implementation (less back-and-forth)
- ✅ Higher quality (specs = test criteria)

---

**Course**: Context Engineering Mastery
**Module**: 4 (PRP + Agent Factory)
**Apply**: Any AI-assisted development
**Pattern**: Structured context → Better results
**Updated**: November 2025
