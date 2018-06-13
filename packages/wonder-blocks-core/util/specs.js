// @flow

import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {MediaSize, MediaSpec} from "./types.js";

// All possible valid media sizes
export const VALID_MEDIA_SIZES: Array<MediaSize> = ["small", "medium", "large"];

// The default spec for media layout, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const MEDIA_DEFAULT_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.medium,
        marginWidth: Spacing.medium,
    },
    medium: {
        query: "(min-width: 768px) and (max-width: 1023px)",
        totalColumns: 8,
        gutterWidth: Spacing.xLarge,
        marginWidth: Spacing.large,
    },
    large: {
        query: "(min-width: 1024px)",
        totalColumns: 12,
        gutterWidth: Spacing.xLarge,
        marginWidth: Spacing.large,
        hasMaxWidth: true,
    },
};

// Used for internal tools
export const MEDIA_INTERNAL_SPEC: MediaSpec = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: Spacing.xLarge,
        marginWidth: Spacing.medium,
    },
};

// The default used for modals
export const MEDIA_MODAL_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.medium,
        marginWidth: Spacing.medium,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: Spacing.xLarge,
        marginWidth: Spacing.xxLarge,
    },
};
