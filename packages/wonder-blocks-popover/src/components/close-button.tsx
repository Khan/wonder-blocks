import * as React from "react";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import PopoverContext from "./popover-context";

type Props = AriaProps & {
    /**
     * Whether to display the light version of this component instead, for use
     * when the item is used on a dark background.
     */
    light?: boolean;
    /**
     * Custom styles applied to the IconButton
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

type DefaultProps = {
    light: Props["light"];
    ["aria-label"]: Props["aria-label"];
};

/**
 * This is the visual component rendering the close button that is rendered
 * inside the PopoverContentCore. It’s rendered if closeButtonVisible is set
 * true.
 */
export default class CloseButton extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        light: true,
        "aria-label": "Close Popover",
    };

    render(): React.ReactNode {
        const {"aria-label": ariaLabel, style, testId} = this.props;
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
                        />
                    );
                }}
            </PopoverContext.Consumer>
        );
    }
}
