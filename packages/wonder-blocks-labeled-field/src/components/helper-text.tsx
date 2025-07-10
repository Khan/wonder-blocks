import {AriaProps, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    id?: string;
    testId?: string;
    icon?: React.ReactNode;
    message: React.ReactNode;
    styles?: {
        root?: StyleType;
    };
} & AriaProps;

export const HelperText = (props: Props) => {
    const {
        icon,
        message,
        styles: stylesProp,
        id,
        testId,
        ...otherProps
    } = props;

    return (
        <BodyText
            id={id}
            testId={testId}
            size="xsmall"
            style={[styles.root, stylesProp?.root]}
            tag="div"
            {...otherProps}
        >
            {icon && <View>{icon}</View>}
            <View>{message}</View>
        </BodyText>
    );
};

const styles = StyleSheet.create({
    root: {
        display: "flex",
        gap: sizing.size_040,
    },
});
