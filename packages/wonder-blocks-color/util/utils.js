// @flow
/**
 * A color manipulation library useful for dynamically
 * mixing colors together.
 */

const color6Regexp = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const color3Regexp = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const rgbaRegexp = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/i;

type Color = {|
    r: number,
    g: number,
    b: number,
    a: number,
|};

// Parse a color in #abcdef, rgb(...), or rgba(...) form into an object
// with r,g,b,a keys.
const parse = (color: string): Color => {
    if (typeof color !== "string") {
        throw new Error(`Failed to parse color: ${color}`);
    }

    const color3Match = color.match(color3Regexp);
    if (color3Match) {
        return {
            r: parseInt(`${color3Match[1]}${color3Match[1]}`, 16),
            g: parseInt(`${color3Match[2]}${color3Match[2]}`, 16),
            b: parseInt(`${color3Match[3]}${color3Match[3]}`, 16),
            a: 1,
        };
    }

    const color6Match = color.match(color6Regexp);
    if (color6Match) {
        return {
            r: parseInt(color6Match[1], 16),
            g: parseInt(color6Match[2], 16),
            b: parseInt(color6Match[3], 16),
            a: 1,
        };
    }

    const rgbaMatch = color.match(rgbaRegexp);
    if (rgbaMatch) {
        return {
            r: parseFloat(rgbaMatch[1]),
            g: parseFloat(rgbaMatch[2]),
            b: parseFloat(rgbaMatch[3]),
            a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
        };
    }

    throw new Error(`Failed to parse color: ${color}`);
};

// Stringify the color in an `rgba()` or `#abcdef` format.
const format = (color: Color): string => {
    const r = Math.round(color.r);
    const g = Math.round(color.g);
    const b = Math.round(color.b);

    if (color.a === 1) {
        const _s = (c) => {
            const asString = c.toString(16);
            return asString.length === 1 ? asString + asString : asString;
        };
        return `#${_s(r)}${_s(g)}${_s(b)}`;
    } else {
        return `rgba(${r},${g},${b},${color.a.toFixed(2)})`;
    }
};

// Adjust the alpha value of a color.
export const fade = (color: string, percentage: number): string => {
    if (percentage < 0 || percentage > 1) {
        throw new Error("Percentage must be between 0 and 1");
    }
    const components = parse(color);
    return format({
        ...components,
        a: components.a * percentage,
    });
};

// Mix a color into a background color, using the alpha channel of the base
// color to determine the linear blend.
export const mix = (color: string, background: string): string => {
    const colorObj = parse(color);
    const bgObj = parse(background);

    return format({
        r: colorObj.r * colorObj.a + bgObj.r * (1 - colorObj.a),
        g: colorObj.g * colorObj.a + bgObj.g * (1 - colorObj.a),
        b: colorObj.b * colorObj.a + bgObj.b * (1 - colorObj.a),
        a: bgObj.a,
    });
};
