import {
    API,
    FileInfo,
    ModuleSpecifier,
    ImportDeclaration,
    Options,
} from "jscodeshift";

// From
const SOURCE_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-color";
const SOURCE_SPECIFIER = "Color";
// To
const TARGET_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-tokens";
const TARGET_SPECIFIER = "color";

/**
 * Transforms:
 * import Color from "@khanacademy/wonder-blocks-color"
 * const bgColor = Color.blue;
 *
 * to:
 * import {color} from "@khanacademy/wonder-blocks-tokens"
 * const bgColor = color.blue;
 */
export default function transform(file: FileInfo, api: API, options: Options) {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Use the default specifier as the source specifier.
    let sourceSpecifier = SOURCE_SPECIFIER;

    // Step 1: Verify if the import exists
    const sourceImport = root.find(j.ImportDeclaration, {
        source: {value: SOURCE_IMPORT_DECLARATION},
    });

    // If the import doesn't exist, we don't need to do anything.
    if (sourceImport.size() === 0) {
        return;
    }

    // Step 2: Replace the import
    const targetImport = root.find(j.ImportDeclaration, {
        source: {value: TARGET_IMPORT_DECLARATION},
    });

    sourceImport.forEach((path) => {
        // Find the default specifier
        const defaultSpecifier = path.value.specifiers?.find(
            (specifier) => specifier.type === "ImportDefaultSpecifier",
        );

        // There might be cases where the default specifier uses a different
        // name from the one defined in SOURCE_SPECIFIER, so we need to make
        // sure we use the correct name to complete step 3.
        if (defaultSpecifier?.local) {
            sourceSpecifier = defaultSpecifier.local?.name;
        }

        // Replace default import with named import
        const targetSpecifier = j.importSpecifier(
            j.identifier(TARGET_SPECIFIER),
        );

        // If the import is already used, we add a named import to the existing
        // import declaration.
        if (targetImport.size() > 0) {
            // NOTE: We only add the specifier if it doesn't exist already.
            const specifierExists = targetImport
                .get()
                .node.specifiers.some(
                    (specifier: ModuleSpecifier) =>
                        specifier.local?.name === TARGET_SPECIFIER,
                );

            if (!specifierExists) {
                targetImport.get().node.specifiers.push(targetSpecifier);
            }
            // Remove the import declaration
            j(path).remove();
            return;
        }

        // Create a new import declaration.
        const newTargetImport = j.importDeclaration(
            [targetSpecifier],
            j.literal(TARGET_IMPORT_DECLARATION),
        );

        // Replace the existing import declaration with the new one.
        j(path).replaceWith(newTargetImport);
    });

    // Step 3: Replace the usage
    root.find(j.Identifier, {name: sourceSpecifier}).forEach((path) => {
        path.node.name = TARGET_SPECIFIER;
    });

    return root.toSource(options.printOptions);
}
