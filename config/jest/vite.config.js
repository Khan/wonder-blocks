module.exports = {
    rootDir: "../../",
    transform: {
        "^.+\\.jsx?$": "<rootDir>/config/jest/vite.transform.js",
    },
    testMatch: ["<rootDir>/vite-tests/*.test.js"],
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
    moduleNameMapper: {
        "^@khanacademy/(.*)$":
            "<rootDir>/node_modules/@khanacademy/$1/dist/index.js",
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
