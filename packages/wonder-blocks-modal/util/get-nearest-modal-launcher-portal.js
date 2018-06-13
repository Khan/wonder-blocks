// @flow
import {ModalLauncherPortalAttributeName} from "./constants.js";

/**
 * Finds the nearest modal launcher portal element in which a given element
 * is nested.
 * @param {null | Element | Text} element The element from which to find the nearest
 * portal
 * @returns {Element | null} The nearest parent modal launcher portal or
 * `null`.
 */
export default function getNearestModalLauncherPortal(
    element: null | Element | Text,
) {
    let candidateElement = element ? element.parentElement : null;
    while (
        candidateElement &&
        !candidateElement.hasAttribute(ModalLauncherPortalAttributeName)
    ) {
        if (candidateElement === candidateElement.parentElement) {
            return null;
        }
        candidateElement = candidateElement.parentElement;
    }
    return candidateElement || null;
}
