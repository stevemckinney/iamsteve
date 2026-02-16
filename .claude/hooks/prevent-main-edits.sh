#!/bin/bash

# Prevent Main Branch Edits Hook
# Blocks file edits when on main or master branch, requiring feature branches
# This hook executes BEFORE Edit, MultiEdit, or Write tool usage

# Get current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

# Check if we're in a git repository
if [ $? -ne 0 ]; then
  # Not a git repo, allow the edit
  exit 0
fi

# Check if we're on main or master branch
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
  # Block the edit with an error message
  cat << 'EOF'
{
  "feedback": "⛔ Cannot edit files on main/master branch.\n\nPlease create a feature branch first:\n  git checkout -b claude/your-feature-name\n\nOr switch to an existing feature branch:\n  git checkout <branch-name>",
  "block": true
}
EOF
  exit 2
fi

# Not on main/master, allow the edit
exit 0
