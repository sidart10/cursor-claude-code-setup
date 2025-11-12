import chalk from 'chalk';
import ora from 'ora';
import { promises as fs } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { execSync, spawn } from 'child_process';

/**
 * Setup Claude Code CLI with MCP servers
 * Configures API key and adds Archon + Serena MCP servers
 */
export async function setupClaudeCode(answers) {
  const spinner = ora('Setting up Claude Code...').start();

  try {
    // Check if Claude Code is installed
    spinner.text = 'Checking Claude Code installation...';

    let claudeInstalled = false;
    try {
      const version = execSync('claude --version', { encoding: 'utf-8', stdio: 'pipe' });
      spinner.text = `Claude Code ${version.trim()} detected, configuring...`;
      claudeInstalled = true;
    } catch {
      spinner.warn('Claude Code not installed - skipping CLI configuration');
      console.log(chalk.yellow('  Install Claude Code later: https://docs.claude.com/en/docs/claude-code/quickstart'));
      console.log(chalk.gray('  MCP config will still be written to ~/.claude/config.json\n'));
      // Don't throw - continue with MCP config setup
    }

    // Configure API key (only if Claude is installed and key provided)
    // SECURITY: Use spawn with array args to prevent command injection
    if (claudeInstalled && answers.anthropicKey) {
      spinner.text = 'Configuring Anthropic API key...';

      await new Promise((resolve, reject) => {
        const child = spawn('claude', ['config', 'set', 'api_key', answers.anthropicKey], { stdio: 'pipe' });

        child.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Claude config command failed with exit code ${code}`));
          }
        });

        child.on('error', (err) => {
          reject(new Error(`Failed to execute claude command: ${err.message}`));
        });
      });
    } else if (!claudeInstalled) {
      spinner.text = 'Claude not installed - skipping API key setup...';
    } else {
      spinner.text = 'Skipping API key configuration (you can add it later)...';
    }

    // Note: MCP server configuration now handled by setup-mcp-configs.js
    // This keeps Claude Code setup focused on API key and CLAUDE.md template

    // Create CLAUDE.md template
    spinner.text = 'Creating CLAUDE.md template...';

    const claudeMd = `# ${answers.studentName}'s Project

## Project Context

[Describe your project here - Claude Code reads this automatically]

**Purpose**: [What does this project do?]
**Users**: [Who uses this?]
**Scale**: [How big is this project?]

## Tech Stack

- **Language**: [e.g., Python, TypeScript, Go]
- **Framework**: [e.g., React, FastAPI, Next.js]
- **Database**: [e.g., PostgreSQL, MongoDB, SQLite]
- **Deployment**: [e.g., Vercel, AWS, Docker]

## Project Structure

\`\`\`
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
└── config/        # Configuration
\`\`\`

## Development Commands

\`\`\`bash
# Install dependencies
npm install  # or: pip install -r requirements.txt

# Run development server
npm run dev

# Run tests
npm test     # or: pytest

# Build for production
npm run build
\`\`\`

## Coding Standards (Context Engineering Course)

### General Principles
- **Clarity over cleverness**: Write code humans can understand
- **Explicit over implicit**: Be obvious, not magical
- **Tested over untested**: Write tests for new features
- **Documented over undocumented**: Comment complex logic

### Specific Standards
- Use meaningful variable names (not x, y, z)
- Functions should do one thing well
- Maximum function length: 50 lines (split if longer)
- Comment WHY not WHAT (code shows what, comments show why)

### Context Engineering Practices
- Use Serena for symbol-level operations (when available)
- Load documentation via Archon RAG (when available)
- Prefer progressive disclosure over loading everything
- Measure token usage and optimize

## MCP Tools Available

### Archon (Knowledge Management)
- \`rag_search_knowledge_base\` - Search documentation
- \`find_projects\` / \`manage_project\` - Project management
- \`find_tasks\` / \`manage_task\` - Task tracking

### Serena (Code Intelligence)
- \`get_symbols_overview\` - File structure (use FIRST)
- \`find_symbol\` - Locate code entities
- \`replace_symbol_body\` - Surgical edits
- \`find_referencing_symbols\` - Trace usage
- \`write_memory\` / \`read_memory\` - Store knowledge

## Do Not Touch

**Protected Files** (ask before modifying):
- .env files (contain secrets)
- package-lock.json / poetry.lock (dependency locks)
- Database migration files
- CI/CD configuration files (.github/workflows)
- Production deployment scripts

**Protected Directories**:
- node_modules/ (dependencies)
- .git/ (version control)
- dist/ or build/ (generated files)

## Security Rules (CRITICAL)

- **NEVER** commit API keys, passwords, or secrets
- **ALWAYS** use environment variables for sensitive data
- **ALWAYS** validate and sanitize user inputs
- **ALWAYS** follow OWASP Top 10 security practices
- **NEVER** log sensitive information
- **ALWAYS** use prepared statements for database queries

## Error Handling

All code should include:
- Try-catch blocks for external operations
- Meaningful error messages (helpful for debugging)
- Graceful degradation (don't crash the app)
- Logging for troubleshooting

## Project-Specific Notes

[Add any project-specific guidelines, gotchas, or conventions here]

---

**Generated by**: cursor-claude-setup-2025
**Course**: Context Engineering Mastery
**Student**: ${answers.studentName}
**Purpose**: This file is read by Claude Code automatically to understand your project
`;

    const templateDir = join(__dirname, '..', 'templates');
    await fs.mkdir(templateDir, { recursive: true });

    const claudeMdPath = join(templateDir, 'CLAUDE.md');
    await fs.writeFile(claudeMdPath, claudeMd, 'utf-8');

    spinner.succeed('Claude Code configured successfully');
    console.log(
      chalk.gray(`  • API key: ${answers.anthropicKey ? 'configured' : 'skipped (add later with: claude config set api_key YOUR_KEY)'}`),
    );
    console.log(chalk.gray(`  • CLAUDE.md template: ${claudeMdPath}`));
    console.log(chalk.gray('  • Copy CLAUDE.md to your project root'));
    console.log(chalk.gray('  • MCP servers will be configured in Step 4'));
  } catch (error) {
    spinner.fail('Claude Code setup failed');
    console.error(chalk.red(`  Error: ${error.message}`));

    console.log(chalk.yellow('\n  Manual setup:'));
    console.log(chalk.white('  1. Run: claude config set api_key YOUR_KEY'));
    console.log(chalk.white('  2. Edit ~/.claude/config.json to add MCP servers\n'));

    throw error;
  }
}
