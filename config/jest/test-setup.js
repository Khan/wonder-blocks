const {StyleSheetTestUtils} = require("aphrodite");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");
const {configure} = require("@testing-library/dom");
const enzymeMatchers = require("enzyme-matchers");
const enzymeSerializer = require("enzyme-to-json/serializer");

const {unmountAll} = require("../../utils/testing/enzyme-shim.js");
const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame.js");

configure({
    testIdAttribute: "data-test-id",
});

StyleSheetTestUtils.suppressStyleInjection();

// Setup enzyme's react adapter and some other enzyme things.
Enzyme.configure({adapter: new EnzymeAdapter()});
expect.addSnapshotSerializer(enzymeSerializer);

// Copied from jest-enzyme.
// We don't depend on jest-enzyme because it seems to cause the wrong
// JSDOM environment to get used.
const matchers = {};
Object.keys(enzymeMatchers).forEach((matcherKey) => {
    const matcher = {
        [matcherKey](wrapper, ...args) {
            const result = enzymeMatchers[matcherKey].call(
                this,
                wrapper,
                ...args,
            );

            let message = this.isNot ? result.negatedMessage : result.message;

            if (result.contextualInformation.expected) {
                message += `\n${this.utils.RECEIVED_COLOR(
                    result.contextualInformation.expected,
                )}`;
            }

            if (result.contextualInformation.actual) {
                message += `\n${this.utils.EXPECTED_COLOR(
                    result.contextualInformation.actual,
                )}`;
            }

            return {...result, message: () => message};
        },
    }[matcherKey];
    matchers[matcherKey] = matcher;
});
expect.extend(matchers);

beforeEach(() => {
    mockRequestAnimationFrame();
});

afterEach(() => {
    unmountAll();
});
