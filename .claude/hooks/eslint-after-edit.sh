#!/bin/bash

# ESLint Hook - Runs ESLint on edited files
# This hook runs after Edit/Write tool usage to catch lint errors immediately

# Get the file path from Claude Code environment variable
FILE_PATH="$CLAUDE_FILE_PATH"

if [ -z "$FILE_PATH" ]; then
  echo "{\"continue\": true, \"message\": \"⚠️  ESLint: No file path provided\"}"
  exit 0
fi

# Only lint JavaScript/TypeScript files
if [[ ! "$FILE_PATH" =~ \.(js|jsx|ts|tsx|mjs|cjs)$ ]]; then
  echo "{\"continue\": true}"
  exit 0
fi

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "{\"continue\": true, \"message\": \"⚠️  ESLint: File not found\"}"
  exit 0
fi

# Check if ESLint is available
if ! command -v npx &> /dev/null; then
  echo "{\"continue\": true, \"message\": \"⚠️  ESLint: npx not available\"}"
  exit 0
fi

# Run ESLint on the file
# Use --quiet to only show errors (not warnings)
# Use --no-ignore to lint even if file is in .gitignore
ESLINT_OUTPUT=$(npx eslint "$FILE_PATH" --format json 2>&1)
ESLINT_EXIT_CODE=$?

# Parse the results
if [ $ESLINT_EXIT_CODE -eq 0 ]; then
  # No errors
  echo "{\"continue\": true, \"message\": \"✓ ESLint passed for $(basename "$FILE_PATH")\"}"
  exit 0
else
  # ESLint found issues
  # Parse the JSON output to get error count
  ERROR_COUNT=$(echo "$ESLINT_OUTPUT" | jq -r '.[0].errorCount // 0' 2>/dev/null)
  WARNING_COUNT=$(echo "$ESLINT_OUTPUT" | jq -r '.[0].warningCount // 0' 2>/dev/null)

  if [ "$ERROR_COUNT" = "0" ] && [ "$WARNING_COUNT" = "0" ]; then
    # If we can't parse, just show generic message
    echo "{\"continue\": true, \"message\": \"⚠️  ESLint found issues in $(basename "$FILE_PATH"). Run: npm run lint\"}"
  else
    # Show error/warning counts
    MESSAGE="⚠️  ESLint found "
    if [ "$ERROR_COUNT" != "0" ]; then
      MESSAGE="${MESSAGE}${ERROR_COUNT} error(s)"
    fi
    if [ "$WARNING_COUNT" != "0" ]; then
      if [ "$ERROR_COUNT" != "0" ]; then
        MESSAGE="${MESSAGE} and "
      fi
      MESSAGE="${MESSAGE}${WARNING_COUNT} warning(s)"
    fi
    MESSAGE="${MESSAGE} in $(basename "$FILE_PATH"). Run: npm run lint"

    echo "{\"continue\": true, \"message\": \"$MESSAGE\"}"
  fi

  exit 0
fi
