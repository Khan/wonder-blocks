/**
 * Alternate index for cycling through elements
 * @param {number} index Previous element index (0 or 1)
 * @returns {number} New index
 */
export function alternateIndex(index: number, count: number): number {
    index += 1;
    index = index % count;
    return index;
}
