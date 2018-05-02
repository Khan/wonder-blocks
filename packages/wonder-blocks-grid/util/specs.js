// @flow

import type {GridSize, GridSpec} from "./types.js";

// All possible valid grid sizes
export const VALID_GRID_SIZES: Array<GridSize> = ["small", "medium", "large"];

// The default spec for the grid component, currently available in
// three different settings (roughly mobile, tablet, and desktop).
export const GRID_DEFAULT_SPEC: GridSpec = {
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
export const GRID_INTERNAL_SPEC: GridSpec = {
    large: {
        query: "(min-width: 1px)",
        totalColumns: 12,
        gutterWidth: 32,
        marginWidth: 16,
    },
};

// The default grid used for modals
export const GRID_MODAL_SPEC: GridSpec = {
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
