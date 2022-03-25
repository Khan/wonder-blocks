// @flow

const HEADERS_GLOBAL = "__HEADERS__";

const getHeader = (name: string) => {
    if (!globalThis[HEADERS_GLOBAL]) {
        throw new Error(`${HEADERS_GLOBAL} global not set`);
    }
    return globalThis[HEADERS_GLOBAL][name];
};

export const getLocale = (): string => {
    return getHeader("X-KA-Locale") || "en";
};
