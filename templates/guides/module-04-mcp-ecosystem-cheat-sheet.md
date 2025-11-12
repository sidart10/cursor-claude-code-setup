# MCP Ecosystem - Quick Reference Cheat Sheet

**Module 4 | Context Engineering Mastery 2025**

---

## 🔌 MCP CONFIGURATION

### .mcp.json Location

```bash
~/.mcp.json          # Global (all projects)
.mcp.json            # Project-specific
```

### Basic Configuration

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

### Verify Installation

```bash
claude /mcp          # List all MCP servers and tools
```

---

## 🎯 ESSENTIAL MCP SERVERS

### Development

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {"GITHUB_TOKEN": "ghp_..."}
}
```

### Database

```json
"postgres": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres"],
  "env": {"DATABASE_URL": "postgresql://..."}
}
```

### Search & Research

```json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": {"BRAVE_API_KEY": "BSA..."}
}
```

---

## 🧠 ARCHON MCP (Knowledge + RAG + Projects)

### Installation

```bash
git clone https://github.com/coleam00/archon
cd archon
git checkout stable

# Configure .env
cp .env.example .env
# Edit with Supabase URL, API keys

# Run migrations in Supabase SQL Editor
# Copy schema.sql content

# Start services
docker-compose up -d
```

### Verify Running

```bash
docker-compose ps        # All services UP
curl http://localhost:3737/health    # API health
open http://localhost:8051          # Web UI
```

### MCP Configuration

```json
"archon": {
  "command": "node",
  "args": ["/path/to/archon/mcp-server.js"],
  "env": {
    "ARCHON_API_URL": "http://localhost:3737",
    "ARCHON_API_KEY": "your-archon-api-key"
  }
}
```

### Key Tools

**RAG Search**:

```
rag_search_knowledge_base(query, match_count=5)
rag_search_code_examples(query, match_count=3)
rag_get_available_sources()
```

**Project Management**:

```
manage_project(action, title, description)
manage_task(action, task_id, title, status)
find_tasks(query, filter_by, filter_value)
```

**Documents**:

```
manage_document(action, project_id, title, content)
find_documents(project_id, query, document_type)
```

### Usage Example

```
claude

"Search my knowledge base for React Server Components patterns"
# Uses rag_search_knowledge_base

"Create project for Cursor Claude course"
# Uses manage_project

"Create task: Record Module 1 videos"
# Uses manage_task
```

---

## 🔍 SERENA MCP (Symbolic Code Intelligence)

### Installation

```bash
uvx --from git+https://github.com/oraios/serena serena project index
```

### MCP Configuration

```json
"serena": {
  "command": "uvx",
  "args": [
    "--from", "git+https://github.com/oraios/serena",
    "serena", "mcp"
  ],
  "env": {"PROJECT_ROOT": "/path/to/project"}
}
```

### Symbol Operations

**Find Symbols**:

```
find_symbol(name_path, relative_path, include_body=true)

Examples:
- find_symbol("/authenticate")          # Top-level function
- find_symbol("/User/authenticate")     # Class method
- find_symbol("authenticate", substring_matching=true)  # Fuzzy
```

**Modify Symbols**:

```
replace_symbol_body(name_path, relative_path, new_body)
rename_symbol(name_path, relative_path, new_name)
insert_after_symbol(name_path, relative_path, body)
insert_before_symbol(name_path, relative_path, body)
```

**Find References**:

```
find_referencing_symbols(name_path, relative_path)
# Returns all places where symbol is used
```

**Project Intelligence**:

```
get_symbols_overview(relative_path)    # File structure
search_for_pattern(pattern, relative_path)
list_dir(relative_path, recursive)
find_file(file_mask, relative_path)
```

**Memory System**:

```
write_memory(memory_file_name, content)
read_memory(memory_file_name)
list_memories()
delete_memory(memory_file_name)
```

### Usage Examples

**Refactoring**:

```
"Rename getUserData to fetchUserProfile across entire codebase"
# Uses rename_symbol - updates all references

"Make the authenticate method async"
# Uses replace_symbol_body - surgical change
```

**Understanding**:

```
"Show me overview of server.js symbols"
# Uses get_symbols_overview

"Find all places where authenticateToken is called"
# Uses find_referencing_symbols
```

**Memory**:

```
"Save to memory: We use JWT with 24h expiration and Redis for refresh tokens"
# Uses write_memory

[New session]
"How does our auth system work?"
# Uses read_memory - recalls saved context
```

---

## 🛠️ BUILDING CUSTOM MCP SERVERS

### FastMCP Framework

**Install**:

```bash
pip install fastmcp
```

### Basic Server Template

```python
from fastmcp import FastMCP

mcp = FastMCP("My MCP Server")

@mcp.tool()
def my_function(param: str) -> str:
    """Function description"""
    return f"Result: {param}"

@mcp.resource("my://resource")
def my_resource():
    """Resource description"""
    return {"data": "value"}

@mcp.prompt()
def my_prompt(arg: str):
    """Prompt template description"""
    return f"Template with {arg}"

if __name__ == "__main__":
    mcp.run()
```

### Run Server

```bash
python my_mcp_server.py
```

### Add to .mcp.json

```json
"my-mcp": {
  "command": "python",
  "args": ["/path/to/my_mcp_server.py"]
}
```

---

## 🔐 SECURITY PATTERNS

### OAuth Configuration

```json
"secure-mcp": {
  "command": "node",
  "args": ["server.js"],
  "transport": {
    "type": "sse",
    "url": "https://mcp.company.com"
  },
  "oauth": {
    "authUrl": "https://auth.company.com/authorize",
    "tokenUrl": "https://auth.company.com/token",
    "clientId": "client-id",
    "scopes": ["read", "write"]
  }
}
```

### Permission Controls

```json
// .claude/settings.json
{
  "permissions": {
    "mcp": {
      "archon": "all", // Auto-approve
      "postgres": "ask", // Confirm each use
      "github": "all"
    }
  }
}
```

### Enterprise Controls (managed-settings.json)

```json
{
  "mcp": {
    "allowlist": ["archon", "github", "internal-api"],
    "denylist": ["*"],
    "requireApproval": ["postgres", "aws"]
  }
}
```

---

## 📊 CONTEXT OPTIMIZATION WITH MCPs

### Token Reduction Strategies

**Without Serena** (load full file):

```
File size: 5,000 tokens
Want one function: 50 tokens useful
Waste: 4,950 tokens (99%)
```

**With Serena** (symbol-level):

```
Load symbol only: 50 tokens
Waste: 0 tokens
Reduction: 99%
```


```
Load docs manually: 50,000 tokens
Find relevant section: 2,000 tokens useful
Waste: 48,000 tokens (96%)
```


```
RAG search returns: 2,000 tokens
Waste: 0 tokens
Reduction: 96%
```

### Cost Impact

```
Monthly API costs without MCPs: $500-1000
Monthly API costs with + Serena: $50-150

Savings: 80-90%
```

---

## 🎯 MCP WORKFLOWS

### Workflow 1: Bug Fix with Full Context

```
1. Read error logs (Sentry MCP)
2. Query database state (PostgreSQL MCP)
3. Find symbol (Serena MCP)
4. Fix bug with context from steps 1-2
5. Create PR (GitHub MCP)
6. Update task (MCP)
```

### Workflow 2: Feature Development

```
1. Search knowledge base (RAG) for patterns
3. Plan feature with knowledge context
4. Generate code following patterns
5. Create tests
6. Commit and PR (GitHub MCP)
```

### Workflow 3: Onboarding

```
1. Search company docs (RAG)
2. Ask architecture questions (uses knowledge base)
3. Explore codebase (Serena symbols)
4. Save learnings to memory (Serena memory)
5. Ramp up: weeks → 2 days
```

---

## 🐛 TROUBLESHOOTING

### MCP Connection Issues

**"MCP server not found"**:
→ Check .mcp.json path and syntax
→ Verify command/args are correct
→ Test server independently

**"Permission denied"**:
→ Check env variables set correctly
→ Verify API keys are valid
→ Check file permissions (chmod +x for scripts)

**"Tools not appearing"**:
→ Restart Claude Code: `claude --restart-mcp`
→ Check /mcp output for errors
→ Verify server is running (for HTTP/SSE)

### Issues

**"Can't connect to Supabase"**:
→ Verify SUPABASE_URL correct
→ Check service role key (not anon key)
→ Run schema.sql migrations
→ Check network connectivity

**"Docker containers not starting"**:
→ `docker-compose logs` for errors
→ Check ports available (3737, 8181, 8051)
→ Verify .env file configured
→ `docker-compose down && docker-compose up -d` (restart)

### Serena Issues

**"Symbol not found"**:
→ Verify relative_path correct
→ Check name_path format (/Class/method)
→ Try substring_matching=true
→ Check file is in indexed languages (27+ supported)

**"Memory not persisting"**:
→ Check .serena/ directory exists
→ Verify PROJECT_ROOT set correctly
→ Check file permissions

---

## 📚 RESOURCES

### Documentation

- MCP Spec: modelcontextprotocol.io
- Serena: github.com/oraios/serena
- FastMCP: github.com/jlowin/fastmcp

### Community

- Discord #module-4
- MCP Registry: modelcontextprotocol.io/servers
- GitHub Discussions

---

**Keep this cheat sheet handy during Module 4 and beyond!**

**Version**: 1.0 | **Last Updated**: Nov 6, 2025
