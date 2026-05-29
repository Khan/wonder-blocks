export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        "@khanacademy/wonder-blocks/no-invalid-bodytext-children": "error",
        "@khanacademy/wonder-blocks/require-logical-properties-for-rtl": [
            "error",
            {
                // Only the value-heuristics that reliably indicate a real RTL
                // bug are enabled. The others were producing almost entirely
                // false positives (e.g. `translateX(-50%)` centering, symmetric
                // gradients, X-offset shadows, block-axis `backgroundPositionY`)
                // that have no logical-property fix and so forced suppressions
                // on correct code. This matches the rule's own defaultOptions.
                warnBackgroundPosition: true,
                warnDirectionalTransforms: false,
                warnShadows: false,
                warnGradients: false,
                warnCursorDirections: false,
                warnBackgroundPositionXY: false,
            },
        ],
    },
};
