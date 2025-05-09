import * as React from "react";
import {css} from "aphrodite";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import styles from "../util/styles";

type Props = PropsFor<typeof Text> & {
    size?: "xSmall" | "small" | "medium";
    weight?: "regular" | "semi" | "bold";
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
    // map props to theme defaults
    const bodyTextStyles = {
        fontSize: font.size[size],
        fontWeight: font.weight[weight],
        lineHeight: font.lineHeight[size],
    };
    return (
        <Text
            {...otherProps}
            className={css(styles.BodyText)}
            tag={tag}
            style={[bodyTextStyles, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodyText;
