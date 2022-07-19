// @flow

/**
 * Checks if a given key is a valid ASCII value.
 *
 * @param {string} key The key that is being typed in.
 * @returns A valid string representation of the given key.
 */
export function getStringForKey(key: string): string {
    // If the key is of length 1, it is an ASCII value.
    // Otherwise, if there are no ASCII characters in the key name,
    // it is a Unicode character.
    // See https://www.w3.org/TR/uievents-key/
    if (key.length === 1 || !/^[A-Z]/i.test(key)) {
        return key;
    }

    return "";
}

/**
 *
 * @param {*} callback
 * @param {*} wait
 * @returns
 */
export function debounce(
    callback: (...args: any) => void,
    wait: number,
): (...args: any) => void {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            callback(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
