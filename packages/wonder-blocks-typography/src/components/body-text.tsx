import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import styles from "../util/styles";

type Props = PropsFor<typeof Text> & {
    size?: "xsmall" | "small" | "medium";
    weight?: "medium" | "semi" | "bold";
};

// List style combinations for matching with props
const styleMapping = {
    "xsmall-medium": styles.BodyTextXSmallMediumWeight,
    "xsmall-semi": styles.BodyTextXSmallSemiWeight,
    "xsmall-bold": styles.BodyTextXSmallBoldWeight,
    "small-medium": styles.BodyTextSmallMediumWeight,
    "small-semi": styles.BodyTextSmallSemiWeight,
    "small-bold": styles.BodyTextSmallBoldWeight,
    "medium-medium": styles.BodyTextMediumMediumWeight,
    "medium-semi": styles.BodyTextMediumSemiWeight,
    "medium-bold": styles.BodyTextMediumBoldWeight,
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
