# Context Engineering Patterns - Quick Reference

**The #1 skill for AI development - Core patterns you'll use daily**

---

## The Foundation

### The OS Analogy

```
LLM = CPU (processes information)
Context Window = RAM (limited working memory, e.g., 200k tokens)
Your Role = Operating System (decide what fits in RAM)
```

**Key Principle**: "Fill the context window with just the right information for the next step" - Andrej Karpathy

---

## Three Context Types

### 1. Instructions (2-5k tokens typical)

```
• System prompts
• CLAUDE.md files
• .cursorrules
• Tool descriptions
• Few-shot examples
```

**Optimization**: Write once (CLAUDE.md), reference forever

---

### 2. Knowledge (Variable, manage carefully)

```
• Documentation
• Code examples
• API references
• Historical decisions
• Retrieved information
```

**Optimization**: Load on-demand (RAG, not upfront)

---

### 3. Tools (Can be 100k+ tokens if not managed!)

```
• Tool definitions
• Tool outputs
• Execution results
• Error messages
```

**Optimization**: Progressive disclosure (load tools as needed, not all 140 upfront)

---

## Four Context Strategies

### Strategy 1: WRITE (Compress)

**Create compact representations**

❌ **Bad**:

```
Full error stack trace: 500 tokens
Complete API response: 2,000 tokens
Entire file content: 15,000 tokens
```

✅ **Good**:

```
"Error: Auth failed at line 42 due to invalid token"  (15 tokens)
"API returned 200, user data valid" (10 tokens)
"Class UserController has 5 methods" (8 tokens)
```

**Pattern**: Summarize before adding to context

---

### Strategy 2: SELECT (Choose)

**Include only relevant information**

❌ **Bad**:

```
Load all 50 files in project → 100k tokens
Include entire conversation history → 50k tokens
Add all tool definitions → 138k tokens
```

✅ **Good**:

```
Load 5 files related to current task → 10k tokens
Include last 10 messages relevant to task → 2k tokens
Load 10 tools actually needed → 8k tokens
```

**Pattern**: Relevance filtering, recency weighting

**BMAD Example**: Each agent has focused tools (not all tools)

**Serena Example**: Symbol overview first (300 tokens), not full file (15k tokens)

---

### Strategy 3: COMPRESS (Reduce)

**Same information, fewer tokens**

❌ **Bad**:

```
Full documentation page: 50k tokens
Complete code file with comments: 15k tokens
Verbose explanations: 5k tokens
```

✅ **Good**:

```
Summary of key points: 5k tokens (90% reduction)
Symbol structure without bodies: 500 tokens (97% reduction)
Concise technical descriptions: 500 tokens (90% reduction)
```

**Tools**:

- RAG (returns summaries)
- Serena symbols (structure without code)
- PRP specs (focused documentation)

---

### Strategy 4: ISOLATE (Separate Contexts)

**Use multiple context windows**

❌ **Bad**:

```
One agent with all tasks → 500k token context
One conversation for entire project → Context overflow
All history accumulated → Performance degrades
```

✅ **Good**:

```
Subagent 1: Research (50k context)
Subagent 2: Implementation (60k context)
Subagent 3: Testing (40k context)
Total: 150k managed across 3 contexts (vs 500k in one)
```

**Patterns**:

- BMAD: 12 specialized agents (isolated contexts)
- Agent Factory: 5 subagents (parallel, isolated)
- Session forking (Claude Code feature)

**Data**: Production agents process 100 input tokens per 1 output token (Manus)

---

## Progressive Disclosure Pattern

**The Most Important Pattern**

### Problem:

```
Loading all tool definitions upfront:
140 MCP tools × ~1,000 tokens each = 140,000 tokens
Before doing ANY work!
```

### Solution:

```
1. Read tool catalog (_index.json): 2,000 tokens
2. Search for needed tools: "search", "code"
3. Load ONLY those tool definitions: 3,000 tokens
4. Execute tools
Total: 5,000 tokens (97% reduction!)
```

**Implementation Examples**:

**BMAD**: "Load resources at runtime never pre-load" (from bmad-master principles)

**Serena**:

```python
# Don't read file:
read_file("module.py")  # 15,000 tokens

# Use symbol operations:
get_symbols_overview("module.py")  # 300 tokens
find_symbol("MyClass", include_body=False)  # 200 tokens
# Only if needed:
find_symbol("MyClass/method", include_body=True)  # 80 tokens
# Total: 580 tokens (96% reduction)
```

**Agent Factory**:

```
Phase 2: Generate markdown specs (3 files, ~6KB total)
Phase 3: Read specs, implement code
Not: Load all examples upfront
```

---

## PRP Documentation Pattern

**Writing AI-Optimized Specs**

### The PRP Structure:

```markdown
## FEATURE

[Clear description - more detail = better AI results]

## TOOLS

[Specific: args, returns, error handling]

## DEPENDENCIES

[Environment vars, API keys, connections]

## SYSTEM PROMPT(S)

[Instructions for AI - can be full or guidance]

## EXAMPLES

[Reference existing patterns]

## DOCUMENTATION

[Links to official docs]

## OTHER CONSIDERATIONS

[Gotchas, security, best practices]
```

**Why This Works**:

- Structured (AI knows where to find what)
- Comprehensive (all context in one place)
- Focused (only what's needed)
- Referenceable (load on-demand)

**Apply To**:

- Agent building (original use case)
- Feature planning (any development)
- API design (specification)
- Architecture docs (system context)

---

## Measurement & Optimization

### Token Counting

```javascript
import tiktoken from 'tiktoken';

const encoder = tiktoken.get_encoding('cl100k_base');

// Measure before
const beforeTokens = encoder.encode(fullFileContent).length;

// Measure after (using optimization)
const afterTokens = encoder.encode(compressedContent).length;

// Calculate reduction
const reduction = ((beforeTokens - afterTokens) / beforeTokens) * 100;
console.log(`Reduced ${reduction.toFixed(1)}%`);
```

**Targets**:

- Good: 50% reduction
- Great: 80% reduction
- Excellent: 90%+ reduction

---

## Real-World Impact

### Cost Reduction

**Vibe Coding**:

```
Task: Build feature
Tokens: 500,000 (loading everything)
Cost: $2.50 per feature
Monthly (10 features): $25
```

**Context Engineering**:

```
Task: Same feature
Tokens: 50,000 (progressive disclosure + symbol ops)
Cost: $0.25 per feature
Monthly (10 features): $2.50
```

**Savings**: 90% = $22.50/month or $270/year

---

### Accuracy Improvement

**Research Data** (Context Rot study):

```
Poor context management: 64.1% accuracy
Good context management: 98.1% accuracy
Improvement: 34 percentage points
```

**Translation**: Better context = 50% fewer bugs to fix

---

## Pattern Decision Tree

**When to Use Each Strategy**:

```
Do you have too many tokens loaded?
├─ YES → Use SELECT (filter down)
│   └─ Still too many? → Use COMPRESS (summarize)
│
└─ NO, but responses are slow/expensive?
    ├─ Check tool definitions → ISOLATE (subagents)
    └─ Check file reads → Use Serena (symbol-level)

Is context polluted (old/irrelevant data)?
├─ YES → Start fresh session
└─ NO → Use WRITE (compress what's there)

Need to scale (multiple tasks)?
└─ Use ISOLATE (subagents, session forking)
```

---

## Framework Patterns

### BMAD Pattern: Specialized Agents

```
Instead of: One agent doing everything
Use: 12 specialized agents
  - PM (planning context)
  - Developer (code context)
  - Architect (design context)
  - Test Architect (test context)

Result: Each agent has focused, clean context
```

### PRP Pattern: Structured Documentation

```
Instead of: Vague requirements in chat
Use: Structured INITIAL.md + specs
  - Feature description
  - Tool specifications
  - Dependencies
  - Examples

Result: AI has complete, organized context
```

### Serena Pattern: Symbol-First

```
Instead of: Reading entire files
Use: Symbol operations
  1. get_symbols_overview (structure)
  2. find_symbol (specific entity)
  3. Read body only if needed

Result: 90-96% token reduction
```

### Agent Factory Pattern: Parallel Subagents

```
Instead of: Sequential generation
Use: 3 subagents in parallel
  - Prompt Engineer (prompts.md)
  - Tool Integrator (tools.md)
  - Dependency Manager (dependencies.md)

Result: 3x faster + isolated contexts
```

---

## Anti-Patterns (Avoid These!)

❌ **Loading Everything Upfront**

- All tool definitions
- All files in project
- Complete documentation

❌ **Vague Context**

- "The auth code" (which file?)
- "Fix the bug" (which bug where?)
- "Make it better" (how?)

❌ **Polluted Context**

- Old error messages in history
- Deleted code still referenced
- Irrelevant files included

❌ **No Measurement**

- Not tracking token usage
- Not monitoring costs
- Not measuring effectiveness

---

## Quick Wins (Apply Today)

**Win 1**: Create CLAUDE.md for your project

- Time: 15 minutes
- Benefit: Never repeat project context again

**Win 2**: Use Serena for code operations

- Time: 5 minutes to activate
- Benefit: 90%+ token reduction on code tasks

**Win 3**: Structure requirements as PRP

- Time: 20 minutes per feature
- Benefit: Better AI code generation

**Win 4**: Use BMAD workflows for planning

- Time: Already installed!
- Benefit: Systematic approach vs vibe coding

---

## The Formula

**Context Engineering = Right Information + Right Time + Right Amount**

```
Right Information:
  • Relevant to current task
  • Accurate and current
  • Properly structured

Right Time:
  • Load on-demand (progressive disclosure)
  • Just-in-time (not anticipatory)
  • Refresh when stale

Right Amount:
  • Sufficient for task (not more)
  • Compressed when possible
  • Measured and optimized
```

---

**Course**: Context Engineering Mastery
**Modules**: All (fundamental skill)
**Apply**: Every AI interaction
**Master**: By end of Module 6
**Print**: Keep visible at desk!
**Updated**: November 2025
