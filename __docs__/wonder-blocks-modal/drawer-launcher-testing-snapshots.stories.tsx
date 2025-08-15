import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {FlexibleDialog, DrawerLauncher} from "@khanacademy/wonder-blocks-modal";

import type {ModalElement} from "../../packages/wonder-blocks-modal/src/util/types";

import {allModes} from "../../.storybook/modes";
import {reallyLongText} from "../components/text-for-testing";

const customViewports = {
    phone: {
        name: "phone",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    tablet: {
        name: "tablet",
        styles: {
            width: "640px",
            height: "960px",
        },
    },
    desktop: {
        name: "desktop",
        styles: {
            width: "1024px",
            height: "768px",
        },
    },
} as const;

const DefaultModal = (): ModalElement => (
    <FlexibleDialog
        title="Single-line title"
        content={
            <View>
                <BodyText>{reallyLongText}</BodyText>
            </View>
        }
    />
);

export default {
    title: "Packages / Modal / Testing / Snapshots / DrawerLauncher",
    component: DrawerLauncher,
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                "default rtl": allModes["themeDefault rtl"],
                small: allModes.small,
                large: allModes.large,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof DrawerLauncher>;

type StoryComponentType = StoryObj<typeof DrawerLauncher>;

/**
 * Visual snapshots showing the different drawer variants in their opened states.
 * These stories demonstrate the positioning and layout of the drawers.
 */

/**
 * InlineStart drawer in LTR mode - positioned on the left side
 */
export const InlineStartLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineStart"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * InlineStart drawer in RTL mode - positioned on the right side
 */
export const InlineStartRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="inlineStart"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * InlineEnd drawer in LTR mode - positioned on the right side
 */
export const InlineEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * InlineEnd drawer in RTL mode - positioned on the left side
 */
export const InlineEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="inlineEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * BlockEnd drawer - positioned at the bottom in both LTR and RTL modes
 */
export const BlockEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="blockEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * BlockEnd drawer - positioned at the bottom in both LTR and RTL modes
 */
export const BlockEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="blockEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        chromatic: {
            modes: {
                desktop: {
                    viewport: "desktop",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const MobileInlineEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        viewport: {
            defaultViewport: "phone",
        },
        chromatic: {
            modes: {
                mobile: {
                    viewport: "phone",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const MobileInlineEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="inlineEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        viewport: {
            defaultViewport: "phone",
        },
        chromatic: {
            modes: {
                mobile: {
                    viewport: "phone",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const MobileBlockEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="blockEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        viewport: {
            defaultViewport: "phone",
        },
        chromatic: {
            modes: {
                mobile: {
                    viewport: "phone",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const MobileBlockEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="blockEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        viewport: {
            defaultViewport: "phone",
        },
        chromatic: {
            modes: {
                mobile: {
                    viewport: "phone",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Tablet responsive behavior
 */
export const TabletInlineEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        viewport: {
            defaultViewport: "tablet",
        },
        chromatic: {
            modes: {
                tablet: {
                    viewport: "tablet",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Tablet responsive behavior
 */
export const TabletInlineEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="inlineEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        viewport: {
            defaultViewport: "tablet",
        },
        chromatic: {
            modes: {
                tablet: {
                    viewport: "tablet",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const TabletBlockEndLTR: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="blockEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        viewport: {
            defaultViewport: "tablet",
        },
        chromatic: {
            modes: {
                mobile: {
                    viewport: "tablet",
                },
            },
        },
        docs: {disable: true},
    },
};

/**
 * Mobile/tablet responsive behavior
 */
export const TabletBlockEndRTL: StoryComponentType = {
    render: () => (
        <div dir="rtl">
            <DrawerLauncher
                modal={DefaultModal}
                alignment="blockEnd"
                opened={true}
                animated={false}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        viewport: {
            defaultViewport: "tablet",
        },
        chromatic: {
            modes: {
                tablet: {
                    viewport: "tablet",
                },
            },
        },
        docs: {disable: true},
    },
};
