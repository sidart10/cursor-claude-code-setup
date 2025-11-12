#!/usr/bin/env node

/**
 * Dry Run Test - Simulates Full Installer Without Making Changes
 * Tests the installer logic without actually modifying system files
 */

import chalk from 'chalk';
import { checkPrerequisites } from '../lib/check-prereqs.js';
import { verifyAll } from '../lib/verify-all.js';

console.log(chalk.cyan.bold('\n🧪 DRY RUN TEST - Installer Simulation\n'));
console.log(chalk.gray('This will test the installer without making any changes to your system.\n'));

/**
 * Test 1: Prerequisites Check
 */
async function testPrerequisites() {
  console.log(chalk.yellow('━━━ Test 1: Prerequisites Check ━━━\n'));

  const testComponents = ['cursor', 'claudecode', 'archon', 'serena', 'bmad'];

  try {
    const result = await checkPrerequisites(testComponents);

    if (result.allGood) {
      console.log(chalk.green('✓ Prerequisites check: PASSED'));
      console.log(chalk.gray(`  All required tools detected\n`));
      return true;
    } else {
      console.log(chalk.yellow('⚠ Prerequisites check: PARTIAL'));
      console.log(chalk.gray(`  Missing ${result.missing.length} items:`));
      result.missing.forEach((item) => {
        console.log(chalk.red(`    ✗ ${item.name}`));
      });
      console.log();
      return false;
    }
  } catch (error) {
    console.log(chalk.red('✗ Prerequisites check: FAILED'));
    console.log(chalk.red(`  Error: ${error.message}\n`));
    return false;
  }
}

/**
 * Test 2: Import All Setup Modules
 */
async function testModuleImports() {
  console.log(chalk.yellow('━━━ Test 2: Module Import Test ━━━\n'));

  const modules = [
    { name: 'check-prereqs.js', path: '../lib/check-prereqs.js' },
    { name: 'setup-cursor.js', path: '../lib/setup-cursor.js' },
    { name: 'setup-claude-code.js', path: '../lib/setup-claude-code.js' },
    { name: 'setup-archon.js', path: '../lib/setup-archon.js' },
    { name: 'setup-serena.js', path: '../lib/setup-serena.js' },
    { name: 'setup-bmad.js', path: '../lib/setup-bmad.js' },
    { name: 'verify-all.js', path: '../lib/verify-all.js' },
    { name: 'create-workspace.js', path: '../lib/create-workspace.js' },
  ];

  let allPassed = true;

  for (const mod of modules) {
    try {
      await import(mod.path);
      console.log(chalk.green(`✓ ${mod.name}: imports successfully`));
    } catch (error) {
      console.log(chalk.red(`✗ ${mod.name}: import failed`));
      console.log(chalk.red(`  ${error.message}`));
      allPassed = false;
    }
  }

  console.log();
  return allPassed;
}

/**
 * Test 3: Verification System
 */
async function testVerification() {
  console.log(chalk.yellow('━━━ Test 3: Verification System ━━━\n'));

  const testComponents = ['cursor', 'claudecode', 'serena'];

  try {
    const result = await verifyAll(testComponents);

    console.log(chalk.green(`✓ Verification system: WORKING`));
    console.log(chalk.gray(`  Checked ${result.results.length} components\n`));

    result.results.forEach((r) => {
      const icon = r.success ? '✓' : '⚠';
      const color = r.success ? chalk.green : chalk.yellow;
      console.log(color(`  ${icon} ${r.component}: ${r.message}`));
    });

    console.log();
    return true;
  } catch (error) {
    console.log(chalk.red('✗ Verification system: FAILED'));
    console.log(chalk.red(`  Error: ${error.message}\n`));
    return false;
  }
}

/**
 * Test 4: Package.json Validation
 */
async function testPackageJson() {
  console.log(chalk.yellow('━━━ Test 4: Package.json Validation ━━━\n'));

  try {
    const packageJson = await import('../package.json', { with: { type: 'json' } });
    const pkg = packageJson.default;

    const checks = [
      { field: 'name', value: pkg.name, expected: 'cursor-claude-setup-2025' },
      { field: 'version', value: pkg.version, expected: /^\d+\.\d+\.\d+$/ },
      { field: 'bin', value: pkg.bin?.['cursor-claude-setup-2025'], expected: './index.js' },
      { field: 'type', value: pkg.type, expected: 'module' },
      { field: 'engines.node', value: pkg.engines?.node, expected: '>=18.0.0' },
    ];

    let allValid = true;

    checks.forEach((check) => {
      if (typeof check.expected === 'string') {
        if (check.value === check.expected) {
          console.log(chalk.green(`✓ ${check.field}: "${check.value}"`));
        } else {
          console.log(chalk.red(`✗ ${check.field}: "${check.value}" (expected "${check.expected}")`));
          allValid = false;
        }
      } else if (check.expected instanceof RegExp) {
        if (check.expected.test(check.value)) {
          console.log(chalk.green(`✓ ${check.field}: "${check.value}"`));
        } else {
          console.log(chalk.red(`✗ ${check.field}: invalid format`));
          allValid = false;
        }
      }
    });

    console.log();
    return allValid;
  } catch (error) {
    console.log(chalk.red('✗ Package.json validation: FAILED'));
    console.log(chalk.red(`  Error: ${error.message}\n`));
    return false;
  }
}

/**
 * Test 5: Dependencies Check
 */
async function testDependencies() {
  console.log(chalk.yellow('━━━ Test 5: Dependencies Check ━━━\n'));

  const requiredDeps = ['chalk', 'inquirer', 'ora', 'clipboardy', 'yaml', 'node-fetch'];

  let allInstalled = true;

  for (const dep of requiredDeps) {
    try {
      await import(dep);
      console.log(chalk.green(`✓ ${dep}: installed`));
    } catch (error) {
      console.log(chalk.red(`✗ ${dep}: not found`));
      allInstalled = false;
    }
  }

  console.log();
  return allInstalled;
}

/**
 * Run all tests
 */
async function runAllTests() {
  const startTime = Date.now();

  console.log(chalk.cyan('Starting dry run test suite...\n'));

  const results = {
    prerequisites: await testPrerequisites(),
    moduleImports: await testModuleImports(),
    verification: await testVerification(),
    packageJson: await testPackageJson(),
    dependencies: await testDependencies(),
  };

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary
  console.log(chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.cyan.bold('       DRY RUN TEST SUMMARY       '));
  console.log(chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

  const testNames = Object.keys(results);
  const passed = testNames.filter((name) => results[name]).length;
  const failed = testNames.filter((name) => !results[name]).length;

  testNames.forEach((name) => {
    const icon = results[name] ? '✓' : '✗';
    const color = results[name] ? chalk.green : chalk.red;
    const label = name
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
    console.log(color(`${icon} ${label}`));
  });

  console.log(chalk.white(`\nTests Passed: ${chalk.green(passed)}/${testNames.length}`));
  console.log(chalk.white(`Tests Failed: ${chalk.red(failed)}/${testNames.length}`));
  console.log(chalk.white(`Duration: ${duration}s\n`));

  if (failed === 0) {
    console.log(chalk.green.bold('🎉 ALL TESTS PASSED!'));
    console.log(chalk.white('\nThe installer is ready to:'));
    console.log(chalk.white('  1. Test with npm link (local simulation)'));
    console.log(chalk.white('  2. Publish to npm (make it public)'));
    console.log(chalk.white('  3. Test with npx cursor-claude-setup-2025\n'));
    process.exit(0);
  } else {
    console.log(chalk.red.bold('⚠️  SOME TESTS FAILED'));
    console.log(chalk.yellow('\nFix errors before publishing to npm.\n'));
    process.exit(1);
  }
}

// Run tests
runAllTests().catch((error) => {
  console.error(chalk.red('\n❌ Test suite crashed:'), error.message);
  console.error(chalk.dim(error.stack));
  process.exit(1);
});
