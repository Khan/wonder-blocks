import * as React from "react";
import * as ReactDOM from "react-dom";
import {render} from "@testing-library/react";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipBubble from "../tooltip-bubble";
import TooltipPopper from "../tooltip-popper";

type State = {
    ref?: HTMLElement;
};
/**
 * A little wrapper for the TooltipPopper so that we can provide an anchor
 * element reference and test that the children get rendered.
 */
class TestHarness extends React.Component<any, State> {
    state: State = {};

    updateRef(ref: any) {
        const actualRef = ref && ReactDOM.findDOMNode(ref);
        if (actualRef && this.state.ref !== actualRef) {
            this.setState({ref: actualRef as HTMLElement});
        }
    }

    render(): React.ReactElement {
        const fakeBubble = (
            <View ref={(ref: any) => this.props.resultRef(ref)}>
                Fake bubble
            </View>
        ) as React.ReactElement<React.ComponentProps<typeof TooltipBubble>>;
        return (
            <View>
                <View ref={(ref: any) => this.updateRef(ref)}>Anchor</View>
                <TooltipPopper
                    placement={this.props.placement}
                    anchorElement={this.state.ref}
                >
                    {(props: any) => fakeBubble}
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
        const ref = await new Promise((resolve: any, reject: any) => {
            const nodes = (
                <View>
                    <TestHarness placement="bottom" resultRef={resolve} />
                </View>
            );
            render(nodes);
        });

        if (!ref) {
            return;
        }

        // Act
        // Assert
        expect(ref).toBeDefined();
    });
});
