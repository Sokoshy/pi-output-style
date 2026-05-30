---
name: output-style
description: Switch between output styles (default, learning, explanatory, learning-explanatory). Use when the user wants to change how the agent responds - more interactive learning, more educational insights, or both.
---

# Output Style Manager

Switch between output modes that change how the agent interacts.

## Usage

```
/style learning              # Interactive learning mode
/style explanatory           # Educational insights mode
/style learning-explanatory  # Both combined
/style default               # Standard mode
```

**Autocomplete:** After typing `/style `, suggestions appear with descriptions.

## Shell Script (backup)

```bash
./scripts/style.sh learning
./scripts/style.sh --current
```

## Modes

| Mode | Description |
|------|-------------|
| `default` | Standard agent behavior |
| `learning` | Agent asks user to write key code parts |
| `explanatory` | Agent provides educational insights |
| `learning-explanatory` | Both learning + explanatory combined |

## How It Works

The style is stored in `~/.pi/current-style`. On session start, the agent reads this file and adopts the corresponding behavior.

When you switch style, confirm the change to the user and briefly explain what the new mode does.
