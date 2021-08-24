const {StyleSheetTestUtils} = require("aphrodite");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");
const {configure} = require("@testing-library/dom");

const {unmountAll} = require("../../utils/testing/enzyme-shim.js");

configure({
    testIdAttribute: "data-test-id",
});

StyleSheetTestUtils.suppressStyleInjection();

// Setup enzyme's react adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

require("jest-enzyme/lib/index.js");

afterEach(() => {
    unmountAll();
});
