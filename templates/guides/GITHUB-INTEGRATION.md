# GitHub Integration Quick Start

## Git CLI
```bash
git --version
```

## GitHub CLI (optional)
```bash
gh --version
gh auth login
```

## SSH (recommended)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add key to GitHub: https://github.com/settings/keys
```

## Personal Access Token (fallback)
- Create a token: https://github.com/settings/tokens
- Save securely (1Password, macOS Keychain)

## Use in Claude Code / Cursor
- Clone a repo, open it in your editor, and use MCP tools to assist workflows.


