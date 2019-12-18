// @flow
import * as React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-core";

import type {
    AriaProps,
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";

import type {OpenerProps} from "../util/types.js";

type Props = {|
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    /**
     * The child function that returns the anchor the Dropdown will be activated
     * by. This function takes two arguments:
     *
     * - `eventState`: allows the opener element to access pointer event state.
     * - `text`: Passes the menu's text/label defined in the parent component.
     */
    children: (openerProps: OpenerProps) => React.Element<any>,

    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled: boolean,

    /**
     * Callback for when the opener is pressed.
     */
    onClick: (e: SyntheticEvent<>) => mixed,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Text for the opener that can be passed to the child as an argument.
     */
    text: string,
|};

class DropdownOpener extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
    };

    getTestIdFromProps = (childrenProps: any) => {
        return childrenProps.testId || childrenProps["data-test-id"];
    };

    renderAnchorChildren(
        eventState: ClickableState,
        handlers: ClickableHandlers,
    ) {
        const {disabled, testId, text} = this.props;
        const renderedChildren = this.props.children({...eventState, text});
        const childrenProps = renderedChildren.props;
        const childrenTestId = this.getTestIdFromProps(childrenProps);

        return React.cloneElement(renderedChildren, {
            ...handlers,
            disabled,
            onClick: childrenProps.onClick
                ? (e: SyntheticMouseEvent<>) => {
                      // This is done to avoid overriding a
                      // custom onClick handler inside the
                      // children node
                      childrenProps.onClick(e);
                      handlers.onClick(e);
                  }
                : handlers.onClick,
            // try to get the testId from the child element
            // If it's not set, try to fallback to the parent's testId
            "data-test-id": childrenTestId || testId,
        });
    }

    render() {
        return (
            <ClickableBehavior
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                {(eventState, handlers) =>
                    this.renderAnchorChildren(eventState, handlers)
                }
            </ClickableBehavior>
        );
    }
}

export default DropdownOpener;
