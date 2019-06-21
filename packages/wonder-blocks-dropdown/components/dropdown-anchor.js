// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

type Props = {|
    /**
     * The child element which will act as the opener for the dropdown
     */
    children: React.Element<any>,

    /**
     * Callback used to pass the childs Ref back up to the parent element
     */
    anchorRef: (?Element | ?Text | ?HTMLElement) => mixed,
|};

export default class DropdownAnchor extends React.Component<Props> {
    componentDidMount() {
        const anchorNode = ReactDOM.findDOMNode(this);
        this.props.anchorRef(anchorNode);
    }

    render() {
        return this.props.children;
    }
}
