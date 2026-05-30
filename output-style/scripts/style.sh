#!/usr/bin/env bash

STYLE_FILE="$HOME/.pi/current-style"

case "$1" in
  default|learning|explanatory|learning-explanatory)
    echo "$1" > "$STYLE_FILE"
    echo "✓ Style changed to: $1"
    echo ""
    case "$1" in
      default)
        echo "Standard agent behavior. No special mode active."
        ;;
      learning)
        echo "Learning mode: Agent will ask you to write key code parts at decision points."
        ;;
      explanatory)
        echo "Explanatory mode: Agent will provide educational insights about codebase and implementation."
        ;;
      learning-explanatory)
        echo "Combined mode: Interactive learning + educational insights."
        ;;
    esac
    ;;
  --current|"-c"|"")
    if [ -f "$STYLE_FILE" ]; then
      current=$(cat "$STYLE_FILE")
      echo "Current style: $current"
    else
      echo "Current style: default (no style file found)"
    fi
    ;;
  --help|"-h")
    echo "Usage: style.sh [style]"
    echo ""
    echo "Styles:"
    echo "  default                Standard agent behavior"
    echo "  learning               Interactive learning mode"
    echo "  explanatory            Educational insights mode"
    echo "  learning-explanatory   Combined learning + explanatory"
    echo ""
    echo "Options:"
    echo "  --current, -c          Show current style"
    echo "  --help, -h             Show this help"
    ;;
  *)
    echo "Unknown style: $1"
    echo "Valid styles: default, learning, explanatory, learning-explanatory"
    exit 1
    ;;
esac
