import * as React from "react";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import PopoverContext from "./popover-context";

type Props = AriaProps & {
    /**
     * Custom styles applied to the IconButton
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * This is the visual component rendering the close button that is rendered
 * inside the PopoverContentCore. It’s rendered if closeButtonVisible is set
 * true.
 */
const CloseButton = (props: Props) => {
    const {"aria-label": ariaLabel = "Close Popover", style, testId} = props;
    const {close} = React.useContext(PopoverContext);

    return (
        <IconButton
            icon={xIcon}
            aria-label={ariaLabel}
            onClick={close}
            kind="tertiary"
            actionType="neutral"
            style={style}
            testId={testId}
        />
    );
};

export default CloseButton;
