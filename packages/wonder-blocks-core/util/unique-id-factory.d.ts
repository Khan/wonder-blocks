import { IIdentifierFactory } from "./types";
/**
 * This is NOT for direct use. Instead, see the UniqueIDProvider component.
 *
 * Implements IIdentifierFactory to provide unique identifiers.
 */
export default class UniqueIDFactory implements IIdentifierFactory {
    _uniqueFactoryName: string;
    static _factoryUniquenessCounter: number;
    /**
     * Creates a UniqueIDFactory instance.
     *
     * @param {string} scope An optional case-insensitive scope for the
     * factory. This will be used as part of the identifier. Useful for
     * providing context to the identifiers, which can be useful in
     * differentiating elements when debugging the DOM. This must contain only
     * hyphen and alphanumeric characters.
     */
    constructor(scope?: string);
    /**
     * This method verifies that a string contains valid characters for an
     * identifier. It does not assert that a string IS a valid identifier (for
     * example, that it doesn't start with numbers). We don't need to do that
     * here because all identifiers are prefixed to avoid needing that check.
     */
    _hasValidIdChars(value: string | null): boolean;
    /**
     * Provides a unique identifier with the given key.
     *
     * @param {string} key The case-insensitive key of the identifier.
     *
     * @returns {string} A unique identifier that will remain the same for this
     * key in this factory. This must contain only hyphen and alphanumeric
     * characters.
     */
    get: (key: string) => string;
}
