import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const HeadingSmall = React.forwardRef(function HeadingSmall(
    {style, children, tag = "h4", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.HeadingSmall, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingSmall;
