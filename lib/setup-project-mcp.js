import ora from 'ora';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import { join } from 'path';
import { writeJsonPretty, readJsonSafe, deepMerge } from './merge-json.js';

/**
 * Write project-level ./.mcp.json with Exa, Firecrawl, Serena.
 * Uses ${VAR} placeholders for API keys.
 * Also generates .mcp.env.example with guidance.
 */
export async function setupProjectMCP() {
  const spinner = ora('Writing project .mcp.json...').start();
  try {
    const cwd = process.cwd();
    const path = join(cwd, '.mcp.json');

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

    const merged = deepMerge(existing, patch);
    await writeJsonPretty(path, merged);

    // Create .mcp.env.example
    const envExample = `# Project MCP environment variables
# Fill these in and export before running your client

EXA_API_KEY=your-exa-key
FIRECRAWL_API_KEY=your-firecrawl-key
`;
    await fs.writeFile(join(cwd, '.mcp.env.example'), envExample, 'utf-8');

    spinner.succeed('Project .mcp.json written');
    console.log(chalk.gray(`  • ${path}`));
    console.log(chalk.gray('  • .mcp.env.example created'));
  } catch (error) {
    spinner.fail('Failed writing project .mcp.json');
    throw error;
  }
}


