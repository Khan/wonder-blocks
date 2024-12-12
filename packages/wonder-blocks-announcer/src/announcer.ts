import {
    PolitenessLevel,
    RegionFactory,
    RegionDictionary,
    RegionDef,
} from "../types/announcer.types";

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
    node: HTMLElement | null = null;
    regionFactory: RegionFactory = {
        count: 2,
        aIndex: 0,
        pIndex: 0,
    };
    dictionary: RegionDictionary = new Map();
    waitThreshold: number = DEFAULT_WAIT_THRESHOLD;
    lastExecutionTime = 0;
    private debounced!: {
        (...args: any[]): Promise<string>;
        updateWaitTime: (newWaitTime: number) => void;
    };

    private constructor() {
        if (typeof document !== "undefined") {
            const topLevelId = `wbAnnounce`;
            // Check if our top level element already exists
            const announcerCheck = document.getElementById(topLevelId);

            // Init new structure if the coast is clear
            if (announcerCheck === null) {
                this.init(topLevelId);
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
    static getInstance() {
        if (!Announcer._instance) {
            Announcer._instance = new Announcer();
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

        // For each level, we create at least two live region elements.
        // This is to work around AT occasionally dropping messages.
        const aWrapper = createRegionWrapper("assertive");
        createDuplicateRegions(
            aWrapper,
            "assertive",
            this.regionFactory.count,
            this.dictionary,
        );
        this.node?.appendChild(aWrapper);

        const pWrapper = createRegionWrapper("polite");
        createDuplicateRegions(
            pWrapper,
            "polite",
            this.regionFactory.count,
            this.dictionary,
        );
        this.node.appendChild(pWrapper);

        document.body.append(this.node);
    }
    /**
     * Recover in the event regions get lost
     * This happens in Storybook or other HMR environments when saving a file:
     * Announcer exists, but it loses the connection to DOM element Refs
     */
    reattachNodes() {
        const announcerCheck = document.getElementById(`wbAnnounce`);
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
                    level: region.getAttribute("aria-live") as PolitenessLevel,
                    element: region,
                });
            });
        }
    }
    /**
     * Announce a live region message for a given level
     * @param {string} message The message to be announced
     * @param {string} level Politeness level: should it interrupt?
     * @param {number} debounceThreshold Optional duration to wait before appending another message (defaults to 250ms)
     * @returns {Promise<string>} Promise that resolves with an IDREF for targeted element or empty string if it failed
     */
    announce(
        message: string,
        level: PolitenessLevel,
        debounceThreshold?: number,
    ): Promise<string> {
        // if callers specify a different wait threshold, update our debounce fn
        if (debounceThreshold !== undefined) {
            this.updateWaitThreshold(debounceThreshold);
        }
        return this.debounced(this, message, level);
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
     */
    processAnnouncement(
        context: Announcer,
        message: string,
        level: PolitenessLevel,
    ) {
        if (!context.node) {
            context.reattachNodes();
        }

        // Filter region elements to the selected level
        const regions: RegionDef[] = [...context.dictionary.values()].filter(
            (entry: RegionDef) => entry.level === level,
        );

        const newIndex = context.appendMessage(message, level, regions);

        // overwrite central index for the given level
        if (level === "assertive") {
            context.regionFactory.aIndex = newIndex;
        } else {
            context.regionFactory.pIndex = newIndex;
        }

        return regions[newIndex].id || "";
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
     * @returns {number} Index of targeted region for updating central register
     */
    appendMessage(
        message: string,
        level: PolitenessLevel, // level
        regionList: RegionDef[], // list of relevant elements
        debounceThreshold: number = DEFAULT_WAIT_THRESHOLD,
    ): number {
        // Starting index for a given level
        let index =
            level === "assertive"
                ? this.regionFactory.aIndex
                : this.regionFactory.pIndex;

        // empty region at the previous index
        regionList[index].element.replaceChildren();

        // overwrite index passed in to update locally
        index = alternateIndex(index, this.regionFactory.count);

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
        this.regionFactory.aIndex = 0;
        this.regionFactory.pIndex = 0;

        this.clear();
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
