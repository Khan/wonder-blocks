import * as React from "react";
import xIcon from "@phosphor-icons/core/bold/x-bold.svg";
import {useWonderBlocksI18n} from "@khanacademy/wonder-blocks-config";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./dismiss-button.module.css";

type Props = {
    /** Optional click handler */
    onClick?: (e?: React.SyntheticEvent) => unknown;
    /**
     * Screen reader label for close button. This overrides the default label
     * provided by `WonderBlocksConfigProvider`.
     */
    "aria-label"?: string;
    /** Optional aria-describedby attribute */
    "aria-describedby"?: string;
    /** Optional custom styles. */
    style?: StyleType;
    /** Test ID used for e2e testing, passed down from its parent card.*/
    testId?: string;
};

export const DismissButton = (props: Props) => {
    const {onClick, style, testId, "aria-describedby": ariaDescribedBy} = props;
    const {strings} = useWonderBlocksI18n();

    return (
        <IconButton
            icon={xIcon}
            aria-label={props["aria-label"] || strings.iconAltClose}
            aria-describedby={ariaDescribedBy}
            onClick={onClick}
            kind="tertiary"
            actionType="neutral"
            style={[styles.root, styles.dismissButton, style]}
            testId={testId}
        />
    );
};
