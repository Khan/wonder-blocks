// @flow

/**
 * Implementations provide the ability to translate strings to a different
 * language.
 *
 * @export
 * @interface IProvideTranslation
 */
export interface IProvideTranslation {
    /**
     * Translate the input string.
     *
     * @param {string} input The value to translate.
     * @returns {string} The translated string or the original input value.
     */
    translate(input: string): string;
}
