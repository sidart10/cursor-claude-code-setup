import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

/**
 * Setup BMAD Framework
 * Runs npx bmad-method@alpha install
 */
export async function setupBMAD(answers) {
  const spinner = ora('Setting up BMAD Framework...').start();

  try {
    spinner.text = 'This will run: npx bmad-method@alpha install';
    spinner.stop();

    console.log(chalk.cyan('\n  📦 BMAD Framework Installation\n'));
    console.log(chalk.white('  BMAD has its own interactive installer.'));
    console.log(chalk.white('  You will be asked to:'));
    console.log(chalk.gray('    - Select modules (BMM, BMB, CIS)'));
    console.log(chalk.gray('    - Configure settings (name, language)'));
    console.log(chalk.gray(`    - Choose installation directory\n`));

    const { proceedBMAD } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceedBMAD',
        message: 'Ready to start BMAD installation?',
        default: true,
      },
    ]);

    if (!proceedBMAD) {
      console.log(chalk.yellow('  ⚠️  BMAD installation skipped'));
      console.log(chalk.gray('  You can install later: npx bmad-method@alpha install\n'));
      return;
    }

    console.log(chalk.cyan('\n  Starting BMAD installer...\n'));
    console.log(chalk.gray('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    // Run BMAD installer with inherited stdio (interactive)
    execSync('npx bmad-method@alpha install', {
      stdio: 'inherit', // Pass through to user
      env: {
        ...process.env,
        BMAD_STUDENT_NAME: answers.studentName, // Pass student name
      },
    });

    console.log(chalk.gray('\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    console.log(chalk.green('✓ BMAD Framework installed successfully'));
    console.log(chalk.gray('  • 12 specialized AI agents available'));
    console.log(chalk.gray('  • 34 workflows across 4 phases'));
    console.log(chalk.gray('  • Activate agents in Cursor or Claude Code'));
    console.log(chalk.gray('  • Try: Load bmad-master agent and run *list-workflows'));
  } catch (error) {
    // BMAD installer handles its own errors, but catch if it fails
    if (error.status === 0) {
      // Success (exit code 0)
      console.log(chalk.green('✓ BMAD installation completed'));
    } else if (error.status === 1) {
      console.log(chalk.yellow('⚠️  BMAD installation encountered issues'));
      console.log(chalk.gray('  Check output above for details'));
    } else {
      console.log(chalk.red('✗ BMAD installation failed'));
      console.error(chalk.red(`  Error: ${error.message}`));

      console.log(chalk.yellow('\n  Manual installation:'));
      console.log(chalk.white('  npx bmad-method@alpha install\n'));
    }
  }
}
