# Claude Code Setup Guide

## Install
- Follow official docs: https://docs.claude.com/claude-code/installation
- Verify:
```bash
claude --version
```

## Configure MCP (Global)
- Config path: `~/.claude/config.json`
- This installer merged the following servers:
  - exa (uses ${EXA_API_KEY})
  - firecrawl (uses ${FIRECRAWL_API_KEY})
  - serena (uvx runner)

## Set API Keys
macOS/Linux:
```bash
export EXA_API_KEY=your-exa-key
export FIRECRAWL_API_KEY=your-firecrawl-key
```
Windows (PowerShell):
```powershell
$env:EXA_API_KEY="your-exa-key"
$env:FIRECRAWL_API_KEY="your-firecrawl-key"
```

## Test
```bash
claude "List my MCP servers"
claude "Use Serena to show available tools"
```


