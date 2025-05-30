import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
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

const Heading = React.forwardRef(function Heading(props: Props, ref) {
    const {size, weight = "bold", style, children, tag, ...otherProps} = props;

    // Determine final size for style purposes
    const finalSize = size ?? "large";

    // Resolve tag: prefer explicit `tag`, fallback to size-based tag if size was provided, or "h2" if neither
    const resolvedTag = tag ?? (size ? tagMap[size] : "h2");

    // map props to theme and global token defaults for CSS styles
    const themeHeading = {
        fontSize: font.heading.size[finalSize],
        fontWeight: font.weight[weight],
        lineHeight: font.heading.lineHeight[finalSize],
    };

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
