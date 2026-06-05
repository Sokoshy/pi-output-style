---
name: output-style
description: Switch between output styles (default, learning, explanatory). Use when the user wants to change how the agent responds.
---

# Output Style Manager

Switch between output modes that change how the agent interacts.

## Usage

```
/style learning              # Interactive learning mode
/style explanatory           # Educational insights mode
/style default               # Standard mode
```

**Autocomplete:** After typing `/style `, suggestions appear with descriptions.

## Modes

| Mode | Description |
|------|-------------|
| `default` | Standard agent behavior |
| `learning` | Agent asks user to write key code parts |
| `explanatory` | Agent provides educational insights |

## How It Works

The style is stored in `~/.pi/current-style`. On session start, the agent reads this file and adopts the corresponding behavior.

When you switch style, confirm the change to the user and briefly explain what the new mode does.
