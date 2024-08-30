#!/bin/bash

# Path to the npm-ignore-definition file
IGNORE_FILE="npm-ignore-definition"

# Loop through each directory under the packages directory
for dir in packages/*; do
  if [ -d "$dir" ]; then
    cp -f "$(pwd)/$IGNORE_FILE" "$dir/.npmignore"
    echo "Copied $IGNORE_FILE to $dir/.npmignore"
  fi
done