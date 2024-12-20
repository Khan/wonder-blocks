/* eslint-disable no-console */
type PackageJson = any;

/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */
const checkPublishConfig = ({
    name,
    publishConfig,
    private: isPrivate,
    scripts,
}: PackageJson): boolean => {
    let returnCode = true;

    // first check if is marked as public and there's access to publish the current package
    if (!publishConfig || (!isPrivate && publishConfig.access !== "public")) {
        const requiredAccessType = isPrivate ? "restricted" : "public";

        console.error(
            `ERROR: ${name} is missing a "publishConfig": {"access": "${requiredAccessType}"} section.`,
        );
        returnCode = false;
    }

    // also check if is marked as private and there's restricted access defined
    if (isPrivate && publishConfig.access !== "restricted") {
        console.error(
            `ERROR: ${name} is marked as private but there is a "publishConfig": {"access": "public"} section already defined. Please change it to "access": "restricted" or remove "private": true to make the package public.`,
        );
        returnCode = false;
    }

    // check that we are running our pre-publish check for this package
    if (
        !scripts.prepublishOnly ||
        !scripts.prepublishOnly.includes("utils/package-pre-publish-check.sh")
    ) {
        console.error(
            `ERROR: ${name} must have a "prepublishOnly" script that runs "utils/package-pre-publish-check.sh".`,
        );
        returnCode = false;
    }
    return returnCode;
};

const checkField = (
    pkgJson: PackageJson,
    field: string,
    value: string | Array<string>,
): boolean => {
    let returnCode = true;
    if (Array.isArray(value)) {
        if (!value.includes(pkgJson[field])) {
            console.error(
                `ERROR: ${
                    pkgJson.name
                } must have a "${field}" set to one of ${value
                    .map((value) => JSON.stringify(value))
                    .join(", ")}.`,
            );
            returnCode = false;
        }
    } else if (pkgJson[field] !== value) {
        console.error(
            `ERROR: ${
                pkgJson.name
            } must have a "${field}" set to ${JSON.stringify(value)}.`,
        );
        returnCode = false;
    }
    return returnCode;
};

const checkMain = (pkgJson: PackageJson): boolean =>
    checkField(pkgJson, "main", "dist/index.js");

const checkModule = (pkgJson: PackageJson): boolean =>
    checkField(pkgJson, "module", "dist/es/index.js");

const checkTypes = (pkgJson: PackageJson): boolean =>
    checkField(pkgJson, "types", "dist/index.d.ts");

const checkSource = (pkgJson: PackageJson): boolean =>
    checkField(pkgJson, "source", ["src/index.js", "src/index.ts"]);

const checkPrivate = (pkgJson: PackageJson): boolean => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return true;
    }
    return false;
};

const checkEntrypoints = (pkgJson: PackageJson): boolean =>
    checkMain(pkgJson) && checkModule(pkgJson);

export {
    checkEntrypoints,
    checkPrivate,
    checkPublishConfig,
    checkSource,
    checkTypes,
};
