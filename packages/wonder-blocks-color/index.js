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

export {Color as default, mix, fade};
