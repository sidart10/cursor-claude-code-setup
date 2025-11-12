# Cursor Claude Setup 2025

**One-command setup for Cursor & Claude Code with MCP servers, Context Engineering commands, and BMAD Framework**

Automated configuration for AI-powered development:

- ✅ **MCP Servers** - Auto-configure Exa, Firecrawl, and Serena
- ✅ **Dual-Client Commands** - Context Engineering slash commands for both Cursor and Claude Code
- ✅ **Safe Merging** - Preserve your existing configs with timestamped backups
- ✅ **No API Prompts** - Add keys later via clear instructions
- ✅ **BMAD Framework** - 12 AI agents + 34 workflows (optional)

---

## Quick Start

```bash
npx cursor-claude-setup-2025
```

**Time**: ~15-20 minutes  
**Prompts**: Name, component selection, workspace creation  
**Result**: Both Cursor and Claude Code configured and ready to use

---

## What Gets Configured

### 1. MCP Servers (Auto-Configured)

**Three powerful MCP servers installed automatically**:

- **Exa** - AI-powered web search
- **Firecrawl** - Web crawling and scraping
- **Serena** - Symbolic code operations

**Configured in**:
- `./.mcp.json` (project-level)
- `~/.cursor/mcp.json` (Cursor global - merged with backup)
- `~/.claude/config.json` (Claude Code global - merged with backup)

### 2. Context Engineering Commands (Both Clients)

**PRP (Problem-Requirements-Plan) workflow commands**:

- `/generate-prp` - Research and create comprehensive implementation plans
- `/execute-prp` - Execute plans with validation and iteration

**Installed for**:
- `.claude/commands/` (Claude Code)
- `.cursor/commands/` (Cursor)

**Source**: [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro)

### 3. Global Configurations

- `~/.cursorrules` - Cursor best practices (personalized)
- API key placeholders (add via `.mcp.env.example`)
- Environment variable guidance

### 4. Optional Components

- **BMAD Framework** - Multi-agent development system (12 agents, 34 workflows)
- **Archon MCP** - Knowledge management with Docker + Supabase
- **Workspace** - Organized folder structure for learning

---

## Prerequisites

### Step 1: Install Node.js (if you don't have npm/npx)

**Check if you have it**:
```bash
node --version
npm --version
```

**If missing, install Node.js**:
- **Download**: [nodejs.org](https://nodejs.org) (v18 or higher)
- **macOS** (via Homebrew): `brew install node`
- **Windows**: Download .msi installer from nodejs.org
- **Linux**: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`

**After installation**:
```bash
node --version  # Should show v18.x or higher
npx --version   # Should work (included with Node.js)
```

### Step 2: Other Requirements

**Required**:
- Cursor IDE ([download](https://cursor.com))
- Claude Code CLI ([install](https://docs.claude.com/claude-code/installation))

**Optional** (for Archon):
- Docker Desktop ([download](https://docker.com/products/docker-desktop))
- Supabase account ([sign up](https://supabase.com))

---

## What You Get

### MCP Configuration Files:

```
Project:
├── .mcp.json              # Exa, Firecrawl, Serena configured
└── .mcp.env.example       # API key template

Global:
├── ~/.cursor/mcp.json     # Merged (backed up first)
├── ~/.claude/config.json  # Merged (backed up first)
└── ~/.claude/README-MCP-ENV.md  # Key export instructions
```

### Context Engineering Commands:

```
Project:
├── .claude/commands/
│   ├── generate-prp.md    # Create implementation plans
│   └── execute-prp.md     # Execute with validation
│
└── .cursor/commands/
    ├── generate-prp.md    # Same commands, both clients
    └── execute-prp.md     # Unified workflow
```

### Guides:

```
templates/guides/
├── CLAUDE-CODE-SETUP.md      # Claude Code installation
├── CURSOR-SETUP.md           # Cursor MCP configuration
├── GITHUB-INTEGRATION.md     # Git/GitHub setup
└── SKILLS-QUICKSTART.md      # Skills via plugin marketplace
```

---

## After Installation

### 1. Test Cursor

```bash
# Open Cursor, create a file, try:
/generate-prp
# Should show the command prompt
```

### 2. Test Claude Code

```bash
claude "What MCP tools do I have available?"
# Should list: exa, firecrawl, serena
```

### 3. Add API Keys

```bash
# Export keys before using MCP servers
export EXA_API_KEY=your-exa-key
export FIRECRAWL_API_KEY=your-firecrawl-key

# Then restart Claude Code or Cursor
```

**Placeholder locations**:
- Project: `.mcp.env.example`
- Configs: `${EXA_API_KEY}`, `${FIRECRAWL_API_KEY}`

### 4. Optional: Install Skills

```bash
# In Claude Code, via plugin marketplace (recommended):
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills

# See templates/guides/SKILLS-QUICKSTART.md for details
```

---

## Key Features

### ✅ Safe & Secure

- **No secrets collected** - API keys added via placeholders
- **Backup before merge** - Your configs are timestamped and backed up
- **Idempotent** - Safe to re-run without breaking existing setups
- **No data loss** - Deep merge preserves your settings

### ✅ Dual-Client Support

- **Same MCP servers** for both Cursor and Claude Code
- **Same commands** - unified workflow across clients
- **Same guides** - consistent documentation

### ✅ Smart Defaults

- **Auto-configure** MCP servers (no manual JSON editing)
- **Commands mandatory** - installed by default for both clients
- **Skills optional** - guidance provided, install via plugin marketplace

---

## MCP Servers Included

### Exa MCP
- **What**: AI-powered web search
- **Use**: Real-time information retrieval
- **Requires**: EXA_API_KEY ([get key](https://exa.ai))

### Firecrawl MCP
- **What**: Web crawling and content extraction
- **Use**: Scrape docs, extract data, map sites
- **Requires**: FIRECRAWL_API_KEY ([get key](https://firecrawl.dev))

### Serena MCP
- **What**: Symbolic code operations
- **Use**: Navigate large codebases, refactor safely
- **Requires**: No API key (via uvx)
- **Source**: [github.com/oraios/serena](https://github.com/oraios/serena)

---

## Context Engineering Commands

### /generate-prp
Research your codebase and external docs, then create a comprehensive PRP (Problem-Requirements-Plan) for implementation.

**Features**:
- Codebase pattern analysis
- External documentation research
- Implementation blueprint
- Validation gates
- Quality scoring

### /execute-prp
Execute a PRP with ULTRATHINK planning, todo-based execution, and iterative validation loops.

**Features**:
- Load complete context
- Break down into todos
- Execute with validation
- Fix failures automatically
- Report completion status

**Source**: [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro)

---

## Troubleshooting

### MCP Servers Not Working

```bash
# Check if keys are exported
echo $EXA_API_KEY
echo $FIRECRAWL_API_KEY

# If empty, export them:
export EXA_API_KEY=your-key
export FIRECRAWL_API_KEY=your-key

# Restart your client
```

### Commands Not Showing

**Cursor**:
- Commands in `.cursor/commands/` should appear when you type `/`
- Restart Cursor if not visible

**Claude Code**:
- Commands in `.claude/commands/` load automatically
- Restart Claude Code if needed

### Serena Not Available

```bash
# Check uv installation
uv --version

# If missing, install:
curl -LsSf https://astral.sh/uv/install.sh | sh

# Test Serena
uvx --from git+https://github.com/oraios/serena serena --help
```

---

## Development

### Run Locally

```bash
git clone https://github.com/sidart10/cursor-claude-code-course
cd cursor-claude-code-course
npm install
node index.js
```

### Testing

```bash
npm test
```

---

## Resources

**MCP Ecosystem**:
- [MCP Best Practices](https://modelcontextprotocol.info/docs/best-practices/)
- [MCP Executables Guide](https://dev.to/leomarsh/mcp-server-executables-explained-npx-uvx-docker-and-beyond-1i1n)

**Context Engineering**:
- [Commands Source](https://github.com/coleam00/context-engineering-intro)
- [Cole's YouTube](https://youtube.com/@ColeMedin)

**Claude Skills**:
- [Official Skills](https://github.com/anthropics/skills)
- [Using Skills Guide](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [Community Skills](https://github.com/ComposioHQ/awesome-claude-skills)

**BMAD Framework**:
- [Official Repo](https://github.com/bmad-code-org/BMAD-METHOD)
- [Documentation](https://raw.githubusercontent.com/bmad-code-org/BMAD-METHOD/main/src/modules/bmm/docs/README.md)

---

## Support

**Issues**: [GitHub Issues](https://github.com/sidart10/cursor-claude-code-course/issues)  
**Documentation**: [Full Docs](https://github.com/sidart10/cursor-claude-code-course)  
**Contact**: contact@contextengineering.dev

---

## License

MIT License - See [LICENSE](./LICENSE) file

---

## Credits

**Built by**: [Sid Dani](https://github.com/sidart10)

**Inspired by**:
- [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) installer pattern
- [Archon](https://github.com/coleam00/Archon) setup process
- [Serena](https://github.com/oraios/serena) installation approach
- [Context Engineering Intro](https://github.com/coleam00/context-engineering-intro) commands

**Special thanks**: Cole Medin for Context Engineering patterns and methodology

---

**v1.1.0** - Auto MCP config, dual-client commands, organized structure
