/**
 * This script looks at what packages are in our packages folder and updates
 * the eslint rules so that directly importing files from one package into
 * another is seen as an error unless we explicitly suppress it.
 *
 * This should be run as part of the build process, with changes to the eslint
 * config being checked in for future use.
 */
const fs = require("fs");
const path = require("path");

function writeEslintConfig(filepath, config) {
    const prettyOutput = JSON.stringify(config, null, 4);
    fs.writeFileSync(filepath, prettyOutput, "utf8");
}

function readEslintConfig(filepath) {
    return JSON.parse(fs.readFileSync(filepath));
}

function getPackagesFolders(packagesDir) {
    const isDirectory = (source) => fs.lstatSync(source).isDirectory();
    return fs
        .readdirSync(packagesDir)
        .map((name) => "./" + path.join(packagesDir, name))
        .filter(isDirectory);
}

function generatePackageRestriction(packagePath) {
    // TODO(jeff): Last index of here doesn't work. WE need to find wonder-blocks- instead.
    const indexOfPackageName =
        packagePath.lastIndexOf("wonder-blocks-") + "wonder-blocks-".length;
    const packageName = packagePath.substring(indexOfPackageName);
    const restriction = `./packages/wonder-blocks-(?!${packageName}).*`;
    return {target: packagePath, from: restriction};
}

function generatePackageRestrictions(packagesPath) {
    const packagePaths = getPackagesFolders("packages");
    return packagePaths
        .map(generatePackageRestriction)
        .reduce((prev, current) => {
            prev[current.target] = current;
            return prev;
        }, {});
}

function setRestrictionZones(eslintrc, zones) {
    const ensureValue = (obj, fieldKey, value) => {
        if (!obj[fieldKey]) {
            obj[fieldKey] = value;
        }
        return obj[fieldKey];
    };

    const rules = ensureValue(eslintrc, "rules", {});
    const restrictedPathsRule = ensureValue(
        rules,
        "import/no-restricted-paths",
        ["error", {}],
    );
    const ruleConfig = ensureValue(restrictedPathsRule, 1, {});
    ruleConfig.zones = zones;
}

function getRestrictionZones(eslintrc) {
    const rules = eslintrc["rules"];
    const restrictedPathsRule = rules && rules["import/no-restricted-paths"];
    const ruleConfig = restrictedPathsRule && restrictedPathsRule[1];
    const zones = ruleConfig && ruleConfig.zones;
    return (zones && [...zones]) || [];
}

function updateRestrictionZones(currentZones, newRestrictions) {
    const zones = [...currentZones];

    // Iterate the restriction zones that exist and work out if we need to remove,
    // or update them. This will also give us a set of ones that need adding.
    for (let i = 0; i < zones.length; i++) {
        const zone = zones[i];

        // If this represents one of our cross-package import restrictions, let's
        // see if it is still valid.
        const computedRestriction = generatePackageRestriction(zone.target);
        if (computedRestriction.from === zone.from) {
            if (!newRestrictions[computedRestriction.target]) {
                // Remove this, it's not valid anymore.
                zones.splice(i);
            } else {
                delete newRestrictions[computedRestriction.target];
            }

            // We either deleted it or we kept it. No more to do with this one.
            continue;
        }
    }

    // Now that we've updated the existing restrictions, let's add the new ones.
    zones.push(...Object.values(restrictions));

    return zones;
}

const eslintrc = readEslintConfig(".eslintrc");
const currentZones = getRestrictionZones(eslintrc);
const restrictions = generatePackageRestrictions("packages");

const updatedZones = updateRestrictionZones(currentZones, restrictions);
setRestrictionZones(eslintrc, updatedZones);

writeEslintConfig(".eslintrc", eslintrc);
