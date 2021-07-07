import Color from "@khanacademy/wonder-blocks-color";

export const HairlineIntensity = {
    xLight: "xLight",
    light: "light",
    heavy: "heavy",
};

export const HairlineSide = {
    Top: 0x1,
    Bottom: 0x10,
    Left: 0x100,
    Right: 0x1000,
};

export const ElevationLevel = {
    none: "none",
    low: "low",
    medium: "medium",
    high: "high",
};

export const hairlineStyle = function (isInset, intensity, whichSides) {
    const n = intensity ? intensity : HairlineIntensity.light;
    const s = whichSides ? whichSides : 0x0;

    const inset = isInset ? "inset " : "";
    const blur = "0px";
    const spread = "0.5px";
    let color = "none";
    if (n === HairlineIntensity.xLight) {
        color = Color.offBlack8;
    } else if (n === HairlineIntensity.light) {
        color = Color.offBlack16;
    } else if (n === HairlineIntensity.heavy) {
        color = Color.offBlack50;
    }

    if (!s) {
        return null;
    }
    if (
        s & HairlineSide.Top &&
        s & HairlineSide.Bottom &&
        s & HairlineSide.Left &&
        s & HairlineSide.Right
    ) {
        return `${inset}0px 0px ${blur} ${spread} ${color}`;
    } else {
        const shadows = [];
        if (s & HairlineSide.Left) {
            shadows.push(`${inset}-${spread} 0px ${blur} 0px ${color}`);
        }
        if (s & HairlineSide.Right) {
            shadows.push(`${inset}${spread} 0px ${blur} 0px ${color}`);
        }
        if (s & HairlineSide.Top) {
            shadows.push(`${inset}0px -${spread} ${blur} 0px ${color}`);
        }
        if (s & HairlineSide.Bottom) {
            shadows.push(`${inset}0px ${spread} ${blur} 0px ${color}`);
        }
        return shadows.join(",");
    }
};

export const elevationStyle = function (level) {
    if (level === ElevationLevel.low) {
        return `0px 2px 6px 1px ${Color.offBlack16}`;
    } else if (level === ElevationLevel.medium) {
        return `0px 4px 12px 2px ${Color.offBlack16}`;
    } else if (level === ElevationLevel.high) {
        return `0px 6px 24px 3px ${Color.offBlack16}`;
    } else {
        return null;
    }
};
