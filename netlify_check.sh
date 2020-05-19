#!/bin/bash
# Decided whether we should do a netlify build or not
# See https://docs.netlify.com/configure-builds/file-based-configuration/#ignore-builds

AUTHOR=`git log -1 --pretty=%an`

if [ "$AUTHOR" == "dependabot-preview[bot]" ]; then
    exit 0 # don't build
else
    exit 1 # build as usual
fi
