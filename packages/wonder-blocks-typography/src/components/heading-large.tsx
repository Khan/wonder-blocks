import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import styles from "./styles.module.css";

type Props = PropsFor<typeof Text>;

const HeadingLarge = React.forwardRef(function HeadingLarge(
    {style, children, tag = "h2", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={cx([styles.HeadingLarge, style])}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingLarge;
