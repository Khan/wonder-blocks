module.exports = {
    transform: {
        "^.+\\.jsx?$": "<rootDir>/utils/jest-vite.transform.js",
    },
    testMatch: ["<rootDir>/vite/*.test.js"],
    testEnvironment: "@khanacademy/jest-environment-vite",
    testEnvironmentOptions: {
        capabilities: {
            browserName: "chrome",
            chromeOptions: {
                args: ["headless", "disable-gpu"],
            },
        },
        collectCoverage: true,
    },
    verbose: false,
    // We remap @khanacademy/wonder-blocks-* imports to point to the source
    // index.js file so that we can compute coverage across source files in
    // all modules.
    moduleNameMapper: {
        "^@khanacademy/(.*)$":
            "<rootDir>/node_modules/@khanacademy/$1/index.js",
    },
    globalSetup: "@khanacademy/jest-environment-vite/dist/global-setup.js",
    globalTeardown:
        "@khanacademy/jest-environment-vite/dist/global-teardown.js",
    setupTestFrameworkScriptFile:
        "@khanacademy/jest-environment-vite/dist/setup.js",
    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
};
