type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};

export function mergeTheme<T>(
    target: T | RecursivePartial<T>,
    source: RecursivePartial<T>,
) {
    const result = {...target, ...source};
    const objectKeys = Object.keys(result);
    type Keys = keyof typeof result;

    for (const key of objectKeys) {
        const targetValue = target[key as Keys];
        const sourceValue = source[key as Keys];
        result[key as Keys] =
            typeof targetValue === "object" && typeof sourceValue === "object"
                ? mergeTheme(targetValue, sourceValue)
                : structuredClone(result[key as Keys]);
    }

    return result as T;
}
