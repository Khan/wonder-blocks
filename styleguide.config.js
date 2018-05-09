const {createConfig, babel, postcss} = require("webpack-blocks");

module.exports = {
    webpackConfig: createConfig([babel(), postcss()]),
    styleguideDir: "docs",
    sections: [
        {
            name: "Typography",
            content: "packages/wonder-blocks-typography/docs.md",
            components: "packages/wonder-blocks-typography/components/*.js",
        },
        {
            name: "Color",
            content: "packages/wonder-blocks-color/docs.md",
        },
        {
            name: "Spacing",
            content: "packages/wonder-blocks-spacing/docs.md",
        },
        {
            name: "Grid (Prototype)",
            content: "packages/wonder-blocks-grid/docs.md",
            components: "packages/wonder-blocks-grid/components/*.js",
        },
        {
            name: "Core",
            content: "packages/wonder-blocks-core/docs.md",
            components: "packages/wonder-blocks-core/components/*.js",
        },
        {
            name: "Modal",
            content: "packages/wonder-blocks-modal/docs.md",
            sections: [
                {
                    name: "Launcher",
                    components: [
                        "packages/wonder-blocks-modal/components/modal-launcher.js",
                    ],
                },
                {
                    name: "Modals",
                    components: [
                        "packages/wonder-blocks-modal/components/standard-modal.js",
                        "packages/wonder-blocks-modal/components/two-column-modal.js",
                        "packages/wonder-blocks-modal/components/one-column-modal.js",
                    ],
                },
                {
                    name: "Building Blocks",
                    content: "packages/wonder-blocks-modal/building-blocks.md",
                    components: [
                        "packages/wonder-blocks-modal/components/modal-dialog.js",
                        "packages/wonder-blocks-modal/components/modal-content-pane.js",
                        "packages/wonder-blocks-modal/components/modal-content.js",
                        "packages/wonder-blocks-modal/components/modal-title-bar.js",
                        "packages/wonder-blocks-modal/components/modal-header.js",
                        "packages/wonder-blocks-modal/components/modal-footer.js",
                    ],
                },
            ],
        },
        {
            name: "Button",
            content: "packages/wonder-blocks-button/docs.md",
            components: "packages/wonder-blocks-button/components/*.js",
            ignore: ["**/components/button-core.js"],
        },
    ],

    // These values control our custom styles.
    template: {
        head: {
            links: [
                {
                    // Load Lato from Google Fonts.
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css?family=Lato",
                },
            ],
        },
    },
    theme: {
        fontFamily: {
            // Apply Lato to the Styleguidist UI.
            base: '"Lato", sans-serif',
        },
    },
    styles: {
        Playground: {
            preview: {
                // Apply Lato to example areas.
                fontFamily: '"Lato", sans-serif',

                // Make the preview area resizable.
                resize: "both",
                overflow: "auto",

                // Allow the preview content to grow to the full size, using
                // absolute-positioning, and left/right/top/bottom all set to 0.
                position: "relative",
            },
        },
    },
};
