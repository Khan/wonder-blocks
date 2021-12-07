/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

/**
 * Pre-publish checks to verify that our publish will go smoothly.
 * This file is used by the npm publish script (manual publish).
 */
const path = require("path");
const {exec} = require("child_process");
const glob = require("glob");

const inquirer = require("inquirer");
const {
    checkPublishConfig,
    checkPackageMain,
    checkPackageModule,
    checkPackageSource,
    checkPackagePrivate,
} = require("./pre-publish-utils.js");

const checkNpmUser = (currentUser) => {
    if (currentUser.trim() !== "khanacademy") {
        console.error(
            `ERROR: You are not logged in to NPM as "khanacademy". ` +
                `Run "npm login" and use the password from: ` +
                `https://phabricator.khanacademy.org/K207`,
        );
        process.exit(1);
    }
};

glob(
    path.join(__dirname, "..", "..", "packages", "**", "package.json"),
    (err, pkgPaths) => {
        let warnings = false;

        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));

            checkPublishConfig(pkgJson);
            checkPackageMain(pkgJson);
            checkPackageModule(pkgJson);
            checkPackageSource(pkgJson);
            warnings = checkPackagePrivate(pkgJson);
        }

        exec("npm whoami", (err, currentUser) => {
            checkNpmUser(currentUser);

            if (warnings) {
                inquirer
                    .prompt([
                        {
                            type: "confirm",
                            name: "skipWarnings",
                            default: false,
                            message:
                                "There are some potential problems, do you wish to continue?",
                        },
                    ])
                    .then(({skipWarnings}) => {
                        // If we're not skipping then we need to exit with an error
                        if (!skipWarnings) {
                            process.exit(1);
                        }
                        return;
                    })
                    .catch((e) => {
                        console.warn("inquirer prompt failed");
                        console.warn(e);
                        process.exit(1);
                    });
            }
        });
    },
);
