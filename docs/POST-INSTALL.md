# Post-Installation Setup

The installer is complete! Now configure API keys at your own pace.

---

## API Keys (Optional - Add When Ready)

### Claude Code (Anthropic API Key)

**Get Your Key:**

1. Visit https://console.anthropic.com/settings/keys
2. Create new API key
3. Copy the key (starts with `sk-ant-`)

**Configure:**

```bash
claude config set api_key YOUR_ANTHROPIC_KEY
```

**Verify:**

```bash
claude "What tools do I have available?"
```

---

### Cursor (OpenAI API Key)

**Get Your Key:**

1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key (starts with `sk-`)

**Configure:**

1. Open Cursor Settings (Cmd+,)
2. Search for "API Key"
3. Paste your OpenAI key
4. Save

**Verify:**

- Type in any file and press Tab
- Should see Cursor autocomplete suggestions

---

### Archon (OpenAI + Supabase)

**If you installed Archon, edit the .env file:**

```bash
# Open the Archon .env file
code ~/cursor-claude-course/archon/.env
```

**Add these keys:**

```env
OPENAI_API_KEY=sk-your-openai-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**Get Supabase Keys:**

1. Visit https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy:
   - URL (Project URL)
   - service_role key (NOT anon key)

**Restart Archon:**

```bash
cd ~/cursor-claude-course/archon
docker compose restart
```

**Verify:**

- Open http://localhost:3737
- Complete onboarding wizard
- Add your first knowledge source

---

## Testing Your Setup

### Test Claude Code

```bash
claude "List available MCP tools"
```

Expected: Should list Archon and Serena tools (if configured)

### Test Cursor

1. Create test.js file
2. Type: `function hello` and press Tab
3. Should see autocomplete suggestions

### Test Archon (if installed)

1. Open http://localhost:3737
2. Create first project
3. Add documentation source (e.g., https://docs.anthropic.com)
4. Test RAG search from Claude Code

---

## Troubleshooting

### "Claude command not found"

```bash
# Reinstall Claude Code
curl -fsSL https://claude.ai/install.sh | sh
```

### "Archon containers not starting"

```bash
# Check Docker status
docker ps

# View logs
cd ~/cursor-claude-course/archon
docker compose logs -f

# Restart
docker compose down && docker compose up -d
```

### "Cursor Tab not working"

1. Verify API key in Settings
2. Check internet connection
3. Restart Cursor IDE

---

## Where Things Are

**Archon:**

- Location: `~/cursor-claude-course/archon/`
- Config: `~/cursor-claude-course/archon/.env`
- UI: http://localhost:3737
- MCP: http://localhost:8051

**Claude Code:**

- Config: `~/.claude/config.json`
- Template: `~/cursor-claude-course/templates/CLAUDE.md`

**Cursor:**

- Settings: Open Cursor → Settings (Cmd+,)
- Rules: Copy from course materials

**BMAD Framework:**

- Location: `~/cursor-claude-course/bmad/`
- Agents: `~/cursor-claude-course/bmad/core/agents/`

---

## Getting Help

**Course Repository:**
https://github.com/sidart10/cursor-claude-code-course

**Issues:**
https://github.com/sidart10/cursor-claude-code-course/issues

**Documentation:**

- Archon: https://github.com/coleam00/archon
- Serena: https://github.com/oraios/serena
- Claude Code: https://docs.claude.com/code

---

**Ready to learn!** Start with Module 1 in the course repository.
