# Shared Unpackaged code

This folder is for code that we want to share between packages but do not want to export as part of our public API.

If you think code should be in here, you are probably wrong. So, if you find yourself adding code here, consider it a code smell. Code in this folder is forbidden by a lint rule to make its use explicitly whitelisted through lint suppression.

We should aim to move any code in this folder into a public API whenever possible, and then share it that way.