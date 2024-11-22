// TODO: publish wonder-blocks-style package WB-1776
// import {srOnly} from "../../wonder-blocks-style/src/styles/a11y";

import {
    PolitenessLevel,
    RegionFactory,
    RegionDictionary,
    RegionDef,
} from "../types/Announcer.types";

import {
    createRegionWrapper,
    createDuplicateRegions,
    removeMessage,
} from "./util/dom";
import {alternateIndex} from "./util/util";

const REMOVAL_TIMEOUT_DELAY = 5000;

/**
 * Internal class to manage screen reader announcements.
 */
class Announcer {
    private static _instance: Announcer;
    node: HTMLElement | null = null;
    regionFactory: RegionFactory = {
        count: 2,
        aIndex: 0,
        pIndex: 0,
    };
    dictionary: RegionDictionary = new Map();

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
                    "[id^='wbARegion'",
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
     * @param {number} removalDelay How long to wait before removing message
     * @returns {string} IDREF for targeted element or empty string if it failed
     */
    announce(
        message: string,
        level: PolitenessLevel,
        removalDelay?: number,
    ): string {
        if (!this.node) {
            this.reattachNodes();
        }

        // Filter region elements to the selected level
        const regions: RegionDef[] = [...this.dictionary.values()].filter(
            (entry: RegionDef) => entry.level === level,
        );

        const newIndex = this.appendMessage(
            message,
            level,
            regions,
            removalDelay,
        );

        // overwrite central index for the given level
        if (level === "assertive") {
            this.regionFactory.aIndex = newIndex;
        } else {
            this.regionFactory.pIndex = newIndex;
        }

        return regions[newIndex].id || "";
    }

    /**
     * Clear messages on demand.
     * This could be useful for clearing immediately, rather than waiting for the removalDelay.
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
     * @param {number} removalDelay How long to wait before removing message
     * @returns {number} Index of targeted region for updating central register
     */
    appendMessage(
        message: string,
        level: PolitenessLevel, // level
        regionList: RegionDef[], // list of relevant elements
        removalDelay: number = REMOVAL_TIMEOUT_DELAY,
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

        removeMessage(messageEl, removalDelay);

        return index;
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
