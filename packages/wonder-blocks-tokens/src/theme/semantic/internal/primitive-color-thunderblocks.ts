import {fade} from "../../../util/color-utils";

// Base colors
const black = "#191918";
const white = "#FFFFFF";

/**
 * The color primitives for the Thunder Blocks theme.
 *
 * NOTE: These colors are for internal use only and should not be used directly
 * in components. Use the semantic colors instead.
 *
 * @see semantic-color-thunderblocks.ts
 */
export const color = {
    // Red
    red_90: "#FEF4F4",
    red_80: "#FDE9E9",
    red_70: "#FDDFDF",
    red_60: "#FBB1B1",
    red_50: "#F97F7F",
    red_40: "#ED5656",
    red_30: "#E22D2D",
    red_20: "#BE2626",
    red_10: "#8E1C1C",
    red_05: "#621414",
    // Orange
    orange_90: "#FEF4F2",
    orange_80: "#FEE9E5",
    orange_70: "#FEDFD8",
    orange_60: "#FEBFB1",
    orange_50: "#FAA185",
    orange_40: "#F97B4F",
    orange_30: "#F8551A",
    orange_20: "#C8481A",
    orange_10: "#983C1A",
    orange_05: "#672912",
    // Yellow
    yellow_90: "#FEF8E7",
    yellow_80: "#FEF1D0",
    yellow_70: "#FEEAB8",
    yellow_60: "#FEE7AD",
    yellow_50: "#FDD673",
    yellow_40: "#FCC539",
    yellow_30: "#FCB706",
    yellow_20: "#D69900",
    yellow_10: "#966B00",
    yellow_05: "#5F4500",
    // Green
    green_90: "#F1FBF1",
    green_80: "#E3F7E3",
    green_70: "#D5F3D5",
    green_60: "#BCEBBB",
    green_50: "#97D38E",
    green_40: "#72BB82",
    green_30: "#579F6C",
    green_20: "#3C6D4A",
    green_10: "#2C5037",
    green_05: "#24432D",
    // Cyan
    cyan_90: "#EEF7FE",
    cyan_80: "#DDF0FE",
    cyan_70: "#CCE9FE",
    cyan_60: "#A9DAFD",
    cyan_50: "#87CBFC",
    cyan_40: "#57BAFD",
    cyan_30: "#28A9FF",
    cyan_20: "#2485C7",
    cyan_10: "#20628F",
    cyan_05: "#1D3F58",
    // Blue
    blue_90: "#F8F9FB",
    blue_80: "#EBF1FD",
    blue_70: "#DFEAFF",
    blue_60: "#BFCAFF",
    blue_50: "#8DA2FF",
    blue_40: "#6E78FF",
    blue_30: "#5753FA",
    blue_20: "#4340D0",
    blue_10: "#363498",
    blue_05: "#252368",
    // Magenta
    magenta_90: "#FCEEF7",
    magenta_80: "#FFE3F4",
    magenta_70: "#FAD4EC",
    magenta_60: "#F9BBE1",
    magenta_50: "#F8A2D6",
    magenta_40: "#F670C1",
    magenta_30: "#E83FA4",
    magenta_20: "#C03187",
    magenta_10: "#84275E",
    magenta_05: "#521B3C",
    // Gray
    gray_90: "#F6F6F6",
    gray_80: "#EDEDEE",
    gray_70: "#E0E0E1",
    gray_60: "#CBCBCD",
    gray_50: "#B5B6B9",
    gray_40: "#A0A1A4",
    gray_30: "#8A8B90",
    gray_20: "#717279",
    gray_10: "#4A4C53",
    gray_05: "#35373F",
    // Black
    black_100: black,
    black_50: fade(black, 0.5),
    // White
    white_100: white,
};
