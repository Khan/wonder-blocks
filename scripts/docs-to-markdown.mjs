#!/usr/bin/env node

/**
 * Storybook-to-Markdown Converter
 *
 * Converts Wonder Blocks Storybook documentation files (.stories.tsx and .mdx)
 * into well-formatted Markdown files under docs/.
 *
 * Usage: node scripts/docs-to-markdown.mjs
 */

import fs from "node:fs";
import path from "node:path";
import {parse} from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import fg from "fast-glob";

// Handle CJS/ESM interop for babel packages
const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "__docs__");
const SKILL_DIR = path.join(ROOT, "skills", "wonder-blocks");
const OUT_DIR = path.join(SKILL_DIR, "docs");
const PACKAGES_DIR = path.join(ROOT, "packages");

const warnings = [];
function warn(msg) {
    warnings.push(msg);
    console.warn(`  warning: ${msg}`);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function toKebabCase(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .replace(/[().<>]/g, "") // Strip problematic filename characters
        .replace(/-+/g, "-") // Collapse multiple dashes
        .replace(/^-|-$/g, "") // Trim leading/trailing dashes
        .toLowerCase();
}

function camelToTitle(name) {
    return name.replace(/([A-Z])/g, " $1").trim();
}

function cleanJSDoc(comment) {
    return comment
        .replace(/^\*\s*/gm, "")
        .replace(/^\s*\*\s?/gm, "")
        .replace(/^\s+|\s+$/g, "")
        .trim();
}

function escapeMarkdownTable(str) {
    return str.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function ensureDir(dir) {
    fs.mkdirSync(dir, {recursive: true});
}

function resolveLocalPath(baseDir, importPath) {
    const resolved = path.resolve(baseDir, importPath);
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
        if (fs.existsSync(resolved + ext)) return resolved + ext;
    }
    if (fs.existsSync(resolved)) return resolved;
    return null;
}

function resolveImportPath(fromFile, importPath) {
    if (!importPath.startsWith(".")) return importPath;
    const dir = path.dirname(fromFile);
    const resolved = path.resolve(dir, importPath);
    for (const ext of [".tsx", ".ts", ".stories.tsx", ""]) {
        if (fs.existsSync(resolved + ext)) return resolved + ext;
    }
    return resolved;
}

function parseSource(source) {
    return parse(source, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
    });
}

// ─── Step 1: File Discovery ──────────────────────────────────────────────────

async function discoverFiles() {
    const storyFiles = await fg("__docs__/**/*.stories.tsx", {
        cwd: ROOT,
        ignore: [
            "__docs__/**/*-testing-snapshots.stories.tsx",
            "__docs__/components/**",
            "__docs__/catalog/**",
        ],
    });

    const mdxFiles = await fg("__docs__/**/*.mdx", {
        cwd: ROOT,
        ignore: ["__docs__/components/**", "__docs__/catalog/**"],
    });

    return {
        storyFiles: storyFiles.map((f) => path.join(ROOT, f)).sort(),
        mdxFiles: mdxFiles.map((f) => path.join(ROOT, f)).sort(),
    };
}

// ─── Step 2: Parse Story Files ───────────────────────────────────────────────

function parseStoryFile(filePath) {
    const source = fs.readFileSync(filePath, "utf-8");

    let ast;
    try {
        ast = parseSource(source);
    } catch (e) {
        warn(`Failed to parse ${path.relative(ROOT, filePath)}: ${e.message}`);
        return null;
    }

    const result = {
        filePath,
        title: null,
        componentName: null,
        componentImportPath: null,
        excludeStories: [],
        defaultParsedArgs: null,
        stories: [],
    };

    // Track imports for resolving component paths
    const imports = {};
    // Track top-level const declarations (for .bind() references)
    const topLevelFuncs = {};

    traverse(ast, {
        ImportDeclaration(nodePath) {
            const src = nodePath.node.source.value;
            for (const spec of nodePath.node.specifiers) {
                imports[spec.local.name] = src;
            }
        },

        // Capture top-level const arrow function declarations
        // (needed for stories that use render: SomeFunc.bind({}))
        VariableDeclaration(nodePath) {
            // Only top-level (program body)
            if (nodePath.parent.type !== "Program") return;
            for (const decl of nodePath.node.declarations) {
                if (!decl.id || decl.id.type !== "Identifier") continue;
                if (!decl.init) continue;
                if (
                    decl.init.type === "ArrowFunctionExpression" ||
                    decl.init.type === "FunctionExpression"
                ) {
                    topLevelFuncs[decl.id.name] = decl.init;
                }
            }
        },
    });

    // Second pass: extract exports
    traverse(ast, {
        ExportDefaultDeclaration(nodePath) {
            let obj = nodePath.node.declaration;
            if (obj.type === "TSAsExpression") obj = obj.expression;
            if (obj.type === "ObjectExpression") {
                extractMetaFromObject(obj, result, imports, source);
            }
        },

        ExportNamedDeclaration(nodePath) {
            const decl = nodePath.node.declaration;
            if (!decl || decl.type !== "VariableDeclaration") return;

            for (const declarator of decl.declarations) {
                if (!declarator.id || declarator.id.type !== "Identifier")
                    continue;
                const name = declarator.id.name;
                const init = declarator.init;
                if (!init) continue;

                // Get JSDoc comment
                const leadingComments =
                    nodePath.node.leadingComments || [];
                const jsDoc = leadingComments
                    .filter(
                        (c) =>
                            c.type === "CommentBlock" &&
                            c.value.startsWith("*"),
                    )
                    .map((c) => cleanJSDoc(c.value))
                    .join("\n\n");

                let story = null;
                if (init.type === "ObjectExpression") {
                    story = extractStoryFromObject(
                        name,
                        init,
                        jsDoc,
                        source,
                        topLevelFuncs,
                    );
                } else if (
                    init.type === "ArrowFunctionExpression" ||
                    init.type === "FunctionExpression"
                ) {
                    story = extractStoryFromFunction(
                        name,
                        init,
                        jsDoc,
                        source,
                    );
                }
                if (story) result.stories.push(story);
            }
        },

        // Handle separate parameter assignments: StoryName.parameters = {...}
        ExpressionStatement(nodePath) {
            const expr = nodePath.node.expression;
            if (expr.type !== "AssignmentExpression") return;
            const left = expr.left;
            if (left.type !== "MemberExpression") return;
            if (left.object.type !== "Identifier") return;

            const storyName = left.object.name;
            const propName = left.property.name || left.property.value;

            if (propName === "parameters" && expr.right.type === "ObjectExpression") {
                const story = result.stories.find(
                    (s) => s.exportName === storyName,
                );
                if (story) {
                    const desc = extractStoryDescription(expr.right);
                    if (desc && !story.description) story.description = desc;
                }
            }
        },
    });

    return result;
}

function extractMetaFromObject(obj, result, imports, source) {
    for (const prop of obj.properties) {
        if (prop.type !== "ObjectProperty") continue;
        const key = prop.key.name || prop.key.value;

        if (key === "title" && prop.value.type === "StringLiteral") {
            result.title = prop.value.value;
        } else if (key === "component" && prop.value.type === "Identifier") {
            result.componentName = prop.value.name;
            result.componentImportPath = imports[prop.value.name] || null;
        } else if (key === "excludeStories") {
            if (prop.value.type === "ArrayExpression") {
                result.excludeStories = prop.value.elements
                    .filter((e) => e && e.type === "StringLiteral")
                    .map((e) => e.value);
            }
        } else if (key === "args") {
            if (prop.value && prop.value.type === "ObjectExpression") {
                result.defaultParsedArgs = parseArgsObject(prop.value, source);
            }
        }
    }
}

function parseArgsObject(objNode, source) {
    const result = {};
    for (const prop of objNode.properties) {
        // Skip spread expressions like ...SomeStory.args
        if (prop.type === "SpreadElement") continue;
        // Skip object methods
        if (prop.type === "ObjectMethod") continue;

        const key =
            prop.key &&
            (prop.key.name || prop.key.value);
        if (!key) continue;
        if (!prop.value) continue;

        let valueSource;
        try {
            valueSource = extractSourceSlice(prop.value, source);
        } catch {
            continue;
        }

        // If the value contains action() → set to null (strip)
        if (valueSource.includes("action(")) {
            result[key] = null;
            continue;
        }

        // Skip empty arrow functions like () => {} or () => { ... } with no real body
        if (
            prop.value.type === "ArrowFunctionExpression" &&
            prop.value.body.type === "BlockStatement" &&
            prop.value.body.body.length === 0
        ) {
            result[key] = null;
            continue;
        }

        // Skip complex arrow functions (multi-statement callbacks not useful in docs)
        if (
            prop.value.type === "ArrowFunctionExpression" ||
            prop.value.type === "FunctionExpression"
        ) {
            result[key] = null;
            continue;
        }

        result[key] = valueSource;
    }
    return result;
}

function argsToJsx(componentName, parsedArgs) {
    if (!componentName || !parsedArgs) return null;

    const attrs = [];
    let children = null;

    for (const [key, value] of Object.entries(parsedArgs)) {
        // Skip null values (action() calls, empty handlers)
        if (value === null) continue;

        if (key === "children") {
            children = value;
            continue;
        }

        // Skip style/labelStyle props — not useful in docs
        if (key === "style" || key === "labelStyle") continue;

        // String literal: prop="value"
        if (value.startsWith('"') && value.endsWith('"')) {
            attrs.push(`${key}=${value}`);
        } else if (value.startsWith("'") && value.endsWith("'")) {
            // Single-quoted string → double-quoted
            attrs.push(`${key}="${value.slice(1, -1)}"`);
        } else if (value === "true") {
            // Boolean true → shorthand
            attrs.push(key);
        } else if (value === "false") {
            attrs.push(`${key}={false}`);
        } else {
            // Expression: prop={expression}
            attrs.push(`${key}={${value}}`);
        }
    }

    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";

    if (children) {
        return `<${componentName}${attrStr}>\n  {${children}}\n</${componentName}>`;
    }

    return `<${componentName}${attrStr} />`;
}

function extractStoryFromObject(name, obj, jsDoc, source, topLevelFuncs) {
    const story = {
        exportName: name,
        displayName: camelToTitle(name),
        description: jsDoc || "",
        renderSource: null,
        args: null,
        parsedArgs: null,
    };

    for (const prop of obj.properties) {
        const key =
            prop.key &&
            (prop.key.name || prop.key.value);
        if (!key) continue;

        if (key === "name") {
            if (prop.value && prop.value.type === "StringLiteral") {
                story.displayName = prop.value.value;
            }
        } else if (key === "render") {
            let renderNode;
            if (prop.type === "ObjectMethod") {
                renderNode = prop;
            } else if (prop.value) {
                renderNode = prop.value;
            }

            if (renderNode) {
                // Handle .bind({}) pattern: render: SomeFunc.bind({})
                if (
                    renderNode.type === "CallExpression" &&
                    renderNode.callee.type === "MemberExpression" &&
                    renderNode.callee.property.name === "bind"
                ) {
                    const funcName = renderNode.callee.object.name;
                    if (topLevelFuncs[funcName]) {
                        story.renderSource = extractRenderSource(
                            topLevelFuncs[funcName],
                            source,
                        );
                    }
                } else if (
                    renderNode.type === "Identifier" &&
                    topLevelFuncs[renderNode.name]
                ) {
                    // Handle direct reference: render: Template
                    story.renderSource = extractRenderSource(
                        topLevelFuncs[renderNode.name],
                        source,
                    );
                } else {
                    story.renderSource = extractRenderSource(
                        renderNode,
                        source,
                    );
                }
            }
        } else if (key === "args") {
            if (prop.value && prop.value.type === "ObjectExpression") {
                story.args = extractSourceSlice(prop.value, source);
                story.parsedArgs = parseArgsObject(prop.value, source);
            }
        } else if (key === "parameters") {
            if (prop.value && prop.value.type === "ObjectExpression") {
                const desc = extractStoryDescription(prop.value);
                if (desc && !story.description) story.description = desc;
            }
        }
    }

    return story;
}

function extractStoryFromFunction(name, funcNode, jsDoc, source) {
    return {
        exportName: name,
        displayName: camelToTitle(name),
        description: jsDoc || "",
        renderSource: extractRenderSource(funcNode, source),
        args: null,
    };
}

function extractRenderSource(funcNode, source) {
    try {
        // Arrow function with expression body
        if (
            funcNode.type === "ArrowFunctionExpression" &&
            funcNode.body.type !== "BlockStatement"
        ) {
            return cleanJsxSource(extractSourceSlice(funcNode.body, source));
        }

        // Function/method with block body
        const body =
            funcNode.body ||
            (funcNode.type === "ObjectMethod" && funcNode.body);
        if (body && body.type === "BlockStatement") {
            for (const stmt of body.body) {
                if (stmt.type === "ReturnStatement" && stmt.argument) {
                    return cleanJsxSource(
                        extractSourceSlice(stmt.argument, source),
                    );
                }
            }
        }

        return null;
    } catch {
        return null;
    }
}

function extractSourceSlice(node, source) {
    if (node.start != null && node.end != null) {
        return source.slice(node.start, node.end);
    }
    const {code} = generate(node);
    return code;
}

function cleanJsxSource(src) {
    if (!src) return src;
    let s = src.trim();
    // Remove wrapping parentheses
    if (s.startsWith("(") && s.endsWith(")")) {
        s = s.slice(1, -1).trim();
    }
    return s;
}

function dedent(source) {
    if (!source) return source;
    const lines = source.split("\n");
    if (lines.length <= 1) return source;

    // Find minimum leading whitespace from lines after the first
    // (the first line is typically already stripped by extractRenderSource)
    let minIndent = Infinity;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().length === 0) continue;
        const match = line.match(/^(\s+)/);
        if (match) {
            minIndent = Math.min(minIndent, match[1].length);
        } else {
            minIndent = 0;
            break;
        }
    }
    if (minIndent === 0 || minIndent === Infinity) return source;

    // Also strip any leading whitespace from the first line (up to minIndent)
    const result = [lines[0].replace(new RegExp(`^\\s{0,${minIndent}}`), "")];
    for (let i = 1; i < lines.length; i++) {
        result.push(lines[i].slice(minIndent));
    }
    return result.join("\n");
}

function cleanCodeExample(source, parsedArgs) {
    if (!source) return source;
    let s = source;

    // 1. Remove {...args} prop spread and the entire line it's on
    s = s.replace(/^[ \t]*\{\.\.\.args\}[ \t]*\n?/gm, "");
    // Also handle inline: <Component {...args} prop=...
    s = s.replace(/[ \t]*\{\.\.\.args\}/g, "");

    // 2. Replace args["prop"] and args.prop references with actual values
    // args["prop-name"] pattern
    s = s.replace(/args\["([^"]+)"\]/g, (match, propName) => {
        if (parsedArgs) {
            const val = parsedArgs[propName];
            if (val != null) return val;
        }
        // Fallback: strip args[] wrapper, keep prop name
        return propName;
    });
    // args.propName pattern
    s = s.replace(/args\.(\w+)/g, (match, propName) => {
        if (parsedArgs) {
            const val = parsedArgs[propName];
            if (val != null) return val;
        }
        // Fallback: strip args. prefix, keep prop name
        return propName;
    });

    // 3. Remove action() calls
    // Remove full lines that contain action( calls
    s = s.replace(/^[ \t]*action\(.*\n?/gm, "");

    // In callbacks: remove remaining inline action("name")(value); patterns
    s = s.replace(/\s*action\([^)]*\)\([^)]*\);?/g, "");

    // 4. Simplify onChange handlers that now have only setState
    // Pattern: onChange={(val) => {\n  setValue(val);\n}}
    // Simplify to: onChange={setValue}
    s = s.replace(
        /onChange=\{(\([^)]*\))\s*=>\s*\{\s*(\w+)\(\1\.replace\(/g,
        // Don't simplify complex handlers, only simple ones
        (match) => match,
    );
    // Simple case: onChange={(value) => {\n    setXxx(value);\n}}
    s = s.replace(
        /(\w+)=\{\((\w+)\)\s*=>\s*\{\s*(\w+)\(\2\);\s*\}\}/g,
        (match, propName, param, setter) => {
            return `${propName}={${setter}}`;
        },
    );
    // Multi-line version: onChange={(value) => {\n                    setXxx(value);\n                }}
    s = s.replace(
        /(\w+)=\{\((\w+)\)\s*=>\s*\{\s*\n\s*(\w+)\(\2\);\s*\n\s*\}\}/g,
        (match, propName, param, setter) => {
            return `${propName}={${setter}}`;
        },
    );

    // 5. Merge parsedArgs into JSX when {...args} was removed
    // Only if the source looks like JSX and we have args to merge
    if (parsedArgs && Object.keys(parsedArgs).length > 0) {
        // Check which props are already explicitly set in the source
        const existingProps = new Set();
        const propPattern = /\b(\w+(?:-\w+)*)(?:\s*=)/g;
        let propMatch;
        while ((propMatch = propPattern.exec(s)) !== null) {
            existingProps.add(propMatch[1]);
        }
        // Also consider children as existing if there's content between tags
        if (/<\w+[^>]*>[\s\S]+<\/\w+>/m.test(s)) {
            existingProps.add("children");
        }

        // Build attrs to insert for args not already present
        const newAttrs = [];
        for (const [key, value] of Object.entries(parsedArgs)) {
            if (value === null) continue;
            if (key === "children") continue; // children handled separately
            if (key === "style" || key === "labelStyle") continue;
            if (existingProps.has(key)) continue;

            if (value.startsWith('"') && value.endsWith('"')) {
                newAttrs.push(`${key}=${value}`);
            } else if (value.startsWith("'") && value.endsWith("'")) {
                newAttrs.push(`${key}="${value.slice(1, -1)}"`);
            } else if (value === "true") {
                newAttrs.push(key);
            } else if (value === "false") {
                newAttrs.push(`${key}={false}`);
            } else {
                newAttrs.push(`${key}={${value}}`);
            }
        }

        if (newAttrs.length > 0) {
            // Detect the indent of the first existing prop line
            const propLineMatch = s.match(/\n(\s+)\w+[={]/);
            const indent = propLineMatch ? propLineMatch[1] : "    ";

            // Insert after the opening tag name: <Component\n → <Component newAttr\n
            const inserted = s.replace(
                /(<\w+)\s*\n/,
                (match, tag) => {
                    return `${tag}\n${indent}${newAttrs.join(`\n${indent}`)}\n`;
                },
            );
            if (inserted !== s) {
                s = inserted;
            } else if (!s.includes("\n")) {
                // Single-line self-closing: <Component />
                s = s.replace(
                    /(<\w+)\s*(\/?>)/,
                    (match, tag, close) => {
                        return `${tag} ${newAttrs.join(" ")} ${close}`;
                    },
                );
            }
        }
    }

    // Clean up: remove blank lines at start/end, normalize multiple blank lines
    s = s.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
    s = s.replace(/\n{3,}/g, "\n\n");

    return s;
}

function extractStoryDescription(paramsObj) {
    for (const prop of paramsObj.properties) {
        if (prop.type !== "ObjectProperty") continue;
        const key = prop.key.name || prop.key.value;
        if (key === "docs" && prop.value.type === "ObjectExpression") {
            for (const docProp of prop.value.properties) {
                if (docProp.type !== "ObjectProperty") continue;
                const docKey = docProp.key.name || docProp.key.value;
                if (
                    docKey === "description" &&
                    docProp.value.type === "ObjectExpression"
                ) {
                    for (const descProp of docProp.value.properties) {
                        if (descProp.type !== "ObjectProperty") continue;
                        const descKey =
                            descProp.key.name || descProp.key.value;
                        if (
                            descKey === "story" &&
                            descProp.value.type === "StringLiteral"
                        ) {
                            return descProp.value.value;
                        }
                    }
                }
            }
        }
    }
    return null;
}

// ─── Step 3: Parse MDX Files ─────────────────────────────────────────────────

function parseMdxFile(filePath, storyMap) {
    const source = fs.readFileSync(filePath, "utf-8");
    const lines = source.split("\n");

    let title = null;
    const storyImports = {}; // alias -> resolved file path
    const output = [];
    let inExportBlock = false;
    let inCodeBlock = false;
    let inImportBlock = false;
    let braceDepth = 0;
    let parenDepth = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Track fenced code blocks - pass through everything inside them
        if (trimmed.startsWith("```")) {
            inCodeBlock = !inCodeBlock;
            output.push(line);
            continue;
        }
        if (inCodeBlock) {
            output.push(line);
            continue;
        }

        // Track multi-line export blocks
        if (inExportBlock) {
            for (const ch of line) {
                if (ch === "{") braceDepth++;
                if (ch === "}") braceDepth--;
                if (ch === "(") parenDepth++;
                if (ch === ")") parenDepth--;
            }
            if (braceDepth <= 0 && parenDepth <= 0) {
                inExportBlock = false;
            }
            continue;
        }

        // Track multi-line import blocks
        if (inImportBlock) {
            // Collect the full import text for parsing
            if (trimmed.includes("from ") || trimmed.endsWith(";")) {
                inImportBlock = false;
            }
            continue;
        }

        // ── Imports ──
        if (trimmed.startsWith("import ")) {
            // Namespace import: import * as Alias from "..."
            const nsMatch = trimmed.match(
                /import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/,
            );
            if (nsMatch) {
                storyImports[nsMatch[1]] = resolveImportPath(
                    filePath,
                    nsMatch[2],
                );
            }
            // Check if this is a multi-line import (no closing ; or from on this line)
            if (!trimmed.includes("from ") && !trimmed.endsWith(";")) {
                inImportBlock = true;
            }
            // Skip all imports
            continue;
        }

        // ── Meta tags ──
        // Single-line: <Meta title="..." />
        if (trimmed.match(/^<Meta\b/)) {
            const metaBlock = collectTag(lines, i);
            i = metaBlock.endIndex;

            const titleMatch = metaBlock.text.match(/title="([^"]+)"/);
            if (titleMatch) {
                title = titleMatch[1];
            } else {
                const ofMatch = metaBlock.text.match(/of=\{(\w+)\}/);
                if (ofMatch) {
                    const alias = ofMatch[1];
                    const storiesPath = storyImports[alias];
                    if (storiesPath && storyMap.has(storiesPath)) {
                        title = storyMap.get(storiesPath).title;
                    }
                }
            }
            continue;
        }

        // ── Export statements ──
        if (
            trimmed.startsWith("export default ") ||
            trimmed.startsWith("export const ") ||
            trimmed.startsWith("export function ") ||
            trimmed.startsWith("export let ")
        ) {
            braceDepth = 0;
            parenDepth = 0;
            for (const ch of line) {
                if (ch === "{") braceDepth++;
                if (ch === "}") braceDepth--;
                if (ch === "(") parenDepth++;
                if (ch === ")") parenDepth--;
            }
            if (braceDepth > 0 || parenDepth > 0) {
                inExportBlock = true;
            }
            continue;
        }

        // ── Canvas blocks ──
        if (trimmed.match(/^<Canvas\b/)) {
            const canvasBlock = collectTag(lines, i);
            i = canvasBlock.endIndex;

            const ofMatch = canvasBlock.text.match(
                /of=\{(\w+)\.(\w+)\}/,
            );
            if (ofMatch) {
                const alias = ofMatch[1];
                const storyExportName = ofMatch[2];
                const storiesPath = storyImports[alias];

                let codeBlock = null;
                if (storiesPath && storyMap.has(storiesPath)) {
                    const storyFile = storyMap.get(storiesPath);
                    const story = storyFile.stories.find(
                        (s) => s.exportName === storyExportName,
                    );
                    if (story) {
                        const mergedArgs = {
                            ...storyFile.defaultParsedArgs,
                            ...story.parsedArgs,
                        };
                        if (story.renderSource) {
                            codeBlock = cleanCodeExample(
                                dedent(story.renderSource),
                                mergedArgs,
                            );
                        } else if (
                            story.parsedArgs &&
                            storyFile.componentName
                        ) {
                            codeBlock = argsToJsx(
                                storyFile.componentName,
                                story.parsedArgs,
                            );
                        }
                    }
                }

                if (codeBlock) {
                    output.push("");
                    output.push("```tsx");
                    output.push(codeBlock);
                    output.push("```");
                    output.push("");
                } else {
                    // Leave a comment noting we couldn't resolve
                    output.push(
                        `<!-- Could not resolve: ${ofMatch[1]}.${storyExportName} -->`,
                    );
                }
            }
            continue;
        }

        // ── ComponentGallery ──
        if (trimmed.includes("<ComponentGallery")) {
            output.push(
                "*See the component gallery in Storybook for a visual overview of all components.*",
            );
            continue;
        }

        // ── Strip layout JSX tags ──
        if (isStandaloneJsxTag(trimmed)) {
            if (trimmed.endsWith("/>")) {
                // Self-closing on one line, skip entirely
                continue;
            }
            if (trimmed.startsWith("</")) {
                // Closing tag, skip
                continue;
            }
            // Opening tag - check if it continues to next lines
            if (!trimmed.endsWith(">")) {
                // Multi-line tag, consume until we find > or />
                while (i < lines.length - 1) {
                    i++;
                    const nextTrimmed = lines[i].trim();
                    if (nextTrimmed.endsWith("/>") || nextTrimmed.endsWith(">")) {
                        break;
                    }
                }
            }
            continue;
        }
        if (isLayoutCloseTag(trimmed)) {
            continue;
        }

        // ── Convert HTML to Markdown ──
        let processedLine = line;
        // Convert <a href="...">text</a> to [text](url)
        processedLine = processedLine.replace(
            /<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g,
            "[$2]($1)",
        );
        // Convert <strong>text</strong> to **text**
        processedLine = processedLine.replace(
            /<strong>([^<]+)<\/strong>/g,
            "**$1**",
        );
        // Convert <em>text</em> to *text*
        processedLine = processedLine.replace(
            /<em>([^<]+)<\/em>/g,
            "*$1*",
        );
        // Convert <h1>text</h1> to # text
        processedLine = processedLine.replace(
            /^\s*<h1>([^<]+)<\/h1>\s*$/,
            "# $1",
        );
        // Convert <h2>text</h2> to ## text
        processedLine = processedLine.replace(
            /^\s*<h2>([^<]+)<\/h2>\s*$/,
            "## $1",
        );
        // Convert <h3>text</h3> to ### text
        processedLine = processedLine.replace(
            /^\s*<h3>([^<]+)<\/h3>\s*$/,
            "### $1",
        );
        // Strip <br /> tags
        processedLine = processedLine.replace(/<br\s*\/?>/g, "");

        output.push(processedLine);
    }

    return {
        filePath,
        title,
        content: output
            .join("\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim(),
    };
}

function collectTag(lines, startIndex) {
    let text = lines[startIndex].trim();
    let endIndex = startIndex;

    if (!text.includes("/>") && !text.includes("</")) {
        for (let j = startIndex + 1; j < lines.length; j++) {
            text += " " + lines[j].trim();
            endIndex = j;
            if (lines[j].includes("/>") || lines[j].includes("</")) break;
        }
    }
    return {text, endIndex};
}

const LAYOUT_TAGS = [
    "View",
    "Strut",
    "Caption",
    "StyledImage",
    "BodyText",
    "ResourceLinks",
];

function isStandaloneJsxTag(trimmed) {
    for (const tag of LAYOUT_TAGS) {
        if (
            trimmed.startsWith(`<${tag}`) ||
            trimmed.startsWith(`</${tag}>`)
        ) {
            return true;
        }
    }
    return false;
}

function isLayoutOpenTag(trimmed) {
    for (const tag of LAYOUT_TAGS) {
        if (trimmed.startsWith(`<${tag}`)) return true;
    }
    return false;
}

function isLayoutCloseTag(trimmed) {
    for (const tag of LAYOUT_TAGS) {
        if (trimmed.trim() === `</${tag}>`) return true;
    }
    return false;
}

// ─── Step 4: Extract Component Props ─────────────────────────────────────────

function extractComponentProps(componentName, importPath) {
    if (!importPath || !importPath.startsWith("@khanacademy/wonder-blocks-")) {
        return null;
    }

    const packageDir = path.join(
        PACKAGES_DIR,
        importPath.replace("@khanacademy/", ""),
        "src",
    );
    if (!fs.existsSync(packageDir)) return null;

    const indexPath = path.join(packageDir, "index.ts");
    if (!fs.existsSync(indexPath)) return null;

    const indexSource = fs.readFileSync(indexPath, "utf-8");

    // Find component source file
    const componentSourcePath = findComponentSource(
        packageDir,
        indexSource,
        componentName,
    );

    // Check for a dedicated .types.ts file
    const typesFile = findTypesFile(packageDir);

    // Try types file first, then component source
    const propsFile = typesFile || componentSourcePath;
    if (!propsFile) return null;

    const props = extractPropsFromFile(propsFile, componentName);

    // If types file didn't have what we need, try component source
    if (!props && typesFile && componentSourcePath) {
        return extractPropsFromFile(componentSourcePath, componentName);
    }

    return props;
}

function findComponentSource(packageDir, indexSource, componentName) {
    const lines = indexSource.split("\n");

    for (const line of lines) {
        // import Component from "./components/component"
        const defaultImport = line.match(
            /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/,
        );
        if (defaultImport && defaultImport[1] === componentName) {
            return resolveLocalPath(packageDir, defaultImport[2]);
        }

        // export {Component} from "./components/component"
        const reExport = line.match(
            /export\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/,
        );
        if (reExport) {
            const names = reExport[1]
                .split(",")
                .map((n) => n.trim().split(/\s+as\s+/)[0].trim());
            if (names.includes(componentName)) {
                return resolveLocalPath(packageDir, reExport[2]);
            }
        }
    }

    return null;
}

function findTypesFile(packageDir) {
    const utilDir = path.join(packageDir, "util");
    if (fs.existsSync(utilDir)) {
        const files = fs.readdirSync(utilDir).filter((f) => f.endsWith(".types.ts"));
        if (files.length > 0) {
            return path.join(utilDir, files[0]);
        }
    }
    return null;
}

function extractPropsFromFile(filePath, componentName) {
    const source = fs.readFileSync(filePath, "utf-8");

    let ast;
    try {
        ast = parseSource(source);
    } catch (e) {
        warn(
            `Failed to parse props from ${path.relative(ROOT, filePath)}: ${e.message}`,
        );
        return null;
    }

    const typeAliases = {}; // name -> string (for union literals)
    const typeDecls = {}; // name -> AST node (for resolving type references)

    // First pass: collect all type declarations
    traverse(ast, {
        TSTypeAliasDeclaration(nodePath) {
            const name = nodePath.node.id.name;
            const typeAnnotation = nodePath.node.typeAnnotation;

            // Store the full type node for later resolution
            typeDecls[name] = typeAnnotation;

            if (typeAnnotation.type === "TSUnionType") {
                const literals = typeAnnotation.types
                    .filter((t) => t.type === "TSLiteralType")
                    .map((t) => {
                        if (t.literal.type === "StringLiteral")
                            return `"${t.literal.value}"`;
                        return String(t.literal.value);
                    });
                if (literals.length > 0) {
                    typeAliases[name] = literals.join(" | ");
                }
            }
        },
    });

    // Target type names to look for
    const targetTypes = [`${componentName}Props`, "Props"];

    const props = [];

    traverse(ast, {
        TSTypeAliasDeclaration(nodePath) {
            const name = nodePath.node.id.name;
            if (!targetTypes.includes(name)) return;
            // Only extract from the first matching type
            if (props.length > 0) return;

            const members = collectTypeMembers(
                nodePath.node.typeAnnotation,
                source,
                typeAliases,
                typeDecls,
            );
            for (const member of members) {
                if (!props.find((p) => p.name === member.name)) {
                    props.push(member);
                }
            }
        },
    });

    return props.length > 0 ? props : null;
}

function collectTypeMembers(typeNode, source, typeAliases, typeDecls, _visited) {
    const members = [];
    const visited = _visited || new Set();

    if (typeNode.type === "TSTypeLiteral") {
        for (const member of typeNode.members) {
            if (member.type === "TSPropertySignature") {
                const prop = extractPropMember(member, source, typeAliases);
                if (prop) members.push(prop);
            }
        }
    } else if (typeNode.type === "TSIntersectionType") {
        for (const type of typeNode.types) {
            members.push(...collectTypeMembers(type, source, typeAliases, typeDecls, visited));
        }
    } else if (typeNode.type === "TSTypeReference") {
        const name = typeNode.typeName?.name;
        if (name === "Readonly" || name === "Required") {
            const params = typeNode.typeParameters?.params;
            if (params && params.length > 0) {
                members.push(
                    ...collectTypeMembers(params[0], source, typeAliases, typeDecls, visited),
                );
            }
        } else if (name === "Partial") {
            // For Partial<SomeType>, resolve the inner type but mark all as optional
            const params = typeNode.typeParameters?.params;
            if (params && params.length > 0) {
                const innerMembers = collectTypeMembers(params[0], source, typeAliases, typeDecls, visited);
                for (const m of innerMembers) {
                    m.optional = true;
                }
                members.push(...innerMembers);
            }
        } else if (name === "Omit" || name === "Pick") {
            // Skip Omit/Pick of external types
        } else if (typeDecls && name && typeDecls[name] && !visited.has(name)) {
            // Resolve local type references (e.g. BaseButtonProps)
            visited.add(name);
            members.push(
                ...collectTypeMembers(typeDecls[name], source, typeAliases, typeDecls, visited),
            );
        }
        // Skip unresolvable external type references (AriaProps, etc.)
    }

    return members;
}

function extractPropMember(member, source, typeAliases) {
    const name =
        member.key.type === "Identifier"
            ? member.key.name
            : member.key.value;
    if (!name) return null;

    const optional = !!member.optional;

    let typeStr = "unknown";
    if (member.typeAnnotation?.typeAnnotation) {
        typeStr = typeAnnotationToString(
            member.typeAnnotation.typeAnnotation,
            source,
            typeAliases,
        );
    }

    let description = "";
    const comments = member.leadingComments || [];
    for (const comment of comments) {
        if (comment.type === "CommentBlock" && comment.value.startsWith("*")) {
            description = cleanJSDoc(comment.value);
        }
    }

    return {name, type: typeStr, optional, description};
}

function typeAnnotationToString(typeNode, source, typeAliases) {
    if (!typeNode) return "unknown";

    switch (typeNode.type) {
        case "TSStringKeyword":
            return "string";
        case "TSNumberKeyword":
            return "number";
        case "TSBooleanKeyword":
            return "boolean";
        case "TSVoidKeyword":
            return "void";
        case "TSNullKeyword":
            return "null";
        case "TSUndefinedKeyword":
            return "undefined";
        case "TSAnyKeyword":
            return "any";
        case "TSUnknownKeyword":
            return "unknown";

        case "TSLiteralType":
            if (typeNode.literal.type === "StringLiteral")
                return `"${typeNode.literal.value}"`;
            return String(typeNode.literal.value);

        case "TSUnionType":
            return typeNode.types
                .map((t) => typeAnnotationToString(t, source, typeAliases))
                .join(" | ");

        case "TSArrayType":
            return `${typeAnnotationToString(typeNode.elementType, source, typeAliases)}[]`;

        case "TSTypeReference": {
            const name = typeNode.typeName?.name;
            // Handle qualified names like React.ReactElement
            if (typeNode.typeName?.type === "TSQualifiedName") {
                const left = typeNode.typeName.left.name;
                const right = typeNode.typeName.right.name;
                return `${left}.${right}`;
            }
            // Resolve known type aliases
            if (name && typeAliases[name]) return typeAliases[name];
            // Type with generic parameters
            if (typeNode.typeParameters) {
                const params = typeNode.typeParameters.params
                    .map((p) =>
                        typeAnnotationToString(p, source, typeAliases),
                    )
                    .join(", ");
                return `${name}<${params}>`;
            }
            return name || "unknown";
        }

        case "TSFunctionType": {
            const params = (typeNode.parameters || [])
                .map((p) => {
                    const pName = p.name || "arg";
                    const pType = p.typeAnnotation?.typeAnnotation
                        ? typeAnnotationToString(
                              p.typeAnnotation.typeAnnotation,
                              source,
                              typeAliases,
                          )
                        : "any";
                    return `${pName}: ${pType}`;
                })
                .join(", ");
            const ret = typeNode.typeAnnotation?.typeAnnotation
                ? typeAnnotationToString(
                      typeNode.typeAnnotation.typeAnnotation,
                      source,
                      typeAliases,
                  )
                : "void";
            return `(${params}) => ${ret}`;
        }

        case "TSTypeLiteral": {
            const members = typeNode.members
                .map((m) => {
                    if (m.type === "TSPropertySignature") {
                        const key = m.key.name || m.key.value;
                        const opt = m.optional ? "?" : "";
                        const type = m.typeAnnotation?.typeAnnotation
                            ? typeAnnotationToString(
                                  m.typeAnnotation.typeAnnotation,
                                  source,
                                  typeAliases,
                              )
                            : "unknown";
                        return `${key}${opt}: ${type}`;
                    }
                    return "";
                })
                .filter(Boolean);
            return `{ ${members.join("; ")} }`;
        }

        case "TSParenthesizedType":
            return `(${typeAnnotationToString(typeNode.typeAnnotation, source, typeAliases)})`;

        default:
            // Fallback: extract from source
            if (typeNode.start != null && typeNode.end != null) {
                return source.slice(typeNode.start, typeNode.end);
            }
            return "unknown";
    }
}

// ─── Step 5: Generate Markdown ───────────────────────────────────────────────

function titleToOutputPath(title) {
    if (!title) return null;

    const segments = title.split("/").map((s) => s.trim());

    // Top-level titles (no "Packages" prefix)
    if (segments[0] !== "Packages") {
        const filename = toKebabCase(segments[segments.length - 1]) + ".md";
        return path.join(OUT_DIR, filename);
    }

    // Strip "Packages" prefix
    segments.shift();
    if (segments.length < 2) return null;

    // First segment = package folder
    let packageFolder = toKebabCase(segments[0]);
    packageFolder = packageFolder.replace(/^wonder-blocks-/, "");

    // Middle segments (between package name and filename)
    const middleSegments = segments.slice(1, -1);

    // Skip testing snapshot stories ("Testing" as a middle segment)
    if (middleSegments.some((s) => s.toLowerCase() === "testing")) return null;

    // Last segment = filename base
    const lastSegment = segments[segments.length - 1];

    // Common middle segments that should be flattened (dropped)
    const FLATTEN = new Set(["guides", "subcomponents"]);
    const significantMiddle = middleSegments.filter(
        (s) => !FLATTEN.has(s.toLowerCase()),
    );

    let filename;
    if (significantMiddle.length > 0) {
        // Prefix significant middle segments to filename to avoid collisions
        const parts = [
            ...significantMiddle.map((s) => toKebabCase(s)),
            toKebabCase(lastSegment),
        ];
        filename = parts.join("-") + ".md";
    } else {
        filename = toKebabCase(lastSegment) + ".md";
    }

    return path.join(OUT_DIR, packageFolder, filename);
}

function generateStoryMarkdown(storyFile, props) {
    const lines = [];

    // Title from the last segment of the Storybook title
    const titleParts = (storyFile.title || "").split("/").map((s) => s.trim());
    const displayTitle = titleParts[titleParts.length - 1] || "Untitled";
    lines.push(`# ${displayTitle}`);
    lines.push("");

    // Package info
    if (storyFile.componentImportPath) {
        lines.push(`> Package: \`${storyFile.componentImportPath}\``);
        lines.push("");
    }

    // Component description from source JSDoc
    const componentDesc = getComponentJSDoc(
        storyFile.componentName,
        storyFile.componentImportPath,
    );
    if (componentDesc) {
        lines.push(componentDesc);
        lines.push("");
    }

    // Props table
    if (props && props.length > 0) {
        lines.push("## Props");
        lines.push("");
        lines.push("| Prop | Type | Default | Description |");
        lines.push("|------|------|---------|-------------|");

        for (const prop of props) {
            const required = prop.optional ? "" : "*required*";
            const type = escapeMarkdownTable(prop.type);
            const desc = escapeMarkdownTable(
                prop.description.split("\n")[0],
            );
            lines.push(
                `| \`${prop.name}\` | \`${type}\` | ${required} | ${desc} |`,
            );
        }
        lines.push("");
    }

    // Stories
    const excludeSet = new Set(storyFile.excludeStories || []);
    const stories = storyFile.stories.filter(
        (s) => !excludeSet.has(s.exportName),
    );

    for (const story of stories) {
        lines.push("---");
        lines.push("");
        lines.push(`## ${story.displayName}`);
        lines.push("");

        if (story.description) {
            lines.push(story.description);
            lines.push("");
        }

        // Merge default args from meta with story-level args
        const mergedArgs = {
            ...storyFile.defaultParsedArgs,
            ...story.parsedArgs,
        };

        if (story.renderSource) {
            const cleaned = cleanCodeExample(
                dedent(story.renderSource), mergedArgs,
            );
            lines.push("```tsx");
            lines.push(cleaned);
            lines.push("```");
            lines.push("");
        } else if (story.parsedArgs && storyFile.componentName) {
            const jsx = argsToJsx(
                storyFile.componentName,
                story.parsedArgs,
            );
            if (jsx) {
                lines.push("```tsx");
                lines.push(jsx);
                lines.push("```");
                lines.push("");
            }
        } else if (story.args) {
            lines.push("```tsx");
            lines.push(story.args);
            lines.push("```");
            lines.push("");
        }
    }

    return lines.join("\n");
}

function getComponentJSDoc(componentName, importPath) {
    if (!importPath || !importPath.startsWith("@khanacademy/wonder-blocks-"))
        return null;

    const packageDir = path.join(
        PACKAGES_DIR,
        importPath.replace("@khanacademy/", ""),
        "src",
    );
    if (!fs.existsSync(packageDir)) return null;

    const indexPath = path.join(packageDir, "index.ts");
    if (!fs.existsSync(indexPath)) return null;

    const indexSource = fs.readFileSync(indexPath, "utf-8");
    const componentPath = findComponentSource(
        packageDir,
        indexSource,
        componentName,
    );
    if (!componentPath) return null;

    try {
        const source = fs.readFileSync(componentPath, "utf-8");
        const ast = parseSource(source);
        let jsDoc = null;

        traverse(ast, {
            VariableDeclaration(nodePath) {
                if (jsDoc) return;
                for (const decl of nodePath.node.declarations) {
                    if (
                        decl.id &&
                        decl.id.name === componentName
                    ) {
                        const comments =
                            nodePath.node.leadingComments || [];
                        for (const c of comments) {
                            if (
                                c.type === "CommentBlock" &&
                                c.value.startsWith("*")
                            ) {
                                jsDoc = cleanJSDoc(c.value);
                            }
                        }
                    }
                }
            },
            FunctionDeclaration(nodePath) {
                if (jsDoc) return;
                if (
                    nodePath.node.id &&
                    nodePath.node.id.name === componentName
                ) {
                    const comments =
                        nodePath.node.leadingComments || [];
                    for (const c of comments) {
                        if (
                            c.type === "CommentBlock" &&
                            c.value.startsWith("*")
                        ) {
                            jsDoc = cleanJSDoc(c.value);
                        }
                    }
                }
            },
        });

        return jsDoc;
    } catch {
        return null;
    }
}

// ─── Step 6: Cross-Links ─────────────────────────────────────────────────────

function fileNameToTitle(filename) {
    return filename
        .replace(/\.md$/, "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function appendCrossLinks(outputPaths) {
    // Group files by their parent directory
    const dirGroups = new Map();
    for (const filePath of outputPaths) {
        const dir = path.dirname(filePath);
        if (!dirGroups.has(dir)) {
            dirGroups.set(dir, []);
        }
        dirGroups.get(dir).push(filePath);
    }

    for (const [dir, files] of dirGroups) {
        // Build entries with name and filename
        const entries = files.map((filePath) => ({
            filePath,
            filename: path.basename(filePath),
            name: fileNameToTitle(path.basename(filePath)),
        }));

        // Sort: overview.md first, then alphabetically
        entries.sort((a, b) => {
            if (a.filename === "overview.md") return -1;
            if (b.filename === "overview.md") return 1;
            return a.name.localeCompare(b.name);
        });

        const isRootDir = dir === OUT_DIR;

        for (const entry of entries) {
            const siblings = entries.filter(
                (e) => e.filePath !== entry.filePath,
            );
            if (siblings.length === 0) continue;

            const isOverview = entry.filename === "overview.md";
            const sectionTitle = isOverview
                ? "## Components & Guides"
                : "## Related docs";

            const links = siblings.map(
                (s) => `- [${s.name}](${s.filename})`,
            );

            // For root overview.md, also link to all package overview files
            if (isRootDir && isOverview) {
                const packageDirs = [];
                for (const [d] of dirGroups) {
                    if (d !== OUT_DIR) {
                        packageDirs.push(d);
                    }
                }
                packageDirs.sort();

                if (packageDirs.length > 0) {
                    links.push("");
                    links.push("### Packages");
                    links.push("");
                    for (const pkgDir of packageDirs) {
                        const pkgName = path.basename(pkgDir);
                        const pkgFiles = dirGroups.get(pkgDir);
                        const hasOverview = pkgFiles.some(
                            (f) => path.basename(f) === "overview.md",
                        );
                        const target = hasOverview
                            ? "overview.md"
                            : path.basename(pkgFiles[0]);
                        const relPath = path.relative(dir, pkgDir);
                        links.push(
                            `- [${fileNameToTitle(pkgName)}](${relPath}/${target})`,
                        );
                    }
                }
            }

            const section = `\n\n---\n\n${sectionTitle}\n\n${links.join("\n")}\n`;
            fs.appendFileSync(entry.filePath, section, "utf-8");
        }
    }
}

// ─── Step 7: Generate SKILL.md ───────────────────────────────────────────────

function generateSkillMd(outputPaths) {
    const lines = [];

    // Frontmatter
    lines.push("---");
    lines.push("name: wonder-blocks");
    lines.push("description: >-");
    lines.push(
        "  Wonder Blocks design system component documentation for Khan Academy.",
    );
    lines.push(
        "  Use when building UI with Wonder Blocks React components — includes",
    );
    lines.push(
        "  props, usage examples, accessibility guidelines, and best practices",
    );
    lines.push("  for all components.");
    lines.push("---");
    lines.push("");

    // Intro
    lines.push("# Wonder Blocks");
    lines.push("");
    lines.push(
        "Wonder Blocks is Khan Academy's design system built with React. These docs",
    );
    lines.push(
        "cover component APIs, usage examples, and accessibility guidelines.",
    );
    lines.push("");
    lines.push(
        "When working with Wonder Blocks components, find the relevant component",
    );
    lines.push("docs below for props, examples, and best practices.");
    lines.push("");

    // Separate root-level files from package directories
    const rootFiles = [];
    const packageDirs = new Map(); // dirName -> files

    for (const filePath of outputPaths) {
        const dir = path.dirname(filePath);
        if (dir === OUT_DIR) {
            rootFiles.push(filePath);
        } else {
            const dirName = path.basename(dir);
            if (!packageDirs.has(dirName)) {
                packageDirs.set(dirName, []);
            }
            packageDirs.get(dirName).push(filePath);
        }
    }

    // Getting Started section
    if (rootFiles.length > 0) {
        lines.push("## Getting Started");
        lines.push("");

        // Sort root files with a preferred order
        const preferredOrder = [
            "overview.md",
            "get-started.md",
            "using-color.md",
            "gallery.md",
        ];
        rootFiles.sort((a, b) => {
            const aName = path.basename(a);
            const bName = path.basename(b);
            const aIdx = preferredOrder.indexOf(aName);
            const bIdx = preferredOrder.indexOf(bName);
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return aName.localeCompare(bName);
        });

        for (const filePath of rootFiles) {
            const filename = path.basename(filePath);
            const relPath = path.relative(SKILL_DIR, filePath);
            lines.push(`- [${fileNameToTitle(filename)}](${relPath})`);
        }
        lines.push("");
    }

    // Components section
    const sortedPackages = [...packageDirs.keys()].sort();
    if (sortedPackages.length > 0) {
        lines.push("## Components");
        lines.push("");

        for (const pkgName of sortedPackages) {
            const pkgFiles = packageDirs.get(pkgName);

            // Find the best entry point: overview.md or main component file
            const hasOverview = pkgFiles.some(
                (f) => path.basename(f) === "overview.md",
            );
            let entryFile;
            if (hasOverview) {
                entryFile = pkgFiles.find(
                    (f) => path.basename(f) === "overview.md",
                );
            } else {
                // Use the file matching the package name, or first file
                const mainFile = pkgFiles.find(
                    (f) => path.basename(f) === `${pkgName}.md`,
                );
                entryFile = mainFile || pkgFiles[0];
            }

            const relPath = path.relative(SKILL_DIR, entryFile);
            const displayName = fileNameToTitle(pkgName);

            // Try to get description from package.json
            const wbPkgName = `wonder-blocks-${pkgName}`;
            const pkgJsonPath = path.join(
                PACKAGES_DIR,
                wbPkgName,
                "package.json",
            );
            let description = "";
            if (fs.existsSync(pkgJsonPath)) {
                try {
                    const pkgJson = JSON.parse(
                        fs.readFileSync(pkgJsonPath, "utf-8"),
                    );
                    if (pkgJson.description) {
                        description = ` — ${pkgJson.description}`;
                    }
                } catch {
                    // ignore parse errors
                }
            }

            lines.push(`- [${displayName}](${relPath})${description}`);
        }
        lines.push("");
    }

    const skillMdPath = path.join(SKILL_DIR, "SKILL.md");
    fs.writeFileSync(skillMdPath, lines.join("\n"), "utf-8");
    return skillMdPath;
}

// ─── Step 8: Main ────────────────────────────────────────────────────────────

async function main() {
    console.log("Storybook-to-Markdown Converter");
    console.log("================================\n");

    // Step 1: Discover files
    console.log("Step 1: Discovering files...");
    const {storyFiles, mdxFiles} = await discoverFiles();
    console.log(
        `  Found ${storyFiles.length} story files and ${mdxFiles.length} MDX files\n`,
    );

    // Step 2: Parse all story files
    console.log("Step 2: Parsing story files...");
    const storyMap = new Map(); // filePath -> parsedStoryFile
    const titleToStory = new Map(); // title -> parsedStoryFile

    for (const file of storyFiles) {
        const parsed = parseStoryFile(file);
        if (parsed) {
            storyMap.set(file, parsed);
            if (parsed.title) {
                titleToStory.set(parsed.title, parsed);
            }
        }
    }
    console.log(`  Parsed ${storyMap.size} story files\n`);

    // Step 3: Parse MDX files
    console.log("Step 3: Parsing MDX files...");
    const mdxResults = [];
    for (const file of mdxFiles) {
        const parsed = parseMdxFile(file, storyMap);
        if (parsed && parsed.title) {
            mdxResults.push(parsed);
        } else {
            warn(
                `Could not determine title for MDX: ${path.relative(ROOT, file)}`,
            );
        }
    }
    console.log(`  Parsed ${mdxResults.length} MDX files\n`);

    // Step 4: Extract component props
    console.log("Step 4: Extracting component props...");
    const propsCache = new Map();
    for (const [, storyFile] of storyMap) {
        if (storyFile.componentName && storyFile.componentImportPath) {
            const key = `${storyFile.componentName}@${storyFile.componentImportPath}`;
            if (!propsCache.has(key)) {
                const props = extractComponentProps(
                    storyFile.componentName,
                    storyFile.componentImportPath,
                );
                if (props) {
                    propsCache.set(key, props);
                }
            }
        }
    }
    console.log(`  Extracted props for ${propsCache.size} components\n`);

    // Step 5 & 6: Generate and write output
    console.log("Step 5: Generating markdown and writing files...");

    // Clean output directory
    if (fs.existsSync(SKILL_DIR)) {
        fs.rmSync(SKILL_DIR, {recursive: true});
    }
    // One-time migration: remove old docs/ directory
    const oldDocsDir = path.join(ROOT, "docs");
    if (fs.existsSync(oldDocsDir)) {
        fs.rmSync(oldDocsDir, {recursive: true});
    }
    ensureDir(OUT_DIR);

    let filesWritten = 0;
    const outputPaths = new Set();

    // Process MDX files first (they take priority for duplicate paths)
    for (const mdx of mdxResults) {
        const outputPath = titleToOutputPath(mdx.title);
        if (!outputPath) {
            warn(
                `Skipped MDX (no output path): ${path.relative(ROOT, mdx.filePath)} (title: "${mdx.title}")`,
            );
            continue;
        }

        if (mdx.content.trim().length === 0) {
            warn(`Empty content for MDX: ${path.relative(ROOT, mdx.filePath)}`);
            continue;
        }

        ensureDir(path.dirname(outputPath));
        fs.writeFileSync(outputPath, mdx.content + "\n", "utf-8");
        outputPaths.add(outputPath);
        filesWritten++;
    }

    // Process story files (skip if MDX already wrote to that path)
    for (const [, storyFile] of storyMap) {
        const outputPath = titleToOutputPath(storyFile.title);
        if (!outputPath) continue;

        // MDX takes priority
        if (outputPaths.has(outputPath)) continue;

        const key = `${storyFile.componentName}@${storyFile.componentImportPath}`;
        const props = propsCache.get(key) || null;
        const content = generateStoryMarkdown(storyFile, props);

        if (content.trim().length === 0) {
            warn(
                `Empty content for story: ${path.relative(ROOT, storyFile.filePath)}`,
            );
            continue;
        }

        ensureDir(path.dirname(outputPath));
        fs.writeFileSync(outputPath, content + "\n", "utf-8");
        outputPaths.add(outputPath);
        filesWritten++;
    }

    console.log(`  Written ${filesWritten} markdown files to ${path.relative(ROOT, OUT_DIR)}/\n`);

    // Step 6: Add cross-links
    console.log("Step 6: Adding cross-links between files...");
    appendCrossLinks(outputPaths);
    console.log("  Cross-links added.\n");

    // Step 7: Generate SKILL.md
    console.log("Step 7: Generating SKILL.md...");
    const skillMdPath = generateSkillMd(outputPaths);
    console.log(`  Generated ${path.relative(ROOT, skillMdPath)}\n`);

    // Summary
    console.log("================================");
    console.log("Summary:");
    console.log(`  Story files processed: ${storyMap.size}`);
    console.log(`  MDX files processed: ${mdxResults.length}`);
    console.log(`  Props extracted: ${propsCache.size} components`);
    console.log(`  Markdown files written: ${filesWritten}`);
    console.log(`  Warnings: ${warnings.length}`);
    if (warnings.length > 0) {
        console.log("\nWarnings:");
        for (const w of warnings) {
            console.log(`  - ${w}`);
        }
    }
    console.log("\nDone!");
}

main().catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
});
