import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import styles from "../util/styles";

import theme from "../theme/index";

type Props = PropsFor<typeof Text> & {
    size?: "xsmall" | "small" | "medium";
    weight?: "medium" | "semi" | "bold";
};

const BodyText = React.forwardRef(function BodyText(
    {
        size = "small",
        weight = "semi",
        style,
        children,
        tag = "p",
        ...otherProps
    }: Props,
    ref,
) {
    // map props to theme and global token defaults for CSS styles
    const themeBodyText = {
        fontSize: theme.body.font.size[size],
        fontWeight: font.weight[weight],
        lineHeight: theme.body.font.lineHeight[size],
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
