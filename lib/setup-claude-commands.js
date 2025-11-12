import ora from 'ora';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create .claude/commands with bundled PRP commands from coleam00's repo.
 * Commands: generate-prp.md, execute-prp.md (bundled in package).
 */
export async function setupClaudeCommands() {
  const spinner = ora('Installing .claude/commands...').start();
  try {
    const cwd = process.cwd();
    const commandsDir = join(cwd, '.claude', 'commands');
    await fs.mkdir(commandsDir, { recursive: true });

    const templateDir = join(__dirname, '..', 'templates', 'commands');

    // Copy bundled generate-prp.md
    const genPrpSrc = join(templateDir, 'generate-prp.md');
    const genPrpDest = join(commandsDir, 'generate-prp.md');
    await fs.copyFile(genPrpSrc, genPrpDest);

    // Copy bundled execute-prp.md
    const execPrpSrc = join(templateDir, 'execute-prp.md');
    const execPrpDest = join(commandsDir, 'execute-prp.md');
    await fs.copyFile(execPrpSrc, execPrpDest);

    // Minimal README
    const readme = `# .claude/commands

Custom command prompts for Claude/Claude Code (Context Engineering workflow).

- **generate-prp.md**: Research, plan, and generate a comprehensive PRP for feature implementation.
- **execute-prp.md**: Execute a PRP with ULTRATHINK planning, validation gates, and iterative fixes.

Commands sourced from: https://github.com/coleam00/context-engineering-intro

You can add more commands here following the same frontmatter format.
`;
    await fs.writeFile(join(commandsDir, 'README.md'), readme, 'utf-8');

    spinner.succeed('.claude/commands installed');
    console.log(chalk.gray(`  • ${commandsDir}`));
    console.log(chalk.gray('  • generate-prp.md, execute-prp.md'));
  } catch (error) {
    spinner.fail('Failed installing .claude/commands');
    throw error;
  }
}


