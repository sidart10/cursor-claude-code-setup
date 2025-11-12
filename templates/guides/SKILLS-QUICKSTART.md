# Claude Skills Quickstart

## What Are Skills?

Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks. They teach Claude how to complete specific tasks in a repeatable way.

**Official Documentation**:
- What are skills: https://support.claude.com/en/articles/12512176-what-are-skills
- Using skills: https://support.claude.com/en/articles/12512180-using-skills-in-claude
- Creating custom skills: https://support.claude.com/en/articles/12512198-creating-custom-skills

---

## For Claude Code (CLI)

### Method 1: Plugin Marketplace (Recommended)

Install official skills via the plugin marketplace:

```bash
# Add the official skills marketplace
/plugin marketplace add anthropics/skills

# Install document skills (Excel, Word, PowerPoint, PDF)
/plugin install document-skills@anthropic-agent-skills

# Install example skills (testing, MCP builder, etc.)
/plugin install example-skills@anthropic-agent-skills
```

**Benefits**:
- Official, tested skills from Anthropic
- Automatic updates
- Easy installation
- No manual file management

### Method 2: Project-Local Skills (Custom)

For custom or community skills, use project-local installation:

```
your-project/
  skills/
    skill-name/
      SKILL.md          # Required: YAML frontmatter + instructions
      helpers.py        # Optional: support scripts
      fixtures/         # Optional: test data
```

**Example SKILL.md**:
```markdown
---
name: my-custom-skill
description: A clear description of what this skill does and when to use it
---

# My Custom Skill

[Add your instructions here that Claude will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

**Important**: Keep skills **project-local** and under version control. There is no official global skills directory for Claude Code.

**Source**: [Using Skills in Claude Code: Install Path Guide](https://skywork.ai/blog/how-to-use-skills-in-claude-code-install-path-project-scoping-testing/)

---

## For Claude.ai (Web)

Skills work differently in the web interface:

1. Navigate to [Settings > Capabilities](https://claude.ai/settings/capabilities)
2. Enable "Code execution and file creation"
3. Scroll to the Skills section
4. Toggle individual skills on/off
5. To add custom skills: Click "Upload skill" and upload a ZIP file containing your skill folder

**Note**: Custom skills uploaded to Claude.ai are private to your account and NOT shared with Claude Code.

---

## Resources

### Official Skills:
- **Anthropic Skills Repo**: https://github.com/anthropics/skills
  - document-skills (Word, Excel, PowerPoint, PDF)
  - Example skills (testing, MCP builder, design)
  - Template for creating your own

### Community Skills:
- **Awesome Claude Skills**: https://github.com/ComposioHQ/awesome-claude-skills
  - 50+ community-contributed skills
  - Business, creative, technical, and productivity skills
  - Installation instructions for each

### Guides:
- **Official**: https://support.claude.com/en/articles/12512180-using-skills-in-claude
- **Deep Dive**: https://skywork.ai/blog/how-to-use-skills-in-claude-code-install-path-project-scoping-testing/
- **Agent Skills Engineering**: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

---

## Best Practices

1. **Start with official skills** from the plugin marketplace
2. **Keep custom skills project-local** (in `skills/` folder)
3. **Test thoroughly** before relying on skills for critical tasks
4. **Review third-party skills** before installation (security)
5. **Use CLAUDE.md** to scope skills to your project context
6. **Keep SKILL.md focused** - one clear purpose per skill

---

## Quick Start

### For Claude Code:
```bash
# Install official skills
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills

# Verify
claude "What skills do I have available?"
```

### For Custom Skills:
```bash
# Create a custom skill in your project
mkdir -p skills/my-skill
cat > skills/my-skill/SKILL.md <<'EOF'
---
name: my-skill
description: Does something specific and useful
---

# Instructions
[Your instructions here]
EOF

# Claude will auto-discover it when relevant
```

---

**Bottom Line**: Use the **plugin marketplace** for official skills, and **project-local** folders for custom skills. No global installation directory needed.
