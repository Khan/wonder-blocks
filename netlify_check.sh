#!/bin/bash
# Decided whether we should do a netlify build or not

AUTHOR=`git log -1 --pretty=%an`

if [ "$AUTHOR" == "dependabot-preview[bot]" ]; then
    exit 1
else
    exit 0
fi
