type TokenValue = string | number;

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
type TokensAsJsVariable<K extends string> = {
    [key in KebabToCamelCase<K>]: string | number | boolean;
};

/**
 * The type containing the CSS variables that can be overridden to customize the
 * appearance of a component.
 *
 * @example
 * const tokens: TokensAsVariable<ComponentTokensPrefix> = {
 *     "--wb-c-node-icon-button--box-foreground": "red",
 * };
 */
type TokensAsCssVariable<T extends string, K extends string> = {
    [key in `${T}${K}`]: TokenValue;
};

/**
 * Maps a object of camel-cased tokens to a object of kebab-cased CSS variables.
 *
 * @param tokens The object of camel-cased tokens to map.
 * @param prefix The prefix to use for the CSS variables.
 * @returns The object of kebab-cased CSS variables.
 */
export function mapTokensToVariables<T extends string, P extends string>(
    tokens: Partial<TokensAsJsVariable<T>>,
    prefix: P,
) {
    // Only pass the keys that are included in the object.
    return Object.entries(tokens).reduce(
        (acc, [key, value]) => {
            // Convert camelCase key to kebab-case.
            const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

            acc[`${prefix}${kebabKey}` as keyof TokensAsCssVariable<P, T>] =
                value as TokenValue;
            return acc;
        },
        {} as Record<keyof TokensAsCssVariable<P, T>, TokenValue>,
    );
}
