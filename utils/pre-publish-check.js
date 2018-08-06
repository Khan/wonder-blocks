/**
 * Pre-publish checks to verify that our publish will go smoothly.
 */
const path = require("path");
const glob = require("glob");

const inquirer = require("inquirer");

glob(
    path.join(__dirname, "..", "packages", "**", "package.json"),
    (err, pkgPaths) => {
        let warnings = false;

        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));
            const {publishConfig, name} = pkgJson;

            if (!publishConfig || publishConfig.access !== "public") {
                // eslint-disable-next-line no-console
                console.error(
                    `ERROR: ${name} is missing a "publishConfig": {"access": "public"} section.`,
                );
                process.exit(1);
            }

            if (pkgJson.private) {
                // eslint-disable-next-line no-console
                console.warn(
                    `${name} is private and won't be published to NPM.`,
                );
                warnings = true;
            }
        }

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
                });
        }
    },
);
