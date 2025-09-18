import * as React from "react";

import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";

import {
    boxShadow,
    border,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import {CloseButton} from "@khanacademy/wonder-blocks-button";

type Props = {
    styles?: {
        root?: StyleType;
    };
    children: React.ReactNode;
    closeButton?: React.ReactNode;
    closeButtonLabel?: string;
};

const Card = ({styles, children, closeButton, closeButtonLabel}: Props) => {
    return (
        <View style={[componentStyles.root, styles?.root]}>
            {closeButton ? <CloseButton aria-label={closeButtonLabel} /> : null}
            {children}
        </View>
    );
};

const componentStyles = StyleSheet.create({
    root: {
        backgroundColor: semanticColor.core.background.base.subtle,
        borderColor: semanticColor.core.border.neutral.subtle,
        borderRadius: border.radius.radius_080,
        borderStyle: "solid",
        borderWidth: border.width.thin,
        boxShadow: boxShadow.low,
        padding: sizing.size_160, // TODO: figure out conversion to px
        maxWidth: "295px", // TODO: figure out max/min widths
        position: "relative",
        width: "100%",
    },
});

export default Card;
