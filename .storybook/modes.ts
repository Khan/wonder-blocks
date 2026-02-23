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

// TODO: Remove in favour of allThemeModesonce fully implemnting sylDark
export const themeModes = {
    default: allModes.themeDefault,
    thunderblocks: allModes.themeThunderBlocks,
};

export const allThemeModes = {
    ...themeModes,
    sylDark: allModes.themeSylDark,
};