# Installing Node.js (for npm/npx)

**AI Assistant**: Use this guide to help users install Node.js on their system.

---

## Quick Check

```bash
node --version
npm --version
npx --version
```

**If all three commands work and Node.js >= 18**, you're ready! Skip to running:
```bash
npx cursor-claude-setup-2025
```

---

## Platform Detection

**AI Assistant Instructions**:
1. Ask user: "What operating system are you on? (macOS, Windows, or Linux)"
2. Follow the appropriate section below
3. Run verification steps after installation
4. Help troubleshoot if needed

---

## macOS Installation

### Method 1: Homebrew (Recommended)

**Check if Homebrew is installed**:
```bash
brew --version
```

**If Homebrew exists**:
```bash
brew install node
```

**If Homebrew doesn't exist**, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# Then:
brew install node
```

### Method 2: Direct Download

1. Visit: https://nodejs.org
2. Download the **LTS** version (macOS installer)
3. Run the `.pkg` file
4. Follow installation wizard
5. Restart terminal

### Verification (macOS):
```bash
node --version   # Should show v18.x or v20.x
npm --version    # Should show 9.x or 10.x
npx --version    # Should work (included with npm)
which node       # Should show /usr/local/bin/node or /opt/homebrew/bin/node
```

---

## Windows Installation

### Method 1: Direct Download (Recommended)

1. Visit: https://nodejs.org
2. Download the **LTS** version (Windows installer .msi)
3. Run the installer
4. **Important**: Check "Automatically install necessary tools" during setup
5. Restart terminal/PowerShell

### Method 2: winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

### Method 3: Chocolatey

**If you have Chocolatey**:
```powershell
choco install nodejs-lts
```

### Verification (Windows):
```powershell
node --version
npm --version
npx --version
where node      # Should show C:\Program Files\nodejs\node.exe
```

---

## Linux Installation

### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Install Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Fedora/RHEL/CentOS

```bash
# Install Node.js 18.x LTS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify
node --version
npm --version
```

### Arch Linux

```bash
sudo pacman -S nodejs npm
```

### Using nvm (Version Manager - Advanced)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc  # or ~/.zshrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify
node --version
```

---

## Verification Steps

After installation on ANY platform:

```bash
# 1. Check Node.js version (must be 18+)
node --version
# Expected: v18.x.x or v20.x.x

# 2. Check npm
npm --version
# Expected: 9.x.x or 10.x.x

# 3. Check npx (included with npm)
npx --version
# Expected: 9.x.x or 10.x.x

# 4. Test npx functionality
npx cowsay "Node.js works!"
# Should download and run cowsay
```

**If all checks pass**, you're ready to run:
```bash
npx cursor-claude-setup-2025
```

---

## Troubleshooting

### "command not found: node"

**Problem**: Node.js not in PATH

**macOS/Linux Fix**:
```bash
# Add to ~/.zshrc or ~/.bashrc:
export PATH="/usr/local/bin:$PATH"

# Reload:
source ~/.zshrc  # or ~/.bashrc
```

**Windows Fix**:
- Restart terminal/PowerShell (PATH updates on restart)
- Or logout and login again

### "node: Permission denied"

**macOS/Linux**:
```bash
# Fix npm permissions (avoid sudo)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Version Too Old (< 18)

**Upgrade Node.js**:

**macOS (Homebrew)**:
```bash
brew upgrade node
```

**Windows**:
- Download latest from nodejs.org and reinstall

**Linux**:
```bash
# Remove old version
sudo apt remove nodejs

# Install new version (see Linux section above)
```

### "npx not found" but npm works

**Fix** (rare, but possible):
```bash
npm install -g npx
```

---

## After Node.js Installation

1. ✅ Verify Node.js >= 18
2. ✅ Verify npm works
3. ✅ Verify npx works
4. ✅ Close and reopen terminal
5. ✅ Run the installer:

```bash
npx cursor-claude-setup-2025
```

---

## AI Assistant Quick Commands

**For Cursor/Claude Code to help users**:

**Detect OS**:
```bash
uname -s  # macOS: Darwin, Linux: Linux
echo $OS  # Windows: Windows_NT
```

**Install Node (macOS)**:
```bash
brew install node || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && brew install node
```

**Install Node (Linux)**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
```

**Install Node (Windows)**:
```powershell
winget install OpenJS.NodeJS.LTS
```

**Verify**:
```bash
node --version && npm --version && npx --version && echo "✅ All good!"
```

---

## Resources

- **Official Downloads**: https://nodejs.org
- **nvm (Version Manager)**: https://github.com/nvm-sh/nvm
- **Troubleshooting**: https://nodejs.org/en/docs/guides/getting-started-guide/
- **Package Manager Alternatives**: https://nodejs.org/en/download/package-manager/

---

**Once Node.js is installed, you're ready to run the installer!**

