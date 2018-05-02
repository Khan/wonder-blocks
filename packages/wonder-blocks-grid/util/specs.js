// @flow

import Spacing from "wonder-blocks-spacing";

import type {GridSize, GridSpec} from "./types.js";

// All possible valid grid sizes
export const VALID_GRID_SIZES: Array<GridSize> = ["small", "medium", "large"];

// The default spec for the grid component, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const GRID_DEFAULT_SPEC: GridSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.m,
        marginWidth: Spacing.m,
    },
    medium: {
        query: "(min-width: 768px) and (max-width: 1023px)",
        totalColumns: 8,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.l,
    },
    large: {
        query: "(min-width: 1024px)",
        totalColumns: 12,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.l,
        hasMaxWidth: true,
    },
};

// Used for internal tools
export const GRID_INTERNAL_SPEC: GridSpec = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.m,
    },
};

// The default used for modals
export const GRID_MODAL_12_SPEC: GridSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.m,
        marginWidth: Spacing.m,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.xxl,
    },
};

// The odd-sized modal
export const GRID_MODAL_11_SPEC: GridSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.m,
        marginWidth: Spacing.m,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 11,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.xxl,
    },
};

// Smaller modal
export const GRID_MODAL_8_SPEC: GridSpec = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.m,
        marginWidth: Spacing.m,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 8,
        gutterWidth: Spacing.xl,
        marginWidth: Spacing.xxl,
    },
};
