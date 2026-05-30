# pi-output-style

Output style extension for [pi](https://github.com/earendil-works/pi) - the coding agent harness.

Switch between learning and explanatory output modes, inspired by [Claude Code's output style plugins](https://github.com/anthropics/claude-code/tree/main/plugins).

## Features

- **Learning mode** - Agent asks you to write key code parts at decision points
- **Explanatory mode** - Agent provides educational insights about implementation choices
- **Learning + Explanatory** - Both combined
- **Default mode** - Standard agent behavior
- **Autocomplete** - Style suggestions after typing `/style`

## Installation

### Via pi (Recommended)

```bash
pi install git:github.com/Sokoshy/pi-output-style
```

### Manual

Copy `output-style.ts` to `~/.pi/agent/extensions/`:

```bash
cp extensions/output-style.ts ~/.pi/agent/extensions/
cp -r skills/output-style ~/.pi/agent/skills/
```

## Uninstall

```bash
pi remove git:github.com/Sokoshy/pi-output-style
```

Then restart pi or run `/reload`.

## Usage

```
/style learning              # Interactive learning mode
/style explanatory           # Educational insights mode
/style learning-explanatory  # Both combined
/style default               # Standard mode
```

## How It Works

The extension uses pi's `before_agent_start` event to inject style instructions into the system prompt based on the current style set in `~/.pi/current-style`.

## Package Structure

```
pi-output-style/
├── extensions/
│   └── output-style.ts      # The extension
├── skills/
│   └── output-style/
│       ├── SKILL.md         # Documentation
│       ├── scripts/
│       │   ├── style.sh     # Shell backup
│       │   └── get-style.sh # Shell backup
│       └── styles/
│           ├── learning.md
│           ├── explanatory.md
│           └── learning-explanatory.md
└── package.json
```

## Development

### Setup local dev

```bash
# Clone the repo
git clone git@github.com:Sokoshy/pi-output-style.git
~/Documents/pi-output-style

# Symlink into pi for live testing
ln -sf ~/Documents/pi-output-style/extensions/output-style.ts ~/.pi/agent/extensions/output-style.ts
ln -sf ~/Documents/pi-output-style/skills/output-style ~/.pi/agent/skills/output-style
```

### Test locally

```bash
# Reload pi to pick up changes
/reload

# Test the extension
/style learning
```

### Push changes

```bash
cd ~/Documents/pi-output-style
git add -A
git commit -m "feat: my changes"
git push
```

### Install from GitHub (after push)

```bash
# Remove local symlinks first
rm ~/.pi/agent/extensions/output-style.ts
rm -rf ~/.pi/agent/skills/output-style

# Install from GitHub
pi install git:github.com/Sokoshy/pi-output-style
```

## Credits

Inspired by Claude Code's output style plugins:
- [learning-output-style](https://github.com/anthropics/claude-code/tree/main/plugins/learning-output-style)
- [explanatory-output-style](https://github.com/anthropics/claude-code/tree/main/plugins/explanatory-output-style)

## License

MIT
