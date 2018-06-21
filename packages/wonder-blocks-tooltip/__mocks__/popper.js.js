// @flow
// Mock to allow us to run tests that need react-popper or popper.js
// From
import PopperJs from "popper.js";

export default class Popper {
    static placements = PopperJs.placements;
    static Defaults = PopperJs.Defaults;

    constructor() {
        return {
            destroy: () => {},
            scheduleUpdate: () => {},
        };
    }
}
