// @flow
import * as React from "react";
import * as Popper from "react-popper";

import TooltipPortal from "./tooltip-portal.js";

type Props = {|
    // The content for anchoring the tooltip.
    // This component will be used to position the tooltip.
    // TODO(somewhatabstract): Limit to a single component
    children: React.Element<any>,

    // The content to render in the tooltip.
    // TODO(somewhatabstract): Update to allow TooltipContent
    content: string,

    // TODO(somewhatabstract): Add other props per spec
|};

type State = {
    refAnchor: null | Text | Element,
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

    refAnchor(ref: ?HTMLDivElement) {
        if (ref && ref !== this.state.refAnchor) {
            this.setState({refAnchor: ref});
        }
    }

    render() {
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
        return (
            <div ref={(r) => this.refAnchor(r)}>
                {this.state.refAnchor && (
                    <Popper.Manager>
                        <div>
                            <Popper.Reference>
                                {({ref}) => (
                                    // TODO(somewhatabstract): Use a render prop for tooltip so that we can get a ref to the anchored things without wrapping them.
                                    <div ref={ref}>{this.props.children}</div>
                                )}
                            </Popper.Reference>
                            <TooltipPortal anchorElement={this.state.refAnchor}>
                                <Popper.Popper
                                    placement="left"
                                    modifiers={{
                                        preventOverflow: {enabled: false},
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
                                </Popper.Popper>
                            </TooltipPortal>
                        </div>
                    </Popper.Manager>
                )}
            </div>
        );
    }
}
