import ora from 'ora';
import chalk from 'chalk';
import { join } from 'path';
import { homedir } from 'os';
import { promises as fs } from 'fs';
import { backupIfExists, deepMerge, readJsonSafe, writeJsonPretty } from './merge-json.js';

/**
 * Merge servers into ~/.claude/config.json with backup.
 * Writes README-MCP-ENV.md with env guidance.
 */
export async function setupClaudeConfig() {
  const spinner = ora('Updating Claude Code global config (~/.claude/config.json)...').start();
  try {
    const configDir = join(homedir(), '.claude');
    const path = join(configDir, 'config.json');
    const existing = await readJsonSafe(path);
    const patch = {
      mcpServers: {
        ...(existing.mcpServers || {}),
        exa: {
          command: 'npx',
          args: ['-y', 'exa-mcp-server'],
          env: {
            EXA_API_KEY: '${EXA_API_KEY}',
          },
          description: 'Exa MCP - Web search',
        },
        firecrawl: {
          command: 'npx',
          args: ['-y', 'firecrawl-mcp'],
          env: {
            FIRECRAWL_API_KEY: '${FIRECRAWL_API_KEY}',
          },
          description: 'Firecrawl MCP - Crawl/scrape web content',
        },
        serena: {
          command: 'uvx',
          args: [
            '--from',
            'git+https://github.com/oraios/serena',
            'serena',
            'start-mcp-server',
            '--context',
            'ide-assistant',
          ],
          description: 'Serena MCP - Symbolic code operations',
        },
      },
    };
    const backup = await backupIfExists(path);
    const merged = deepMerge(existing, patch);
    await writeJsonPretty(path, merged);

    // Write env guidance
    const readmePath = join(configDir, 'README-MCP-ENV.md');
    const guidance = `# MCP Environment Variables (Claude Code)

Claude Code reads your shell environment when launched.

Export keys before starting Claude Code:

macOS/Linux (bash/zsh):

export EXA_API_KEY=your-exa-key
export FIRECRAWL_API_KEY=your-firecrawl-key

Windows (PowerShell):

$env:EXA_API_KEY="your-exa-key"
$env:FIRECRAWL_API_KEY="your-firecrawl-key"

Then start Claude Code and retry your MCP tools.
`;
    await fs.mkdir(configDir, { recursive: true });
    await fs.writeFile(readmePath, guidance, 'utf-8');

    spinner.succeed('Claude Code config updated');
    if (backup) console.log(chalk.gray(`  • Backup created: ${backup}`));
    console.log(chalk.gray(`  • Updated: ${path}`));
    console.log(chalk.gray(`  • Guidance: ${readmePath}`));
  } catch (error) {
    spinner.fail('Failed updating Claude Code config');
    throw error;
  }
}


