const {StyleSheetTestUtils} = require("aphrodite");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-15");

StyleSheetTestUtils.suppressStyleInjection();

// Setup enzyme's react adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

require("./node_modules/jest-enzyme/lib/index.js");
