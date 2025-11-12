import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { platform } from 'os';

/**
 * Setup Serena MCP Server
 * Installs uv (if needed) and verifies Serena can run
 */
export async function setupSerena(answers) {
  const spinner = ora('Setting up Serena MCP Server...').start();

  try {
    // Check if uv is installed
    spinner.text = 'Checking uv package manager...';

    let uvInstalled = false;
    try {
      execSync('uv --version', { stdio: 'pipe' });
      uvInstalled = true;
      spinner.text = 'uv detected, verifying Serena...';
    } catch {
      // uv not installed, need to install it
      spinner.text = 'Installing uv package manager...';

      const isWindows = platform() === 'win32';
      const installScript = isWindows
        ? 'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"'
        : 'curl -LsSf https://astral.sh/uv/install.sh | sh';

      try {
        execSync(installScript, { stdio: 'pipe' });
        spinner.text = 'uv installed successfully, setting up Serena...';
        uvInstalled = true;
      } catch (installError) {
        spinner.fail('Failed to install uv automatically');
        console.log(chalk.yellow('\n⚠️  Please install uv manually:'));
        console.log(
          chalk.cyan(`   ${isWindows ? 'Windows' : 'macOS/Linux'}: Visit https://docs.astral.sh/uv/getting-started/installation/\n`),
        );
        throw new Error('uv installation failed');
      }
    }

    // Verify Serena can run via uvx
    spinner.text = 'Verifying Serena installation...';

    try {
      // Test that uvx can fetch and run Serena (with timeout)
      execSync(
        'uvx --from git+https://github.com/oraios/serena serena --help',
        { stdio: 'pipe', timeout: 60000 }, // 60 second timeout
      );
    } catch (error) {
      if (error.killed) {
        throw new Error('Serena verification timed out (slow network?)');
      }
      throw new Error(`Serena verification failed: ${error.message}`);
    }

    spinner.succeed('Serena MCP Server ready');
    console.log(chalk.gray('  • Serena will start automatically when Claude Code uses it'));
    console.log(chalk.gray('  • No background process needed (on-demand via uvx)'));
    console.log(chalk.gray('  • Test: claude "Use Serena to show me available tools"'));

    // Provide usage tips
    console.log(chalk.cyan('\n  💡 Serena Tips:'));
    console.log(chalk.white('  - Always activate project first: "Activate project $(pwd)"'));
    console.log(chalk.white('  - Use get_symbols_overview before reading files'));
    console.log(chalk.white('  - Index large projects: uvx --from git+...serena serena project index'));
  } catch (error) {
    spinner.fail('Serena setup failed');
    console.error(chalk.red(`  Error: ${error.message}`));

    console.log(chalk.yellow('\n  Troubleshooting:'));
    console.log(chalk.white('  - Ensure Python 3.10+ installed'));
    console.log(chalk.white('  - Check internet connection (downloads from GitHub)'));
    console.log(chalk.white('  - Manual install: https://github.com/oraios/serena\n'));

    throw error;
  }
}
