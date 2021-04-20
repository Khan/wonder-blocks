// @flow
import * as React from "react";
import {number, radios, optionsKnob, boolean} from "@storybook/addon-knobs";

import {View} from "@khanacademy/wonder-blocks-core";

import type {StoryComponentType} from "@storybook/react";
import {
    HairlineIntensity,
    HairlineSide,
    hairlineStyle,
    elevationStyle,
    ElevationLevel,
} from "./index.js";

export default {
    title: "Shading",
};

export const shadingWithKnobs: StoryComponentType = () => {
    const inset = boolean("inset", false);
    const radius = number("radius", 0);
    const sides = optionsKnob(
        "sides",
        {
            top: "top",
            bottom: "bottom",
            left: "left",
            right: "right",
        },
        ["top", "bottom", "left", "right"],
        {
            display: "multi-select",
        },
    );
    const hairline = radios(
        "hairline",
        {
            xLight: HairlineIntensity.xLight,
            "light (default)": HairlineIntensity.light,
            heavy: HairlineIntensity.heavy,
        },
        "light",
    );
    const elevation = radios(
        "elevation",
        {
            "none (default)": ElevationLevel.none,
            low: ElevationLevel.low,
            medium: ElevationLevel.medium,
            high: ElevationLevel.high,
        },
        "none",
    );

    const intensity = HairlineIntensity[hairline];
    let whichSides = 0x0;
    if (sides) {
        if (sides.includes("top")) {
            whichSides |= HairlineSide.Top;
        }
        if (sides.includes("bottom")) {
            whichSides |= HairlineSide.Bottom;
        }
        if (sides.includes("left")) {
            whichSides |= HairlineSide.Left;
        }
        if (sides.includes("right")) {
            whichSides |= HairlineSide.Right;
        }
    }
    const hStyle = hairlineStyle(inset, intensity, whichSides);
    const eStyle = elevationStyle(elevation);
    const shadowStyles = [];
    if (hStyle) {
        shadowStyles.push(hStyle);
    }
    if (eStyle) {
        shadowStyles.push(eStyle);
    }

    const style = {
        margin: 32,
        width: 64,
        height: 64,
        borderRadius: radius,
        backgroundColor: "#fff",
        boxShadow: shadowStyles.join(", "),
    };

    return <View style={style} />;
};
