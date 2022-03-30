// @flow
let __locale = "en"; // We default to English if no locale has been set

export const setLocale = (locale: string): void => {
    __locale = locale;
};

export const getLocale = (): string => {
    return __locale;
};
