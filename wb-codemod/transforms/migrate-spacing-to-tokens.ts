import {API, FileInfo, ModuleSpecifier, Options} from "jscodeshift";

// From
const SOURCE_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-spacing";
const SOURCE_SPECIFIER = "Spacing";
// To
const TARGET_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-tokens";
const TARGET_SPECIFIER = "spacing";

/**
 * Transforms:
 * import Spacing from "@khanacademy/wonder-blocks-spacing"
 * const padding = Spacing.xxx;
 *
 * to:
 * import {spacing} from "@khanacademy/wonder-blocks-tokens"
 * const padding = spacing.xxx;
 */
export default function transform(file: FileInfo, api: API, options: Options) {
    const j = api.jscodeshift;
    const root = j(file.source);

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
    root.find(j.Identifier, {name: SOURCE_SPECIFIER}).forEach((path) => {
        path.node.name = TARGET_SPECIFIER;
    });

    return root.toSource(options.printOptions);
}
