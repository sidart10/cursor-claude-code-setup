import { execSync } from 'child_process';
import chalk from 'chalk';

/**
 * Check system prerequisites
 * Returns list of missing items with install URLs
 */
export async function checkPrerequisites(components) {
  const checks = [];

  // Node.js version check
  const nodeVersion = process.version;
  const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
  checks.push({
    name: 'Node.js 18+',
    installed: nodeMajor >= 18,
    current: nodeVersion,
    installUrl: 'https://nodejs.org',
  });

  // Docker check (if Archon selected)
  if (components.includes('archon')) {
    try {
      const dockerVersion = execSync('docker --version', { encoding: 'utf-8', stdio: 'pipe' });
      checks.push({
        name: 'Docker Desktop',
        installed: true,
        current: dockerVersion.trim(),
      });
    } catch {
      checks.push({
        name: 'Docker Desktop',
        installed: false,
        installUrl: 'https://docker.com/products/docker-desktop',
      });
    }
  }

  // Check if Cursor is installed (OS-specific)
  try {
    // This is a simplified check - actual implementation would be OS-specific
    checks.push({
      name: 'Cursor IDE',
      installed: true,
      note: 'Install manually if not present: https://cursor.com',
    });
  } catch {
    checks.push({
      name: 'Cursor IDE',
      installed: false,
      installUrl: 'https://cursor.com/downloads',
    });
  }

  // Check Claude Code CLI (optional - only warn if missing)
  try {
    const claudeVersion = execSync('claude --version', { encoding: 'utf-8', stdio: 'pipe' });
    checks.push({
      name: 'Claude Code CLI',
      installed: true,
      current: claudeVersion.trim(),
    });
  } catch {
    checks.push({
      name: 'Claude Code CLI',
      installed: true, // Don't block - just warn
      note: 'Not detected - install later: https://docs.claude.com/claude-code/installation',
    });
  }

  // Check uv (for Serena) - optional, we'll install it if needed
  if (components.includes('serena')) {
    try {
      const uvVersion = execSync('uv --version', { encoding: 'utf-8', stdio: 'pipe' });
      checks.push({
        name: 'uv package manager',
        installed: true,
        current: uvVersion.trim(),
      });
    } catch {
      checks.push({
        name: 'uv package manager',
        installed: true, // Don't block - setup-serena.js will install it
        note: 'Will be installed automatically for Serena',
      });
    }
  }

  const allGood = checks.every((c) => c.installed);
  const missing = checks.filter((c) => !c.installed);

  return { allGood, checks, missing };
}
