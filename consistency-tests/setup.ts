/**
 * Setup file for consistency-tests to ensure Jest DOM and other types are available.
 * This file is referenced in the consistency-tests tsconfig.json to ensure
 * all necessary types are loaded.
 */

// Import type definitions to make them available to TypeScript
// These imports have no runtime behavior, they only affect TypeScript compilation
/* eslint-disable import/no-unassigned-import, import/no-unresolved */
import "../types/testing-library_jest-dom";
import "../types/jest-extended";
import "../types/assets";
