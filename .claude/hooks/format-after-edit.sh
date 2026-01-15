#!/bin/bash

# Format After Edit Hook
# Automatically runs Prettier on edited files to ensure consistent formatting
# This hook executes after Edit, MultiEdit, or Write tool usage

# Get the file that was edited from the tool result
FILE_PATH="$TOOL_RESULT_FILE_PATH"

# Check if file exists and is a formattable type
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Check if file is a JS/TS/JSX/TSX/CSS/MD file
if [[ "$FILE_PATH" =~ \.(js|jsx|ts|tsx|css|scss|md|mdx|json)$ ]]; then
  # Run Prettier on the file
  if command -v prettier &> /dev/null; then
    if prettier --write "$FILE_PATH" 2>&1; then
      echo "{\"feedback\": \"✓ Formatted $FILE_PATH with Prettier\", \"continue\": true}"
      exit 0
    else
      echo "{\"feedback\": \"⚠ Prettier formatting failed for $FILE_PATH - possible syntax error\", \"continue\": true}"
      exit 1
    fi
  else
    # Prettier not available, try npx
    if npx prettier --write "$FILE_PATH" 2>&1; then
      echo "{\"feedback\": \"✓ Formatted $FILE_PATH with Prettier\", \"continue\": true}"
      exit 0
    else
      echo "{\"feedback\": \"⚠ Prettier formatting failed for $FILE_PATH\", \"continue\": true}"
      exit 1
    fi
  fi
fi

# Not a formattable file type, exit silently
exit 0
