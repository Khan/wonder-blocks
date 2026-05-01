import {sizing} from "@khanacademy/wonder-blocks-tokens";

import type {MediaSize, MediaSpec} from "./types";

// All possible valid media sizes
export const VALID_MEDIA_SIZES: Array<MediaSize> = ["small", "medium", "large"];

const mediaDefaultSpecLargeMarginWidth = sizing.size_240;

// The default spec for media layout, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const MEDIA_DEFAULT_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: sizing.size_160,
        marginWidth: sizing.size_160,
    },
    medium: {
        query: "(min-width: 768px) and (max-width: 1023px)",
        totalColumns: 8,
        gutterWidth: sizing.size_320,
        marginWidth: sizing.size_240,
    },
    large: {
        query: "(min-width: 1024px)",
        totalColumns: 12,
        gutterWidth: sizing.size_320,
        marginWidth: mediaDefaultSpecLargeMarginWidth,
        maxWidth: 1120 + mediaDefaultSpecLargeMarginWidth * 2,
    },
};

// Used for internal tools
export const MEDIA_INTERNAL_SPEC: MediaSpec = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: sizing.size_320,
        marginWidth: sizing.size_160,
    },
};

// The default used for modals
export const MEDIA_MODAL_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: sizing.size_160,
        marginWidth: sizing.size_160,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: sizing.size_320,
        marginWidth: sizing.size_480,
    },
};
