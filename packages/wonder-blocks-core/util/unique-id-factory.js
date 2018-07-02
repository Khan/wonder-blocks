// @flow
import {IIdentifierFactory} from "../util/types.js";

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
     * @param {string} factoryName An optional case-insensitive name for the
     * factory. This will be used as part of the identifier. Useful for
     * providing context to the identifiers, which can be useful in
     * differentiating elements when debugging the DOM. This must contain only
     * hyphen and alphanumeric characters.
     */
    constructor(scope?: string) {
        scope = typeof scope === "string" ? scope : "";
        const normalizedScope = scope.toLowerCase();
        if (!this._hasValidIdChars(normalizedScope)) {
            throw new Error(`Invalid factory name: ${scope}`);
        }
        this._uniqueFactoryName = `uid-${normalizedScope}-${UniqueIDFactory._factoryUniquenessCounter++}`;
    }

    _hasValidIdChars(value: ?string) {
        if (typeof value === "string") {
            const invalidCharsReplaced = value.replace(/[^\d\w-]/g, "-");
            if (value === invalidCharsReplaced) {
                return true;
            }
        }
        return false;
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
    id = (key: string) => {
        const normalizedKey = key.toLowerCase();
        if (!this._hasValidIdChars(key)) {
            throw new Error(`Invalid identifier key: ${key}`);
        }
        return `${this._uniqueFactoryName}-${normalizedKey}`;
    };
}
