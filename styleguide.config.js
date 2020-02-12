/* eslint-disable import/no-commonjs */
const {createConfig, babel, postcss} = require("webpack-blocks");

const babelConfig = require("./build-settings/babel.config.js");

module.exports = {
    webpackConfig: createConfig([babel(babelConfig), postcss()]),
    styleguideDir: "docs",
    assetsDir: "static",
    sections: [
        {
            private: true,
            name: "Wonder Blocks Documentation",
            description:
                "This section only appears to developers. If you want to include content that only appears in the development server, add `private: true` to the section configuration in `styleguide.config.js`.",
        },
        {
            name: "Breadcrumbs",
            content: "packages/wonder-blocks-breadcrumbs/docs.md",
            components: [
                "packages/wonder-blocks-breadcrumbs/components/breadcrumbs.js",
                "packages/wonder-blocks-breadcrumbs/components/breadcrumbs-item.js",
            ],
        },
        {
            name: "Button",
            content: "packages/wonder-blocks-button/docs.md",
            components: "packages/wonder-blocks-button/components/button.js",
        },
        {
            name: "Clickable",
            content: "packages/wonder-blocks-clickable/docs.md",
            components: "packages/wonder-blocks-clickable/components/*.js",
        },
        {
            name: "Color",
            content: "packages/wonder-blocks-color/docs.md",
        },
        {
            name: "Core",
            content: "packages/wonder-blocks-core/docs.md",
            components: [
                "packages/wonder-blocks-core/util/add-style.js",
                "packages/wonder-blocks-core/components/clickable-behavior.js",
                "packages/wonder-blocks-core/components/id-provider.js",
                "packages/wonder-blocks-core/util/server.js",
                "packages/wonder-blocks-core/components/text.js",
                "packages/wonder-blocks-core/components/unique-id-provider.js",
                "packages/wonder-blocks-core/components/view.js",
                "packages/wonder-blocks-core/components/with-ssr-placeholder.js",
            ],
        },
        {
            name: "Data",
            content: "packages/wonder-blocks-data/docs.md",
            components: [
                "packages/wonder-blocks-data/components/data.js",
                "packages/wonder-blocks-data/components/intercept-cache.js",
                "packages/wonder-blocks-data/components/intercept-data.js",
                "packages/wonder-blocks-data/components/track-data.js",
                "packages/wonder-blocks-data/util/request-handler.js",
                "packages/wonder-blocks-data/util/no-cache.js",
            ],
        },
        {
            name: "Dropdown",
            content: "packages/wonder-blocks-dropdown/docs.md",
            components: [
                "packages/wonder-blocks-dropdown/components/action-item.js",
                "packages/wonder-blocks-dropdown/components/separator-item.js",
                "packages/wonder-blocks-dropdown/components/option-item.js",
                "packages/wonder-blocks-dropdown/components/action-menu.js",
                "packages/wonder-blocks-dropdown/components/single-select.js",
                "packages/wonder-blocks-dropdown/components/multi-select.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-dropdown/components/dropdown-core.js",
                    ],
                },
            ],
        },
        {
            name: "Form",
            content: "packages/wonder-blocks-form/docs.md",
            components: [
                "packages/wonder-blocks-form/components/checkbox.js",
                "packages/wonder-blocks-form/components/radio.js",
                "packages/wonder-blocks-form/components/choice.js",
                "packages/wonder-blocks-form/components/checkbox-group.js",
                "packages/wonder-blocks-form/components/radio-group.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-form/components/checkbox-core.js",
                        "packages/wonder-blocks-form/components/radio-core.js",
                        "packages/wonder-blocks-form/components/choice-internal.js",
                    ],
                },
            ],
        },
        {
            name: "Grid",
            content: "packages/wonder-blocks-grid/docs.md",
            components: "packages/wonder-blocks-grid/components/*.js",
        },
        {
            name: "Icon",
            content: "packages/wonder-blocks-icon/docs.md",
            components: "packages/wonder-blocks-icon/components/icon.js",
        },
        {
            name: "IconButton",
            content: "packages/wonder-blocks-icon-button/docs.md",
            components:
                "packages/wonder-blocks-icon-button/components/icon-button.js",
        },
        {
            name: "Layout",
            content: "packages/wonder-blocks-layout/docs.md",
            components: "packages/wonder-blocks-layout/components/*.js",
        },
        {
            name: "Link",
            content: "packages/wonder-blocks-link/docs.md",
            components: "packages/wonder-blocks-link/components/link.js",
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
                        "packages/wonder-blocks-modal/components/one-pane-dialog/one-pane-dialog.js",
                    ],
                },
                {
                    name: "Building Blocks",
                    content: "packages/wonder-blocks-modal/building-blocks.md",
                    components: [
                        "packages/wonder-blocks-modal/components/modal-dialog.js",
                        "packages/wonder-blocks-modal/components/modal-panel.js",
                        "packages/wonder-blocks-modal/components/modal-header.js",
                        "packages/wonder-blocks-modal/components/modal-footer.js",
                    ],
                },
            ],
        },
        {
            name: "Popover",
            content: "packages/wonder-blocks-popover/docs.md",
            components: [
                "packages/wonder-blocks-popover/components/popover.js",
                "packages/wonder-blocks-popover/components/popover-content.js",
                "packages/wonder-blocks-popover/components/popover-content-core.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-popover/components/close-button.js",
                        "packages/wonder-blocks-popover/components/popover-anchor.js",
                        "packages/wonder-blocks-popover/components/popover-dialog.js",
                    ],
                },
            ],
        },
        {
            name: "ProgressSpinner",
            content: "packages/wonder-blocks-progress-spinner/docs.md",
            components:
                "packages/wonder-blocks-progress-spinner/components/*.js",
        },
        {
            name: "Spacing",
            content: "packages/wonder-blocks-spacing/docs.md",
        },
        {
            name: "Timing",
            content: "packages/wonder-blocks-timing/docs.md",
            sections: [
                {
                    name: "withActionScheduler",
                    content:
                        "packages/wonder-blocks-timing/components/with-action-scheduler.md",
                },
            ],
        },
        {
            name: "Toolbar",
            content: "packages/wonder-blocks-toolbar/docs.md",
            components: "packages/wonder-blocks-toolbar/components/toolbar.js",
        },
        {
            name: "Tooltip",
            content: "packages/wonder-blocks-tooltip/docs.md",
            components: [
                "packages/wonder-blocks-tooltip/components/tooltip.js",
                "packages/wonder-blocks-tooltip/components/tooltip-content.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-tooltip/components/tooltip-tail.js",
                        "packages/wonder-blocks-tooltip/components/tooltip-bubble.js",
                    ],
                },
            ],
        },
        {
            name: "Typography",
            content: "packages/wonder-blocks-typography/docs.md",
            components: "packages/wonder-blocks-typography/components/*.js",
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
                    href:
                        "https://fonts.googleapis.com/css?family=Lato:400,400i,700,900",
                },
                {
                    // Load Inconsolata from Google Fonts.
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css?family=Inconsolata",
                },
                {
                    rel: "stylesheet",
                    href: "noto.css",
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
