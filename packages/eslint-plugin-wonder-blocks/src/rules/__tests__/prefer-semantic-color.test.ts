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

const error = {messageId: "preferSemanticColor"} as const;

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
        // --- SVG color attributes (fill, stroke, stopColor) are allowed ---
        {
            code: `${importNamed}<path fill={graphicsPalette.gray_30} stroke={graphicsPalette.black_100} />;`,
        },
        {
            code: `${importNamed}<svg><circle fill={graphicsPalette.red_30} /><rect stroke={graphicsPalette.blue_30} /></svg>;`,
        },
        {
            code: `${importNamed}<linearGradient><stop stopColor={graphicsPalette.yellow_30} /></linearGradient>;`,
        },
        // expressions in the attribute value
        {
            code: `${importNamed}<path fill={isActive ? graphicsPalette.green_30 : graphicsPalette.gray_30} />;`,
        },
        // alias and namespace imports
        {
            code: `import {graphicsPalette as gp} from "@khanacademy/wonder-blocks-tokens";
<path fill={gp.gray_30} />;`,
        },
        {
            code: `${importNamespace}<path fill={tokens.graphicsPalette.gray_30} />;`,
        },
        // palette CSS variable strings
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `<path fill="var(--wb-graphicsPalette-yellow_30)" />;`,
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `<path fill={"var(--wb-graphicsPalette-yellow_30)"} />;`,
        },
    ],
    invalid: [
        // --- Import forms ---
        {
            code: `${importNamed}const c = graphicsPalette.red_30;`,
            errors: [error],
        },
        {
            code: `import {graphicsPalette as gp} from "@khanacademy/wonder-blocks-tokens";
const c = gp.blue_80;`,
            errors: [error],
        },
        {
            code: `import {semanticColor, graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
const a = semanticColor.core.foreground.neutral.strong;
const b = graphicsPalette.white_100;`,
            errors: [error],
        },
        {
            code: `${importNamespace}const c = tokens.graphicsPalette.red_30;`,
            errors: [error],
        },
        {
            code: `${importNamespace}const c = tokens["graphicsPalette"]["green_50"];`,
            errors: [error],
        },
        {
            code: `${importNamespace}const {graphicsPalette} = tokens;`,
            errors: [error],
        },
        // Destructuring is reported once, and the new variables aren't followed
        {
            code: `${importNamed}const {red_30} = graphicsPalette;
const a = red_30;
const b = {color: red_30};`,
            errors: [error],
        },
        {
            code: `${importNamed}const {red_30: danger} = graphicsPalette;`,
            errors: [error],
        },
        {
            code: `${importNamed}const {red_30, blue_30} = graphicsPalette;`,
            errors: [error],
        },
        {
            code: `${importNamespace}const {red_30} = tokens.graphicsPalette;`,
            errors: [error],
        },
        // Re-exporting the palette from the tokens package
        {
            code: `export {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";`,
            errors: [error],
        },
        {
            code: `${importNamed}export {graphicsPalette};`,
            errors: [error],
        },

        // --- Usage contexts ---
        // StyleSheet.create
        {
            code: `${importNamed}StyleSheet.create({card: {backgroundColor: graphicsPalette.blue_80}});`,
            errors: [error],
        },
        // Nested style keys
        {
            code: `${importNamed}StyleSheet.create({card: {":hover": {borderColor: graphicsPalette.gray_50}}});`,
            errors: [error],
        },
        // Inline style prop
        {
            code: `${importNamed}<div style={{color: graphicsPalette.magenta_40}} />;`,
            errors: [error],
        },
        // Component props
        {
            code: `${importNamed}<PhosphorIcon icon={star} color={graphicsPalette.yellow_30} />;`,
            errors: [error],
        },
        // Plain constants
        {
            code: `${importNamed}const ACCENT = graphicsPalette.orange_60;`,
            errors: [error],
        },
        // Chart config
        {
            code: `${importNamed}const series = [{name: "a", color: graphicsPalette.cyan_40}, {name: "b", color: graphicsPalette.cyan_70}];`,
            errors: [error, error],
        },
        // Canvas drawing
        {
            code: `${importNamed}ctx.fillStyle = graphicsPalette.green_20;`,
            errors: [error],
        },
        // Inside tokenValue()
        {
            code: `${importNamed}const v = tokenValue(graphicsPalette.blue_30);`,
            errors: [error],
        },
        // Template literals
        {
            code: `${importNamed}const border = \`1px solid \${graphicsPalette.gray_60}\`;`,
            errors: [error],
        },
        // Optional chaining
        {
            code: `${importNamed}const c = graphicsPalette?.red_10;`,
            errors: [error],
        },
        // Dynamic access
        {
            code: `${importNamed}const c = graphicsPalette[key];`,
            errors: [error],
        },
        // Passing the whole object
        {
            code: `${importNamed}renderChart({colors: graphicsPalette});`,
            errors: [error],
        },
        {
            code: `${importNamed}const colors = Object.values(graphicsPalette);`,
            errors: [error],
        },
        // Spreading the whole object
        {
            code: `${importNamed}const colors = {...graphicsPalette};`,
            errors: [error],
        },
        {
            code: `${importNamed}<Chart {...graphicsPalette} />;`,
            errors: [error],
        },
        // Aliasing the whole object
        {
            code: `${importNamed}const p = graphicsPalette;`,
            errors: [error],
        },
        // --- Literal CSS variable strings ---
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `const c = "var(--wb-graphicsPalette-blue_30)";`,
            errors: [error],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `StyleSheet.create({card: {color: "var(--wb-graphicsPalette-gray_70)"}});`,
            errors: [error],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const border = `2px solid var(--wb-graphicsPalette-red_20)`;",
            errors: [error],
        },
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const border = `${width} solid var(--wb-graphicsPalette-red_20)`;",
            errors: [error],
        },
        // The variable name without var()
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `el.style.getPropertyValue("--wb-graphicsPalette-white_100");`,
            errors: [error],
        },
        // Each variable in a string is reported
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: `const g = "linear-gradient(var(--wb-graphicsPalette-blue_30), var(--wb-graphicsPalette-blue_60))";`,
            errors: [error, error],
        },
        // A variable with a dynamic name
        {
            // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Test input for this rule
            code: "const v = `var(--wb-graphicsPalette-${name})`;",
            errors: [error],
        },

        // --- SVG edge cases that are still reported ---
        // style objects, even on SVG elements
        {
            code: `${importNamed}<path style={{fill: graphicsPalette.gray_30}} />;`,
            errors: [error],
        },
        {
            code: `${importNamed}<div style={{fill: graphicsPalette.gray_30}} />;`,
            errors: [error],
        },
        // Less common SVG color attributes
        {
            code: `${importNamed}<feFlood floodColor={graphicsPalette.white_100} />;`,
            errors: [error],
        },
        // Non-color attributes on SVG elements
        {
            code: `${importNamed}<path data-color={graphicsPalette.gray_30} />;`,
            errors: [error],
        },
        // Components aren't SVG elements, even if they render one
        {
            code: `${importNamed}<Path fill={graphicsPalette.gray_30} />;`,
            errors: [error],
        },
        // Child content of an SVG element isn't an attribute
        {
            code: `${importNamed}<text>{graphicsPalette.gray_30}</text>;`,
            errors: [error],
        },
        // HTML elements nested inside an SVG
        {
            code: `${importNamed}<svg><foreignObject><div style={{color: graphicsPalette.gray_30}} /></foreignObject></svg>;`,
            errors: [error],
        },
        // Functions inside an SVG attribute
        {
            code: `${importNamed}<path onClick={() => setColor(graphicsPalette.red_30)} />;`,
            errors: [error],
        },
        // Spreading the palette as props
        {
            code: `${importNamed}<path {...graphicsPalette} />;`,
            errors: [error],
        },
        // Colors defined outside the SVG are reported where they're defined
        {
            code: `${importNamed}const FILL = graphicsPalette.gray_30;
<path fill={FILL} />;`,
            errors: [error],
        },

        // Each reference is reported once
        {
            code: `${importNamed}const a = graphicsPalette.red_30;
const b = graphicsPalette.red_30;
function f() { return graphicsPalette.blue_30; }`,
            errors: [
                {...error, line: 2, column: 11},
                {...error, line: 3, column: 11},
                {...error, line: 4, column: 23},
            ],
        },
    ],
});
