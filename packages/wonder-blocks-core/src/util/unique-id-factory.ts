import type {IIdentifierFactory} from "./types";

/**
 * This is NOT for direct use. Instead, see the UniqueIDProvider component.
 *
 * Implements IIdentifierFactory to provide unique identifiers.
 */
export default class UniqueIDFactory implements IIdentifierFactory {
    _uniqueFactoryName: string;

    static _factoryUniquenessCounter = 0;

    /**
     * Creates a UniqueIDFactory instance.
     *
     * @param {string} scope An optional case-insensitive scope for the
     * factory. This will be used as part of the identifier. Useful for
     * providing context to the identifiers, which can be useful in
     * differentiating elements when debugging the DOM. This must contain only
     * hyphen and alphanumeric characters.
     */
    constructor(scope?: string) {
        scope = typeof scope === "string" ? scope : "";
        const normalizedScope = scope.toLowerCase();
        if (!this._hasValidIdChars(normalizedScope)) {
            throw new Error(`Invalid factory scope: ${scope}`);
        }
        this._uniqueFactoryName = `uid-${normalizedScope}-${UniqueIDFactory._factoryUniquenessCounter++}`;
    }

    /**
     * This method verifies that a string contains valid characters for an
     * identifier. It does not assert that a string IS a valid identifier (for
     * example, that it doesn't start with numbers). We don't need to do that
     * here because all identifiers are prefixed to avoid needing that check.
     *
     * According to this post:
     * https://stackoverflow.com/questions/70579/html-valid-id-attribute-values/31773673#31773673
     * The only characters that are not allowed in an id are whitespace characters.
     */
    _hasValidIdChars(value?: string | null): boolean {
        return typeof value === "string" ? !/\s/.test(value) : false;
    }

    /**
     * Provides a unique identifier with the given key.
     *
     * @param {string} key The case-insensitive key of the identifier.
     *
     * @returns {string} A unique identifier that will remain the same for this
     * key in this factory. This must contain only hyphen and alphanumeric
     * characters.
     */
    get: (key: string) => string = (key) => {
        const normalizedKey = key.toLowerCase();
        if (!this._hasValidIdChars(key)) {
            throw new Error(`Invalid identifier key: ${key}`);
        }
        return `${this._uniqueFactoryName}-${normalizedKey}`;
    };
}
