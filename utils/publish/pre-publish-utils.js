/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */

const checkPublishConfig = ({name, publishConfig, private: isPrivate}) => {
    // first check if is marked as public and there's access to publish the current package
    if (!publishConfig || (!isPrivate && publishConfig.access !== "public")) {
        const requiredAccessType = isPrivate ? "restricted" : "public";

        console.error(
            `ERROR: ${name} is missing a "publishConfig": {"access": "${requiredAccessType}"} section.`,
        );
        process.exit(1);
    }

    // also check if is marked as private and there's restricted access defined
    if (isPrivate && publishConfig.access !== "restricted") {
        console.error(
            `ERROR: ${name} is marked as private but there is a "publishConfig": {"access": "public"} section already defined. Please change it to "access": "restricted" or remove "private": true to make the package public.`,
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
    checkPackageField(pkgJson, "source", "src/index.js");

const checkPackagePrivate = (pkgJson) => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return true;
    }
    return false;
};

module.exports = {
    checkPublishConfig,
    checkPackageMain,
    checkPackageModule,
    checkPackageSource,
    checkPackagePrivate,
};
