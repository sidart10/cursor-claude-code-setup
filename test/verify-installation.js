#!/usr/bin/env node

/**
 * Automated Installation Verification
 * Tests that all components were installed correctly
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';

const execAsync = promisify(exec);

console.log(chalk.cyan.bold('\n🧪 Running Installation Verification Tests\n'));

const tests = [];

/**
 * Test 1: Check Node version
 */
async function testNodeVersion() {
  try {
    const { stdout } = await execAsync('node --version');
    const version = stdout.trim();
    const majorVersion = parseInt(version.slice(1).split('.')[0]);

    if (majorVersion >= 18) {
      return { pass: true, message: `Node.js ${version} (✓ >= 18.0.0)` };
    } else {
      return { pass: false, message: `Node.js ${version} (✗ Needs >= 18.0.0)` };
    }
  } catch (error) {
    return { pass: false, message: 'Node.js not found' };
  }
}

/**
 * Test 2: Check npm is installed
 */
async function testNpm() {
  try {
    const { stdout } = await execAsync('npm --version');
    return { pass: true, message: `npm ${stdout.trim()}` };
  } catch (error) {
    return { pass: false, message: 'npm not found' };
  }
}

/**
 * Test 3: Check Claude Code CLI
 */
async function testClaudeCode() {
  try {
    await execAsync('which claude');
    return { pass: true, message: 'Claude Code CLI installed' };
  } catch (error) {
    return { pass: false, message: 'Claude Code CLI not found' };
  }
}

/**
 * Test 4: Check Cursor config directory
 */
async function testCursorConfig() {
  const cursorDir = join(homedir(), '.cursor');
  if (existsSync(cursorDir)) {
    return { pass: true, message: 'Cursor config directory exists' };
  } else {
    return { pass: false, message: 'Cursor config directory not found' };
  }
}

/**
 * Test 5: Check Docker (for Archon)
 */
async function testDocker() {
  try {
    const { stdout } = await execAsync('docker --version');
    return { pass: true, message: `Docker installed: ${stdout.trim()}` };
  } catch (error) {
    return { pass: false, message: 'Docker not found (optional for Archon)' };
  }
}

/**
 * Test 6: Check Python/uvx (for Serena)
 */
async function testPython() {
  try {
    const { stdout } = await execAsync('python3 --version');
    return { pass: true, message: `Python installed: ${stdout.trim()}` };
  } catch (error) {
    return { pass: false, message: 'Python not found (needed for Serena)' };
  }
}

/**
 * Test 7: Check if MCP config exists
 */
async function testMcpConfig() {
  const mcpConfig = join(homedir(), '.mcp.json');
  if (existsSync(mcpConfig)) {
    return { pass: true, message: 'MCP configuration file exists' };
  } else {
    return { pass: false, message: 'MCP config not found (will be created on first run)' };
  }
}

/**
 * Run all tests
 */
async function runTests() {
  const testSuite = [
    { name: 'Node.js Version', fn: testNodeVersion, critical: true },
    { name: 'npm Package Manager', fn: testNpm, critical: true },
    { name: 'Claude Code CLI', fn: testClaudeCode, critical: false },
    { name: 'Cursor Configuration', fn: testCursorConfig, critical: false },
    { name: 'Docker Engine', fn: testDocker, critical: false },
    { name: 'Python Runtime', fn: testPython, critical: false },
    { name: 'MCP Configuration', fn: testMcpConfig, critical: false },
  ];

  const results = [];

  for (const test of testSuite) {
    process.stdout.write(chalk.gray(`Testing ${test.name}... `));
    const result = await test.fn();
    results.push({ ...result, name: test.name, critical: test.critical });

    if (result.pass) {
      console.log(chalk.green(`✓ ${result.message}`));
    } else {
      const icon = test.critical ? '✗' : '⚠';
      const color = test.critical ? chalk.red : chalk.yellow;
      console.log(color(`${icon} ${result.message}`));
    }
  }

  // Summary
  console.log(chalk.cyan.bold('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.cyan.bold('       VERIFICATION SUMMARY       '));
  console.log(chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  const criticalFailed = results.filter((r) => !r.pass && r.critical).length;

  console.log(chalk.white(`Tests Passed: ${chalk.green(passed)}/${results.length}`));
  console.log(chalk.white(`Tests Failed: ${chalk.yellow(failed)}/${results.length}`));

  if (criticalFailed > 0) {
    console.log(chalk.red.bold(`\n⚠️  ${criticalFailed} critical test(s) failed!`));
    console.log(chalk.yellow('\nPlease install missing prerequisites:\n'));

    results
      .filter((r) => !r.pass && r.critical)
      .forEach((r) => {
        console.log(chalk.red(`  ✗ ${r.name}`));
      });

    console.log(chalk.cyan('\nRe-run installer after fixing issues.\n'));
    process.exit(1);
  } else if (failed > 0) {
    console.log(chalk.yellow.bold(`\n⚠️  ${failed} optional component(s) not installed.`));
    console.log(chalk.white('Your core setup is working, but some features may be unavailable.\n'));
    process.exit(0);
  } else {
    console.log(chalk.green.bold('\n✓ All tests passed! Installation verified.\n'));
    console.log(chalk.white('🎉 You are ready to start the course!\n'));
    process.exit(0);
  }
}

// Run tests
runTests().catch((error) => {
  console.error(chalk.red('\nTest suite error:'), error.message);
  process.exit(1);
});
