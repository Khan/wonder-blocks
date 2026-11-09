import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

const ruleName = "prefer-semantic-color";
const rule = rules[ruleName];

const importNamed = `import {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";\n`;
const importNamespace = `import * as tokens from "@khanacademy/wonder-blocks-tokens";\n`;

const tokenError = (name: string) =>
    ({messageId: "preferSemanticColor", data: {name}}) as const;
const genericError = {messageId: "preferSemanticColorGeneric"} as const;

ruleTester.run(ruleName, rule, {
    valid: [
        // semanticColor is the preferred, themable alternative
        {
            code: `import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
StyleSheet.create({card: {backgroundColor: semanticColor.core.background.base.default}});`,
        },
        // The import declaration on its own isn't reported
        {code: importNamed},
        {code: importNamespace},
        // Other tokens reached through a namespace import aren't reported
        {
            code: `${importNamespace}const c = tokens.semanticColor.core.foreground.neutral.strong;`,
        },
        {code: `${importNamespace}const {semanticColor} = tokens;`},
        // An identifier named graphicsPalette that isn't imported from the
        // tokens package isn't reported
        {code: `const c = graphicsPalette.red_30;`},
        {
            code: `import {graphicsPalette} from "./my-palette";
const c = graphicsPalette.red_30;`,
        },
        {
            code: `const graphicsPalette = {red_30: "red"};
const c = graphicsPalette.red_30;`,
        },
        // A local variable that shadows the import isn't reported
        {
            code: `${importNamed}function f(graphicsPalette) { return graphicsPalette.red_30; }`,
        },
        // A property named graphicsPalette on some other object isn't reported
        {code: `${importNamed}const c = theme.graphicsPalette.red_30;`},
        {code: `const c = tokens.graphicsPalette.red_30;`},
        // Re-exporting something else from the tokens package isn't reported
        {
            code: `export {semanticColor} from "@khanacademy/wonder-blocks-tokens";`,
        },
        // Strings that mention graphicsPalette without the CSS variable
        // prefix aren't reported
        {code: `const label = "graphicsPalette.blue_30";`},
        {code: `const msg = \`Use graphicsPalette for illustrations\`;`},
        {code: `const v = "var(--graphicsPalette-blue_30)";`},
        // Other WB CSS variables aren't reported
        {
            code: `const v = "var(--wb-semanticColor-core-background-base-default)";`,
        },
        {
            code: `<path fill="var(--wb-semanticColor-core-foreground-neutral-strong)" />;`,
        },
    ],
    invalid: [
        // --- Import forms ---
        {
            code: `${importNamed}const c = graphicsPalette.red_30;`,
            errors: [tokenError("red_30")],
        },
        {
            code: `import {graphicsPalette as gp} from "@khanacademy/wonder-blocks-tokens";
const c = gp.blue_80;`,
            errors: [tokenError("blue_80")],
        },
        {
            code: `import {semanticColor, graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
const a = semanticColor.core.foreground.neutral.strong;
const b = graphicsPalette.white_100;`,
            errors: [tokenError("white_100")],
        },
        {
            code: `${importNamespace}const c = tokens.graphicsPalette.red_30;`,
            errors: [tokenError("red_30")],
        },
        {
            code: `${importNamespace}const c = tokens["graphicsPalette"]["green_50"];`,
            errors: [tokenError("green_50")],
        },
        {
            code: `${importNamespace}const {graphicsPalette} = tokens;`,
            errors: [genericError],
        },
        // Destructuring is reported once, and the new variables aren't followed
        {
            code: `${importNamed}const {red_30} = graphicsPalette;
const a = red_30;
const b = {color: red_30};`,
            errors: [tokenError("red_30")],
        },
        {
            code: `${importNamed}const {red_30: danger} = graphicsPalette;`,
            errors: [tokenError("red_30")],
        },
        {
            code: `${importNamed}const {red_30, blue_30} = graphicsPalette;`,
            errors: [genericError],
        },
        {
            code: `${importNamespace}const {red_30} = tokens.graphicsPalette;`,
            errors: [tokenError("red_30")],
        },
        // Re-exporting the palette from the tokens package
        {
            code: `export {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";`,
            errors: [genericError],
        },
        {
            code: `${importNamed}export {graphicsPalette};`,
            errors: [genericError],
        },

        // --- Usage contexts ---
        // StyleSheet.create
        {
            code: `${importNamed}StyleSheet.create({card: {backgroundColor: graphicsPalette.blue_80}});`,
            errors: [tokenError("blue_80")],
        },
        // Nested style keys
        {
            code: `${importNamed}StyleSheet.create({card: {":hover": {borderColor: graphicsPalette.gray_50}}});`,
            errors: [tokenError("gray_50")],
        },
        // Inline style prop
        {
            code: `${importNamed}<div style={{color: graphicsPalette.magenta_40}} />;`,
            errors: [tokenError("magenta_40")],
        },
        // SVG fill/stroke attributes
        {
            code: `${importNamed}<path fill={graphicsPalette.gray_30} stroke={graphicsPalette.black_100} />;`,
            errors: [tokenError("gray_30"), tokenError("black_100")],
        },
        // Component props
        {
            code: `${importNamed}<PhosphorIcon icon={star} color={graphicsPalette.yellow_30} />;`,
            errors: [tokenError("yellow_30")],
        },
        // Plain constants
        {
            code: `${importNamed}const ACCENT = graphicsPalette.orange_60;`,
            errors: [tokenError("orange_60")],
        },
        // Chart config
        {
            code: `${importNamed}const series = [{name: "a", color: graphicsPalette.cyan_40}, {name: "b", color: graphicsPalette.cyan_70}];`,
            errors: [tokenError("cyan_40"), tokenError("cyan_70")],
        },
        // Canvas drawing
        {
            code: `${importNamed}ctx.fillStyle = graphicsPalette.green_20;`,
            errors: [tokenError("green_20")],
        },
        // Inside tokenValue()
        {
            code: `${importNamed}const v = tokenValue(graphicsPalette.blue_30);`,
            errors: [tokenError("blue_30")],
        },
        // Template literals
        {
            code: `${importNamed}const border = \`1px solid \${graphicsPalette.gray_60}\`;`,
            errors: [tokenError("gray_60")],
        },
        // Optional chaining
        {
            code: `${importNamed}const c = graphicsPalette?.red_10;`,
            errors: [tokenError("red_10")],
        },
        // Dynamic access has no single token name
        {
            code: `${importNamed}const c = graphicsPalette[key];`,
            errors: [genericError],
        },
        // Passing the whole object
        {
            code: `${importNamed}renderChart({colors: graphicsPalette});`,
            errors: [genericError],
        },
        {
            code: `${importNamed}const colors = Object.values(graphicsPalette);`,
            errors: [genericError],
        },
        // Spreading the whole object
        {
            code: `${importNamed}const colors = {...graphicsPalette};`,
            errors: [genericError],
        },
        {
            code: `${importNamed}<Chart {...graphicsPalette} />;`,
            errors: [genericError],
        },
        // Aliasing the whole object
        {
            code: `${importNamed}const p = graphicsPalette;`,
            errors: [genericError],
        },
        // --- Literal CSS variable strings ---
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `const c = "var(--wb-graphicsPalette-blue_30)";`,
            errors: [tokenError("blue_30")],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `StyleSheet.create({card: {color: "var(--wb-graphicsPalette-gray_70)"}});`,
            errors: [tokenError("gray_70")],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `<path fill="var(--wb-graphicsPalette-yellow_30)" />;`,
            errors: [tokenError("yellow_30")],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `<path fill={"var(--wb-graphicsPalette-yellow_30)"} />;`,
            errors: [tokenError("yellow_30")],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const border = `2px solid var(--wb-graphicsPalette-red_20)`;",
            errors: [tokenError("red_20")],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const border = `${width} solid var(--wb-graphicsPalette-red_20)`;",
            errors: [tokenError("red_20")],
        },
        // The variable name without var()
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `el.style.getPropertyValue("--wb-graphicsPalette-white_100");`,
            errors: [tokenError("white_100")],
        },
        // Each variable in a string is reported
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `const g = "linear-gradient(var(--wb-graphicsPalette-blue_30), var(--wb-graphicsPalette-blue_60))";`,
            errors: [tokenError("blue_30"), tokenError("blue_60")],
        },
        // A prefix with no token name gets the generic message
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const v = `var(--wb-graphicsPalette-${name})`;",
            errors: [genericError],
        },

        // Each reference is reported once
        {
            code: `${importNamed}const a = graphicsPalette.red_30;
const b = graphicsPalette.red_30;
function f() { return graphicsPalette.blue_30; }`,
            errors: [
                {...tokenError("red_30"), line: 2, column: 11},
                {...tokenError("red_30"), line: 3, column: 11},
                {...tokenError("blue_30"), line: 4, column: 23},
            ],
        },
    ],
});
