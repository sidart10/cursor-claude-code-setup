import ora from 'ora';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create .cursor/commands with bundled PRP commands.
 * Cursor uses plain markdown files in .cursor/commands/
 * Commands: generate-prp.md, execute-prp.md (bundled in package).
 */
export async function setupCursorCommands() {
  const spinner = ora('Installing .cursor/commands...').start();
  try {
    const cwd = process.cwd();
    const commandsDir = join(cwd, '.cursor', 'commands');
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

    // Minimal README for Cursor
    const readme = `# .cursor/commands

Custom slash commands for Cursor Agent/Chat (Context Engineering workflow).

- **/generate-prp**: Research, plan, and generate a comprehensive PRP for feature implementation.
- **/execute-prp**: Execute a PRP with ULTRATHINK planning, validation gates, and iterative fixes.

Commands sourced from: https://github.com/coleam00/context-engineering-intro

Trigger with \`/\` prefix in Cursor chat. Pass arguments like: \`/generate-prp INITIAL.md\`

You can add more commands here as plain markdown files.
`;
    await fs.writeFile(join(commandsDir, 'README.md'), readme, 'utf-8');

    spinner.succeed('.cursor/commands installed');
    console.log(chalk.gray(`  • ${commandsDir}`));
    console.log(chalk.gray('  • generate-prp.md, execute-prp.md'));
  } catch (error) {
    spinner.fail('Failed installing .cursor/commands');
    throw error;
  }
}

