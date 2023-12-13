import * as React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-clickable";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";

import type {OpenerProps, OptionLabel} from "../util/types";

type Props = Partial<Omit<AriaProps, "aria-disabled">> & {
    /**
     * The child function that returns the anchor the Dropdown will be activated
     * by. This function takes two arguments:
     *
     * - `eventState`: allows the opener element to access pointer event state.
     * - `text`: Passes the menu's text/label defined in the parent component.
     */
    children: (openerProps: OpenerProps) => React.ReactElement<any>;
    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled: boolean;
    /**
     * Callback for when the opener is pressed.
     */
    onClick: (e: React.SyntheticEvent) => unknown;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Text for the opener that can be passed to the child as an argument.
     */
    text: OptionLabel;
};

type DefaultProps = {
    disabled: Props["disabled"];
};

class DropdownOpener extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        disabled: false,
    };

    getTestIdFromProps: (childrenProps?: any) => string = (childrenProps) => {
        return childrenProps.testId || childrenProps["data-test-id"];
    };

    renderAnchorChildren(
        eventState: ClickableState,
        clickableChildrenProps: ChildrenProps,
    ): React.ReactElement {
        const {disabled, testId, text} = this.props;
        const renderedChildren = this.props.children({...eventState, text});
        const childrenProps = renderedChildren.props;
        const childrenTestId = this.getTestIdFromProps(childrenProps);

        return React.cloneElement(renderedChildren, {
            ...clickableChildrenProps,
            disabled,
            onClick: childrenProps.onClick
                ? (e: React.MouseEvent) => {
                      // This is done to avoid overriding a
                      // custom onClick handler inside the
                      // children node
                      childrenProps.onClick(e);
                      clickableChildrenProps.onClick(e);
                  }
                : clickableChildrenProps.onClick,
            // try to get the testId from the child element
            // If it's not set, try to fallback to the parent's testId
            "data-test-id": childrenTestId || testId,
        });
    }

    render(): React.ReactNode {
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
