import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import styles from "../util/styles";

type Props = PropsFor<typeof Text> & {
    size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    weight?: "semi" | "bold";
};

const Heading = React.forwardRef(function Heading(
    {
        size = "large",
        weight = "bold",
        style,
        children,
        tag = "h2",
        ...otherProps
    }: Props,
    ref,
) {
    // map props to theme and global token defaults for CSS styles
    const themeHeading = {
        fontSize: font.heading.size[size],
        fontWeight: font.weight[weight],
        lineHeight: font.heading.lineHeight[size],
    };
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.Heading, themeHeading, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default Heading;
