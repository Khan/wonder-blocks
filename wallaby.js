const babelConfig = require("./build-settings/babel.config.js");

module.exports = function (wallaby) {
    return {
        files: [
            'packages/wonder-blocks-*/**/*.js',
            'package.json', // <--
            { pattern: 'config/jest/*.js', instrument: false },
            'shared-unpackaged/**/*.js',
            'utils/**/*.js',
            'packages/wonder-blocks-*/package.json',
            { pattern: 'packages/wonder-blocks-*/dist/**/*.js', instrument: false },
            '!packages/wonder-blocks-*/**/*.test.js',
            '!packages/wonder-blocks-*/node_modules/**',
            '!shared-unpackaged/**/*.test.js',
        ],

        filesWithNoCoverageCalculated: [
            'config/jest/*.js',
            'packages/wonder-blocks-*/dist/**/*.js',
            'utils/**/*.js',
        ],

        tests: [
            'packages/wonder-blocks-*/**/*.test.js',
            'shared-unpackaged/**/*.test.js',
        ],

        compilers: {
            "packages/wonder-blocks-*/**/*.js": wallaby.compilers.babel(babelConfig),
            "shared-unpackaged/**/*.js": wallaby.compilers.babel(babelConfig),
            "utils/**/*.js": wallaby.compilers.babel(babelConfig),
        },

        env: {
            type: 'node',
            runner: 'node',
            params: {
                runner: "--max_old_space_size=4096"
            },
        },

        testFramework: 'jest',

        setup: function (wallaby) {
            const path = require("path");
            const jestConfigPath = path.join(
                wallaby.localProjectDir,
                "./config/jest/test.config.js",
            );
            const jestConfig = require(jestConfigPath);
            delete jestConfig.transform;
            jestConfig.moduleNameMapper = {
                "^@khanacademy/(.*)$":
                    wallaby.projectCacheDir + "/packages/$1",
            };
            // for example:
            // jestConfig.globals = { "__DEV__": true };
            wallaby.testFramework.configure(jestConfig);
        },

        // debug: true,
    };
};
