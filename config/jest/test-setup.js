const {StyleSheetTestUtils} = require("aphrodite");

const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame");

StyleSheetTestUtils.suppressStyleInjection();

beforeEach(() => {
    mockRequestAnimationFrame();
});
