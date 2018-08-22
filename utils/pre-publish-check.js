/* eslint-disable no-console */
/**
 * Pre-publish checks to verify that our publish will go smoothly.
 */
const path = require("path");
const glob = require("glob");
const {exec} = require("child_process");

const inquirer = require("inquirer");

const checkPublishConfig = (publishConfig) => {
    if (!publishConfig || publishConfig.access !== "public") {
        console.error(
            `ERROR: ${name} is missing a "publishConfig": {"access": "public"} section.`,
        );
        process.exit(1);
    }
};

const checkPackageField = (pkgJson, field, value) => {
    if (pkgJson[field] !== value) {
        console.error(
            `ERROR: ${
                pkgJson.name
            } must have a "${field}" set to ${JSON.stringify(value)}.`,
        );
        process.exit(1);
    }
};

const checkPackageMain = (pkgJson) =>
    checkPackageField(pkgJson, "main", "dist/index.js");

const checkPackageModule = (pkgJson) =>
    checkPackageField(pkgJson, "module", "dist/es/index.js");

const checkPackageSource = (pkgJson) =>
    checkPackageField(pkgJson, "source", "index.js");

const checkPackagePrivate = (pkgJson) => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return true;
    }
    return false;
};

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
    path.join(__dirname, "..", "packages", "**", "package.json"),
    (err, pkgPaths) => {
        let warnings = false;

        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));
            const {publishConfig} = pkgJson;

            checkPublishConfig(publishConfig);
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
                    });
            }
        });
    },
);
