import type {TSESLint, TSESTree} from "@typescript-eslint/utils";

export type ImportedBinding = {
    /**
     * Local variables bound to the export by a named import, including
     * aliases: `import {foo}` or `import {foo as bar}`.
     */
    named: Array<TSESLint.Scope.Variable>;
    /**
     * Local variables bound to the whole module by a namespace import:
     * `import * as mod`. The export is then reached as `mod.foo`.
     */
    namespace: Array<TSESLint.Scope.Variable>;
};

function getModuleExportName(
    node: TSESTree.Identifier | TSESTree.StringLiteral,
): string {
    return node.type === "Identifier" ? node.name : node.value;
}

/**
 * Find the local variables that refer to `exportName` from the module
 * `source` in the current file.
 *
 * This uses scope analysis only (no type information), so it works under
 * runtimes such as oxlint JS plugins. Use the returned variables'
 * `references` to find every place the import is used; references that are
 * shadowed by a local declaration with the same name are not included.
 */
export function findImportedBinding(
    sourceCode: Readonly<TSESLint.SourceCode>,
    source: string,
    exportName: string,
): ImportedBinding {
    const result: ImportedBinding = {named: [], namespace: []};

    for (const statement of sourceCode.ast.body) {
        if (
            statement.type !== "ImportDeclaration" ||
            statement.source.value !== source
        ) {
            continue;
        }
        for (const specifier of statement.specifiers) {
            if (
                specifier.type === "ImportSpecifier" &&
                getModuleExportName(specifier.imported) === exportName
            ) {
                result.named.push(
                    ...sourceCode.getDeclaredVariables(specifier),
                );
            } else if (specifier.type === "ImportNamespaceSpecifier") {
                result.namespace.push(
                    ...sourceCode.getDeclaredVariables(specifier),
                );
            }
        }
    }

    return result;
}

/**
 * Get the static name of a member access's property: `obj.foo` and
 * `obj["foo"]` both return "foo". Returns null for dynamic access like
 * `obj[key]`.
 */
export function getStaticPropertyName(
    node: TSESTree.MemberExpression,
): string | null {
    if (!node.computed && node.property.type === "Identifier") {
        return node.property.name;
    }
    if (
        node.computed &&
        node.property.type === "Literal" &&
        typeof node.property.value === "string"
    ) {
        return node.property.value;
    }
    return null;
}

/**
 * Get the static key name of a destructuring property: `{foo}`,
 * `{foo: bar}` and `{"foo": bar}` all return "foo".
 */
export function getStaticKeyName(
    node: TSESTree.Property | TSESTree.RestElement,
): string | null {
    if (node.type !== "Property" || node.computed) {
        return null;
    }
    if (node.key.type === "Identifier") {
        return node.key.name;
    }
    if (node.key.type === "Literal" && typeof node.key.value === "string") {
        return node.key.value;
    }
    return null;
}
