export const allModes = {
    // Responsive modes
    small: {
        viewport: "small",
    },
    medium: {
        viewport: "medium",
    },
    large: {
        viewport: "large",
    },
    chromebook: {
        viewport: "chromebook",
    },
    // Simulates 400% browser zoom with a small viewport (320x256). It's useful
    // for snapshots, but it doesn't replace testing with real browser zoom.
    zoom400: {
        viewport: "zoom400",
    },
    // Theming
    themeDefault: {
        theme: "default",
    },
    themeThunderBlocks: {
        theme: "thunderblocks",
    },
    themeSylDark: {
        theme: "syl-dark",
    },
    // NOTE: This will go away when we fully remove the light variants.
    dark: {
        background: "neutralStrong",
    },
    // Accessibility
    "themeDefault rtl": {
        theme: "default",
        direction: "rtl",
    },
};

export const allThemeModes = {
    default: allModes.themeDefault,
    thunderblocks: allModes.themeThunderBlocks,
    sylDark: allModes.themeSylDark,
};
