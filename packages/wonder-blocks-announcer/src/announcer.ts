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
 * Internal class to manage screen reader announcements.
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
    layer: LayerContext;
    dictionary: RegionDictionary = new Map();
    waitThreshold: number = DEFAULT_WAIT_THRESHOLD;
    lastExecutionTime = 0;
    private debounced!: {
        (...args: any[]): Promise<string>;
        updateWaitTime: (newWaitTime: number) => void;
    };

    private constructor(targetElement: HTMLElement = document.body) {
        this.targetElement = targetElement;
        this.layer = "document";

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
     * Internal initializer method to create live region elements
     * Prepends regions to document body
     * @param {string} id ID of the top level node (wbAnnounce)
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
        const aWrapper = createRegionWrapper("assertive");
        createDuplicateRegions(
            aWrapper,
            "assertive",
            this.regionFactory.get(layerId)?.count || 2,
            layerId,
            this.dictionary,
        );
        nodeRef.appendChild(aWrapper);

        const pWrapper = createRegionWrapper("polite");
        createDuplicateRegions(
            pWrapper,
            "polite",
            this.regionFactory.get(layerId)?.count || 2,
            layerId,
            this.dictionary,
        );
        nodeRef.appendChild(pWrapper);

        targetElement.append(nodeRef);
    }
    /**
     * Recover in the event regions get lost
     * This happens in Storybook or other HMR environments when saving a file:
     * Announcer exists, but it loses the connection to DOM element Refs
     */
    reattachNodes() {
        const announcerCheck = document.getElementById(this.topLevelId);
        if (announcerCheck !== null) {
            this.node = announcerCheck;
            const regions = Array.from(
                announcerCheck.querySelectorAll<HTMLElement>(
                    "[id^='wbARegion']",
                ),
            );
            regions.forEach((region) => {
                this.dictionary.set(region.id, {
                    id: region.id,
                    levelIndex: parseInt(
                        region.id.charAt(region.id.length - 1),
                    ),
                    layerId: "document",
                    level: region.getAttribute("aria-live") as PolitenessLevel,
                    element: region,
                });
            });
        }
    }

    /**
     * Ensures live regions exist inside the modal container when in modal context
     */
    ensureModalLiveRegions() {
        // Find the modal container (element with aria-modal="true")
        const modalContainer = document.querySelector<HTMLElement>(
            '[aria-modal="true"]',
        );

        if (!modalContainer) {
            // If no modal found, fall back to regular behavior
            return;
        }

        // Check if modal-specific live regions already exist
        const modalAnnouncerId = `${this.topLevelId}-modal`;
        const existingModalAnnouncer = modalContainer.querySelector(
            `#${modalAnnouncerId}`,
        );

        if (existingModalAnnouncer) {
            // Modal regions already exist, just reattach references
            this.reattachModalNodes(existingModalAnnouncer as HTMLElement);
            return;
        }

        // Create live regions inside the modal
        const modalNode = document.createElement("div");
        modalNode.id = modalAnnouncerId;
        modalNode.setAttribute("data-testid", modalAnnouncerId);
        Object.assign(modalNode.style, srOnly);

        this.initRegionsForLayer(true, modalNode, modalContainer);
    }

    /**
     * Reattach modal-specific live region references
     */
    reattachModalNodes(modalNode: HTMLElement) {
        const regions = Array.from(
            modalNode.querySelectorAll<HTMLElement>("[id^='wbARegion-modal-']"),
        );
        regions.forEach((region) => {
            this.dictionary.set(region.id, {
                id: region.id,
                levelIndex: parseInt(region.id.charAt(region.id.length - 1)),
                level: region.getAttribute("aria-live") as PolitenessLevel,
                element: region,
                layerId: "modal",
            });
        });
    }

    /**
     * Update region IDs and dictionary entries for modal context
     */
    updateRegionsForModal(regions: HTMLElement[], level: PolitenessLevel) {
        regions.forEach((region, index) => {
            const oldId = region.id;
            const newId = `wbARegion-modal-${level}${index}`;

            // Update the element's ID and test ID
            region.id = newId;
            region.setAttribute("data-testid", newId);

            // Remove old dictionary entry
            this.dictionary.delete(oldId);

            // Add new dictionary entry
            this.dictionary.set(newId, {
                id: newId,
                levelIndex: index,
                level: level,
                layerId: "modal",
                element: region,
            });
        });
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
     * @param {sting} message The live region message to append
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

        let targetLayerId = layerId;

        // Handle modal context - create live regions inside the modal
        if (layerId === "modal") {
            context.ensureModalLiveRegions();

            // Check if modal regions were actually created
            const modalRegions = [...context.dictionary.values()].filter(
                (entry: RegionDef) => entry.layerId === "modal",
            );

            // If no modal regions exist, fall back to document layer
            if (modalRegions.length === 0) {
                targetLayerId = "document";
            }
        }

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
        level: PolitenessLevel, // level
        regionList: RegionDef[], // list of relevant elements
        layerId: LayerContext, // layer context
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
        this.regionFactory.forEach((value, key) => {
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
