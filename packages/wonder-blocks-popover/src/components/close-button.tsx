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
    /**
     * Size of the close button.
     */
    size?: "xsmall" | "small" | "medium" | "large";
};

type DefaultProps = {
    ["aria-label"]: Props["aria-label"];
};

/**
 * This is the visual component rendering the close button that is rendered
 * inside the PopoverContentCore. It’s rendered if closeButtonVisible is set
 * true.
 */
export default class CloseButton extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        "aria-label": "Close Popover",
    };

    render(): React.ReactNode {
        const {"aria-label": ariaLabel, style, testId, size} = this.props;
        return (
            <PopoverContext.Consumer>
                {({close}) => {
                    return (
                        <IconButton
                            icon={xIcon}
                            aria-label={ariaLabel}
                            onClick={close}
                            kind="tertiary"
                            actionType="neutral"
                            style={style}
                            testId={testId}
                            size={size}
                        />
                    );
                }}
            </PopoverContext.Consumer>
        );
    }
}
