/**
 * jest config for running vite tests
 *
 * vite uses jest as a test runner but it uses a custom jest
 * environment which runs vite tests inside of a real browser
 * using selenium.
 *
 * We need a separate config so that we can specify which tests
 * we want to run using jest-environment-vite.
 */
module.exports = {
    rootDir: "../../",
    transform: {
        "^.+\\.jsx?$": "<rootDir>/config/jest/vite.transform.js",
    },
    testMatch: ["<rootDir>/**/*.vite_test.js"],
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
    setupFilesAfterEnv: ["@khanacademy/jest-environment-vite/dist/setup.js"],
    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/*.test.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
};
