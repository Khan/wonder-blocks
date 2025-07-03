import {MaybeString} from "./types";

export function updateMultipleSelection(
    previousSelection: Array<MaybeString> | null | undefined,
    value = "",
) {
    if (!previousSelection) {
        return [value];
    }

    return previousSelection.includes(value)
        ? // Item is already selected, remove it from the list
          previousSelection.filter((item) => item !== value)
        : // Item is not selected yet, add it to the list
          [...previousSelection, value];
}
