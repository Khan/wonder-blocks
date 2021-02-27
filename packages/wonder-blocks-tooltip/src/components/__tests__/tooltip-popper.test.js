// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";

import typeof TooltipBubble from "../tooltip-bubble.js";
import TooltipPopper from "../tooltip-popper.js";

type State = {|ref: ?HTMLElement|};
/**
 * A little wrapper for the TooltipPopper so that we can provide an anchor
 * element reference and test that the children get rendered.
 */
class TestHarness extends React.Component<any, State> {
    state: State = {
        ref: null,
    };

    updateRef(ref) {
        const actualRef = ref && ReactDOM.findDOMNode(ref);
        if (actualRef && this.state.ref !== actualRef) {
            this.setState({ref: ((actualRef: any): ?HTMLElement)});
        }
    }

    render(): React.Node {
        const fakeBubble = (((
            <View ref={(ref) => this.props.resultRef(ref)}>Fake bubble</View>
        ): any): React.Element<TooltipBubble>);
        return (
            <View>
                <View ref={(ref) => this.updateRef(ref)}>Anchor</View>
                <TooltipPopper
                    placement={this.props.placement}
                    anchorElement={this.state.ref}
                >
                    {(props) => fakeBubble}
                </TooltipPopper>
            </View>
        );
    }
}

describe("TooltipPopper", () => {
    // The TooltipPopper component is just a wrapper around react-popper.
    // PopperJS requires full visual rendering and we don't do that here as
    // we're not in a browser.
    // So, let's do a test that we at least render the content how we expect
    // and use other things to test the overall placement things.
    test("ensure component renders", async () => {
        // Arrange
        const ref = await new Promise((resolve, reject) => {
            const nodes = (
                <View>
                    <TestHarness placement="bottom" resultRef={resolve} />
                </View>
            );
            mount(nodes);
        });

        if (!ref) {
            return;
        }

        // Act
        // Assert
        expect(ref).toBeDefined();
    });
});
