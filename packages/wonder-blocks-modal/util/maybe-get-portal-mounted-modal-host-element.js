// @flow
import {ModalLauncherPortalAttributeName} from "./constants.js";

/**
 * From a given element, finds its next ancestor that is a modal launcher portal
 * element.
 * @param {null | Element | Text} element The element whose ancestors are to be
 * walked.
 * @returns {Element | null} The nearest parent modal launcher portal or
 * `null`.
 */
function maybeGetNextAncestorModalLauncherPortal(element: null | Element | Text) {
    let candidateElement = element ? element.parentElement : null;
    while (
        candidateElement &&
        !candidateElement.hasAttribute(ModalLauncherPortalAttributeName)
    ) {
        candidateElement = candidateElement.parentElement;
    }
    return candidateElement || null;
}

/**
 * From a given element, finds the next modal host that has been mounted in
 * a modal portal.
 * @param {null | Element | Text} element The element whose ancestors are to be
 * walked.
 * @returns {Element | null} The next portal-mounted modal host element or
 * `null`.
 */
export default function maybeGetPortalMountedModalHostElement(
    element: null | Element | Text,
) {
    const modalLauncherPortal = maybeGetNextAncestorModalLauncherPortal(element);

    if (modalLauncherPortal) {
        // If we have a portal, then its first child will be the actual
        // data-react-root that contains the modal, which is what we want to
        // return.
        return modalLauncherPortal.firstElementChild;
    } else {
        return null;
    }
}
