/* eslint-disable import/no-commonjs */
/**
 * Pre-publish checks to verify that our CI publish will go smoothly.
 *
 * NOTE: This script is run by changesets when the Release Manager is publishing
 * a new version of the WB packages.
 */
const path = require("path");
const glob = require("glob");

const {
    checkPublishConfig,
    checkPackageMain,
    checkPackageModule,
    checkPackageSource,
} = require("./pre-publish-utils.js");

glob(
    path.join(__dirname, "..", "..", "packages", "**", "package.json"),
    (err, pkgPaths) => {
        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));

            checkPublishConfig(pkgJson);
            checkPackageMain(pkgJson);
            checkPackageModule(pkgJson);
            checkPackageSource(pkgJson);
        }
    },
);
