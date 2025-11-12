# Changelog

All notable changes to cursor-claude-setup-2025 installer.

---

## [1.1.0] - 2025-11-12

### Major Features Added

- **Auto MCP Configuration**: Automatically configures Exa, Firecrawl, and Serena MCP servers for:
  - Project-level `.mcp.json` (current directory)
  - Cursor global `~/.cursor/mcp.json` (merged with backup)
  - Claude Code global `~/.claude/config.json` (merged with backup)

- **Dual-Client Commands**: Context Engineering commands installed for BOTH clients:
  - `.claude/commands/` → generate-prp.md, execute-prp.md
  - `.cursor/commands/` → generate-prp.md, execute-prp.md
  - Bundled from: https://github.com/coleam00/context-engineering-intro

- **Safe JSON Merging**: New merge utilities with:
  - Deep merge preserves existing user config
  - Timestamped backups before modifications
  - Idempotent operations (safe to re-run)

- **API Key Placeholders**: No more prompts for API keys:
  - Uses `${EXA_API_KEY}` and `${FIRECRAWL_API_KEY}` placeholders
  - Generates `.mcp.env.example` with instructions
  - Creates `~/.claude/README-MCP-ENV.md` with env guidance

- **Enhanced Verification**: Dry-run checks for all MCP servers:
  - `npx exa-mcp-server --help`
  - `npx firecrawl-mcp --help`
  - `uvx ... serena --help`

### New Modules
- `lib/merge-json.js` - Safe JSON utilities (backup, merge, write)
- `lib/setup-project-mcp.js` - Write project .mcp.json
- `lib/setup-cursor-mcp.js` - Merge Cursor global MCP
- `lib/setup-claude-config.js` - Merge Claude Code global MCP
- `lib/setup-cursor-commands.js` - Install Cursor slash commands
- `lib/setup-claude-commands.js` - Install Claude Code commands

### Bundled Content
- **Context Engineering Commands** (2 files):
  - `templates/commands/generate-prp.md`
  - `templates/commands/execute-prp.md`
  - Source: https://github.com/coleam00/context-engineering-intro

- **Setup Guides** (4 files):
  - `templates/guides/CLAUDE-CODE-SETUP.md` - Claude Code install guide
  - `templates/guides/CURSOR-SETUP.md` - Cursor MCP guide
  - `templates/guides/GITHUB-INTEGRATION.md` - Git/GitHub setup
  - `templates/guides/SKILLS-QUICKSTART.md` - Skills installation guide

### Improvements

- **Package Organization**: Moved documentation to `docs/` folder
  - Clean root with only 6 essential files
  - Internal docs excluded from npm package
  - User docs included in package
  - 21% smaller package size (41.0 kB → 32.3 kB)

- **Skills Installation Fixed**: 
  - Removed incorrect `~/.config/claude-code/skills/` installation
  - Added correct plugin marketplace guidance
  - Updated `SKILLS-QUICKSTART.md` with official methods
  - Source: https://support.claude.com/en/articles/12512180-using-skills-in-claude

- **Better User Experience**:
  - Commands installed by default for both clients
  - Clear Next Steps with plugin marketplace commands
  - No broken installations
  - Accurate documentation

### Removed
- ❌ Skills installation prompt (incorrect implementation)
- ❌ `lib/setup-skills.js` module (105 lines removed)
- ❌ API key prompts during install

### Changed
- Commands now mandatory (no opt-in prompt)
- Both Cursor and Claude Code get commands automatically
- Skills guidance via documentation only (correct approach)

### Security
- No secrets collected or stored
- API keys via placeholders only
- Backup before modifying global configs
- Clear env variable export instructions

---

## [1.0.1] - 2025-11-07

### Security

- **CRITICAL FIX**: Resolved command injection vulnerability in API key configuration
  - Changed from `execSync()` template literal to `spawn()` with array args
  - Prevents arbitrary command execution via malicious API key input
  - File: `lib/setup-claude-code.js:32-53`

### Fixed

- **Missing dependency**: Added `open` package (v10.1.0) to dependencies
- **Error**: Fixed "Cannot find package 'open'" module resolution error
- **Security**: Command injection vulnerability in claude config set command

### Changed

- **API keys now optional**: Users can skip API keys during installation and add them later
- **Better UX**: Installation completes without requiring sensitive data upfront
- **Improved messaging**: Clear guidance on when/how to add API keys post-install
- **Safer command execution**: Switched to spawn() for all user input in shell commands

### Added

- **POST-INSTALL.md**: Complete guide for configuring API keys after installation
- **Conditional .env generation**: Comments out missing keys instead of requiring them
- **Post-install reminder**: Shows which keys were skipped with instructions
- **Better error messages**: Removed misleading "Verify API keys" from troubleshooting
- **MCP configuration system**: Comprehensive setup for Claude Code and Cursor
  - `lib/setup-mcp-configs.js`: Centralized MCP server configuration
  - `.mcp.json` template: Project-level Claude Code MCP config
  - `cursor-mcp.json` template: Project-level Cursor MCP config
  - `MCP-SETUP-GUIDE.md`: Educational guide on global vs project config
  - `CURSOR-MCP-SETUP.md`: Cursor-specific MCP setup instructions

### Migration Notes

- Existing users: No changes needed
- New users: Can now install first, configure later
- API keys are optional during install, can be added anytime

---

## [1.0.0] - 2025-11-05

### Initial Release

- Automated setup for Cursor, Claude Code, Archon, Serena, and BMAD
- Interactive CLI with component selection
- Docker-based Archon deployment
- Workspace creation with course materials
- Prerequisite checking and verification
- MCP server configuration
- Template generation (CLAUDE.md, .cursorrules)

---

## Upgrade Path

**From 1.0.0 to 1.0.1:**

```bash
# Reinstall globally
npm install -g cursor-claude-setup-2025@latest

# Or run directly
npx cursor-claude-setup-2025@latest
```

No breaking changes - existing installations continue working.
