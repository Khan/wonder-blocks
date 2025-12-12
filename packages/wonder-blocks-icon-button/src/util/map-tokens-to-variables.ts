type TokenValue = string | number | boolean;

/**
 * The type containing the CSS variables that can be overridden to customize the
 * appearance of a component.
 *
 * @example
 * const tokens: TokensAsVariable<ComponentTokensPrefix> = {
 *     "--wb-ib-node-box-foreground": "red",
 * };
 */
export type TokensAsCssVariable<T extends string, K extends string> = {
    [key in `${T}${K}`]: TokenValue;
};

export function mapTokensToVariables<T, K extends string, P extends string>(
    tokens: Partial<T>,
    prefix: P,
) {
    // Only pass the keys that are included in the object.
    return Object.entries(tokens).reduce(
        (acc, [key, value]) => {
            // Convert camelCase key to kebab-case.
            const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

            acc[`${prefix}${kebabKey}` as keyof TokensAsCssVariable<P, K>] =
                value as TokenValue;
            return acc;
        },
        {} as Record<keyof TokensAsCssVariable<P, K>, TokenValue>,
    );
}

/**
 * Converts a kebab-case string to a camelCase string.
 *
 * @example
 * type CamelCaseString = KebabToCamelCase<"box-foreground">;
 * // CamelCaseString = "boxForeground";
 */
type KebabToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
    ? `${T}${Capitalize<KebabToCamelCase<U>>}`
    : S;

/**
 * The type containing the keys using the camelCase format.
 *
 * @example
 * type TokensAsJsVariable = {
 *     boxForeground: string;
 */
export type TokensAsJsVariable<K extends string> = {
    [key in KebabToCamelCase<K>]: string | number | boolean;
};
