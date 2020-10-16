/* eslint-disable import/no-commonjs */
const babelConfig = require("./build-settings/babel.config.js");

module.exports = function (wallaby) {
    const tests = [
        "./packages/**/__tests__/*.test.js",
        "./shared-unpackaged/**/*.test.js",
    ];

    return {
        tests,

        // Wallaby needs to know about all files that may be loaded because
        // of running a test.
        files: [
            "./packages/**/*.js",
            "shared-unpackaged/**/*.js",
            "utils/**/*.js",
            {pattern: "config/jest/*.js", instrument: false},

            // These paths are excluded.
            ...tests.map((test) => `!${test}`),
        ],

        filesWithNoCoverageCalculated: [
            "packages/wonder-blocks-*/dist/**/*.js",
            "config/jest/*.js",
            "utils/**/*.js", // we ignore these files in .codecov.yml as well
        ],

        // Wallaby does its own compilation of .js files to support its
        // advanced logging features.  Wallaby can't parse the flow and
        // JSX in our source files so need to provide a babel configuration.
        compilers: {
            "packages/**/*.js": wallaby.compilers.babel(babelConfig),
            "shared-unpackaged/**/*.js": wallaby.compilers.babel(babelConfig),
            "utils/**/*.js": wallaby.compilers.babel(babelConfig),
        },

        env: {
            type: "node",
            runner: "node",
        },

        testFramework: "jest",

        setup: function (wallaby) {
            // We require "path" here because this setup function is run
            // in a different context and does not have access to variables
            // from its closure.
            const path = require("path");

            const jestConfig = require(path.join(
                wallaby.localProjectDir,
                "./config/jest/test.config.js",
            ));

            // Prevent our jest configuration from re-compiling the files
            // since wallaby has already done that.
            delete jestConfig.transform;

            // Map @khanacademy/wonder-blocks-foo to /packages/wonder-blocks-foo
            // so that we load the source code for dependencies when running tests.
            jestConfig.moduleNameMapper = {
                "^@khanacademy/(.*)$":
                    wallaby.projectCacheDir + "/packages/$1/index.js",
            };

            wallaby.testFramework.configure(jestConfig);
        },

        // Uncomment to only run tests for files that have been changed.
        // Coverage reports on http://wallabyjs.com/app will be incomplete
        // but initial start will be faster.
        // automaticTestFileSelection: false,

        // Uncomment to only run tests/suites using .only().
        // Coverage reports on http://wallabyjs.com/app will be incomplete
        // but initial start will be faster.
        // runSelectedTestsOnly: true,

        // Uncomment to get additional debug information in the wallaby
        // console when running testts.
        // debug: true,
    };
};
