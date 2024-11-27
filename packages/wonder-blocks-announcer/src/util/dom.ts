import {
    type PolitenessLevel,
    RegionDictionary,
} from "../../types/Announcer.types";

/**
 * Create a wrapper element to group regions for a given level
 * @param {string} level Politeness level for grouping
 * @returns {HTMLElement} Wrapper DOM element reference
 */
export function createRegionWrapper(level: PolitenessLevel) {
    const wrapper = document.createElement("div");
    wrapper.id = `wbAWrap-${level}`;
    return wrapper;
}

/**
 * Create multiple live regions for a given level
 * @param {HTMLElement} wrapper Parent DOM element reference to append into
 * @param {string} level Politeness level for grouping
 * @param {number} regionCount Number of regions to create
 * @param {RegionDictionary} dictionary Reference to Announcer dictionary
 * @returns {HTMLElement[]} Array of region elements
 */
export function createDuplicateRegions(
    wrapper: HTMLElement,
    level: PolitenessLevel,
    regionCount: number,
    dictionary: RegionDictionary,
): HTMLElement[] {
    const result = new Array(regionCount).fill(0).map((el, i) => {
        const region = createRegion(level, i, dictionary);
        wrapper.appendChild(region);
        return region;
    });
    return result;
}

/**
 * Create live region element for a given level
 * @param {string} level Politeness level for grouping
 * @param {number} index Incrementor for duplicate regions
 * @param {RegionDef} dictionary Reference to Announcer dictionary to update
 * @param {string} role Role attribute for live regions, defaults to log
 * @returns {HTMLElement} DOM element reference for live region
 */
export function createRegion(
    level: PolitenessLevel,
    index: number,
    dictionary: RegionDictionary,
    role = "log",
) {
    const region = document.createElement("div");
    // TODO: test combinations of attrs
    region.setAttribute("role", role);
    region.setAttribute("aria-live", level);
    region.classList.add("wbARegion");
    const id = `wbARegion-${level}${index}`;
    region.id = id;
    region.setAttribute("data-testid", id);
    dictionary.set(id, {
        id,
        levelIndex: index,
        level,
        element: region,
    });
    return region;
}

/**
 * Remove message element from the DOM
 * @param {HTMLElement} messageElement Dynamically created message element
 * @param {number} removalDelay How long to wait before removing the message
 */
export function removeMessage(
    messageElement: HTMLElement,
    removalDelay: number,
) {
    setTimeout(() => {
        messageElement.remove();
    }, removalDelay);
}
