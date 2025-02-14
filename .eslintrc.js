// eslint-disable-next-line import/no-commonjs
module.exports = {
    extends: [
        "@khanacademy",
        "@khanacademy/eslint-config/a11y",
        // This config includes rules from @testing-library/jest-dom as well
        "plugin:testing-library/react",
        // This config includes rules from storybook to enforce story best
        // practices
        "plugin:storybook/recommended",
    ],
    plugins: [
        "import",
        "jest",
        "jsdoc",
        "promise",
        "monorepo",
        "react-hooks",
        "@babel",
    ],
    settings: {
        "import/resolver": {
            typescript: {
                project: [
                    "packages/*/tsconfig.json",
                    "packages/tsconfig-shared.json",
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules"],
            },
            node: {
                project: [
                    "packages/*/tsconfig.json",
                    "packages/tsconfig-shared.json",
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules"],
            },
        },
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["build-settings/*.ts"],
            rules: {
                "no-console": "off",
            },
        },
        {
            files: ["utils/*.js"],
            rules: {
                "import/no-commonjs": "off",
            },
        },
        {
            files: ["**/*.test.*"],
            rules: {
                "no-undef": "off",
                "import/no-deprecated": "off",
                "@typescript-eslint/no-require-imports": "off",
            },
        },
        {
            files: ["**/*.stories.tsx"],
            rules: {
                "testing-library/no-await-sync-events": "off",
            },
        },
        {
            files: ["**/*.typestest.*"],
            rules: {
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-unused-expressions": "off",
            },
        },
    ],
    globals: {
        // `no-undef` doesn't support `globalThis`, for details see
        // https://github.com/eslint/eslint/issues/15199.
        globalThis: false, // means it isn't writeable
        // from node_modules/@types/react/index.d.ts
        JSX: false,
        // from node_modules/typescript/lib/lib.dom.d.ts
        DOMHighResTimeStamp: false,
        RequestInfo: false,
        RequestInit: false,
        // from types/assets.d.ts
        PhosphorBold: false,
        PhosphorFill: false,
        PhosphorRegular: false,
        // from types/utility.d.ts
        Empty: false,
        ObjMap: false,
        SpreadType: false,
    },
    rules: {
        "no-restricted-syntax": [
            "error",
            {
                selector: "TSQualifiedName[left.name='React'][right.name='FC']",
                message:
                    "Use of React.FC<Props> is disallowed, use the following alternative: https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/2201682693/TypeScript+for+Flow+Developers#Functional-Components",
            },
        ],

        /**
         * import rules
         */
        "import/named": "off", // NOTE(kevinb): This rule is confused by third-party TypeScript lib defs

        "import/no-unresolved": "error",
        "import/default": "error",
        "import/no-absolute-path": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-deprecated": "error",
        "import/no-commonjs": "error",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/order": [
            "error",
            {
                groups: ["builtin", "external"],
            },
        ],
        "import/newline-after-import": "error",
        "import/no-unassigned-import": "error",
        "import/no-named-default": "error",
        "import/extensions": [
            "error",
            "never",
            {
                ignorePackages: true,
                pattern: {
                    json: "always",
                },
            },
        ],
        // NOTE: This rule reports false positives for cross-module imports using
        // `@khanacademy/wonder-stuff-*`.  This is likely due to a bad interaction
        // with the settings we're using for `import/resolver`.
        // "monorepo/no-relative-import": "error",
        "import/no-restricted-paths": [
            "error",
            {
                zones: [
                    {
                        target: "./packages/(?!.*test.js).*",
                        from: "utils",
                    },
                    {
                        target: "./packages/wonder-blocks.*",
                        from: "./shared-unpackaged",
                    },
                ],
            },
        ],

        /**
         * jest rules
         */
        "jest/no-focused-tests": "error",

        /**
         * jsdoc rules
         */
        "jsdoc/valid-types": "error",

        /**
         * monorepo rules
         */
        "monorepo/no-internal-import": "error",

        /**
         * promise rules
         */
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",

        /**
         * react rules
         */
        "react/jsx-handler-names": "error",
        "react/no-children-prop": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-typos": "error",
        "react/no-string-refs": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unescaped-entities": "error",
        "react/no-deprecated": "error",
        "react/react-in-jsx-scope": "error",
        "react/require-render-return": "error",

        /**
         * react-hooks rules
         */
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",

        /**
         * testing-library rules
         */
        "testing-library/prefer-user-event": "error",
        // These rules results in a lot of false positives
        "testing-library/render-result-naming-convention": "off",
        "testing-library/await-async-utils": "off",
        "testing-library/await-async-query": "off",

        // @khanacademy
        "@khanacademy/jest-await-async-matchers": [
            "error",
            {
                matchers: ["toHaveNoA11yViolations"],
            },
        ],

        /**
         * TypeScript rules
         */
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "@typescript-eslint/prefer-literal-enum-member": "error",
    },
};
