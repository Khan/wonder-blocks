import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import styles from "./body-text.module.css";

type Props = PropsFor<typeof Text> & {
    size?: "xsmall" | "small" | "medium";
    weight?: "medium" | "semi" | "bold";
};

// List style combinations for matching with props
const styleMapping = {
    "xsmall-medium": styles.xsmallMedium,
    "xsmall-semi": styles.xsmallSemi,
    "xsmall-bold": styles.xsmallBold,
    "small-medium": styles.smallMedium,
    "small-semi": styles.smallSemi,
    "small-bold": styles.smallBold,
    "medium-medium": styles.mediumMedium,
    "medium-semi": styles.mediumSemi,
    "medium-bold": styles.mediumBold,
} as const;

const BodyText = React.forwardRef(function BodyText(
    {
        size = "medium",
        weight = "medium",
        style,
        children,
        tag = "p",
        ...otherProps
    }: Props,
    ref,
) {
    // map props to theme and global token defaults for CSS styles
    const themeBodyText = styleMapping[`${size}-${weight}`];
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.bodyText, themeBodyText, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodyText;
