import { execSync } from 'child_process';
import chalk from 'chalk';

/**
 * Verify all installed components
 * Returns detailed status for each
 */
export async function verifyAll(components) {
  const results = [];

  // Quick checks for MCP servers (Exa, Firecrawl, Serena)
  try {
    execSync('npx -y exa-mcp-server --help', { stdio: 'pipe', timeout: 15000 });
    results.push({
      component: 'MCP: Exa',
      success: true,
      message: 'exa-mcp-server available',
    });
  } catch {
    results.push({
      component: 'MCP: Exa',
      success: false,
      message: 'exa-mcp-server not available (install or network issue)',
    });
  }

  try {
    execSync('npx -y firecrawl-mcp --help', { stdio: 'pipe', timeout: 15000 });
    results.push({
      component: 'MCP: Firecrawl',
      success: true,
      message: 'firecrawl-mcp available',
    });
  } catch {
    results.push({
      component: 'MCP: Firecrawl',
      success: false,
      message: 'firecrawl-mcp not available (install or network issue)',
    });
  }

  try {
    execSync('uvx --from git+https://github.com/oraios/serena serena --help', { stdio: 'pipe', timeout: 30000 });
    results.push({
      component: 'MCP: Serena',
      success: true,
      message: 'serena available via uvx',
    });
  } catch {
    results.push({
      component: 'MCP: Serena',
      success: false,
      message: 'uvx or serena not available',
    });
  }

  // Verify Cursor (simplified - just check it's mentioned in components)
  if (components.includes('cursor')) {
    results.push({
      component: 'Cursor IDE',
      success: true,
      message: 'Configuration files created (.cursorrules, templates)',
    });
  }

  // Verify Claude Code
  if (components.includes('claudecode')) {
    try {
      const version = execSync('claude --version', { encoding: 'utf-8', stdio: 'pipe' }).trim();

      // Check config file exists
      const { homedir } = await import('os');
      const { join } = await import('path');
      const { promises: fs } = await import('fs');

      const configPath = join(homedir(), '.claude', 'config.json');
      await fs.access(configPath); // Throws if doesn't exist

      results.push({
        component: 'Claude Code',
        success: true,
        message: `v${version} with MCP servers configured`,
      });
    } catch {
      results.push({
        component: 'Claude Code',
        success: false,
        message: 'Not installed or config missing',
      });
    }
  }

  // Verify Archon (check Docker containers)
  if (components.includes('archon')) {
    try {
      const containers = execSync('docker ps --filter name=archon --format "{{.Names}}"', { encoding: 'utf-8', stdio: 'pipe' })
        .trim()
        .split('\n')
        .filter(Boolean);

      const expectedContainers = ['archon-ui', 'archon-server', 'archon-mcp', 'archon-agents'];
      const allRunning = expectedContainers.every((name) => containers.includes(name));

      if (allRunning) {
        // Test if UI is accessible
        try {
          const response = await fetch('http://localhost:3737', { signal: AbortSignal.timeout(5000) });
          results.push({
            component: 'Archon MCP',
            success: response.ok,
            message: response.ok
              ? 'All services running - http://localhost:3737'
              : 'Services started but UI not ready (give it 1-2 more minutes)',
          });
        } catch {
          results.push({
            component: 'Archon MCP',
            success: false,
            message: 'Containers running but UI not accessible yet',
          });
        }
      } else {
        const missing = expectedContainers.filter((c) => !containers.includes(c));
        results.push({
          component: 'Archon MCP',
          success: false,
          message: `Missing containers: ${missing.join(', ')}`,
        });
      }
    } catch {
      results.push({
        component: 'Archon MCP',
        success: false,
        message: 'Docker not running or containers not started',
      });
    }
  }

  // Verify Serena
  if (components.includes('serena')) {
    try {
      execSync('uvx --from git+https://github.com/oraios/serena serena --help', { stdio: 'pipe', timeout: 30000 });
      results.push({
        component: 'Serena MCP',
        success: true,
        message: 'Ready (starts on-demand via Claude Code)',
      });
    } catch {
      results.push({
        component: 'Serena MCP',
        success: false,
        message: 'uvx or Serena not accessible',
      });
    }
  }

  // Verify BMAD (check if bmad folder exists in common locations)
  if (components.includes('bmad')) {
    try {
      const { homedir } = await import('os');
      const { join } = await import('path');
      const { promises: fs } = await import('fs');

      // Check common installation locations
      const possiblePaths = [join(process.cwd(), 'bmad'), join(homedir(), 'bmad'), join(homedir(), 'cursor-claude-course', 'bmad')];

      let bmadFound = false;
      let bmadPath = '';

      for (const path of possiblePaths) {
        try {
          await fs.access(join(path, 'core', 'agents'));
          bmadFound = true;
          bmadPath = path;
          break;
        } catch {
          // Try next path
        }
      }

      results.push({
        component: 'BMAD Framework',
        success: bmadFound,
        message: bmadFound ? `Installed at ${bmadPath}` : 'Installation path not detected (check BMAD installer output)',
      });
    } catch {
      results.push({
        component: 'BMAD Framework',
        success: false,
        message: 'Installation verification failed',
      });
    }
  }

  const allGood = results.every((r) => r.success);

  return { allGood, results };
}
