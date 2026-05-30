#!/usr/bin/env bash

# Get current style and output its content
# Used by session-start hook

STYLE_FILE="$HOME/.pi/current-style"
STYLES_DIR="$HOME/.pi/agent/skills/output-style/styles"

STYLE=$(cat "$STYLE_FILE" 2>/dev/null || echo "default")

if [ "$STYLE" = "default" ]; then
  exit 0
fi

STYLE_FILE_PATH="$STYLES_DIR/${STYLE}.md"

if [ -f "$STYLE_FILE_PATH" ]; then
  cat "$STYLE_FILE_PATH"
fi
