type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};

/**
 * Allow us to create a new copy of the target theme by overriding some of its
 * tokens with a new theme.
 *
 * This is useful when defining another theme for a given component.
 *
 * @param target The original theme object.
 * @param source The theme object to merge into the original.
 * @returns A new theme object with the target tokens overriding the source.
 */
export function mergeTheme<T>(
    source: T | RecursivePartial<T>,
    target: RecursivePartial<T>,
) {
    const result = {...source, ...target};
    const objectKeys = Object.keys(result);
    type Keys = keyof typeof result;

    for (const key of objectKeys) {
        const sourceValue = source[key as Keys];
        const targetValue = target[key as Keys];
        result[key as Keys] =
            typeof targetValue === "object" && typeof sourceValue === "object"
                ? mergeTheme(sourceValue, targetValue)
                : result[key as Keys];
    }

    return result as T;
}
