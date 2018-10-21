module.exports = {
    transform: {
        "^.+\\.jsx?$": "<rootDir>/utils/jest.transform.js",
    },
    testEnvironment: "jest-environment-jsdom",
    globals: {
        SNAPSHOT_INLINE_APHRODITE: true,
    },
    testMatch: ["<rootDir>/packages/**/*.test.js"],
    setupTestFrameworkScriptFile: "<rootDir>/test-setup.js",

    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
};
