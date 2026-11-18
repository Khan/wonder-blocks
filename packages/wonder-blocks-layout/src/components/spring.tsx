import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./spring.module.css";

type Props = {
    style?: StyleType;
};

/**
 * Expands to fill space between sibling components.
 *
 * Assumes parent is a View.
 */
export default class Spring extends React.Component<Props> {
    render(): React.ReactNode {
        const {style} = this.props;
        return <View aria-hidden="true" style={[styles.spring, style]} />;
    }
}
