import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import styles from "../util/styles";

type Props = PropsFor<typeof Text> & {
    size?: "xsmall" | "small" | "medium";
    weight?: "medium" | "semi" | "bold";
};

// List style combinations for matching with props
const styleMapping = {
    "xsmall-medium": styles.BodyTextXSmallMedium,
    "xsmall-semi": styles.BodyTextXSmallSemi,
    "xsmall-bold": styles.BodyTextXSmallBold,
    "small-medium": styles.BodyTextSmallMedium,
    "small-semi": styles.BodyTextSmallSemi,
    "small-bold": styles.BodyTextSmallBold,
    "medium-medium": styles.BodyTextMediumMedium,
    "medium-semi": styles.BodyTextMediumSemi,
    "medium-bold": styles.BodyTextMediumBold,
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
            style={[styles.BodyText, themeBodyText, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodyText;
