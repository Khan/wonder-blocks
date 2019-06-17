// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";

type Props = {|
    /**
     * The content for anchoring the tooltip.
     * This element will be used to position the tooltip.
     * If a string is passed as children we wrap it in a Text element.
     * We allow children to be a string so that we can add tooltips to
     * words within a large block of text easily.
     */
    children: React.Element<any>,

    /**
     * Callback to be invoked when the anchored content is mounted.
     * This provides a reference to the anchored content, which can then be
     * used for calculating tooltip bubble positioning.
     */
    anchorRef: (?Element | ?Text) => mixed,

    /**
     * Function passed from DropdownLauncher to handle open and close
     * the dropdown on click.
     */
    handleOpenDropdown: () => void,
|};

export default class DropdownAnchor extends React.Component<Props> {
    componentDidMount() {
        const anchorNode = ReactDOM.findDOMNode(this);
        this.props.anchorRef(anchorNode);
    }

    render() {
        const ClickableBehavior = getClickableBehavior();
        return (
            <ClickableBehavior
                disabled={false}
                onClick={this.props.handleOpenDropdown}
            >
                {(state, handlers) =>
                    React.cloneElement(this.props.children, {
                        ...handlers,
                    })
                }
            </ClickableBehavior>
        );
    }
}
