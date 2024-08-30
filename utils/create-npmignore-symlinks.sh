#!/bin/bash

# Path to the npm-ignore-definition file
IGNORE_FILE="npm-ignore-definition"

# Loop through each directory under the packages directory
for dir in packages/*; do
  if [ -d "$dir" ]; then
    if [ ! -L "$dir/.npmignore" ]; then
      ln -s "$(pwd)/$IGNORE_FILE" "$dir/.npmignore"
      echo "Created symlink in $dir"
    else
      echo "Symlink already exists in $dir"
    fi
  fi
done