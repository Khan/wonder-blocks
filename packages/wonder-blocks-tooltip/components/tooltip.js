// @flow
import * as React from "react";
import {Popper} from "react-popper";

import {Text as WbText} from "@khanacademy/wonder-blocks-core";

import TooltipPortalMounter from "./tooltip-portal-mounter";
import TooltipAnchor from "./tooltip-anchor.js";

type Props = {|
    // The content for anchoring the tooltip.
    // This component will be used to position the tooltip.
    // TODO(somewhatabstract): Limit to a single component
    children: React.Element<any> | string,

    // The content to render in the tooltip.
    // TODO(somewhatabstract): Update to allow TooltipContent
    content: string,

    // TODO(somewhatabstract): Add other props per spec
|};

type State = {
    refAnchor: ?HTMLElement,
};

export default class Tooltip extends React.Component<Props, State> {
    state = {refAnchor: null};

    kacustom(data: any) {
        // If the hide modifier already hid us against the viewport,
        // we don't have to do anything.
        if (data.hide) {
            return;
        } else {
            // TODO(somewhatabstract): This is where we would look to do two things.
            // - Custom hiding based on visibility against any and all scroll parents.
            // - Custom prevent overflowing based on remaining visibility the amount of the element clipped by any and all parents
        }
        return data;
    }

    _refAnchor(ref: ?Element) {
        if (ref && ref !== this.state.refAnchor) {
            this.setState({refAnchor: ((ref: any): HTMLElement)});
        }
    }

    _renderAnchorElement() {
        const {children} = this.props;
        if (typeof children === "string") {
            return <WbText>{children}</WbText>;
        } else {
            return children;
        }
    }

    _renderPortalContent(): React.Element<typeof Popper> {
        const content = (
            <div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
                <div>{this.props.content}</div>
            </div>
        );
        console.log(this.state.refAnchor);
        return (
            <Popper
                referenceElement={this.state.refAnchor}
                placement="left"
                modifiers={{
                    kacustom: {
                        enabled: true,
                        fn: (data) => this.kacustom(data),
                    },
                }}
            >
                {({
                    ref,
                    outOfBoundaries,
                    style,
                    placement,
                    arrowProps,
                }) => (
                    <div
                        data-placement={placement}
                        ref={ref}
                        style={{
                            ...style,
                            pointerEvents: "none",
                            backgroundColor: outOfBoundaries
                                ? "red"
                                : "purple",
                        }}
                    >
                        {content}
                    </div>
                )}
            </Popper>
        );
    }

    render() {
        return (
            <TooltipAnchor onStateChanged={(a) => {}} anchorRef={r => this._refAnchor(r)}>
                <TooltipPortalMounter portalContent={this._renderPortalContent()}>
                    {this._renderAnchorElement()}
                </TooltipPortalMounter>
            </TooltipAnchor>
        );
    }
}
