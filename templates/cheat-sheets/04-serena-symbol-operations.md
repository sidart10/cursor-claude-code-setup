# Serena MCP Symbol Operations - Quick Reference

**90-96% token reduction through symbol-level code operations**

---

## The Golden Rule

**ALWAYS use get_symbols_overview FIRST**

- Never read full files
- Get structure first (300 tokens)
- Then target specific symbols (50-200 tokens)
- Read bodies only when absolutely needed

**Token Comparison**:

```
Full file read: 15,000 tokens
Symbol overview → specific symbol: 580 tokens
Reduction: 96%
```

---

## Core Symbol Operations

### 1. Get Symbols Overview (START HERE!)

```python
get_symbols_overview(
  relative_path="src/main.py"
)
```

**Returns** (structure without code):

```
Class: UserController (line 15-89)
  Method: create_user (line 20-35)
  Method: update_user (line 37-52)
  Method: delete_user (line 54-65)

Function: validate_email (line 92-98)
Function: hash_password (line 100-108)
```

**Tokens**: ~300 (vs 15,000 for full file)

**Via Claude Code**:

```bash
claude "Use Serena to show symbol overview of src/auth.py"
```

---

### 2. Find Symbol

```python
find_symbol(
  name_path="UserController",          # Symbol to find
  relative_path="src/main.py",         # Where to look
  include_body=False,                  # Don't read code yet!
  depth=1                              # Include children (methods)
)
```

**Name Path Patterns**:

```
"method" → Matches anywhere: method, class/method, etc.
"MyClass/method" → Matches: MyClass/method, parent/MyClass/method
"/MyClass" → Matches: MyClass at top-level ONLY
```

**Via Claude Code**:

```bash
claude "Use Serena to find the AuthService class"
claude "Find UserController and show its methods (without code)"
```

---

### 3. Read Symbol Body (ONLY WHEN NEEDED!)

```python
find_symbol(
  name_path="UserController/create_user",
  relative_path="src/main.py",
  include_body=True,                   # NOW read the code
  depth=0
)
```

**Returns**: Complete method source code

**Tokens**: ~80 (just this method)

**Via Claude Code**:

```bash
claude "Use Serena to find create_user method and show me the implementation"
```

---

## Editing Operations

### 4. Replace Symbol Body

```python
replace_symbol_body(
  name_path="UserController/create_user",
  relative_path="src/main.py",
  body="""
    async def create_user(self, user_data):
        # New implementation here
        validated = await self.validate(user_data)
        return await self.db.insert(validated)
  """
)
```

**Surgical Edit**: Replaces ONLY the method, nothing else

**Via Claude Code**:

```bash
claude "Use Serena to replace create_user method with async implementation that validates data first"
```

---

### 5. Insert After Symbol

```python
insert_after_symbol(
  name_path="UserController",
  relative_path="src/main.py",
  body="""

def new_method(self, param):
    # New method implementation
    pass
"""
)
```

**Use Case**: Add new method to class, function after function

---

### 6. Insert Before Symbol

```python
insert_before_symbol(
  name_path="MyClass",         # Insert before this
  relative_path="src/main.py",
  body="""
import newmodule

"""
)
```

**Use Case**: Add imports, add function before another

---

### 7. Rename Symbol (Codebase-Wide)

```python
rename_symbol(
  name_path="old_function_name",
  relative_path="src/utils.py",
  new_name="new_function_name"
)
```

**Uses LSP refactoring**: Renames everywhere it's used (all files!)

**Via Claude Code**:

```bash
claude "Use Serena to rename validateUser to validateUserData across entire codebase"
```

---

### 8. Find References

```python
find_referencing_symbols(
  name_path="validate_token",
  relative_path="src/auth.py"
)
```

**Returns**: All places where `validate_token` is called

**Use Case**: Impact analysis before refactoring

**Via Claude Code**:

```bash
claude "Use Serena to find everywhere login function is called"
```

---

## Memory System

### Store Knowledge

```python
write_memory(
  memory_file_name="architecture-decisions",
  content="""
# Architecture Decisions

## Database
PostgreSQL with SQLAlchemy ORM

## Authentication
JWT tokens with refresh mechanism

## Caching
Redis for session storage
"""
)
```

**Location**: `.serena/memories/architecture-decisions.md`

---

### Read Memory

```python
read_memory(
  memory_file_name="architecture-decisions"
)
```

**Use Case**: New session, remind AI of decisions

---

### List Memories

```python
list_memories()
# Returns: ["architecture-decisions", "coding-standards", "api-design"]
```

---

## Project Activation

### Required First Step

```bash
# Activate current directory
claude "Activate the current directory as project using Serena"

# Or by path
claude "Activate project at /abs/path/to/project"

# Or by name (if previously activated)
claude "Activate project my-web-app"
```

**Auto-activation** (in MCP config):

```json
{
  "serena": {
    "args": [..., "--project", "$(pwd)"]
  }
}
```

---

## The Serena Workflow

### Standard Pattern (Use Every Time)

```
Step 1: Activate project
→ claude "Activate this project with Serena"

Step 2: Get overview (ALWAYS FIRST!)
→ get_symbols_overview("file.py")

Step 3: Find symbol without body
→ find_symbol("Class", include_body=False, depth=1)

Step 4: Read body only if needed
→ find_symbol("Class/method", include_body=True)

Step 5: Edit surgically
→ replace_symbol_body(...new code...)

Result: 90-96% token reduction!
```

---

## Supported Languages (27+)

```
Python, TypeScript, JavaScript, Rust, Go
C, C++, C#, Java, Kotlin, Swift
Ruby, PHP, Scala, Clojure, Elixir
Dart, Bash, Lua, Nix, Perl, Fortran
Haskell, Julia, Erlang, Zig, AL, Markdown
```

**Each uses native language server** (same as VS Code!)

---

## Context & Mode System

### Contexts (Set at Startup)

**ide-assistant** (for Cursor, VS Code, Cline):

```json
"args": [..., "--context", "ide-assistant"]
```

- Disables execute_shell_command (IDE provides)
- Optimized for in-editor assistance

**desktop-app** (for Claude Desktop):

```json
"args": [..., "--context", "desktop-app"]
```

- Enables shell execution
- Full agent capabilities

---

### Modes (Can Switch Dynamically)

```bash
# Switch modes mid-session
claude "Switch Serena to planning and one-shot modes"
```

**planning**: Analysis focus
**editing**: Direct modification
**interactive**: Back-and-forth
**one-shot**: Complete in single response

---

## Pro Tips

**Tip 1**: Index large projects

```bash
uvx --from git+https://github.com/oraios/serena serena project index
# Creates .serena/cache/ for faster lookups
```

**Tip 2**: Use with BMAD workflows

```
BMAD Developer agent + Serena =
Agent uses symbol operations automatically
No manual "Use Serena" needed
```

**Tip 3**: Store project knowledge

```
After onboarding or major decisions:
write_memory with architecture, standards, gotchas
Future sessions: read_memory to restore context
```


```
Serena: Code structure and editing
Together: Complete context picture
```

---

## Troubleshooting

**"No project activated"**:

```bash
claude "Activate the current directory as project using Serena"
```

**Slow first operation**:

- Index project: `serena project index`
- Wait 30-60s for large codebases

**Symbol not found**:

- Check: file path is relative to project root
- Try: substring_matching=True
- Verify: File has symbols (not empty)

**Wrong context**:

- IDE users: Use `--context ide-assistant`
- Claude Desktop: Use `--context desktop-app`

---

## Quick Command Reference

**80% of usage**:

```
get_symbols_overview(relative_path)
find_symbol(name_path, include_body=False)
find_symbol(name_path, include_body=True)  # Only when needed!
replace_symbol_body(name_path, body)
find_referencing_symbols(name_path)
```

**The Serena Advantage**:

- 🚀 90-96% token reduction
- 💰 80-90% cost savings
- ⚡ Faster execution
- 🎯 Better accuracy (focused context)

---

**Course**: Context Engineering Mastery
**Module**: 5 (MCP Ecosystem) + all others
**Serena Version**: Latest (auto-updates via uvx)
**Print**: 1-2 pages
**Keep**: At desk during coding!
