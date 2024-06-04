import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {cx} from "class-variance-authority";
import styles from "./styles.module.css";

type Props = PropsFor<typeof Text>;

const HeadingMedium = React.forwardRef(function HeadingMedium(
    {style, children, tag = "h3", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={cx([styles.LabelMedium, style])}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default HeadingMedium;
