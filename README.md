# Cursor Claude Setup 2025 - NPX Installer

**One-command installation for Context Engineering Mastery course**

Automated setup for complete AI development stack:

- Cursor IDE configuration
- Claude Code CLI with MCP servers
- Archon MCP Server (Docker + Supabase)
- Serena MCP Server (symbolic code tools)
- BMAD Framework (optional, 12 agents + 34 workflows)

---

## Quick Start

```bash
npx cursor-claude-setup-2025
```

Follow the interactive prompts (~5 minutes)
Installation completes in ~20 minutes

---

## What It Installs

### Cursor IDE Configuration

- Global `.cursorrules` file (context engineering best practices)
- Workspace settings template
- Model selection guidelines

### Claude Code CLI

- API key configuration
- MCP server integration (Archon + Serena)
- CLAUDE.md template for projects

### Archon MCP Server (Optional)

- Docker container orchestration
- Supabase database setup (requires manual SQL migration)
- Web UI at http://localhost:3737
- MCP server at http://localhost:8051

### Serena MCP Server

- `uv` package manager installation
- Serena MCP configuration for Claude Code
- Symbol-level code operation tools

### BMAD Framework (Optional)

- Runs `npx bmad-method@alpha install`
- Interactive installer for module selection
- 12 specialized AI agents
- 34 workflows across 4 phases

---

## Prerequisites

**Required**:

- Node.js 18+ ([download](https://nodejs.org))
- Cursor IDE ([download](https://cursor.com))
- Claude Code CLI ([install guide](https://docs.claude.com/claude-code/installation))

**For Archon**:

- Docker Desktop ([download](https://docker.com/products/docker-desktop))
- Supabase account ([sign up free](https://supabase.com))

**API Keys**:

- OpenAI API key ([get key](https://platform.openai.com/api-keys))
- Anthropic API key ([get key](https://console.anthropic.com))

---

## Interactive Prompts

The installer will ask you for:

1. **Your name** (for personalized config)
2. **OpenAI API key** (for Cursor & Archon)
3. **Anthropic API key** (for Claude Code)
4. **Supabase URL & key** (if installing Archon)
5. **Component selection** (checkboxes):
   - Cursor IDE configuration
   - Claude Code CLI
   - Archon MCP Server
   - Serena MCP Server
   - BMAD Framework
6. **Workspace creation** (yes/no)
7. **Open docs** (yes/no)

---

## What Gets Created

### Files Created

**In Your Home Directory**:

```
~/
├── .cursorrules                      # Global Cursor rules
├── .claude/
│   └── config.json                   # Claude Code config + MCP servers
└── cursor-claude-course/
    ├── archon/                       # Archon installation
    ├── README.md                     # Workspace guide
    ├── .course-progress.json         # Progress tracker
    ├── week-1-foundations/
    ├── week-2-cursor-advanced/
    ├── week-3-claude-mastery/
    ├── week-4-mcp-ecosystem/
    ├── week-5-context-engineering/
    ├── week-6-prp-bmad-advanced/
    ├── week-7-production/
    ├── week-8-advanced/
    ├── capstone-projects/
    ├── resources/
    └── notes/
```

**Templates Generated** (in installer directory):

- `templates/.cursorrules.template`
- `templates/CLAUDE.md.template`
- `templates/cursor-workspace-settings.json`

---

## Post-Installation

### Verification Steps

**1. Test Cursor**:

- Open Cursor IDE
- Create new JavaScript file
- Type: `function calculate` and press Tab
- Should see AI completion

**2. Test Claude Code**:

```bash
claude "What MCP tools do I have available?"
# Should list: archon, serena tools
```

**3. Test Archon** (if installed):

- Open http://localhost:3737
- Complete onboarding
- Crawl a documentation site
- Test search

**4. Test Serena**:

```bash
cd ~/your-code-project
claude "Use Serena to show me the symbol overview of main.py"
# Should return structured symbol list
```

**5. Test BMAD** (if installed):

- Open Cursor or Claude Code
- Load bmad-master agent
- Run `*list-workflows`
- Should show 34 workflows

---

## Troubleshooting

### Installer Fails

**Check Prerequisites**:

```bash
node --version    # Should be 18+
docker --version  # Should be installed
claude --version  # Should be installed
uv --version      # Should be installed (or will auto-install)
```

**Re-run Installer**:

```bash
npx cursor-claude-setup-2025@latest
```

### Archon Won't Start

**Check Docker**:

```bash
docker ps
# Should show archon-ui, archon-server, archon-mcp, archon-agents
```

**Check Logs**:

```bash
cd ~/cursor-claude-course/archon
docker compose logs -f
```

**Restart Archon**:

```bash
cd ~/cursor-claude-course/archon
docker compose down
docker compose up -d
```

### Serena Not Working

**Check uv**:

```bash
uv --version
# If not found, install: curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Test Serena Directly**:

```bash
uvx --from git+https://github.com/oraios/serena serena --help
```

**Check Claude Code Config**:

```bash
cat ~/.claude/config.json
# Should have "serena" in mcpServers
```

### Claude Code MCP Not Working

**Verify Config**:

```bash
cat ~/.claude/config.json
# Check JSON is valid
# Check mcpServers section exists
```

**Test Connection**:

```bash
claude "List my MCP servers"
# Should show archon and serena
```

---

## Manual Setup (If Installer Fails)

### Cursor Configuration

```bash
# Create ~/.cursorrules
# Copy content from templates/.cursorrules.template
```

### Claude Code MCP

**Edit** `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "archon": {
      "command": "http",
      "args": {
        "url": "http://localhost:8051"
      }
    },
    "serena": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "ide-assistant"]
    }
  }
}
```

### Archon Manual Setup

See: [Archon Quick Start Guide](https://github.com/coleam00/Archon#quick-start)

### Serena Manual Setup

See: [Serena README](https://github.com/oraios/serena#quick-start)

---

## Support

**Course Platform**: https://github.com/sidart10/cursor-claude-code-course
**GitHub Issues**: https://github.com/sidart10/cursor-claude-code-course/issues
**Discord Community**: [Discord invite - coming soon]
**Email**: contact@contextengineering.dev

---

## Development

### Running Locally

```bash
git clone https://github.com/sidart10/cursor-claude-code-course
cd cursor-claude-setup-2025
npm install
npm run setup  # Run installer locally
```

### Testing

```bash
npm test
```

### Publishing

```bash
npm version patch  # or minor, major
npm publish
```

---

## License

MIT License - See LICENSE file for details

---

## Credits

**Inspired by**:

- [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) installer pattern
- [Archon](https://github.com/coleam00/Archon) setup process
- [Serena](https://github.com/oraios/serena) installation approach

**Built for**: Context Engineering Mastery 2025 course
**Maintainer**: [Your name/org]
