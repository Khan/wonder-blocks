// @flow
import {mix, fade} from "./utils.js";

const offBlack = "#21242c";
const white = "#ffffff";

const Color = {
    // Product
    blue: "#1865f2",
    purple: "#9059ff",
    green: "#00a60e",
    gold: "#ffb100",
    red: "#d92916",

    // Neutral
    offBlack,
    offBlack64: fade(offBlack, 0.64),
    offBlack50: fade(offBlack, 0.5),
    offBlack32: fade(offBlack, 0.32),
    offBlack16: fade(offBlack, 0.16),
    offBlack8: fade(offBlack, 0.08),

    offWhite: "#f7f8fa",
    white,
    white64: fade(white, 0.64),

    // Brand
    darkBlue: "#0a2a66",
    teal: "#00e5ae",
    lightBlue: "#37c5fd",
    pink: "#fa50ae",
};

const SemanticColor = {
    controlDefault: Color.blue,
    controlDestructive: Color.red,
};

// Note: Only blue and red are valid tints for Buttons IconButtons. We
// explicitly export these as a type because flow does not allow const object
// values as types.
export type ValidTints = "#1865f2" | "#d92916";

export {Color as default, SemanticColor, mix, fade};
