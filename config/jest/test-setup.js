const {StyleSheetTestUtils} = require("aphrodite");
const {configure} = require("@testing-library/dom");

const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame");

configure({
    testIdAttribute: "data-test-id",
});

StyleSheetTestUtils.suppressStyleInjection();

beforeEach(() => {
    mockRequestAnimationFrame();
});
