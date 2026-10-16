// Separator item in a dropdown, used to denote a semantic break.
// Actualized as a horizontal line with surrounding whitespace. -----

import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./separator-item.module.css";

/**
 * A separator used in a dropdown menu.
 */
export default class SeparatorItem extends React.Component<{
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;
}> {
    static isClassOf(instance: React.ReactElement<any>): boolean {
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__IS_SEPARATOR_ITEM__' does not exist on type 'string | JSXElementConstructor<any>'.
        return instance && instance.type && instance.type.__IS_SEPARATOR_ITEM__;
    }

    static __IS_SEPARATOR_ITEM__ = true;

    render(): React.ReactNode {
        return (
            // pass optional styles from react-window (if applies)
            <View
                style={[styles.root, styles.separator, this.props.style]}
                aria-hidden="true"
            />
        );
    }
}
