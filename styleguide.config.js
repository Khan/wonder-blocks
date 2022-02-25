/* eslint-disable import/no-commonjs */
const {createConfig, babel, postcss} = require("webpack-blocks");

const babelConfig = require("./build-settings/babel.config.js")({
    env: () => false,
});

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
                "packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs.js",
                "packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs-item.js",
            ],
        },
        {
            name: "Button",
            content: "packages/wonder-blocks-button/docs.md",
            components:
                "packages/wonder-blocks-button/src/components/button.js",
        },
        {
            name: "Clickable",
            content: "packages/wonder-blocks-clickable/docs.md",
            components: [
                "packages/wonder-blocks-clickable/src/components/clickable-behavior.js",
                "packages/wonder-blocks-clickable/src/components/clickable.js",
            ],
        },
        {
            name: "Color",
            content: "packages/wonder-blocks-color/docs.md",
        },
        {
            name: "Core",
            content: "packages/wonder-blocks-core/docs.md",
            components: [
                "packages/wonder-blocks-core/src/util/add-style.js",
                "packages/wonder-blocks-core/src/components/id-provider.js",
                "packages/wonder-blocks-core/src/util/server.js",
                "packages/wonder-blocks-core/src/components/text.js",
                "packages/wonder-blocks-core/src/components/unique-id-provider.js",
                "packages/wonder-blocks-core/src/components/view.js",
                "packages/wonder-blocks-core/src/components/with-ssr-placeholder.js",
                "packages/wonder-blocks-core/src/hooks/use-unique-id.js",
            ],
        },
        {
            name: "Data",
            content: "packages/wonder-blocks-data/legacy-docs.md",
        },
        {
            name: "Dropdown",
            content: "packages/wonder-blocks-dropdown/docs.md",
            components: [
                "packages/wonder-blocks-dropdown/src/components/action-item.js",
                "packages/wonder-blocks-dropdown/src/components/separator-item.js",
                "packages/wonder-blocks-dropdown/src/components/option-item.js",
                "packages/wonder-blocks-dropdown/src/components/action-menu.js",
                "packages/wonder-blocks-dropdown/src/components/single-select.js",
                "packages/wonder-blocks-dropdown/src/components/multi-select.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-dropdown/src/components/dropdown-core.js",
                    ],
                },
            ],
        },
        {
            name: "Form",
            content: "packages/wonder-blocks-form/docs.md",
            components: [
                "packages/wonder-blocks-form/src/components/checkbox.js",
                "packages/wonder-blocks-form/src/components/radio.js",
                "packages/wonder-blocks-form/src/components/choice.js",
                "packages/wonder-blocks-form/src/components/checkbox-group.js",
                "packages/wonder-blocks-form/src/components/radio-group.js",
                "packages/wonder-blocks-form/src/components/text-field.js",
                "packages/wonder-blocks-form/src/components/labeled-text-field.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-form/src/components/checkbox-core.js",
                        "packages/wonder-blocks-form/src/components/radio-core.js",
                        "packages/wonder-blocks-form/src/components/choice-internal.js",
                        "packages/wonder-blocks-form/src/components/field-heading.js",
                    ],
                },
            ],
        },
        {
            name: "Grid",
            content: "packages/wonder-blocks-grid/docs.md",
            components: "packages/wonder-blocks-grid/src/components/*.js",
        },
        {
            name: "Icon",
            content: "packages/wonder-blocks-icon/docs.md",
            components: "packages/wonder-blocks-icon/src/components/icon.js",
        },
        {
            name: "IconButton",
            content: "packages/wonder-blocks-icon-button/docs.md",
            components:
                "packages/wonder-blocks-icon-button/src/components/icon-button.js",
        },
        {
            name: "Layout",
            content: "packages/wonder-blocks-layout/docs.md",
            components: [
                "packages/wonder-blocks-layout/src/components/media-layout-context.js",
                "packages/wonder-blocks-layout/src/components/media-layout.js",
                "packages/wonder-blocks-layout/src/components/spring.js",
                "packages/wonder-blocks-layout/src/components/strut.js",
            ],
        },
        {
            name: "Link",
            content: "packages/wonder-blocks-link/docs.md",
            components: "packages/wonder-blocks-link/src/components/link.js",
        },
        {
            name: "Modal",
            content: "packages/wonder-blocks-modal/docs.md",
            sections: [
                {
                    name: "Launcher",
                    components: [
                        "packages/wonder-blocks-modal/src/components/modal-launcher.js",
                    ],
                },
                {
                    name: "Modals",
                    components: [
                        "packages/wonder-blocks-modal/src/components/one-pane-dialog.js",
                    ],
                },
                {
                    name: "Building Blocks",
                    content: "packages/wonder-blocks-modal/building-blocks.md",
                    components: [
                        "packages/wonder-blocks-modal/src/components/modal-dialog.js",
                        "packages/wonder-blocks-modal/src/components/modal-panel.js",
                        "packages/wonder-blocks-modal/src/components/modal-header.js",
                        "packages/wonder-blocks-modal/src/components/modal-footer.js",
                    ],
                },
            ],
        },
        {
            name: "Popover",
            content: "packages/wonder-blocks-popover/docs.md",
            components: [
                "packages/wonder-blocks-popover/src/components/popover.js",
                "packages/wonder-blocks-popover/src/components/popover-content.js",
                "packages/wonder-blocks-popover/src/components/popover-content-core.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-popover/src/components/close-button.js",
                        "packages/wonder-blocks-popover/src/components/popover-anchor.js",
                        "packages/wonder-blocks-popover/src/components/popover-dialog.js",
                    ],
                },
            ],
        },
        {
            name: "ProgressSpinner",
            content: "packages/wonder-blocks-progress-spinner/docs.md",
            components:
                "packages/wonder-blocks-progress-spinner/src/components/*.js",
        },
        {
            name: "Spacing",
            content: "packages/wonder-blocks-spacing/docs.md",
        },
        {
            name: "Testing",
            content: "packages/wonder-blocks-testing/docs.md",
        },
        {
            name: "Timing",
            content: "packages/wonder-blocks-timing/docs.md",
            sections: [
                {
                    name: "withActionScheduler",
                    content:
                        "packages/wonder-blocks-timing/src/components/with-action-scheduler.md",
                },
            ],
        },
        {
            name: "Toolbar",
            content: "packages/wonder-blocks-toolbar/docs.md",
            components:
                "packages/wonder-blocks-toolbar/src/components/toolbar.js",
        },
        {
            name: "Tooltip",
            content: "packages/wonder-blocks-tooltip/docs.md",
            components: [
                "packages/wonder-blocks-tooltip/src/components/tooltip.js",
                "packages/wonder-blocks-tooltip/src/components/tooltip-content.js",
            ],
            sections: [
                {
                    name: "Internal Components",
                    private: true,
                    components: [
                        "packages/wonder-blocks-tooltip/src/components/tooltip-tail.js",
                        "packages/wonder-blocks-tooltip/src/components/tooltip-bubble.js",
                    ],
                },
            ],
        },
        {
            name: "Typography",
            content: "packages/wonder-blocks-typography/docs.md",
            components: "packages/wonder-blocks-typography/src/components/*.js",
        },
    ],

    // These values control our custom styles.
    template: {
        favicon: "favicon.ico",
        head: {
            links: [
                {
                    rel: "stylesheet",
                    href: "lato.css",
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
