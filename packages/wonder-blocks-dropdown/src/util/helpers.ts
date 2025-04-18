import {PropsFor} from "@khanacademy/wonder-blocks-core";
import OptionItem from "../components/option-item";

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
 * @param {fn} callback The function that will be executed after the debounce is resolved.
 * @param {number} wait The period of time that will be executed the debounced
 * function.
 * @returns The function that will be executed after the wait period is
 * fulfilled.
 */
export function debounce(
    callback: (...args: any) => void,
    wait: number,
): (...args: any) => void {
    // @ts-expect-error [FEI-5019] - TS7034 - Variable 'timeout' implicitly has type 'any' in some locations where its type cannot be determined.
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            // @ts-expect-error [FEI-5019] - TS7005 - Variable 'timeout' implicitly has an 'any' type.
            clearTimeout(timeout);
            callback(...args);
        };

        // @ts-expect-error [FEI-5019] - TS7005 - Variable 'timeout' implicitly has an 'any' type.
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Type guard for strings.
 */
function isString(x: any): x is string {
    return typeof x === "string";
}

type OptionItemProps = PropsFor<typeof OptionItem>;

/**
 * Returns a valid label for the given props.
 */
export function getLabel(props: OptionItemProps): string {
    if (isString(props.label)) {
        return props.label;
    }

    if (isString(props.labelAsText)) {
        return props.labelAsText;
    }

    return "";
}

/**
 * Returns the label for the SelectOpener in SingleSelect.
 * If the label is a Node, and `labelAsText` is undefined, returns the label.
 */
export function getSelectOpenerLabel(
    showOpenerLabelAsText: boolean,
    props: OptionItemProps,
): string | JSX.Element {
    if (showOpenerLabelAsText) {
        return getLabel(props);
    }
    return props.label;
}
