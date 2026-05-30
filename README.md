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

### Manual

Copy `output-style.ts` to `~/.pi/agent/extensions/`:

```bash
cp output-style.ts ~/.pi/agent/extensions/
```

### Via pi

```bash
pi install github:Sokoshy/pi-output-style
```

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

## Credits

Inspired by Claude Code's output style plugins:
- [learning-output-style](https://github.com/anthropics/claude-code/tree/main/plugins/learning-output-style)
- [explanatory-output-style](https://github.com/anthropics/claude-code/tree/main/plugins/explanatory-output-style)

## License

MIT
