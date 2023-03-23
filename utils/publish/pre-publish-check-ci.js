/* eslint-disable
    @typescript-eslint/no-var-requires,
    import/no-commonjs,
    no-console
*/
/**
 * Pre-publish checks to verify that our CI publish will go smoothly.
 *
 * NOTE: This script is run by changesets when the Release Manager is publishing
 * a new version of the WB packages.
 */
const path = require("path");
const fglob = require("fast-glob");

const {
    checkPublishConfig,
    checkPackageMain,
    checkPackageModule,
    checkPackageTypes,
} = require("./pre-publish-utils");

fglob(path.join(__dirname, "..", "..", "packages", "*", "package.json"))
    .then((pkgPaths) => {
        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));

            checkPublishConfig(pkgJson);
            checkPackageMain(pkgJson);
            checkPackageModule(pkgJson);
            checkPackageTypes(pkgJson);
        }
        return;
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
