/**
 * The namespace for the rules in this plugin. It matches the ESLint plugin's
 * namespace, so a rule that exists in both plugins has the same full name in
 * both, e.g. `@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette`.
 */
export const NAMESPACE = "@khanacademy/wonder-blocks";

/**
 * The full (namespaced) name of a rule, e.g.
 * `@khanacademy/wonder-blocks/<rule-name>`.
 */
export const getRuleName = (name: string): string => `${NAMESPACE}/${name}`;

/**
 * The URL of a rule's docs.
 */
export const getRuleUrl = (name: string): string =>
    `https://github.com/Khan/wonder-blocks/blob/main/packages/stylelint-plugin-wonder-blocks/docs/${name}.md`;
