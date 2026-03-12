import type {
    PolitenessLevel,
    RegionFactory,
    RegionDictionary,
    RegionDef,
    LayerContext,
} from "./util/announcer.types";

import {
    createRegionWrapper,
    createDuplicateRegions,
    removeMessage,
} from "./util/dom";
import {alternateIndex, createDebounceFunction} from "./util/util";

export const REMOVAL_TIMEOUT_DELAY = 5000;
export const DEFAULT_WAIT_THRESHOLD = 250;

/**
 * Singleton class that manages ARIA Live Region nodes and routes announcements
 * to the correct layer (document or modal). Use the public API functions
 * (`announceMessage`, `initAnnouncer`, etc.) rather than this class directly.
 */
class Announcer {
    private static _instance: Announcer | null;
    private targetElement: HTMLElement;
    topLevelId: string = `wbAnnounce`;
    node: HTMLElement | null = null;
    regionFactory: RegionFactory = new Map([
        ["document", {count: 2, aIndex: 0, pIndex: 0}],
        ["modal", {count: 2, aIndex: 0, pIndex: 0}],
    ]);
    dictionary: RegionDictionary = new Map();
    waitThreshold: number = DEFAULT_WAIT_THRESHOLD;
    private debounced!: {
        (...args: any[]): Promise<string>;
        updateWaitTime: (newWaitTime: number) => void;
    };
    // Tracks active modal elements → their announcer container nodes
    private modalNodes: Map<HTMLElement, HTMLElement> = new Map();

    private constructor(targetElement: HTMLElement = document.body) {
        this.targetElement = targetElement;

        if (typeof document !== "undefined") {
            // Check if our top level element already exists
            const announcerCheck = document.getElementById(this.topLevelId);

            // Init new structure if the coast is clear
            if (announcerCheck === null) {
                this.init(this.topLevelId);
            }
            // The structure exists but references are lost, so help HMR recover
            else {
                this.reattachNodes();
            }

            // Create the debounced message attachment function
            // This API makes leading edge debouncing work while preserving the
            // ability to change the wait parameter through Announcer.announce
            this.debounced = createDebounceFunction(
                this,
                this.processAnnouncement,
                this.waitThreshold,
            );
        }
    }

    /**
     * Singleton handler to ensure we only have one Announcer instance
     * @returns {Announcer}
     */
    static getInstance(targetElement?: HTMLElement | undefined) {
        if (!Announcer._instance) {
            Announcer._instance = new Announcer(targetElement);
        }
        return Announcer._instance;
    }

    /**
     * Returns true if any modal is currently attached.
     * Used by announceMessage to determine the layer context automatically.
     */
    hasActiveModal(): boolean {
        return this.modalNodes.size > 0;
    }

    /**
     * Creates the root container node and appends document-layer live regions
     * to the target element.
     */
    init(id: string) {
        this.node = document.createElement("div");
        this.node.id = id;
        this.node.setAttribute("data-testid", id);

        Object.assign(this.node.style, srOnly);

        this.initRegionsForLayer(false, this.node, this.targetElement);
    }

    initRegionsForLayer(
        isModalContext: boolean,
        nodeRef: HTMLElement,
        targetElement: HTMLElement,
    ) {
        const layerId: LayerContext = isModalContext ? "modal" : "document";

        // For each level, we create at least two live region elements.
        // This is to work around AT occasionally dropping messages.
        const aWrapper = createRegionWrapper("assertive", layerId);
        createDuplicateRegions(
            aWrapper,
            "assertive",
            this.regionFactory.get(layerId)?.count ?? 2,
            layerId,
            this.dictionary,
        );
        nodeRef.appendChild(aWrapper);

        const pWrapper = createRegionWrapper("polite", layerId);
        createDuplicateRegions(
            pWrapper,
            "polite",
            this.regionFactory.get(layerId)?.count ?? 2,
            layerId,
            this.dictionary,
        );
        nodeRef.appendChild(pWrapper);

        targetElement.append(nodeRef);
    }

    /**
     * Recover document-layer element references lost during HMR
     * (e.g. in Storybook when saving a file).
     * Infers layerId from the region ID prefix so modal regions are also
     * correctly re-classified if the whole document is reattached.
     */
    reattachNodes() {
        const announcerNode = document.getElementById(this.topLevelId);
        if (announcerNode === null) {
            return;
        }
        this.node = announcerNode;
        announcerNode
            .querySelectorAll<HTMLElement>("[id^='wbARegion']")
            .forEach((region) => {
                const layerId: LayerContext = region.id.startsWith(
                    "wbARegion-modal-",
                )
                    ? "modal"
                    : "document";
                this.dictionary.set(region.id, {
                    id: region.id,
                    levelIndex: parseInt(
                        region.id.charAt(region.id.length - 1),
                    ),
                    layerId,
                    level: region.getAttribute("aria-live") as PolitenessLevel,
                    element: region,
                });
            });
    }

    /**
     * Inject a live region container inside a modal element.
     * Call this when a modal mounts (e.g. from a useEffect in ModalDialog).
     * Pre-creating the regions gives screen readers time to register them
     * before any announcements fire.
     *
     * If the container already exists (e.g. after HMR), references are
     * reattached without re-creating DOM nodes.
     */
    attachAnnouncerToModal(modalElement: HTMLElement) {
        const modalAnnouncerId = `${this.topLevelId}-modal`;
        const existing = modalElement.querySelector<HTMLElement>(
            `#${modalAnnouncerId}`,
        );

        if (existing) {
            // HMR recovery: re-register the existing regions
            existing
                .querySelectorAll<HTMLElement>("[id^='wbARegion-modal-']")
                .forEach((region) => {
                    this.dictionary.set(region.id, {
                        id: region.id,
                        levelIndex: parseInt(
                            region.id.charAt(region.id.length - 1),
                        ),
                        level: region.getAttribute(
                            "aria-live",
                        ) as PolitenessLevel,
                        element: region,
                        layerId: "modal",
                    });
                });
            this.modalNodes.set(modalElement, existing);
            return;
        }

        const modalNode = document.createElement("div");
        modalNode.id = modalAnnouncerId;
        modalNode.setAttribute("data-testid", modalAnnouncerId);
        Object.assign(modalNode.style, srOnly);

        this.initRegionsForLayer(true, modalNode, modalElement);
        this.modalNodes.set(modalElement, modalNode);
    }

    /**
     * Remove the live region container from a modal element and clean up
     * dictionary entries. Call this when the modal unmounts.
     */
    detachAnnouncerFromModal(modalElement: HTMLElement) {
        const modalNode = this.modalNodes.get(modalElement);
        if (!modalNode) {
            return;
        }

        // Remove dictionary entries for this modal's regions
        modalNode
            .querySelectorAll<HTMLElement>("[id^='wbARegion-modal-']")
            .forEach((region) => {
                this.dictionary.delete(region.id);
            });

        modalNode.parentElement?.removeChild(modalNode);
        this.modalNodes.delete(modalElement);

        // Reset modal region indices when no modals remain
        if (this.modalNodes.size === 0) {
            const modalFactory = this.regionFactory.get("modal");
            if (modalFactory) {
                modalFactory.aIndex = 0;
                modalFactory.pIndex = 0;
            }
        }
    }

    /**
     * Announce a live region message for a given level
     * @param {string} message The message to be announced
     * @param {string} level Politeness level: should it interrupt?
     * @param {boolean} inModalContext Optional flag for whether to announce from modal context
     * @param {number} debounceThreshold Optional duration to wait before appending another message (defaults to 250ms)
     * @returns {Promise<string>} Promise that resolves with an IDREF for targeted element or empty string if it failed
     */
    announce(
        message: string,
        level: PolitenessLevel,
        inModalContext: boolean,
        debounceThreshold?: number,
    ): Promise<string> {
        // if callers specify a different wait threshold, update our debounce fn
        if (debounceThreshold !== undefined) {
            this.updateWaitThreshold(debounceThreshold);
        }

        // Convert boolean inModalContext to LayerContext
        const layerId: LayerContext = inModalContext ? "modal" : "document";

        return this.debounced(this, message, level, layerId);
    }

    /**
     * Override the default debounce wait threshold
     * @param {number} debounceThreshold Duration to wait before appending messages
     */
    updateWaitThreshold(debounceThreshold: number) {
        this.waitThreshold = debounceThreshold;
        if (this.debounced) {
            this.debounced.updateWaitTime(debounceThreshold);
        }
    }

    /**
     * Callback for appending live region messages through debounce
     * @param {Announcer} context Pass the correct `this` arg to the callback
     * @param {string} message The live region message to append
     * @param {string} level The politeness level for whether to interrupt
     * @param {LayerContext} layerId Identifier for modal or document context
     */
    processAnnouncement(
        context: Announcer,
        message: string,
        level: PolitenessLevel,
        layerId: LayerContext,
    ) {
        if (!context.node) {
            context.reattachNodes();
        }

        // If modal context was requested but no modal regions exist (e.g.
        // attachAnnouncerToModal was never called), fall back to the document layer so
        // the message is never silently dropped.
        const hasModalRegions = [...context.dictionary.values()].some(
            (entry: RegionDef) => entry.layerId === "modal",
        );
        const targetLayerId: LayerContext =
            layerId === "modal" && !hasModalRegions ? "document" : layerId;

        // Filter region elements to the selected level and layer
        const regions: RegionDef[] = [...context.dictionary.values()].filter(
            (entry: RegionDef) =>
                entry.level === level && entry.layerId === targetLayerId,
        );

        const newIndex = context.appendMessage(
            message,
            level,
            regions,
            targetLayerId,
        );

        // Update the central index for the given level and layer
        const layerFactory = context.regionFactory.get(targetLayerId);
        if (layerFactory) {
            if (level === "assertive") {
                layerFactory.aIndex = newIndex;
            } else {
                layerFactory.pIndex = newIndex;
            }
        }

        return regions[newIndex]?.id || "";
    }

    /**
     * Clear messages on demand.
     * This could be useful for clearing immediately, rather than waiting for the default removalDelay.
     * Defaults to clearing all live region elements
     * @param {string} id Optional IDREF of specific element to empty
     */
    clear(id?: string) {
        if (!this.node) {
            return;
        }
        if (id) {
            this.dictionary.get(id)?.element.replaceChildren();
        } else {
            this.dictionary.forEach((region) => {
                region.element.replaceChildren();
            });
        }
    }

    /**
     * Append message to alternating element for a given level
     * @param {string} message The message to be appended
     * @param {string} level Which level to alternate
     * @param {RegionDef[]} regionList Filtered dictionary of regions for level
     * @param {LayerContext} layerId The layer context (modal or document)
     * @param {number} debounceThreshold How long to wait before removing the message
     * @returns {number} Index of targeted region for updating central register
     */
    appendMessage(
        message: string,
        level: PolitenessLevel,
        regionList: RegionDef[],
        layerId: LayerContext,
        debounceThreshold: number = DEFAULT_WAIT_THRESHOLD,
    ): number {
        // Get the layer factory for the current layer
        const layerFactory = this.regionFactory.get(layerId);
        if (!layerFactory) {
            throw new Error(`Layer factory not found for layer: ${layerId}`);
        }

        // Starting index for a given level
        let index =
            level === "assertive" ? layerFactory.aIndex : layerFactory.pIndex;

        // empty region at the previous index
        regionList[index].element.replaceChildren();

        // overwrite index passed in to update locally
        index = alternateIndex(index, layerFactory.count);

        // create element for new message
        const messageEl = document.createElement("p");
        messageEl.textContent = message;

        // append message to new index
        regionList[index].element.appendChild(messageEl);

        // add debounce wait duration to the default removalDelay
        // so we aren't removing messages before a debounce cycle has concluded
        removeMessage(messageEl, debounceThreshold + REMOVAL_TIMEOUT_DELAY);

        return index;
    }

    /**
     * Reset state to defaults.
     * Useful for testing.
     **/
    reset() {
        this.regionFactory.forEach((value) => {
            value.aIndex = 0;
            value.pIndex = 0;
        });

        this.clear();
    }

    /**
     * Remove Announcer instance and all elements.
     * Useful for testing.
     **/
    destroy() {
        if (this.node) {
            this.node.parentElement?.removeChild(this.node);
        }

        // Remove any attached modal announcer nodes
        this.modalNodes.forEach((modalNode) => {
            modalNode.parentElement?.removeChild(modalNode);
        });
        this.modalNodes.clear();

        Announcer._instance = null;
    }
}

export default Announcer;

/**
 * Styling for live region.
 * TODO: move to wonder-blocks-style package.
 * Note: This style is overridden in Storybook for testing.
 */
export const srOnly = {
    border: 0,
    clip: "rect(0,0,0,0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: 1,
};
