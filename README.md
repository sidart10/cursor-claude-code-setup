# cursor-claude-setup-2025

Auto-configure MCP servers for Cursor and Claude Code, plus install BMAD Framework.

```bash
npx cursor-claude-setup-2025
```

---

## What This Does

**Prompts you for**:
1. Your name
2. Which components to install (checkboxes - all selected by default):
   - Cursor IDE configuration
   - Claude Code CLI with MCP servers
   - Serena MCP Server
   - BMAD Framework
3. Create workspace folder? (yes/no)
4. Open docs when done? (yes/no)

**Then automatically**:
1. Checks prerequisites (Node 18+, Claude CLI, uv for Serena)
2. Installs selected components
3. **Auto-configures MCP servers** (Exa, Firecrawl, Serena):
   - Writes `./.mcp.json` (in your current directory)
   - Merges `~/.cursor/mcp.json` (backs up first)
   - Merges `~/.claude/config.json` (backs up first)
4. **Installs 2 commands** for both Cursor and Claude Code:
   - `.claude/commands/generate-prp.md`
   - `.claude/commands/execute-prp.md`
   - `.cursor/commands/generate-prp.md`
   - `.cursor/commands/execute-prp.md`
5. Optional: Creates ~/cursor-claude-course workspace
6. Shows results and next steps

---

## Prerequisites

**You need Node.js 18+** to run this installer (includes npm/npx).

Don't have Node? See `docs/INSTALL-NODE.md` or ask Cursor/Claude Code to help you install it.

**After running the installer, you'll need**:
- Cursor IDE ([download](https://cursor.com))
- Claude Code CLI ([install](https://docs.claude.com/en/docs/claude-code/quickstart))

---

## Files Created

### In Your Current Directory (where you run npx):
```
./
├── .mcp.json                    # MCP config (Exa, Firecrawl, Serena)
├── .mcp.env.example             # Where to add your API keys
├── .claude/commands/            # 2 slash commands
└── .cursor/commands/            # Same 2 commands
```

### Global (Home Directory):
```
~/
├── .cursorrules                 # Cursor config (personalized with your name)
├── .cursor/mcp.json             # MCP servers (merged, backed up)
├── .claude/config.json          # MCP servers (merged, backed up)
└── .claude/README-MCP-ENV.md    # How to export API keys
```

### Optional Workspace:
```
~/cursor-claude-course/
├── week-1-foundations/
├── week-2-cursor-advanced/
├── ...8 week folders
├── capstone-projects/
├── resources/
└── notes/
```

---

## After Installation

### 1. Add API Keys

The installer writes **placeholders** (`${EXA_API_KEY}`, `${FIRECRAWL_API_KEY}`) in your configs.

**To use Exa and Firecrawl MCP servers**:

```bash
# macOS/Linux:
export EXA_API_KEY=your-exa-api-key
export FIRECRAWL_API_KEY=your-firecrawl-api-key

# Windows PowerShell:
$env:EXA_API_KEY="your-exa-api-key"
$env:FIRECRAWL_API_KEY="your-firecrawl-api-key"

# Then restart Cursor or Claude Code
```

Get keys:
- Exa: https://exa.ai
- Firecrawl: https://firecrawl.dev

**Serena** doesn't need an API key.

### 2. Test MCP Servers

**In Claude Code**:
```bash
claude "What MCP tools do I have?"
# Should list: exa, firecrawl, serena
```

**In Cursor**:
Open chat and ask: "What MCP tools are available?"

### 3. Try Slash Commands

**In Cursor or Claude Code**:
Type `/` and you should see:
- `/generate-prp`
- `/execute-prp`

### 4. Use BMAD Framework

**If you installed BMAD**:

See the official quick start: https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/modules/bmm/docs/quick-start.md

Quick version:
1. Load the Analyst agent in Cursor or Claude Code
2. Run `*workflow-init`
3. Follow the guided workflows

---

## What You Get

**MCP Servers** (3):
- **Exa** - AI web search (needs API key)
- **Firecrawl** - Web scraping (needs API key)
- **Serena** - Code navigation (no key needed)

**Slash Commands** (2):
- `/generate-prp` - Create implementation plans
- `/execute-prp` - Execute plans with validation

**BMAD Framework** (optional, enabled by default):
- 12 AI agents (Analyst, PM, Architect, SM, DEV, etc.)
- 34 workflows across 4 phases
- See: https://github.com/bmad-code-org/BMAD-METHOD

**Reference Materials** (bundled):
- 6 cheat sheets (Cursor, Claude Code, Serena, Context Eng, PRP, BMAD)
- 7 guides (setup guides + module guides)

---

## Config Merging

The installer **merges** into your existing configs (doesn't overwrite):
- Backs up `~/.cursor/mcp.json` → `~/.cursor/mcp.json.bak-TIMESTAMP`
- Backs up `~/.claude/config.json` → `~/.claude/config.json.bak-TIMESTAMP`
- Uses deep merge (preserves your existing servers)

**Safe to re-run** if something fails.

---

## Troubleshooting

**"command not found: npx"**  
→ Install Node.js first (see docs/INSTALL-NODE.md)

**MCP servers not working**  
→ Export API keys (see step 1 above)

**Commands don't show in Cursor**  
→ Restart Cursor

**uv not found (for Serena)**  
→ Install: `curl -LsSf https://astral.sh/uv/install.sh | sh`

---

## Links

- GitHub: https://github.com/sidart10/cursor-claude-code-course
- Issues: https://github.com/sidart10/cursor-claude-code-course/issues
- BMAD: https://github.com/bmad-code-org/BMAD-METHOD
- Serena: https://github.com/oraios/serena

---

MIT License
