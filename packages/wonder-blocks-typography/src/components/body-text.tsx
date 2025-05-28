import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import styles from "../util/styles";

type Props = PropsFor<typeof Text> & {
    size?: "xsmall" | "small" | "medium";
    weight?: "light" | "medium" | "semi" | "bold";
};

const BodyText = React.forwardRef(function BodyText(
    {
        size = "medium",
        weight = "medium",
        style,
        children,
        tag = "span",
        ...otherProps
    }: Props,
    ref,
) {
    // map props to theme and global token defaults for CSS styles
    const themeBodyText = {
        fontSize: font.body.size[size],
        fontWeight: font.weight[weight],
        lineHeight: font.body.lineHeight[size],
    };
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
