// @flow

/**
 * Get an element by id, adding it to the DOM if it isn't already there.
 *
 * For certain things like focus() to work, and change the
 * document.activeElement, the element must be attached to the document.
 *
 * This method works like `getElementById`, except it also ensures that there
 * is an element with that ID appended to the `document.body`, if it did not
 * initially exist.
 */
export const getElementAttachedToDocument = (id: string): HTMLElement => {
    const element = document.getElementById(id);
    if (element) {
        return element;
    }

    const newElement = document.createElement("div");
    newElement.setAttribute("id", id);
    document.body?.appendChild(newElement);
    return newElement;
};
