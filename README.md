# pi-output-style

Output style extension for pi — switch between learning and explanatory modes.

## What it does

When enabled, this extension adds instructions at the start of each session that change how the agent interacts with you:

1. **Learning Mode:** The agent engages you in active learning by requesting meaningful code contributions at decision points
2. **Explanatory Mode:** The agent provides educational insights about implementation choices and codebase patterns

Instead of implementing everything automatically, the agent will:

1. Identify opportunities where you can write 5-10 lines of meaningful code
2. Focus on business logic and design choices where your input truly matters
3. Prepare the context and location for your contribution
4. Explain trade-offs and guide your implementation
5. Provide educational insights before and after writing code

## How it works

The extension uses a `before_agent_start` hook to inject additional context into every session. This context instructs the agent to adopt an interactive teaching approach where you actively participate in writing key parts of the code.

The style is stored in `~/.pi/current-style`. On session start, the extension reads this file and injects the corresponding voice.

## When the agent requests contributions

The agent will ask you to write code for:
- Business logic with multiple valid approaches
- Error handling strategies
- Algorithm implementation choices
- Data structure decisions
- User experience decisions
- Design patterns and architecture choices

## When the agent won't request contributions

The agent will implement directly:
- Boilerplate or repetitive code
- Obvious implementations with no meaningful choices
- Configuration or setup code
- Simple CRUD operations

## Example interaction

**Agent:** I've set up the authentication middleware. The session timeout behavior is a security vs. UX trade-off - should sessions auto-extend on activity, or have a hard timeout?

In `auth/middleware.ts`, implement the `handleSessionTimeout()` function to define the timeout behavior.

Consider: auto-extending improves UX but may leave sessions open longer; hard timeouts are more secure but might frustrate active users.

**You:** [Write 5-10 lines implementing your preferred approach]

## Educational insights

In addition to interactive learning, the agent will provide educational insights about implementation choices using this format:

```
`★ Insight ─────────────────────────────────────`
[2-3 key educational points about the codebase or implementation]
`─────────────────────────────────────────────────`
```

These insights focus on:
- Specific implementation choices for your codebase
- Patterns and conventions in your code
- Trade-offs and design decisions
- Codebase-specific details rather than general programming concepts

## Usage

Once installed, the extension activates automatically at the start of every session. Use `/style` to switch between modes:

```
/style learning              # Interactive learning + educational insights
/style explanatory           # Educational insights only
/style default               # Standard mode (no extra instructions)
```

## Installation

```bash
pi install git:github.com/Sokoshy/pi-output-style
```

## Migration from Output Styles

This extension combines the unshipped "Learning" output style with the deprecated "Explanatory" output style. It provides an interactive learning experience where you actively contribute code at meaningful decision points, while also receiving educational insights about implementation choices.

If you previously used the explanatory output style, the learning mode includes all of that functionality plus interactive learning features.

## Managing changes

- Disable the extension — set `/style default` to stop receiving extra instructions
- Uninstall the extension — remove the code from your device
- Update the extension — create a local copy to personalize it

## Philosophy

Learning by doing is more effective than passive observation. This extension transforms your interaction from "watch and learn" to "build and understand," ensuring you develop practical skills through hands-on coding of meaningful logic.

## License

MIT
