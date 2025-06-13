import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import styles from "../util/styles";

const tagMap = {
    xxlarge: "h1",
    xlarge: "h2",
    large: "h3",
    medium: "h4",
    small: "h4",
} as const;

type HeadingSize = keyof typeof tagMap;

type Props = PropsFor<typeof Text> & {
    size?: HeadingSize;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    weight?: "medium" | "semi" | "bold";
};

// List style combinations for matching with props
const styleMapping = {
    "small-medium": styles.HeadingSmallMedium,
    "small-semi": styles.HeadingSmallSemi,
    "small-bold": styles.HeadingSmallBold,
    "medium-medium": styles.HeadingMediumMedium,
    "medium-semi": styles.HeadingMediumSemi,
    "medium-bold": styles.HeadingMediumBold,
    "large-medium": styles.HeadingLargeMedium,
    "large-semi": styles.HeadingLargeSemi,
    "large-bold": styles.HeadingLargeBold,
    "xlarge-medium": styles.HeadingXLargeMedium,
    "xlarge-semi": styles.HeadingXLargeSemi,
    "xlarge-bold": styles.HeadingXLargeBold,
    "xxlarge-medium": styles.HeadingXxLargeMedium,
    "xxlarge-semi": styles.HeadingXxLargeSemi,
    "xxlarge-bold": styles.HeadingXxLargeBold,
} as const;

const Heading = React.forwardRef(function Heading(props: Props, ref) {
    const {size, weight = "bold", style, children, tag, ...otherProps} = props;

    // Determine final size for style purposes
    const finalSize = size ?? "large";

    // Resolve tag: prefer explicit `tag`, fallback to size-based tag if size was provided, or "h2" if neither
    const resolvedTag = tag ?? (size ? tagMap[size] : "h2");

    // map props to theme and global token defaults for CSS styles
    const themeHeading = styleMapping[`${finalSize}-${weight}`];

    return (
        <Text
            {...otherProps}
            tag={resolvedTag}
            style={[styles.Heading, themeHeading, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default Heading;
