import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import styles from "./styles.module.css";

type Props = PropsFor<typeof Text>;

const HeadingXSmall = React.forwardRef(function HeadingXSmall(
    {style, children, tag = "h4", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={cx([styles.HeadingXSmall, style])}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingXSmall;
