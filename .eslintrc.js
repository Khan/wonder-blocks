module.exports = {
    extends: [
        "@khanacademy",
        // This config includes rules from @testing-library/jest-dom as well
        "plugin:testing-library/react",
    ],
    plugins: ["import", "jest", "promise", "monorepo"],
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["utils/*.js"],
            rules: {
                "import/no-commonjs": "off",
            },
        },
    ],
    rules: {
        "flowtype/require-exact-type": ["error", "always"],
        "flowtype/no-types-missing-file-annotation": "error",
        "import/no-unresolved": "error",
        "import/named": "error",
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
            "always",
            {
                ignorePackages: true,
            },
        ],
        "jest/no-focused-tests": "error",
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",
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
        "monorepo/no-internal-import": "error",
        "monorepo/no-relative-import": "error",
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

        // testing-library
        "testing-library/prefer-user-event": "error",
        // These rules results in a lot of false positives
        "testing-library/render-result-naming-convention": "off",
        "testing-library/await-async-utils": "off",
        "testing-library/await-async-query": "off",
    },
};
