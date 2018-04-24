// @flow

import type {GridSize, GridSizes} from "./types.js";

// All possible valid grid sizes
export const VALID_GRID_SIZES: Array<GridSize> = ["small", "medium", "large"];

// The sizes for the grid component, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const GRID_DEFAULT_SIZES: GridSizes = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: 16,
        marginWidth: 16,
    },
    medium: {
        query: "(min-width: 768px) and (max-width: 1023px)",
        totalColumns: 8,
        gutterWidth: 32,
        marginWidth: 24,
    },
    large: {
        query: "(min-width: 1024px)",
        totalColumns: 12,
        gutterWidth: 32,
        marginWidth: 24,
        hasMaxWidth: true,
    },
};

// Used for internal tools
export const GRID_INTERNAL_SIZES: GridSizes = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: 32,
        marginWidth: 16,
    },
};

// The default used for modals
export const GRID_MODAL_12_SIZES: GridSizes = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: 16,
        marginWidth: 16,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: 32,
        marginWidth: 64,
    },
};

// The odd-sized modal
export const GRID_MODAL_11_SIZES: GridSizes = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: 16,
        marginWidth: 16,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 11,
        gutterWidth: 32,
        marginWidth: 64,
    },
};

// Smaller modal
export const GRID_MODAL_8_SIZES: GridSizes = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: 16,
        marginWidth: 16,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 8,
        gutterWidth: 32,
        marginWidth: 64,
    },
};
