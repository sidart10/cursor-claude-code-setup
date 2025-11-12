# Claude Code CLI Commands - Quick Reference

**Keep this handy when using Claude Code in terminal!**

---

## Basic Usage

### Ask Questions

```bash
# Simple query
claude "What is this project about?"

# Explain code
claude "Explain the function in auth.js:42"

# Get suggestions
claude "How can I optimize this database query?"
```

---

### Generate Code

```bash
# Create new file
claude "Create a React component for user profile"

# Add to existing
claude "Add error handling to api/users.js"

# Implement feature
claude "Implement password reset functionality with email"
```

---

### Run Commands

```bash
# Execute tests
claude "Run the test suite"

# Install dependencies
claude "Install the missing dependencies"

# Start server
claude "Start the development server"

# Git operations
claude "Create a commit for these changes"
```

---

## MCP Tool Usage

### (Knowledge Management)

```bash
# Search documentation
claude "Search for React hooks best practices"

# Read full page

# Project management
claude "Create project for this app"
claude "Add task: Implement user authentication"
claude "Update current task to done status"
```

**Query Tips**:

- Keep queries SHORT (2-5 keywords)
- Don't use sentences: ❌ "how to implement user authentication with JWT tokens"
- Use keywords: ✅ "JWT authentication"

---

### Serena (Code Intelligence)

```bash
# Activate project (REQUIRED FIRST TIME)
claude "Activate the current directory as project using Serena"

# Get file overview
claude "Use Serena to show symbol overview of src/main.py"

# Find symbol
claude "Use Serena to find the UserController class"

# Find usage
claude "Use Serena to find where login function is called"

# Edit symbol
claude "Use Serena to replace the authenticate method with [new implementation]"

# Store knowledge
claude "Use Serena to write a memory about this project's architecture"
```

**Symbol Operations Benefits**:

- 90-96% token reduction vs reading full files
- Faster execution
- Lower costs
- Better results

---

## Advanced Patterns

### Plan Mode

```bash
# Enter Plan Mode (research without editing)
# Method 1: Via chat, press Shift+Tab twice
# Method 2: Via command
claude --plan "Analyze the architecture of this codebase"
```

**Use Plan Mode for**:

- Understanding unfamiliar code
- Analyzing before refactoring
- Estimating effort
- Exploring options

---

### Session Management

```bash
# Save session
claude save session my-feature-name

# Resume session
claude resume session my-feature-name

# List sessions
claude list sessions

# Delete session
claude delete session my-feature-name
```

---

### BMAD Integration

```bash
# Run BMAD workflow from CLI
claude "/bmad:bmm:workflows:workflow-init"
claude "/bmad:bmm:workflows:prd"

# Load BMAD agent and run workflow
claude "Load Developer agent and implement user registration feature"
```

---

## Configuration

### Set API Key

```bash
claude config set api_key YOUR_ANTHROPIC_KEY
```

---

### View Config

```bash
claude config list
```

---

### Add MCP Server

```bash
# Per-project MCP server
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server

# List MCP servers
claude mcp list

# Remove MCP server
claude mcp remove serena
```

---

## Context Engineering Patterns

### Progressive Disclosure

```bash
# ❌ Bad: Load everything
claude "Read all files and implement feature"

# ✅ Good: Load on-demand
claude "Use Serena to find relevant files for auth"
# Then: "Read only the files Serena identified"
```

---

### Precise Targeting

```bash
# ❌ Bad: Vague
claude "Fix the code"

# ✅ Good: Specific
claude "Fix the authentication bug in api/auth.js line 42 where token validation fails for refresh tokens"
```

---

### Iterative Refinement

```bash
# Step 1: Plan
claude --plan "How should I implement caching?"

# Step 2: Implement
claude "Implement the Redis caching approach from the plan"

# Step 3: Test
claude "Run tests and fix any failures"

# Step 4: Refine
claude "Optimize the caching logic based on test results"
```

---

## Debugging Workflow

### Standard Debug Pattern

```bash
# 1. Describe problem
claude "The login function throws 'undefined' error"

# 2. Show context
claude "Here's the login function: [paste code]"

# 3. Get diagnosis
# Claude analyzes and suggests fix

# 4. Apply fix
# Claude implements or you implement with guidance

# 5. Verify
claude "Run the auth tests"
```

---

### Use Tools for Debugging

```bash
# Find all places code is used
claude "Use Serena to find all references to validateToken function"

# Check if similar issue exists in docs
claude "Search for authentication debugging guides"

# Examine symbol structure
claude "Use Serena get_symbols_overview on auth.js"
```

---

## Flags & Options

### Common Flags

```bash
claude --help                    # Show help
claude --version                 # Show version
claude --plan "query"            # Plan Mode (read-only)
claude --verbose "query"         # Detailed logging
claude --model claude-opus "query"  # Specify model
```

---

### Environment Variables

```bash
# Set default model
export CLAUDE_MODEL=claude-sonnet-4.5

# Set log level
export CLAUDE_LOG_LEVEL=debug
```

---

## Pro Tips

**Tip 1**: Use descriptive session names

```bash
# ❌ claude save session feature
# ✅ claude save session user-auth-jwt-implementation
```

**Tip 2**: Reference specific files

```bash
# Instead of: "update the auth file"
# Say: "update api/v2/auth/jwt-validator.js"
```

**Tip 3**: Ask for multiple approaches

```bash
claude "Suggest 3 different ways to implement real-time notifications"
# Then choose the best one
```

**Tip 4**: Measure token usage

```bash
claude "How many tokens did that last response use?"
# Context awareness = cost awareness
```

**Tip 5**: Use CLAUDE.md

```
Create CLAUDE.md in project root
Claude reads it automatically
Put project rules, commands, standards there
Never repeat yourself
```

---

## Troubleshooting

**Command Not Found**:

```bash
# Check installation
which claude

# Reinstall if needed
curl -fsSL https://claude.ai/install.sh | sh
```

**API Key Error**:

```bash
# Re-configure
claude config set api_key YOUR_KEY

# Verify
claude config list
```

**MCP Tools Not Available**:

```bash
# Check MCP servers
claude mcp list

# Check config file
cat ~/.claude/config.json

# Restart if needed
# (Close terminal, reopen)
```

**Slow Responses**:

- Close other applications (free up RAM)
- Use faster model (Gemini, Haiku)
- Reduce context (start new session)

---

## Quick Reference Card

**Most Used Commands** (80% of usage):

```
claude "question or instruction"     # General
claude "Use to search for X"  # Knowledge
claude "Use Serena to find symbol X" # Code
claude save session name              # Save
claude --plan "analyze X"             # Research
```

**Context Engineering Checklist**:

- ✅ Use Serena for code (symbol-level)
- ✅ Use for docs (RAG search)
- ✅ Short queries (2-5 keywords)
- ✅ Progressive disclosure (load on-demand)
- ✅ Measure tokens (optimize costs)

---

**Course**: Context Engineering Mastery
**Module**: All modules
**Updated**: November 2025
**Print**: 1 page, both sides okay
**Digital**: Keep in ~/cursor-claude-course/resources/
