# Cursor MCP Setup Guide

## Global MCP Config
- Path: `~/.cursor/mcp.json`
- This installer merged:
  - exa (uses ${EXA_API_KEY})
  - firecrawl (uses ${FIRECRAWL_API_KEY})
  - serena (uvx runner)

## Set API Keys (Recommended)
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

## Project-level Config (Optional)
- Path: `./.mcp.json` in your project root
- Use placeholders like `${EXA_API_KEY}` and `${FIRECRAWL_API_KEY}`

## Test
1. Open a project in Cursor
2. Ask: “What MCP tools are available?”
3. Try a simple Exa or Firecrawl query


