/**
 * Styleguidist doesn't include regeneratorRuntime by default so in order for
 * code using async functions to work we need to tell styleguidist to import
 * the babel polyfill before any other code.
 */
// eslint-disable-next-line import/no-unassigned-import
import "@babel/polyfill";
