// @flow
import {ModalLauncherPortalAttributeName} from "./constants.js";

/**
 * From a given element, finds its next ancestor that is a modal launcher portal
 * element.
 * @param {?(Element | Text)} element The element whose ancestors are to be
 * walked.
 * @returns {?Element} The nearest parent modal launcher portal.
 */
function maybeGetNextAncestorModalLauncherPortal(element: ?(Element | Text)) {
    let candidateElement = element && element.parentElement;
    while (
        candidateElement &&
        !candidateElement.hasAttribute(ModalLauncherPortalAttributeName)
    ) {
        candidateElement = candidateElement.parentElement;
    }
    return candidateElement;
}

/**
 * From a given element, finds the next modal host that has been mounted in
 * a modal portal.
 * @param {?(Element | Text)} element The element whose ancestors are to be
 * walked.
 * @returns {?Element} The next portal-mounted modal host element.
 * TODO(kevinb): look into getting rid of this
 */
export default function maybeGetPortalMountedModalHostElement(
    element: ?(Element | Text),
): ?Element {
    return maybeGetNextAncestorModalLauncherPortal(element);
}
