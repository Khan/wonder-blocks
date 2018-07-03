// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    ModalLauncher,
    StandardModal,
    maybeGetPortalMountedModalHostElement,
} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";
import TooltipPopper from "./tooltip-popper.js";

import type {Placement} from "../util/types.js";

type TestHarnessProps = {|
    bubbleId?: ?string,
    placement: Placement,
    hasBubble: boolean,
|};

type TestHarnessState = {
    anchor: ?HTMLElement,
};

/**
 * Simple wrapper to wire up a TooltipPortal so that we can pass it the
 * anchor element.
 */
class TestHarness extends React.Component<TestHarnessProps, TestHarnessState> {
    static defaultProps = {
        hasBubble: true,
    };

    state = {anchor: null};

    updateAnchorRef(node) {
        if (!node) {
            return;
        }
        const element = ReactDOM.findDOMNode(node);
        if (this.state.anchor !== element) {
            this.setState({anchor: ((element: any): ?HTMLElement)});
        }
    }

    render() {
        const {bubbleId} = this.props;

        const anchor = <View ref={(r) => this.updateAnchorRef(r)}>Anchor</View>;
        const fakePopper = (((
            <View id={bubbleId}>Popper</View>
        ): any): React.Element<typeof TooltipPopper>);
        return (
            <TooltipPortalMounter anchor={anchor}>
                {this.props.hasBubble ? fakePopper : null}
            </TooltipPortalMounter>
        );
    }
}

describe("TooltipPortalMounter", () => {
    test("when not in modal, mounts its children in document.body", () => {
        // Arrange
        const bubbleId = "the-bubble";
        mount(
            // We include an extra wrapper element here, just to extra confirm
            // that this _isn't_ part of the tree where the portal children get
            // mounted.
            <div data-this-should-not-contain-the-portal-children>
                <TestHarness bubbleId={bubbleId} placement="bottom" />
            </div>,
        );

        // Act
        const bubbleElement = document.getElementById(bubbleId) || {};
        // Find the nearest parent, disregarding nodes created by
        // TooltipPortal and by `ReactDOM.render`.
        let parent = bubbleElement.parentElement;
        while (
            parent &&
            (parent.hasAttribute(TooltipPortalAttributeName) ||
                parent.hasAttribute("data-reactroot"))
        ) {
            parent = parent.parentNode;
        }

        // Assert
        // This nearest parent _should_ be document.body. It definitely
        // should not be the `data-this-should-not-contain-the-children`
        // element! That element shouldn't be in the ancestor chain at
        // all.
        expect(parent).toBe(document.body);
    });

    test("when in modal portal, mounts the bubble in modal portal", () => {
        // Arrange
        const bubbleId = "bubble";
        const modal = (
            <StandardModal
                title="My modal"
                footer="Footer"
                content={
                    <View>
                        <TestHarness bubbleId={bubbleId} placement="top" />
                    </View>
                }
            />
        );

        const wrapper = mount(
            <ModalLauncher modal={modal}>
                {({openModal}) => <button onClick={openModal}>Modal</button>}
            </ModalLauncher>,
        );

        // Act
        wrapper.find("button").simulate("click");
        const bubbleElement = document.getElementById(bubbleId);
        const parent = maybeGetPortalMountedModalHostElement(bubbleElement);

        // Assert
        expect(parent).toBeInstanceOf(Element);
    });

    test("children unmount when the portal unmounts", () => {
        // Arrange
        const popperId = "fakepopper";
        const wrapper = mount(
            <TestHarness bubbleId={popperId} placement="left" />,
        );
        const verifyMountedPopper = document.getElementById(popperId);
        expect(verifyMountedPopper).toBeInstanceOf(Element);

        // Act
        wrapper.unmount();

        // Assert
        const unmountedPopper = document.getElementById(popperId);
        expect(unmountedPopper).toBeFalsy();
    });

    test("bubble prop is null, unmounts on timeout", () => {
        // Arrange
        const popperId = "fakepopper";
        const wrapper = mount(
            <TestHarness bubbleId={popperId} placement="left" />,
        );
        const verifyMountedPopper = document.getElementById(popperId);
        expect(verifyMountedPopper).toBeInstanceOf(Element);

        // Act
        wrapper.setProps({hasBubble: false});

        // Assert
        const unmountedPopper = document.getElementById(popperId);
        expect(unmountedPopper).toBeFalsy();
    });
});
