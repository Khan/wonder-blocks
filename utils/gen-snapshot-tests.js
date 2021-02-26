/* eslint-disable import/no-commonjs */
/**
 * This script generates generated-snapshot.test.js files from examples in
 * docs.md files in every packages/wonder-blocks-* directory.
 *
 * Running `yarn test` will run this script and then run jest which will run
 * the tests in all of the generated-snapshot.test.js files.
 *
 * TODO(kevinb):
 * - extract into a separate repo and publish an npm package
 */
const fs = require("fs");
const path = require("path");
const marked = require("marked");
const {parse} = require("@babel/core");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const chalk = require("chalk");
const mkdirp = require("mkdirp");

const {
    getComponentFilesFromSection,
} = require("./styleguidist-config-utils.js");

const styleguideConfig = require("../styleguide.config.js");

// reuse project babel options
const options = {
    configFile: path.resolve("build-settings", "babel.config.js"),
};

const flattenArray = (acc, current) => [...acc, ...current];

/**
 * Gets all the declarations imported on the current code snippet
 *
 * @param {Node[]} codeBody - Array of AST node objects
 *
 * @returns {Array} All the declarations imported in the current AST instance
 */
function extractDeclarationsFromExample(codeBody) {
    return (
        codeBody
            // filter only declarations that are different than the current pkg
            .filter((node) => node.type === "ImportDeclaration")
            // get the list of specifiers for the current node and append the
            // module name
            .map((node) =>
                node.specifiers.map(({type, local: {name}}) => ({
                    type,
                    name,
                    value: node.source.value,
                })),
            )
            .reduce(flattenArray, [])
    );
}

/**
 * Given a list of AST module declarations, extract the unique declaration names
 *
 * @param {Object} uniqueDeclarations - The accumulated declarations
 *
 * @param {Object} node - The mapped AST Node object
 * @param {string} node.name - The name of the export to be imported.
 * @param {string} node.value - The module to import from.
 * @param {string} node.type - Represents the AST variant type. In this context,
 * it takes one of these values: `ImportSpecifier` and `ImportDefaultSpecifier`
 *
 * @example
 * ```
 * reduceUniqueDeclarations(reduceUniqueDeclarations(
 *   {},
 *   {
 *       value: "@khanacademy/wonder-blocks-icon",
 *       type: "ImportDefaultSpecifier",
 *       name: "Icon",
 *   },
 * );
 * ```
 * returns
 * ```
 * {
 *   "@khanacademy/wonder-blocks-icon": {
 *       defaultImport: "Icon",
 *       specifiers: [],
 *   },
 * },
 * ```
 * @see
 * https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#node-objects
 */
function reduceUniqueDeclarations(uniqueDeclarations, node) {
    const {value, type, name} = node;

    // adds new package to import
    if (!uniqueDeclarations[value]) {
        uniqueDeclarations[value] = {
            defaultImport: undefined,
            specifiers: [],
        };
    }

    // set default export from the current module
    if (type === "ImportDefaultSpecifier") {
        uniqueDeclarations[value].defaultImport = name;
    } else {
        // check for module definitions
        // Also, avoid duplicating module names
        if (!uniqueDeclarations[value].specifiers.includes(name)) {
            uniqueDeclarations[value].specifiers.push(name);
        }
    }

    return uniqueDeclarations;
}

/**
 * Given an object literal of declarations, generates a string containing the
 * import statements
 *
 * @param {Object} declarations - The list of declarations extracted from the parser
 * @param {string} declarations.defaultImport - The optional default import
 * @param {string[]} declarations.specifiers - The modules exported from the current
 * declaration
 *
 * @returns {string} The generated unique import statements
 */
function transformDeclarations(declarations) {
    return Object.keys(declarations).reduce((acc, module) => {
        const {defaultImport, specifiers} = declarations[module];
        const hasSpecifiers = specifiers.length > 0;

        let namedExports = "";

        if (defaultImport) {
            namedExports += defaultImport;

            if (hasSpecifiers) {
                namedExports += ", ";
            }
        }

        // concat non-default modules
        // eg. {A, B, C}
        if (hasSpecifiers) {
            namedExports += `{ ${specifiers.join(", ")} }`;
        }

        if (module.startsWith(".")) {
            module = path.join("..", "..", module);
        }

        return acc + `import ${namedExports} from "${module}";\n`;
    }, "");
}

/**
 * Generate a test file with the given examples.
 *
 * For a given root package, this generates a single JS test file
 * with each example as a snapshot test. The componentFileMap provides
 * a map between a component name and its file location so that we can
 * insert the necessary requires for components within the root package.
 */
function generateTestFile(root, examples, componentFileMap) {
    const hrstart = process.hrtime();

    const lines = [
        "// This file is auto-generated by gen-snapshot-tests.js",
        "// Do not edit this file.  To make changes to these snapshot tests:",
        `//   1. edit the markdown documentation files in the package,`,
        `//        ${root}`,
        "//   2. Run `yarn run gen-snapshot-tests`.",
        `import React from "react";`,
        `import renderer from "react-test-renderer";`,
        ``,
        `// Mock react-dom as jest doesn't like findDOMNode.`,
        `jest.mock("react-dom");`,
    ];

    const modName = root.split("/")[1];

    // tests found on the current file
    const tests = [];

    // store a reference of the unique declarations for the current file
    const uniqueDeclarations = examples
        .map((example, exampleIndex) => {
            const ast = parse(example, options);

            // list of declarations and/or statements collected by the parser
            const exampleBody = ast.program.body;

            const statements = exampleBody
                // filter only declarations that are different than the current pkg
                .filter((node) => node.type !== "ImportDeclaration");

            const newAst = {
                type: "File",
                program: {
                    type: "Program",
                    body: statements,
                },
            };

            // Traverse the tree to modify the code examples
            traverse(newAst, {
                // Append `const example =` to the code snippet
                ExpressionStatement(path) {
                    if (path.node.expression.type === "JSXElement") {
                        path.replaceWith(
                            t.variableDeclaration("const", [
                                t.variableDeclarator(
                                    t.identifier("example"),
                                    path.node.expression,
                                ),
                            ]),
                        );
                    }
                },
            });

            // regenerate the code snippet without the import declarations
            const {code} = generate(newAst);

            // add snippet the list of tests that are going to be injected into
            // the generated-snapshot-test.js file
            tests.push(`

                it("example ${exampleIndex + 1}", () => {
                    ${code}
                    const tree = renderer.create(example).toJSON();
                    expect(tree).toMatchSnapshot();
                });
            `);

            // extract import declarations from AST
            return extractDeclarationsFromExample(exampleBody);
        })
        .reduce(flattenArray, [])
        .reduce(reduceUniqueDeclarations, {});

    // converts unique declarations object to a string containing all the
    // imports
    const transformedDeclarations = transformDeclarations(uniqueDeclarations);

    // then add import declarations from other modules
    lines.push(transformedDeclarations);

    if (componentFileMap) {
        for (const [componentName, filename] of Object.entries(
            componentFileMap,
        )) {
            const relFilename = path.relative(
                path.join(root, "src", "__tests__"),
                filename,
            );

            // include private components
            if (!transformedDeclarations.includes(componentName)) {
                lines.push(`import ${componentName} from "./${relFilename}";`);
            }
        }
    }

    lines.push("");
    lines.push(`describe("${modName}", () => {`);
    lines.push(...tests);
    lines.push("});\n");

    const data = lines.join("\n");

    mkdirp.sync(path.join(root, "src", "__tests__"));
    const outPath = path.join(
        root,
        "src",
        "__tests__",
        "generated-snapshot.test.js",
    );
    fs.writeFileSync(outPath, data, "utf8");

    const [s, ns] = process.hrtime(hrstart);
    const ms = ns / 1000000;
    const kind = ms > 200 ? "yellow" : "green";

    // eslint-disable-next-line no-console
    console.info(chalk`Wrote ${outPath} in {bold.${kind} ${s}s ${ms}ms}`);
}

/**
 * Read examples from markdown document.
 *
 * @param {string} documentPath The path to the markdown file from which
 * examples are to be loaded.
 *
 * @returns {Array<string>} An array of the code examples from the file. This is
 * empty if the file does not exist.
 */
function readExamplesFromDocument(documentPath) {
    if (!fs.existsSync(documentPath)) {
        return [];
    }
    const content = fs.readFileSync(documentPath, "utf8");
    const tokens = marked.lexer(content);
    const examples = tokens
        /**
         * We only want code snippets.
         */
        .filter((token) => token.type === "code")
        /**
         * Any snippet that doesn't have a language is not something we want
         * here.
         *
         * NOTE(somewhatabstract): Long term, we should probably check for
         * js/jsx etc. so that we don't try to compile examples from bash
         * scripts or CSS snippets, etc.
         */
        .filter((token) => token.lang)
        /**
         * We don't want static code portions. These are not used for examples
         * and likely won't parse fully for snapshots due to flow-types, etc.
         */
        .filter((token) => token.lang.indexOf(" static") < 0)
        .map((token) => token.text);

    return examples;
}

/**
 * Extract examples and map components to files for a given source file.
 *
 * @param {string} sourceFile The path to the source file to be processed.
 * @param {[string]: string} componentFileMap A map from component name to its
 * source file path.
 */
function extractExamplesAndComponentsForFile(sourceFile, componentFileMap) {
    // This might be the very first time the map is used, so make sure it is
    // initialized.
    componentFileMap = componentFileMap || {};

    const src = fs.readFileSync(sourceFile, "utf8");

    const ast = parse(src, options);

    // get the default exported module
    const defaultExport = ast.program.body
        .filter(
            (node) =>
                node.type === "ExportDefaultDeclaration" &&
                (node.declaration.type === "FunctionDeclaration" ||
                    node.declaration.type === "ClassDeclaration"),
        )
        .map((node) => node.declaration.id.name)
        .join();

    // Guard against files without default exports.
    if (!defaultExport) {
        return {examples: [], componentFileMap};
    }

    const alreadyCollated = componentFileMap[defaultExport] === sourceFile;
    if (!alreadyCollated) {
        // Only gather examples for this component file if
        // we didn't see it already.
        componentFileMap[defaultExport] = sourceFile;

        const componentDoc =
            path.join(
                path.dirname(sourceFile),
                path.basename(sourceFile, path.extname(sourceFile)),
            ) + ".md";

        const examples = readExamplesFromDocument(componentDoc);
        return {examples, componentFileMap};
    }

    // Nothing to load. So let's just return this.
    return {examples: [], componentFileMap};
}

/**
 * Extract examples and map components to their source files for a given
 * section in the styleguidist configuration.
 */
function extractExamplesAndComponentFiles(section, componentFileMap) {
    // Add any examples from the section content.
    let examples = readExamplesFromDocument(section.content);

    // Then process any component files and add their stuff too.
    const files = getComponentFilesFromSection(section);

    for (const file of files) {
        const extracted = extractExamplesAndComponentsForFile(
            file,
            componentFileMap,
        );

        examples = examples.concat(extracted.examples);
        componentFileMap = extracted.componentFileMap;
    }

    if (section.sections) {
        // Repeat all this for each sub-section.
        for (const childSection of section.sections) {
            const extracted = extractExamplesAndComponentFiles(
                childSection,
                componentFileMap,
            );
            examples = examples.concat(extracted.examples);
            componentFileMap = extracted.componentFileMap;
        }
    }

    return {examples, componentFileMap};
}

/**
 * Extract examples for a given styleguidist configuration root section and
 * output a jest snapshot test file for each example in the section.
 *
 * This will handle recursing into sub-sections and dealing with
 * component-specific documentation.
 */
function tryGenerateSectionTests(section) {
    // If there is no content nor sections, then we should quit.
    if (!section.content && !section.sections) {
        // eslint-disable-next-line no-console
        console.warn("no content or sub-sections for section: ");
        // eslint-disable-next-line no-console
        console.warn(JSON.stringify(section));
        return;
    }

    // Now, let's collate all our examples and the components for the section
    // they're in.
    const {examples, componentFileMap} = extractExamplesAndComponentFiles(
        section,
    );

    if (examples.length === 0) {
        // eslint-disable-next-line no-console
        console.warn(`no examples for section ${section.name}`);
        return;
    }

    const root = path.dirname(section.content);
    generateTestFile(root, examples, componentFileMap);
}

// This is where the magic begins.
// We iterate over the root sections of the styleguidist configuration
// and generate a tests for each one.
for (const section of styleguideConfig.sections) {
    tryGenerateSectionTests(section);
}
