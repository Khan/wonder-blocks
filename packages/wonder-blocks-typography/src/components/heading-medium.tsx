import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const HeadingMedium = React.forwardRef(function HeadingMedium(
    {style, children, tag = "h3", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.HeadingMedium, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingMedium;
