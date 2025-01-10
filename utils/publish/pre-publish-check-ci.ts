#!/usr/bin/env -S node -r @swc-node/register

/**
 * Pre-publish checks to verify that our publish will go smoothly.
 *
 * NOTE: This script is run by changesets when the Release Manager is publishing
 * a new version of the WB packages.
 */
import path from "path";

import ancesdir from "ancesdir";
import fg from "fast-glob";

import {
    checkPrivate,
    checkEntrypoints,
    checkSource,
    checkTypes,
    checkPublishConfig,
} from "./pre-publish-utils";

// Get the root folder; use the LICENSE file as our root anchor.
const rootDir = ancesdir(__dirname, "LICENSE");

// eslint-disable-next-line promise/catch-or-return
fg(path.join(rootDir, "packages", "*", "package.json")).then((pkgPaths) => {
    let allPassed = true;
    // eslint-disable-next-line promise/always-return
    for (const pkgPath of pkgPaths) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const pkgJson = require(path.relative(__dirname, pkgPath));

        if (
            !checkPrivate(pkgJson) &&
            !checkPublishConfig(pkgJson) &&
            !checkEntrypoints(pkgJson) &&
            !checkSource(pkgJson) &&
            !checkTypes(pkgJson)
        ) {
            allPassed = false;
        }
    }

    // Exit only after we've processed all the packages.
    // eslint-disable-next-line promise/always-return
    if (!allPassed) {
        process.exit(1);
    }
});
