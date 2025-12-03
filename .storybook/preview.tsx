import * as React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme";
import {Decorator} from "@storybook/react-vite";
import {DocsContainer} from "@storybook/addon-docs/blocks";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {initAnnouncer} from "@khanacademy/wonder-blocks-announcer";
import Link from "@khanacademy/wonder-blocks-link";
import {
    ThemeSwitcherContext,
    ThemeSwitcher,
    THEME_DATA_ATTRIBUTE,
} from "@khanacademy/wonder-blocks-theming";
import {Preview} from "@storybook/react-vite";

// Import the Wonder Blocks CSS variables
import "@khanacademy/wonder-blocks-tokens/styles.css";

/**
 * WB Official breakpoints
 * @see https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2099970518/Layout+Breakpoints
 */
const wbViewports = {
    small: {
        name: "Small",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    medium: {
        name: "Medium",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    large: {
        name: "Large",
        styles: {
            width: "1024px",
            height: "768px",
        },
    },
    chromebook: {
        name: "Chromebook",
        styles: {
            width: "1366px",
            height: "768px",
        },
    },
    wide: {
        name: "Wide",
        styles: {
            width: "1700px",
            height: "900px",
        },
    },
};

/**
 * This is a custom DocsContainer that uses the current theme in MDX pages.
 *
 * It is useful when we want to use the "Theme" toolbar to switch between
 * themes in MDX pages (like "Foundations > Using color").
 */
function DocsContainerWithTheme({children, context, ...props}) {
    const theme = context.store.userGlobals.globals.theme;

    return (
        <DocsContainer context={context} {...props}>
            <ThemeSwitcher theme={theme}>{children}</ThemeSwitcher>
        </DocsContainer>
    );
}

const parameters: Preview["parameters"] = {
    a11y: {
        test: "error",
    },
    backgrounds: {
        default: "baseDefault",
        options: {
            baseDefault: {
                name: "baseDefault",
                value: semanticColor.core.background.base.default,
            },
            neutralStrong: {
                name: "neutralStrong",
                value: semanticColor.core.background.neutral.strong,
            },
            baseSubtle: {
                name: "baseSubtle",
                value: semanticColor.core.background.base.subtle,
            },
        },
    },
    initialGlobals: {
        // 👇 Set the initial background color
        backgrounds: {value: "baseDefault"},
    },
    // https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
    options: {
        // Allowing stories to be sorted alphabetically. This means that we will
        // display the stories (or examples first), then we will display all the
        // mdx pages under __docs__.
        storySort: {
            order: ["Components", "**/__docs__/**", "Overview"],
        },
    },
    docs: {
        // Customize the DocsContainer to use the WB theme in MDX pages.
        container: DocsContainerWithTheme,
        toc: {
            // Useful for MDX pages like "Using color".
            headingSelector: "h2, h3, h4",
            // Prevents including generic headings like "Stories" and "Usage".
            ignoreSelector:
                ".docs-story h2, .docs-story h3, .sbdocs #stories, .sbdocs #usage, .sbdocs-subtitle",
        },
        theme: wonderBlocksTheme,
        components: {
            // Override the default link component to use the WB Link component.
            a: Link,
        },
    },
    viewport: {
        options: wbViewports,
    },
};

const withThemeSwitcher: Decorator = (Story, {globals: {theme}}) => {
    // Keep track of the theme locally so we can re-render the story after the
    // attribute is updated.
    const [localTheme, setLocalTheme] = React.useState(null);
    React.useEffect(() => {
        if (theme) {
            // Switch the body class based on the theme.
            document.body.setAttribute(THEME_DATA_ATTRIBUTE, theme);
            setLocalTheme(theme);
        }
    }, [theme]);

    return (
        <ThemeSwitcherContext.Provider value={theme} key={localTheme}>
            <ThemeSwitcher theme={theme}>
                <Story />
            </ThemeSwitcher>
        </ThemeSwitcherContext.Provider>
    );
};

/**
 * Sets the dir attribute on document.documentElement and wraps story with dir div.
 * This ensures portaled content (like modals) can detect the direction.
 */
const withLanguageDirection: Decorator = (Story, context) => {
    React.useEffect(() => {
        // Only set the dir attribute on the document.documentElement if we are in a story
        // so docs pages don't have the dir attribute set.
        if (context.viewMode === "story") {
            if (context.globals.direction === "rtl") {
                document.documentElement.setAttribute("dir", "rtl");
            } else {
                document.documentElement.setAttribute("dir", "ltr");
            }
        }

        // Cleanup on unmount
        return () => {
            document.documentElement.removeAttribute("dir");
        };
    }, [context.globals.direction]);

    if (context.globals.direction === "rtl") {
        return (
            <div dir="rtl">
                <Story />
            </div>
        );
    } else {
        return <Story />;
    }
};

/**
 * Wraps a story with styling that simulates [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom).
 *
 * Note: It is still important to test with real browser zoom in different
 * browsers. For example, using the CSS zoom property in Safari looks a bit
 * different than when you zoom in the browser.
 */
const withZoom: Decorator = (Story, context) => {
    if (context.globals.zoom) {
        return (
            <div style={{zoom: context.globals.zoom}}>
                <Story />
            </div>
        );
    }
    return <Story />;
};

/**
 * Injects the Live Region Announcer for various components
 */
const withAnnouncer: Decorator = (Story, {parameters: {addBodyClass}}) => {
    // Allow stories to specify a CSS body class
    if (addBodyClass) {
        document.body.classList.add(addBodyClass);
    }
    React.useEffect(() => {
        // initialize Announcer on load to render Live Regions earlier
        initAnnouncer();
        return () => {
            if (addBodyClass) {
                // Remove body class when changing stories
                document.body.classList.remove(addBodyClass);
            }
        };
    }, [addBodyClass]);
    return <Story />;
};

const preview: Preview = {
    parameters,
    decorators: [
        withThemeSwitcher,
        withLanguageDirection,
        withZoom,
        withAnnouncer,
    ],
    globalTypes: {
        // Allow the user to select a theme from the toolbar.
        theme: {
            description: "Global theme for components",
            toolbar: {
                // The label to show for this toolbar item
                title: "Theme",
                icon: "switchalt",
                // Array of plain string values or MenuItem shape (see below)
                items: [
                    {
                        value: "default",
                        icon: "circlehollow",
                        title: "Wonder Blocks (default)",
                    },
                    {
                        value: "thunderblocks",
                        icon: "lightning",
                        title: "Shape Your Learning (Thunder Blocks)",
                    },
                ],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
        direction: {
            description: "The language direction to use",
            toolbar: {
                title: "Language Direction",
                icon: "globe",
                items: [
                    {
                        value: "ltr",
                        icon: "arrowrightalt",
                        title: "Left to Right",
                    },
                    {
                        value: "rtl",
                        icon: "arrowleftalt",
                        title: "Right to Left",
                    },
                ],
                dynamicTitle: true,
            },
        },
        zoom: {
            description: "Preset zoom level",
            toolbar: {
                title: "Zoom Presets",
                icon: "zoom",
                items: [
                    {
                        // undefined so there is no zoom value set
                        value: undefined,
                        title: "default",
                    },
                    {
                        value: "2",
                        title: "200%",
                    },
                    {
                        value: "4",
                        title: "400%",
                    },
                ],
            },
        },
    },

    tags: ["autodocs"],
};

export default preview;
