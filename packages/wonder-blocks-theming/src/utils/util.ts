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
        let currentKeyValue = result[key as Keys];
        const targetValue = target[key as Keys];
        const sourceValue = source[key as Keys];
        if (typeof targetValue == "object" && typeof sourceValue == "object") {
            currentKeyValue = mergeTheme(targetValue, sourceValue);
        } else {
            currentKeyValue = structuredClone(currentKeyValue);
        }
    }

    return result as T;
}
