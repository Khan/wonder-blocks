// @flow
import * as React from "react";
import {text, radios} from "@storybook/addon-knobs";

import type {StoryComponentType} from "@storybook/react";
import {TypeCategory, TypeSize, Typeface, textStyle, Text} from "./text.js";

export default {
    title: "Text",
};

export const heading: StoryComponentType = () => {
    let children = text("children", "We believe in the joy of learning");
    const size = radios(
        "size",
        {
            xxxLarge: TypeSize.XXXLarge,
            xxLarge: TypeSize.XXLarge,
            xLarge: TypeSize.XLarge,
            large: TypeSize.Large,
            "medium (default)": TypeSize.Medium,
            small: TypeSize.Small,
            xSmall: TypeSize.XSmall,
        },
        TypeSize.Medium,
    );
    const typeface = radios(
        "typeface",
        {
            sans: Typeface.Sans,
            "serif (default)": Typeface.Serif,
            monospace: Typeface.Monospace,
        },
        Typeface.Serif,
    );

    let style = null;
    try {
        style = textStyle(TypeCategory.Heading, size, typeface);
    } catch (e) {
        children = e.message;
    }

    return (
        <Text tag="h1" style={style}>
            {children}
        </Text>
    );
};

export const compactHeading: StoryComponentType = () => {
    let children = text("children", "We believe in the joy of learning");
    const size = radios(
        "size",
        {
            xLarge: TypeSize.XLarge,
            large: TypeSize.Large,
            "medium (default)": TypeSize.Medium,
            small: TypeSize.Small,
        },
        TypeSize.Medium,
    );
    const typeface = radios(
        "typeface",
        {
            "sans serif (default)": Typeface.Sans,
            serif: Typeface.Serif,
            monospace: Typeface.Monospace,
        },
        Typeface.Sans,
    );

    let style = null;
    try {
        style = textStyle(TypeCategory.CompactHeading, size, typeface);
    } catch (e) {
        children = e.message;
    }

    return (
        <Text tag="p" style={style}>
            {children}
        </Text>
    );
};

export const label: StoryComponentType = () => {
    let children = text("children", "Qui velit repellendus magnam");
    const size = radios(
        "size",
        {
            xLarge: TypeSize.XLarge,
            large: TypeSize.Large,
            "medium (default)": TypeSize.Medium,
            small: TypeSize.Small,
            xSmall: TypeSize.XSmall,
        },
        TypeSize.Medium,
    );
    const typeface = radios(
        "typeface",
        {
            "sans serif (default)": Typeface.Sans,
            serif: Typeface.Serif,
            monospace: Typeface.Monospace,
        },
        Typeface.Sans,
    );

    let style = null;
    try {
        style = textStyle(TypeCategory.Label, size, typeface);
    } catch (e) {
        children = e.message;
    }

    return (
        <Text tag="p" style={style}>
            {children}
        </Text>
    );
};

export const statement: StoryComponentType = () => {
    let children = text(
        "children",
        "Qui velit repellendus magnam. Recusandae fugit eaque facere dolor culpa natus at. Delectus ut reprehenderit aut perferendis qui illum et. Voluptatum non similique impedit dolorem perspiciatis et dicta fugiat.",
    );
    const size = radios(
        "size",
        {
            xLarge: TypeSize.XLarge,
            large: TypeSize.Large,
            "medium (default)": TypeSize.Medium,
        },
        TypeSize.Medium,
    );
    const typeface = radios(
        "typeface",
        {
            sans: Typeface.Sans,
            "serif (default)": Typeface.Serif,
            monospace: Typeface.Monospace,
        },
        Typeface.Serif,
    );

    let style = null;
    try {
        style = textStyle(TypeCategory.Statement, size, typeface);
    } catch (e) {
        children = e.message;
    }

    return (
        <Text tag="p" style={style}>
            {children}
        </Text>
    );
};

export const paragraph: StoryComponentType = () => {
    let children = text(
        "children",
        "Qui velit repellendus magnam. Recusandae fugit eaque facere dolor culpa natus at. Delectus ut reprehenderit aut perferendis qui illum et. Voluptatum non similique impedit dolorem perspiciatis et dicta fugiat.",
    );
    const size = radios(
        "size",
        {
            xLarge: TypeSize.XLarge,
            large: TypeSize.Large,
            "medium (default)": TypeSize.Medium,
            small: TypeSize.Small,
            xSmall: TypeSize.XSmall,
        },
        TypeSize.Medium,
    );
    const typeface = radios(
        "typeface",
        {
            "sans serif (default)": Typeface.Sans,
            serif: Typeface.Serif,
            monospace: Typeface.Monospace,
        },
        Typeface.Sans,
    );

    let style = null;
    try {
        style = textStyle(TypeCategory.Paragraph, size, typeface);
    } catch (e) {
        children = e.message;
    }

    return (
        <Text tag="p" style={style}>
            {children}
        </Text>
    );
};
