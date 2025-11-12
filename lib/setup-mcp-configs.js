import chalk from 'chalk';
import ora from 'ora';
import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

/**
 * Create MCP configuration files for both Claude Code and Cursor
 * Teaches students about project-level .mcp.json configuration
 */
export async function setupMCPConfigs(answers) {
  const spinner = ora('Creating MCP configuration files...').start();

  try {
    // ========================================
    // 1. Claude Code Global Config (~/.claude/config.json)
    // ========================================
    spinner.text = 'Configuring Claude Code MCP servers...';

    const claudeConfigDir = join(homedir(), '.claude');
    await fs.mkdir(claudeConfigDir, { recursive: true });
    const claudeConfigPath = join(claudeConfigDir, 'config.json');

    let claudeConfig = {};
    try {
      const existing = await fs.readFile(claudeConfigPath, 'utf-8');
      claudeConfig = JSON.parse(existing);
    } catch {
      claudeConfig = {};
    }

    // Add MCP servers
    claudeConfig.mcpServers = {
      ...(claudeConfig.mcpServers || {}),
    };

    // Add Archon if selected
    if (answers.components.includes('archon')) {
      claudeConfig.mcpServers.archon = {
        command: 'http',
        args: {
          url: 'http://localhost:8051',
        },
        description: 'Archon MCP - Knowledge management and task tracking',
      };
    }

    // Add Serena if selected
    if (answers.components.includes('serena')) {
      claudeConfig.mcpServers.serena = {
        command: 'uvx',
        args: ['--from', 'git+https://github.com/oraios/serena', 'serena', 'start-mcp-server', '--context', 'ide-assistant'],
        description: 'Serena MCP - Symbolic code operations',
      };
    }

    await fs.writeFile(claudeConfigPath, JSON.stringify(claudeConfig, null, 2), 'utf-8');

    // ========================================
    // 2. Project-Level .mcp.json Template
    // ========================================
    spinner.text = 'Creating .mcp.json template for projects...';

    const projectMcpConfig = {
      $schema: 'https://raw.githubusercontent.com/anthropics/anthropic-mcp/main/schema.json',
      mcpServers: {},
    };

    // Add configured servers with educational comments
    const configWithComments = `{
  "$schema": "https://raw.githubusercontent.com/anthropics/anthropic-mcp/main/schema.json",

  "mcpServers": {
${
  answers.components.includes('archon')
    ? `    "archon": {
      "command": "http",
      "args": {
        "url": "http://localhost:8051"
      },
      "description": "Archon MCP - Knowledge management, task tracking, RAG search"
    }${answers.components.includes('serena') ? ',' : ''}
`
    : ''
}${
      answers.components.includes('serena')
        ? `    "serena": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/oraios/serena",
        "serena",
        "start-mcp-server",
        "--context",
        "ide-assistant"
      ],
      "description": "Serena MCP - Symbolic code operations, memory management"
    }
`
        : ''
    }  }
}`;

    const templateDir = join(__dirname, '..', 'templates');
    await fs.mkdir(templateDir, { recursive: true });

    const mcpTemplatePath = join(templateDir, '.mcp.json');
    await fs.writeFile(mcpTemplatePath, configWithComments, 'utf-8');

    // ========================================
    // 3. Cursor MCP Configuration
    // ========================================
    if (answers.components.includes('cursor')) {
      spinner.text = 'Creating Cursor MCP configuration...';

      const cursorMcpConfig = {
        mcpServers: {},
      };

      // Add same servers for Cursor
      if (answers.components.includes('archon')) {
        cursorMcpConfig.mcpServers.archon = {
          command: 'http',
          args: {
            url: 'http://localhost:8051',
          },
          description: 'Archon MCP - Knowledge management and task tracking',
        };
      }

      if (answers.components.includes('serena')) {
        cursorMcpConfig.mcpServers.serena = {
          command: 'uvx',
          args: ['--from', 'git+https://github.com/oraios/serena', 'serena', 'start-mcp-server', '--context', 'ide-assistant'],
          description: 'Serena MCP - Symbolic code operations',
        };
      }

      const cursorMcpPath = join(templateDir, 'cursor-mcp.json');
      await fs.writeFile(cursorMcpPath, JSON.stringify(cursorMcpConfig, null, 2), 'utf-8');

      // Create instructions file for Cursor MCP setup
      const cursorMcpInstructions = `# Cursor MCP Server Setup

Cursor supports MCP servers starting from version 0.43+.

## Quick Setup

1. **Copy this file to your project:**
   \`\`\`bash
   cp ${cursorMcpPath} /path/to/your/project/.cursormcp
   \`\`\`

2. **Restart Cursor IDE**

3. **Verify:**
   - Open Cursor settings
   - Look for "MCP Servers" section
   - Should see: ${answers.components.includes('archon') ? 'Archon, ' : ''}${answers.components.includes('serena') ? 'Serena' : ''}

## Configuration File Location

**Cursor looks for MCP config in:**
- \`.cursormcp\` in project root (project-level)
- \`~/.cursormcp\` in home directory (global)

**Recommended:** Use project-level \`.cursormcp\` for course exercises.

## MCP Servers Configured

${
  answers.components.includes('archon')
    ? `### Archon
- **Type:** HTTP server
- **URL:** http://localhost:8051
- **Status:** Check if running: \`docker ps | grep archon\`
- **Capabilities:** RAG search, project management, task tracking
`
    : ''
}
${
  answers.components.includes('serena')
    ? `### Serena
- **Type:** On-demand via uvx
- **Command:** Automatically starts when Cursor uses it
- **Capabilities:** Symbolic code operations, refactoring, memory management
`
    : ''
}

## Testing in Cursor

1. Open any code file in Cursor
2. Open Composer (Cmd+I or Ctrl+I)
3. Ask: "What MCP tools are available?"
4. Should see: ${answers.components.includes('archon') ? 'Archon tools (rag_search, find_tasks, etc.)' : ''}${answers.components.includes('serena') ? ', Serena tools (find_symbol, get_symbols_overview, etc.)' : ''}

## Troubleshooting

**MCP servers not showing in Cursor:**
- Verify Cursor version 0.43+
- Check \`.cursormcp\` exists in project root
- Restart Cursor IDE
- Check Cursor logs: Help → Show Logs

**Archon not connecting:**
- Verify Docker containers running: \`docker ps\`
- Check http://localhost:8051 is accessible
- Restart Archon: \`cd ~/cursor-claude-course/archon && docker compose restart\`

**Serena errors:**
- Verify uv installed: \`uv --version\`
- Test manually: \`uvx --from git+https://github.com/oraios/serena serena --help\`

---

**Generated by:** cursor-claude-setup-2025
**Template Location:** ${cursorMcpPath}
`;

      const cursorInstructionsPath = join(templateDir, 'CURSOR-MCP-SETUP.md');
      await fs.writeFile(cursorInstructionsPath, cursorMcpInstructions, 'utf-8');
    }

    spinner.succeed('MCP configuration files created');
    console.log(chalk.gray('  • Claude Code global: ~/.claude/config.json'));
    console.log(chalk.gray(`  • Project template: ${mcpTemplatePath}`));

    if (answers.components.includes('cursor')) {
      console.log(chalk.gray('  • Cursor template: templates/cursor-mcp.json'));
      console.log(chalk.gray('  • Cursor guide: templates/CURSOR-MCP-SETUP.md'));
    }

    console.log(chalk.cyan('\n  📝 For Your Projects:'));
    console.log(chalk.white('  - Copy .mcp.json to project root'));
    console.log(chalk.white('  - Customize servers for your needs'));
    console.log(chalk.white('  - Learn about project vs global config\n'));
  } catch (error) {
    spinner.fail('MCP configuration failed');
    console.error(chalk.red(`  Error: ${error.message}`));
    throw error;
  }
}
