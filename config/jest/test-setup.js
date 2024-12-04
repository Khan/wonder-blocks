const {StyleSheetTestUtils} = require("aphrodite");

const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame");
const {TextEncoder, TextDecoder} = require("util");

StyleSheetTestUtils.suppressStyleInjection();


const attachShims = (targetWindow) => {
    if (!targetWindow.TextEncoder) {
        targetWindow.TextEncoder = TextEncoder;
    }
    if (!targetWindow.TextDecoder) {
        targetWindow.TextDecoder = TextDecoder;
    }
};

const resetWindow = () => {
    attachShims(globalThis);
};
resetWindow();

beforeEach(() => {
    resetWindow();
    mockRequestAnimationFrame();
});
