// @flow

const HEADERS_GLOBAL = "__HEADERS__";

const getHeader = (name: string) => {
    return globalThis[HEADERS_GLOBAL][name];
};

export const getLocale = (): string => {
    return getHeader("X-KA-Locale") || "en";
};
