const {StyleSheetTestUtils} = require("aphrodite");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

StyleSheetTestUtils.suppressStyleInjection();

// Setup enzyme's react adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

require("jest-enzyme/lib/index.js");
