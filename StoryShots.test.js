const {StyleSheetTestUtils} = require("aphrodite");
const initStoryshots = require("@storybook/addon-storyshots").default;

StyleSheetTestUtils.suppressStyleInjection();

initStoryshots();
