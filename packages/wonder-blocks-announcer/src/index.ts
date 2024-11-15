// TODO: publish wonder-blocks-style package WB-1776
// import {srOnly} from "../../wonder-blocks-style/src/styles/a11y";
import type {
    PolitenessLevel,
    RegionDef,
    RegionDictionary,
    RegionFactory,
} from "./announcer.types";

const TIMEOUT_DELAY = 5000;
let announcer: Announcer | null = null;

export type SendMessageProps = {
    message: string;
    level?: PolitenessLevel;
    removalDelay?: number;
};

/**
 * Public API method to send screen reader messages.
 * @param {string} message The message to send.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} removalDelay Optional duration to remove a message after sending. Defaults to 5000ms.
 * @returns {string} IDREF for targeted live region element
 */
export function sendMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    removalDelay,
}: SendMessageProps): string {
    announcer = Announcer.getInstance();

    if (typeof jest === "undefined") {
        setTimeout(() => {
            return announcer?.announce(message, level, removalDelay);
        }, 100);
    } else {
        // If we are in a test environment, announce without waiting
        return announcer.announce(message, level, removalDelay);
    }
    return "";
}
/**
 * Public API method to clear screen reader messages after sending.
 * Clears all regions by default.
 * @param {string} id Optional id of live region element to clear.
 */
export function clearMessages(id?: string) {
    if (id && document?.getElementById(id)) {
        announcer?.clear(id);
    } else if (document) {
        announcer?.clear();
    }
}

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
                this.rebootForHMR();
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

        const aWrapper = this.createRegionWrapper("assertive");
        this.createDuplicateRegions(aWrapper, "assertive");
        this.node?.appendChild(aWrapper);

        const pWrapper = this.createRegionWrapper("polite");
        this.createDuplicateRegions(pWrapper, "polite");
        this.node.appendChild(pWrapper);

        document.body.prepend(this.node);
    }
    /**
     * Recover in the event regions get lost
     * This happens in Storybook when saving a file:
     * Announcer exists, but it loses the connection to element Refs
     */
    rebootForHMR() {
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
     * Create a wrapper element to group regions for a given level
     * @param {string} level Politeness level for grouping
     * @returns {HTMLElement} Wrapper DOM element reference
     */
    createRegionWrapper(level: PolitenessLevel) {
        const wrapper = document.createElement("div");
        wrapper.id = `wbAWrap-${level}`;
        return wrapper;
    }

    /**
     * Create multiple live regions for a given level
     * @param {HTMLElement} wrapper Parent DOM element reference to append into
     * @param {string} level Politeness level for grouping
     * @returns {HTMLElement[]} Array of region elements
     */
    createDuplicateRegions(
        wrapper: HTMLElement,
        level: PolitenessLevel,
    ): HTMLElement[] {
        const result = new Array(this.regionFactory.count)
            .fill(0)
            .map((el, i) => {
                const region = this.createRegion(level, i);
                wrapper.appendChild(region);
                return region;
            });
        return result;
    }

    /**
     * Create live region element for a given level
     * @param {string} level Politeness level for grouping
     * @param {number} index Incrementor for duplicate regions
     * @param {string} role Role attribute for live regions, defaults to log
     * @returns {HTMLElement} DOM element reference for live region
     */
    createRegion(level: PolitenessLevel, index: number, role = "log") {
        const region = document.createElement("div");
        // TODO: test combinations of attrs
        region.setAttribute("role", role);
        region.setAttribute("aria-live", level);
        region.classList.add("wbARegion");
        const id = `wbARegion-${level}${index}`;
        region.id = id;
        region.setAttribute("data-testid", id);
        this.dictionary.set(id, {
            id,
            levelIndex: index,
            level,
            element: region,
        });
        return region;
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
            return "";
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
        removalDelay: number = TIMEOUT_DELAY,
    ): number {
        // Starting index for a given level
        let index =
            level === "assertive"
                ? this.regionFactory.aIndex
                : this.regionFactory.pIndex;

        // empty region at the previous index
        regionList[index].element.replaceChildren();

        // overwrite index passed in to update locally
        index = this.alternateIndex(index);

        // create element for new message
        const messageEl = document.createElement("p");
        messageEl.textContent = message;

        // append message to new index
        regionList[index].element.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, removalDelay);

        return index;
    }

    /**
     * Alternate index for cycling through elements
     * @param {number} index Previous element index (0 or 1)
     * @returns {number} New index
     */
    alternateIndex(index: number): number {
        index += 1;
        index = index % this.regionFactory.count;
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
