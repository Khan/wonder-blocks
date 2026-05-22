export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        "@khanacademy/wonder-blocks/no-invalid-bodytext-children": "error",
        "@khanacademy/wonder-blocks/require-logical-properties-for-rtl": [
            "error",
            {
                warnDirectionalTransforms: true,
                warnBackgroundPosition: true,
                warnShadows: true,
                warnGradients: true,
                warnCursorDirections: true,
                warnBackgroundPositionXY: true,
            },
        ],
    },
};
