import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import styles from "./strut.module.css";

type Props = {
    size: number;
    style?: StyleType | string;
};

/**
 * A component for inserting fixed space between components.
 *
 * Assumes parent is a View.
 */
export default class Strut extends React.Component<Props> {
    render(): React.ReactNode {
        const {size, style} = this.props;

        return (
            <div
                aria-hidden="true"
                className={cx(styles.strut, style)}
                style={{"--strut-size": size + "px"} as React.CSSProperties}
            />
        );
    }
}
