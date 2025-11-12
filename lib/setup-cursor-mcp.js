import ora from 'ora';
import chalk from 'chalk';
import { join } from 'path';
import { homedir } from 'os';
import { backupIfExists, deepMerge, readJsonSafe, writeJsonPretty } from './merge-json.js';

/**
 * Merge servers into ~/.cursor/mcp.json with backups.
 * Uses ${VAR} placeholders for API keys.
 */
export async function setupCursorMCP() {
  const spinner = ora('Updating Cursor global MCP config (~/.cursor/mcp.json)...').start();
  try {
    const path = join(homedir(), '.cursor', 'mcp.json');
    const existing = await readJsonSafe(path);
    const patch = {
      mcpServers: {
        exa: {
          command: 'npx',
          args: ['-y', 'exa-mcp-server'],
          env: {
            EXA_API_KEY: '${EXA_API_KEY}',
          },
        },
        firecrawl: {
          command: 'npx',
          args: ['-y', 'firecrawl-mcp'],
          env: {
            FIRECRAWL_API_KEY: '${FIRECRAWL_API_KEY}',
          },
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
        },
      },
    };
    const backup = await backupIfExists(path);
    const merged = deepMerge(existing, patch);
    await writeJsonPretty(path, merged);
    spinner.succeed('Cursor MCP config updated');
    if (backup) console.log(chalk.gray(`  • Backup created: ${backup}`));
    console.log(chalk.gray(`  • Updated: ${path}`));
  } catch (error) {
    spinner.fail('Failed updating Cursor MCP config');
    throw error;
  }
}


