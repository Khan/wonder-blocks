import {remToPx, sizing, tokenValue} from "@khanacademy/wonder-blocks-tokens";
import type {MediaSize, MediaSpec} from "./types";

// All possible valid media sizes
export const VALID_MEDIA_SIZES: Array<MediaSize> = ["small", "medium", "large"];

const SIZE_160_PX = parseInt(remToPx(tokenValue(sizing.size_160)));
const SIZE_240_PX = parseInt(remToPx(tokenValue(sizing.size_240)));
const SIZE_320_PX = parseInt(remToPx(tokenValue(sizing.size_320)));
const SIZE_480_PX = parseInt(remToPx(tokenValue(sizing.size_480)));

const mediaDefaultSpecLargeMarginWidth = SIZE_240_PX;

// The default spec for media layout, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const MEDIA_DEFAULT_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: SIZE_160_PX,
        marginWidth: SIZE_160_PX,
    },
    medium: {
        query: "(min-width: 768px) and (max-width: 1023px)",
        totalColumns: 8,
        gutterWidth: SIZE_320_PX,
        marginWidth: SIZE_240_PX,
    },
    large: {
        query: "(min-width: 1024px)",
        totalColumns: 12,
        gutterWidth: SIZE_320_PX,
        marginWidth: mediaDefaultSpecLargeMarginWidth,
        maxWidth: 1120 + mediaDefaultSpecLargeMarginWidth * 2,
    },
};

// Used for internal tools
export const MEDIA_INTERNAL_SPEC: MediaSpec = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: SIZE_320_PX,
        marginWidth: SIZE_160_PX,
    },
};

// The default used for modals
export const MEDIA_MODAL_SPEC: MediaSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: SIZE_160_PX,
        marginWidth: SIZE_160_PX,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: SIZE_320_PX,
        marginWidth: SIZE_480_PX,
    },
};
