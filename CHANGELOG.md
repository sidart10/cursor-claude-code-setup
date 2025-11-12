# Changelog

All notable changes to cursor-claude-setup-2025 installer.

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
