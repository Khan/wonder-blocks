module.exports = {
    rootDir: "../../",
    transform: {
        "^.+\\.jsx?$": "<rootDir>/config/jest/test.transform.js",
    },
    testEnvironment: "jest-environment-jsdom",
    globals: {
        SNAPSHOT_INLINE_APHRODITE: true,
    },
    testMatch: ["<rootDir>/**/*.test.js"],
    setupTestFrameworkScriptFile: "<rootDir>/config/jest/test-setup.js",
    moduleNameMapper: {
        "^@khanacademy/(.*)$":
            "<rootDir>/node_modules/@khanacademy/$1/index.js",
    },
    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
};
