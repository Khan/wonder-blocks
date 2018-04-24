// @flow

// The sizes for the grid component, currently available in
// four different settings (roughly mobile, tablet, desktop, and a
// custom internal one).
const GRID_SIZES = {
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
    internalTools: {
        query: null,
        totalColumns: 12,
        gutterWidth: 32,
        marginWidth: 16,
    },
};

export type GridSize = $Keys<typeof GRID_SIZES>;

export default GRID_SIZES;
