/* eslint-disable import/no-commonjs */
const {createConfig} = require("@webpack-blocks/webpack");
const babel = require("@webpack-blocks/babel");
const postcss = require("@webpack-blocks/postcss");

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
        },
        {
            name: "Button",
            content: "packages/wonder-blocks-button/docs.md",
        },
        {
            name: "Clickable",
            content: "packages/wonder-blocks-clickable/docs.md",
        },
        {
            name: "Color",
            content: "packages/wonder-blocks-color/docs.md",
        },
        {
            name: "Core",
            content: "packages/wonder-blocks-core/docs.md",
        },
        {
            name: "Data",
            content: "packages/wonder-blocks-data/legacy-docs.md",
        },
        {
            name: "Dropdown",
            content: "packages/wonder-blocks-dropdown/docs.md",
        },
        {
            name: "Form",
            content: "packages/wonder-blocks-form/docs.md",
        },
        {
            name: "Grid",
            content: "packages/wonder-blocks-grid/docs.md",
            components: "packages/wonder-blocks-grid/src/components/*.js",
        },
        {
            name: "Icon",
            content: "packages/wonder-blocks-icon/docs.md",
        },
        {
            name: "IconButton",
            content: "packages/wonder-blocks-icon-button/docs.md",
        },
        {
            name: "Layout",
            content: "packages/wonder-blocks-layout/docs.md",
        },
        {
            name: "Link",
            content: "packages/wonder-blocks-link/docs.md",
        },
        {
            name: "Modal",
            content: "packages/wonder-blocks-modal/docs.md",
        },
        {
            name: "Popover",
            content: "packages/wonder-blocks-popover/docs.md",
        },
        {
            name: "ProgressSpinner",
            content: "packages/wonder-blocks-progress-spinner/docs.md",
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
        },
        {
            name: "Toolbar",
            content: "packages/wonder-blocks-toolbar/docs.md",
        },
        {
            name: "Tooltip",
            content: "packages/wonder-blocks-tooltip/docs.md",
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
