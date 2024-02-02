import {
    API,
    FileInfo,
    ImportSpecifier,
    ModuleSpecifier,
    Options,
} from "jscodeshift";

// From
const SOURCE_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-color";
const SOURCE_SPECIFIER = "Color";
// To
const TARGET_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-tokens";
const TARGET_SPECIFIER = "color";

/**
 * Transforms: import Color from "@khanacademy/wonder-blocks-color" const
 * bgColor = Color.blue;
 *
 * to: import {color} from "@khanacademy/wonder-blocks-tokens" const bgColor =
 * color.blue;
 *
 * NOTE: This transform is similar to migrate-spacing-to-tokens.ts, but it
 * differs in the way it replaces the usage of the default specifier. Spacing
 * only exports a default specifier, while Color exports both a default and
 * named specifier(s) like `mix` and `fade`.
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

        // Remove the source specifier from the import declaration
        const hasRemainingSpecifiers = path.value.specifiers?.some(
            (specifier) => specifier.local?.name !== sourceSpecifier,
        );

        // Replace default import with named import
        const targetSpecifier = j.importSpecifier(
            j.identifier(TARGET_SPECIFIER),
        );

        // If the target import is already used, we add a named import to the
        // existing import declaration.
        if (targetImport.size() > 0) {
            // NOTE: We only add the specifier if it doesn't exist already.
            const specifierExistsInTarget = targetImport
                .get()
                .node.specifiers.some(
                    (specifier: ModuleSpecifier) =>
                        specifier.local?.name === TARGET_SPECIFIER,
                );

            if (!specifierExistsInTarget) {
                targetImport.get().node.specifiers.push(targetSpecifier);
                // sort the specifiers
                targetImport
                    .get()
                    .node.specifiers.sort(
                        (a: ImportSpecifier, b: ImportSpecifier) =>
                            a.imported.name.localeCompare(b.imported.name),
                    );
            }

            // Remove the "wonder-blocks-color" import declaration
            if (!hasRemainingSpecifiers) {
                j(path).remove();
            } else {
                // Remove the default specifier from the import declaration
                path.value.specifiers = path.value.specifiers?.filter(
                    (specifier) => specifier.local?.name !== sourceSpecifier,
                );
            }
            return;
        }

        // The target import doesn't exist, so we create a new one.
        const newTargetImport = j.importDeclaration(
            [targetSpecifier],
            j.literal(TARGET_IMPORT_DECLARATION),
        );

        // Color was the only specifier in the import declaration.
        if (!hasRemainingSpecifiers) {
            // Replace the existing import declaration with the new one.
            j(path).replaceWith(newTargetImport);
        } else {
            // There are other specifiers in the import declaration (e.g. mix,
            // fade).
            // We keep the other specifiers and remove the default specifier.
            path.value.specifiers = path.value.specifiers?.filter(
                (specifier) => specifier.local?.name !== sourceSpecifier,
            );
            // Move the default specifier to a named import in the target import
            // declaration
            j(path).insertAfter(newTargetImport);
        }
    });

    // Step 3: Replace the usage
    root.find(j.Identifier, {name: sourceSpecifier}).forEach((path) => {
        path.node.name = TARGET_SPECIFIER;
    });

    return root.toSource(options.printOptions);
}
