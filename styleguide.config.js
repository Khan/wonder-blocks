const {createConfig, babel, postcss} = require("webpack-blocks");

module.exports = {
    webpackConfig: createConfig([babel(), postcss()]),
    styleguideDir: "docs",
    assetsDir: "static",
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
            name: "Layout",
            content: "packages/wonder-blocks-layout/docs.md",
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
            name: "Dropdown",
            content: "packages/wonder-blocks-dropdown/docs.md",
            components: [
                "packages/wonder-blocks-dropdown/components/action-menu.js",
                "packages/wonder-blocks-dropdown/components/single-select-menu.js",
                "packages/wonder-blocks-dropdown/components/multi-select-menu.js",
                "packages/wonder-blocks-dropdown/components/select-box.js",
            ],
        },
        {
            name: "ProgressSpinner",
            content: "packages/wonder-blocks-progress-spinner/docs.md",
            components:
                "packages/wonder-blocks-progress-spinner/components/*.js",
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
                        "packages/wonder-blocks-modal/components/modal-panel.js",
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
            components: "packages/wonder-blocks-button/components/button.js",
        },
        {
            name: "Link",
            content: "packages/wonder-blocks-link/docs.md",
            components: "packages/wonder-blocks-link/components/link.js",
        },
        {
            name: "IconButton",
            content: "packages/wonder-blocks-icon-button/docs.md",
            components:
                "packages/wonder-blocks-icon-button/components/icon-button.js",
        },
    ],

    // These values control our custom styles.
    template: {
        favicon: "favicon.ico",
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
    title: "Wonder Blocks",
    styles: {
        StyleGuide: {
            sidebar: {
                width: "initial",
            },
        },
        Logo: {
            logo: {
                background: "no-repeat url('logo.svg')",
                backgroundPosition: "0 0.25em",
                backgroundSize: 32,
                paddingLeft: 40,
                minHeight: "calc(32px + 0.5em)",
                display: "flex",
                alignItems: "center",
            },
        },
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
