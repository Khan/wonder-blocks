import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const HeadingLarge = React.forwardRef(function HeadingLarge(
    {style, children, tag = "h2", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.HeadingLarge, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingLarge;
