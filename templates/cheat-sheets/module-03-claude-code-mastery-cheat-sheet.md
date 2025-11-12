# Claude Code Mastery - Quick Reference Cheat Sheet

**Module 3 | Context Engineering Mastery 2025**

---

## 🚀 ESSENTIAL COMMANDS

### Session Management

```bash
claude                    # Start new session
claude --continue         # Resume recent session
claude /resume           # Browse all sessions
claude /exit             # Exit current session
claude /clear            # Clear conversation history
claude /rewind           # Undo last changes
```

### Context Management

```bash
/context                 # Show token usage breakdown
/config                  # View/edit settings
/config auto-compaction true    # Enable auto-cleanup
```

### File Operations

```bash
@filename.js             # Reference file
@foldername/             # Reference folder
@Symbol:functionName     # Reference specific function (with Serena MCP)
```

---

## 🤖 SUBAGENT SYSTEM

### Built-in Subagents

**Explore** (Haiku-powered):

- Auto-activates for codebase questions
- Semantic search across files
- Generates investigation files
- **Cost**: 10-20x cheaper than full codebase loading

**Plan** (Sonnet):

- Structured planning workflows
- Architecture decisions
- Feature breakdowns
- **Use**: Complex features needing upfront design

### Invoke Subagents

```bash
# Explore automatically activates on codebase questions
"How does authentication work in this codebase?"

# Plan mode
Shift+Tab before sending prompt
"Plan real-time chat feature"

# Custom subagent
/subagent security-audit
"Audit auth system"
```

### Create Custom Subagent

```json
// .claude/agents/security-audit.json
{
  "name": "security-audit",
  "model": "claude-sonnet-4.5",
  "systemPrompt": "Security expert. Find vulnerabilities.",
  "allowedTools": ["read", "grep"],
  "disallowedTools": ["write"],
  "maxTokens": 4096
}
```

---

## 🔌 MCP INTEGRATION

### Install MCP Server

```bash
# Via Claude Code
/mcp install github

# Via config (~/.mcp.json or .mcp.json in project)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "ghp_..."}
    }
  }
}
```

### List MCPs

```bash
/mcp                     # List installed servers and tools
```

### Essential MCP Servers

- **Serena**: Symbolic code operations
- **GitHub**: Repository management
- **Linear**: Issue tracking
- **Notion**: Documentation
- **Postgres**: Database access
- **Brave Search**: Web research

### Use MCP Tool

```bash
# Automatic (Claude chooses when to use)
"Search for React hooks examples"
# Uses Brave Search MCP

# Explicit resource reference
@mcp-resource:github://myrepo
"Show recent PRs"
```

---

## 🧩 PLUGIN SYSTEM

### Plugin Commands

```bash
/plugin marketplace              # Browse available
/plugin marketplace add URL      # Add marketplace
/plugin install name             # Install plugin
/plugin enable name              # Enable plugin
/plugin disable name             # Disable plugin
/plugin list                     # Show installed
/plugin validate                 # Check structure
```

### Create Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   ├── marketplace.json
│   ├── commands/
│   ├── agents/
│   └── hooks/
└── README.md
```

### Share with Team

```json
// Project .claude/settings.json
{
  "extraKnownMarketplaces": ["https://github.com/company/claude-plugins"]
}
```

---

## ⚙️ GIT INTEGRATION

### Commit Workflows

```bash
# Generate commit message
"Review changes and write commit message"
# Claude analyzes git diff, writes conventional commit

# Create PR
"Create pull request for these changes"
# Uses gh CLI, generates comprehensive PR description

# Rebase
"Rebase this branch on main"
# Handles rebase, assists with conflicts
```

### Useful Patterns

```bash
# Analyze changes before committing
"What did I change in this session?"

# Split large PR
"Split these changes into 3 logical commits"

# Conflict resolution
"Help me resolve merge conflicts in server.js"
```

---

## 🔄 CI/CD AUTOMATION

### GitHub Actions

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    api-key: ${{ secrets.ANTHROPIC_API_KEY }}
    command: /security-review
```

### GitLab CI/CD

```yaml
ai-review:
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude "Review MR for security and quality issues"
```

### Available Commands

- `/security-review` - Vulnerability scanning
- `/test-gen` - Generate missing tests
- `/quality-check` - Code quality analysis
- Never auto-merges (human approval required)

---

## 👥 TEAM FEATURES

### Shared Configuration

```json
// Commit to repo: .claude/settings.json
{
  "defaultModel": "claude-sonnet-4.5",
  "autoCompaction": true,
  "permissions": {
    "read": "all",
    "write": "ask",
    "bash": "ask"
  },
  "extraKnownMarketplaces": ["team-plugins-repo"]
}
```

### Memory System (Team/Enterprise)

- Project-scoped memory
- Shared across team members
- Tracks decisions and context
- Incognito mode for sensitive work

### Usage Analytics (Enterprise)

- Cost tracking per team/project
- Model usage patterns
- Compliance reporting
- Budget controls with `--max-budget-usd`

---

## 🎯 DECISION FRAMEWORKS

### Cursor vs Claude Code

```
Visual development (UI/UX) → Cursor
Terminal workflows (DevOps, scripts) → Claude Code
Large codebase exploration → Claude Code (Explore)
Multi-file visual edits → Cursor
Git-heavy workflows → Claude Code
Real-time preview needed → Cursor (Browser)
CI/CD integration → Claude Code
```

### Model Selection (Claude Code)

```
Exploration / Search → Haiku (Explore subagent)
Planning / Architecture → Sonnet (Plan subagent)
Complex coding → Sonnet 4.5 (default)
Highest quality → Opus 4.1 (rare use)
```

### Subagent Usage

```
Understanding codebase → Explore
Designing feature → Plan
Specialized task → Custom subagent
Regular coding → Main Claude (no subagent)
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Token Reduction

```
Full codebase loading: 200K tokens
+ Explore subagent: 10K tokens (98% reduction)

All MCP tools upfront: 138K tokens
+ Progressive disclosure: 2K tokens (98% reduction)

Long conversation: 100K tokens
+ Auto-compaction: 20K tokens (80% reduction)
```

### Cost Optimization

```
Use Haiku for exploration: 20x cheaper than Sonnet
Use Sonnet for coding: 3x cheaper than Opus
Cache prompts in CI: 90% cost reduction (Amazon Bedrock)
```

### Speed Optimization

```
Selective context loading: 6x faster responses
Auto-compaction: Prevents slowdown over time
Subagents: Parallel processing where possible
```

---

## 🐛 TROUBLESHOOTING

### Common Issues

**"Prompt too long"**:
→ Enable auto-compaction: `/config auto-compaction true`
→ Start fresh session
→ Use @-mentions selectively

**Explore subagent not activating**:
→ Update Claude Code: v2.0.17+
→ Ensure git repository exists
→ Ask codebase-specific questions

**MCP server not connecting**:
→ Check `.mcp.json` config
→ Verify environment variables set
→ Test server independently
→ Check `/mcp` for error messages

**Session degrading (context rot)**:
→ Start fresh session (every 30-50 exchanges)
→ Use `/resume` for clean context
→ Enable auto-compaction

### Permission Issues

**Too many prompts**:
→ Use `.claude/settings.json` to pre-approve tools
→ Set permission patterns (e.g., `read: "all"`)

**Security concerns**:
→ Use ask-permissions mode for sensitive operations
→ Review `.claude/permissions.log`
→ Sandbox with `--read-only` mode

---

## 📊 REAL-WORLD METRICS

### Measured Performance Gains

**Debugging**: 3x faster (Anthropic Security)
**Research**: 80% time reduction (Anthropic Inference)
**Feature Delivery**: 2x faster (CRED fintech)
**Proposals**: 90% time saved (Quantium)
**Bug Resolution**: 40% faster (community avg)

### Cost Savings

**With context engineering**:

- 85-95% token reduction
- 80%+ API cost savings
- 6x faster responses

**Enterprise deployments**:

- Cognizant: 350,000 users
- Zapier: 89% adoption, 800+ agents
- nCino: Complete workflow reimagination

---

## 🔗 QUICK REFERENCES

### Documentation

- Official Docs: code.claude.com/docs
- Changelog: github.com/anthropics/claude-code/CHANGELOG.md
- GitHub Actions: code.claude.com/docs/en/github-actions
- MCP Spec: modelcontextprotocol.io

### Plugin Resources

- Marketplace: anthropics/claude-code
- FastMCP: Create MCPs easily
- Plugin validator: `/plugin validate`

### Community

- Discord: #module-3
- GitHub Discussions
- Office hours: Weekly

---

**Print this and keep it handy during Module 3!**

**Version**: 1.0 | **Last Updated**: Nov 6, 2025
