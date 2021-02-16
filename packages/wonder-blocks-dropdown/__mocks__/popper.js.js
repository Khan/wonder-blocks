// @flow
/**
 * Mock to allow us to run tests that need react-popper or popper.js
 *
 * Inspired by:
 *     https://github.com/FezVrasta/popper.js/issues/478#issuecomment-369446079
 */
import PopperJs from "popper.js";

export default class Popper {
    static placements: typeof PopperJs.placements = PopperJs.placements;
    static Defaults: typeof PopperJs.Defaults = PopperJs.Defaults;

    destroy: () => void = () => {};
    scheduleUpdate: () => void = () => {};
}
