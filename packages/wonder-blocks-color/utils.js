// @flow
/**
 * A color manipulation library useful for dynamically
 * mixing colors together.
 */

const colorRegexp = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const rgbaRegexp = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/i;

type Color = {
    r: number,
    g: number,
    b: number,
    a: number,
};

// Parse a color in #abcdef, rgb(...), or rgba(...) form into an object
// with r,g,b,a keys.
const parse = (color: string) => {
    if (typeof color !== "string") {
        throw new Error(`Failed to parse color: ${color}`);
    }

    const match = color.match(colorRegexp);
    if (match) {
        return {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16),
            a: 1,
        };
    } else {
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
    }
};

// Stringify the color in an `rgba()` or `#abcdef` format.
const format = (color: Color) => {
    const r = Math.round(color.r);
    const g = Math.round(color.g);
    const b = Math.round(color.b);

    return color.a === 1
        ? `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        : `rgba(${r},${g},${b},${color.a.toFixed(2)})`;
};

// Set the alpha value of a color.
export const fade = (color: string, percentage: number) => {
    return format({
        ...parse(color),
        a: percentage,
    });
};

// Mix a color into a background color, using the alpha channel of the base
// color to determine the linear blend.
export const mix = (color: string, background: string) => {
    const colorObj = parse(color);
    const bgObj = parse(background);

    return format({
        r: colorObj.r * colorObj.a + bgObj.r * (1 - colorObj.a),
        g: colorObj.g * colorObj.a + bgObj.g * (1 - colorObj.a),
        b: colorObj.b * colorObj.a + bgObj.b * (1 - colorObj.a),
        a: bgObj.a,
    });
};
