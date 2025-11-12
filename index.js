#!/usr/bin/env node

/**
 * Cursor Claude Setup 2025 - Automated Configuration
 *
 * One-command installation for AI development stack:
 * - MCP Servers (Exa, Firecrawl, Serena) - auto-configured
 * - Context Engineering Commands - for Cursor & Claude Code
 * - Cursor IDE configuration (global .cursorrules)
 * - Claude Code CLI with MCP integration
 * - BMAD Framework (12 agents, 34 workflows)
 *
 * Usage: npx cursor-claude-setup-2025
 *
 * Pattern inspired by bmad-code-org/BMAD-METHOD install.js
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { homedir } from 'os';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import setup modules
import { checkPrerequisites } from './lib/check-prereqs.js';
import { setupCursor } from './lib/setup-cursor.js';
import { setupClaudeCode } from './lib/setup-claude-code.js';
import { setupArchon } from './lib/setup-archon.js';
import { setupSerena } from './lib/setup-serena.js';
import { setupBMAD } from './lib/setup-bmad.js';
import { setupMCPConfigs } from './lib/setup-mcp-configs.js';
// New helpers for auto MCP configuration and extras
import { setupProjectMCP } from './lib/setup-project-mcp.js';
import { setupCursorMCP } from './lib/setup-cursor-mcp.js';
import { setupClaudeConfig } from './lib/setup-claude-config.js';
import { setupClaudeCommands } from './lib/setup-claude-commands.js';
import { setupCursorCommands } from './lib/setup-cursor-commands.js';
import { verifyAll } from './lib/verify-all.js';
import { createWorkspace } from './lib/create-workspace.js';

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   Context Engineering Mastery 2025                   ║
║   Automated Setup for AI Development Stack           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`;

console.log(chalk.cyan.bold(banner));
console.log(chalk.gray('Auto-configure MCP servers (Exa, Firecrawl, Serena), install commands for both clients\n'));

/**
 * Main installation flow
 */
async function main() {
  try {
    // ========================================
    // STEP 1: Gather Information
    // ========================================
    console.log(chalk.yellow('📋 Step 1: Configuration\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'studentName',
        message: 'Your name (for personalized config):',
        default: 'Student',
        validate: (input) => input.length > 0 || 'Name required',
      },
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select components to install:',
        choices: [
          { name: 'Cursor IDE configuration (.cursorrules, templates)', value: 'cursor', checked: true },
          { name: 'Claude Code CLI with MCP servers', value: 'claudecode', checked: true },
          { name: 'Serena MCP Server (symbolic code tools)', value: 'serena', checked: true },
          { name: 'BMAD Framework (12 agents, 34 workflows)', value: 'bmad', checked: true },
        ],
        validate: (input) => input.length > 0 || 'Select at least one component',
      },
      {
        type: 'confirm',
        name: 'createWorkspace',
        message: 'Create student workspace folder structure?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'openDocs',
        message: 'Open getting started guide in browser when done?',
        default: true,
      },
    ]);

    // ========================================
    // STEP 2: Check Prerequisites
    // ========================================
    console.log(chalk.yellow('\n🔍 Step 2: Checking Prerequisites\n'));

    const spinner = ora('Checking system requirements...').start();
    const prereqCheck = await checkPrerequisites(answers.components);

    if (!prereqCheck.allGood) {
      spinner.fail('Missing prerequisites');
      console.log(chalk.yellow('\n⚠️  Please install the following:\n'));

      prereqCheck.missing.forEach((item) => {
        console.log(chalk.red(`  ✗ ${item.name}`));
        console.log(chalk.gray(`    Install: ${item.installUrl}\n`));
      });

      console.log(chalk.cyan('\nRun this installer again after installing prerequisites.\n'));
      process.exit(1);
    }

    spinner.succeed('All prerequisites verified');

    // ========================================
    // STEP 3: Setup Each Component
    // ========================================
    console.log(chalk.yellow('\n⚙️  Step 3: Installing Components\n'));

    const setupResults = [];

    // Setup Cursor configuration
    if (answers.components.includes('cursor')) {
      try {
        await setupCursor(answers);
        setupResults.push({ component: 'Cursor', success: true });
      } catch (error) {
        setupResults.push({ component: 'Cursor', success: false, error: error.message });
      }
    }

    // Setup Claude Code
    if (answers.components.includes('claudecode')) {
      try {
        await setupClaudeCode(answers);
        setupResults.push({ component: 'Claude Code', success: true });
      } catch (error) {
        setupResults.push({ component: 'Claude Code', success: false, error: error.message });
      }
    }

    // Setup Serena MCP
    if (answers.components.includes('serena')) {
      try {
        await setupSerena(answers);
        setupResults.push({ component: 'Serena MCP', success: true });
      } catch (error) {
        setupResults.push({ component: 'Serena MCP', success: false, error: error.message });
      }
    }

    // Setup BMAD
    if (answers.components.includes('bmad')) {
      try {
        await setupBMAD(answers);
        setupResults.push({ component: 'BMAD Framework', success: true });
      } catch (error) {
        setupResults.push({ component: 'BMAD Framework', success: false, error: error.message });
      }
    }

    // ========================================
    // STEP 4: Create MCP Configuration Templates
    // ========================================
    console.log(chalk.yellow('\n🔧 Step 4: Creating MCP Configuration Files\n'));

    try {
      await setupMCPConfigs(answers);
      setupResults.push({ component: 'MCP Configuration', success: true });
    } catch (error) {
      setupResults.push({ component: 'MCP Configuration', success: false, error: error.message });
    }

    // ========================================
    // STEP 5: Auto-configure MCP for Project + Clients
    // ========================================
    console.log(chalk.yellow('\n🧩 Step 5: Auto-configuring MCP servers (Exa, Firecrawl, Serena)\n'));
    try {
      await setupProjectMCP();
      await setupCursorMCP();
      await setupClaudeConfig();
      console.log(chalk.green('✓ MCP configured for project and global clients'));
    } catch (error) {
      console.log(chalk.yellow(`⚠️  MCP auto-configuration partial/failed: ${error.message}`));
    }

    // Mandatory: .claude commands (Context Engineering)
    try {
      await setupClaudeCommands();
      setupResults.push({ component: '.claude/commands (generate-prp, execute-prp)', success: true });
    } catch (error) {
      setupResults.push({ component: '.claude/commands', success: false, error: error.message });
    }

    // Mandatory: .cursor commands (Context Engineering)
    try {
      await setupCursorCommands();
      setupResults.push({ component: '.cursor/commands (generate-prp, execute-prp)', success: true });
    } catch (error) {
      setupResults.push({ component: '.cursor/commands', success: false, error: error.message });
    }

    // ========================================
    // STEP 6: Create Workspace (Optional)
    // ========================================
    if (answers.createWorkspace) {
      console.log(chalk.yellow('\n📁 Step 6: Creating Workspace\n'));

      try {
        const workspacePath = await createWorkspace(answers.studentName);
        console.log(chalk.green(`✓ Workspace created: ${workspacePath}`));
      } catch (error) {
        console.log(chalk.yellow(`⚠️  Workspace creation skipped: ${error.message}`));
      }
    }

    // ========================================
    // STEP 7: Verification
    // ========================================
    console.log(chalk.yellow('\n🔍 Step 7: Verifying Installation\n'));

    const verification = await verifyAll(answers.components);

    // ========================================
    // STEP 8: Results Summary
    // ========================================
    console.log(chalk.cyan.bold('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(chalk.cyan.bold('          INSTALLATION COMPLETE          '));
    console.log(chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    // Component Setup Results
    console.log(chalk.white.bold('Component Setup:\n'));
    setupResults.forEach((result) => {
      const icon = result.success ? '✓' : '✗';
      const color = result.success ? chalk.green : chalk.red;
      console.log(color(`  ${icon} ${result.component}${result.error ? ': ' + result.error : ''}`));
    });

    // Verification Results
    console.log(chalk.white.bold('\nVerification:\n'));
    verification.results.forEach((result) => {
      const icon = result.success ? '✓' : '⚠';
      const color = result.success ? chalk.green : chalk.yellow;
      console.log(color(`  ${icon} ${result.component}: ${result.message}`));
    });

    // Success Rate
    const successCount = setupResults.filter((r) => r.success).length;
    const totalCount = setupResults.length;
    const successRate = Math.round((successCount / totalCount) * 100);

    console.log(chalk.cyan(`\n📊 Success Rate: ${successCount}/${totalCount} components (${successRate}%)\n`));

    // ========================================
    // STEP 9: Next Steps
    // ========================================
    console.log(chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    console.log(chalk.white.bold('🎯 Next Steps:\n'));

    console.log(chalk.white('1. Open Cursor IDE and create a new project'));
    console.log(chalk.white('2. Try Tab autocomplete in any code file'));
    console.log(chalk.white('3. Use Cmd+K for inline editing'));
    console.log(chalk.white('4. Open terminal and test Claude Code:'));
    console.log(chalk.gray('   claude "What tools do I have available?"\n'));

    if (answers.components.includes('archon')) {
      console.log(chalk.white('5. Open Archon web UI: http://localhost:3737'));
      console.log(chalk.white('6. Complete onboarding and add your first knowledge source\n'));
    }

    if (answers.createWorkspace) {
      const workspacePath = join(homedir(), 'cursor-claude-course');
      console.log(chalk.white(`7. Navigate to your workspace: cd ${workspacePath}`));
      console.log(chalk.white('8. Project MCP config: ./.mcp.json (placeholders for API keys)'));
      console.log(chalk.white('9. Cursor global MCP: ~/.cursor/mcp.json (merged)'));
      console.log(chalk.white('10. Claude Code global MCP: ~/.claude/config.json (merged)\n'));
    }

    console.log(chalk.cyan('📚 Course Materials: Clone the main repository'));
    console.log(chalk.gray('   git clone https://github.com/sidart10/cursor-claude-code-course\n'));

    // API key reminder
    console.log(chalk.yellow.bold('⚙️  Configure API Keys:\n'));
    console.log(chalk.white('   • Exa: export EXA_API_KEY=your-key'));
    console.log(chalk.white('   • Firecrawl: export FIRECRAWL_API_KEY=your-key'));
    console.log(chalk.gray('   Placeholders were written into configs; see .mcp.env.example in your project.\n'));

    // Skills guidance
    console.log(chalk.cyan.bold('🎯 Optional: Add Claude Skills\n'));
    console.log(chalk.white('   Claude Code (via plugin marketplace):'));
    console.log(chalk.gray('   /plugin marketplace add anthropics/skills'));
    console.log(chalk.gray('   /plugin install document-skills@anthropic-agent-skills\n'));
    console.log(chalk.white('   See templates/guides/SKILLS-QUICKSTART.md for details.\n'));

    // Reference materials
    console.log(chalk.cyan.bold('📚 Reference Materials Bundled\n'));
    console.log(chalk.white('   Cheat sheets: templates/cheat-sheets/ (6 files)'));
    console.log(chalk.white('   Guides: templates/guides/ (7 files)'));
    console.log(chalk.gray('   • Quick references for Cursor, Claude Code, Serena, BMAD'));
    console.log(chalk.gray('   • Module-specific guides (advanced topics)'));
    console.log(chalk.gray('   • Bonus: 2 PRP commands installed (.claude/commands, .cursor/commands)\n'));

    console.log(chalk.green.bold('🎉 Setup complete! MCP configured, BMAD ready, references bundled.\n'));

    // Open docs if requested
    if (answers.openDocs) {
      const { default: open } = await import('open');
      await open('https://github.com/sidart10/cursor-claude-code-course');
    }

    // Clean exit
    process.exit(0);
  } catch (error) {
    console.error(chalk.red.bold('\n❌ Installation Error\n'));
    console.error(chalk.red(error.message));

    if (error.stack) {
      console.error(chalk.dim('\nStack trace:'));
      console.error(chalk.dim(error.stack));
    }

    console.log(chalk.yellow('\n💡 Troubleshooting:'));
    console.log(chalk.white('1. Check prerequisites are installed (Node 18+, Git, Docker)'));
    console.log(chalk.white('2. Ensure ports 3737, 8051, 8181 are available'));
    console.log(chalk.white('3. Verify package dependencies installed correctly'));
    console.log(
      chalk.white('4. See troubleshooting guide: https://github.com/sidart10/cursor-claude-code-course/blob/main/TROUBLESHOOTING.md\n'),
    );

    process.exit(1);
  }
}

// Run main function
main().catch((error) => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});
