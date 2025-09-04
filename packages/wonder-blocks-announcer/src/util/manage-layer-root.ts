/**
 * Utilities for managing a common ancestor element that contains both
 * Wonder Blocks Announcer live regions and Modal content.
 *
 * This approach uses a single container with aria-modal that gets toggled,
 * avoiding the complexity of managing separate document/modal layers.
 */

export const LAYER_ROOT_ID = "wb-layer-root";
export const LAYER_ROOT_TESTID = "wb-layer-root";

/**
 * Creates the common ancestor root element if it doesn't exist
 */
function createLayerRoot(): HTMLElement {
    const layerRoot = document.createElement("div");
    layerRoot.id = LAYER_ROOT_ID;
    layerRoot.setAttribute("data-testid", LAYER_ROOT_TESTID);
    layerRoot.setAttribute("aria-modal", "false");

    return layerRoot;
}

/**
 * Finds existing layer root or creates a new one, ensuring it's attached to document.body
 * @returns {HTMLElement} The layer root element
 */
export function findOrCreateLayerRoot(): HTMLElement {
    if (typeof document === "undefined") {
        throw new Error(
            "layer root can only be created in browser environment",
        );
    }

    let layerRoot = document.getElementById(LAYER_ROOT_ID);

    if (!layerRoot) {
        layerRoot = createLayerRoot();
        document.body.appendChild(layerRoot);
    }

    return layerRoot;
}

/**
 * Gets the layer root element if it exists, otherwise returns null
 * @returns {HTMLElement | null} The layer root element or null
 */
export function getLayerRootElement(): HTMLElement | null {
    if (typeof document === "undefined") {
        return null;
    }

    return document.getElementById(LAYER_ROOT_ID);
}

/**
 * Sets the modal state of the layer root
 * @param {boolean} isModal - Whether the layer root should be in modal mode
 */
export function setLayerRootModalState(isModal: boolean): void {
    const layerRoot = getLayerRootElement();
    if (layerRoot) {
        layerRoot.setAttribute("aria-modal", isModal.toString());
    }
}

/**
 * Gets the current modal state of the layer root
 * @returns {boolean} Whether the layer root is currently in modal mode
 */
export function getLayerRootModalState(): boolean {
    const layerRoot = getLayerRootElement();
    return layerRoot?.getAttribute("aria-modal") === "true";
}

/**
 * Removes the layer root from the DOM (useful for testing)
 */
export function removeLayerRoot(): void {
    const layerRoot = getLayerRootElement();
    if (layerRoot && layerRoot.parentElement) {
        layerRoot.parentElement.removeChild(layerRoot);
    }
}

/**
 * Hook-like function to get the layer root as a target element for Wonder Blocks components
 * Falls back to document.body if layer root doesn't exist
 * @param {boolean} createIfMissing - Whether to create the layer root if it doesn't exist (default: true)
 * @returns {HTMLElement} The layer root element or document.body as fallback
 */
export function useLayerRootTarget(
    createIfMissing: boolean = true,
): HTMLElement {
    if (typeof document === "undefined") {
        // Return a dummy element for SSR - this function shouldn't be called server-side
        return {} as HTMLElement;
    }

    const existingLayerRoot = getLayerRootElement();

    if (existingLayerRoot) {
        return existingLayerRoot;
    }

    if (createIfMissing) {
        return findOrCreateLayerRoot();
    }

    return document.body;
}
