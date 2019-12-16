// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-core";

import type {
    AriaProps,
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";

type Props = {|
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    /**
     * The child function that returns the anchor the Dropdown will be activated
     * by. This function takes `eventState`, which allows the opener element to
     * access pointer event state.
     */
    children: (eventState: ClickableState) => React.Element<any>,

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
     * Callback used to pass the child's Ref back up to the parent element
     */
    anchorRef: (?HTMLElement) => mixed,
|};

class DropdownOpener extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
    };

    componentDidMount() {
        const anchorNode = ((ReactDOM.findDOMNode(this): any): ?HTMLElement);
        this.props.anchorRef(anchorNode);
    }

    renderAnchorChildren(
        eventState: ClickableState,
        handlers: ClickableHandlers,
    ) {
        const renderedChildren = this.props.children(eventState);

        return React.cloneElement(renderedChildren, {
            ...handlers,
            disabled: this.props.disabled,
            "data-test-id": this.props.testId,
            onClick: renderedChildren.props.onClick
                ? (e: SyntheticMouseEvent<>) => {
                      // This is done to avoid overriding a
                      // custom onClick handler inside the
                      // children node
                      renderedChildren.props.onClick(e);
                      handlers.onClick(e);
                  }
                : handlers.onClick,
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
