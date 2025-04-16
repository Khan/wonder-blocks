/**
 * The prefix for all CSS variables that are converted from the original tokens.
 *
 * NOTE: The prefix uses the following structure:
 * --wb-<namespace>-<token_category>-*
 *
 * - namespace: The design token namespace (`semanticColor`).
 * - token_category: The category of the design token (e.g. `border`, `sizing`).
 *
 * @see https://khanacademy.atlassian.net/wiki/spaces/WB/pages/3967287319/Component+tokens+structure
 */
export const CSS_VAR_PREFIX = "--wb-";
