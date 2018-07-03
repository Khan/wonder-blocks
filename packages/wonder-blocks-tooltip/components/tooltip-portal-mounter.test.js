// @flow
import * as React from "react";
import {mount as enzymeMount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {
    ModalLauncher,
    StandardModal,
    maybeGetPortalMountedModalHostElement,
} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";
import TooltipPopper from "./tooltip-popper.js";

type TestHarnessProps = {|
    /**
     * Identifier to give the bubble
     */
    bubbleId?: ?string,

    /**
     * Should we even have a bubble? When false, bubble is
     * null.
     * Defaults to true.
     */
    hasBubble: boolean,

    /**
     * Should we change the anchor element on each render?
     * Defaults to false.
     */
    switchAnchor: boolean,

    /**
     * Should we even have an anchor? When false, anchor is
     * null.
     * Defaults to true.
     */
    hasAnchor: boolean,
|};

/**
 * Simple test harness to wire up the TooltipPortalMounter and provide
 * some simple controls on behavior for use in testing.
 */
class TestHarness extends React.Component<TestHarnessProps> {
    static defaultProps = {
        hasBubble: true,
        switchAnchor: false,
        hasAnchor: true,
    };

    _lastAnchor: string = "anchorA";

    _getAnchor() {
        const {switchAnchor, hasAnchor} = this.props;
        if (!hasAnchor) {
            return ((null: any): React.Element<*>);
        }

        if (switchAnchor) {
            this._lastAnchor =
                this._lastAnchor === "anchorA" ? "anchorB" : "anchorA";
        }

        if (this._lastAnchor === "anchorA") {
            return <View key={this._lastAnchor}>Anchor A</View>;
        } else {
            return <HeadingSmall key={this._lastAnchor}>Anchor B</HeadingSmall>;
        }
    }

    render() {
        const {bubbleId, hasBubble} = this.props;
        const anchor = this._getAnchor();
        const fakePopper = (((
            <View id={bubbleId}>Popper</View>
        ): any): React.Element<typeof TooltipPopper>);
        return (
            <TooltipPortalMounter anchor={anchor}>
                {hasBubble ? fakePopper : null}
            </TooltipPortalMounter>
        );
    }
}

/**
 * Enzyme doesn't unmount mounted things and all tests share the same DOM
 * so if we don't unmount the wrappers, then we run the risk of one test having
 * side-effects on another. So here we make some helpers that track mount
 * calls and can be used to unmount all wrappers in an afterEach.
 */
const ACTIVE_WRAPPERS = {};

const unmountAll = () => {
    const wrappersToUnmount = Object.keys(ACTIVE_WRAPPERS);
    for (const key of wrappersToUnmount) {
        const wrapper = ACTIVE_WRAPPERS[key];
        delete ACTIVE_WRAPPERS[key];
        wrapper.unmount();
    }
};

const mount = (nodes) => {
    const wrapper = enzymeMount(nodes);
    const identity = ACTIVE_WRAPPERS.length;
    ACTIVE_WRAPPERS[identity] = wrapper;
    return wrapper;
};

/**
 * This is a helper for finding the tooltip portal element.
 */
function getTooltipPortalForBubble(bubbleId: string) {
    const bubbleElement = document.getElementById(bubbleId) || {};

    // Find the nearest parent, disregarding nodes created by
    // TooltipPortal and by `ReactDOM.render`.
    let parent = bubbleElement.parentElement;
    while (parent && !parent.hasAttribute(TooltipPortalAttributeName)) {
        parent = parent.parentNode;
    }
    return parent;
}

/**
 * The tests.
 */
describe("TooltipPortalMounter", () => {
    /**
     * Here we make sure that any mounted wrappers are unmounted at the end of
     * each test.
     */
    afterEach(() => unmountAll());

    test("when not in modal, creates portal in document.body", () => {
        // Arrange
        const bubbleId = "the-bubble";
        mount(
            // We include an extra wrapper element here, just to extra confirm
            // that this _isn't_ part of the tree where the portal children get
            // mounted.
            <div data-this-should-not-contain-the-portal-children>
                <TestHarness bubbleId={bubbleId} />
            </div>,
        );

        // Act
        const tooltipPortal = getTooltipPortalForBubble(bubbleId);

        // Assert
        // This nearest parent _should_ be document.body. It definitely
        // should not be the `data-this-should-not-contain-the-children`
        // element! That element shouldn't be in the ancestor chain at
        // all.
        expect(tooltipPortal && tooltipPortal.parentNode).toBe(document.body);
    });

    test("when in modal portal, creates portal within modal portal", () => {
        // Arrange
        const bubbleId = "bubble";
        const modal = (
            <StandardModal
                title="My modal"
                footer="Footer"
                content={
                    <View>
                        <TestHarness bubbleId={bubbleId} />
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

    test("children unmount when the portal is destroyed", () => {
        // Arrange
        const popperId = "fakepopper";
        const wrapper = mount(<TestHarness bubbleId={popperId} />);
        const verifyMountedPopper = document.getElementById(popperId);
        expect(verifyMountedPopper).toBeInstanceOf(Element);

        // Act
        wrapper.unmount();

        // Assert
        const unmountedPopper = document.getElementById(popperId);
        expect(unmountedPopper).toBeFalsy();
    });

    test("bubble prop is null, portal unmounts", () => {
        // Arrange
        const popperId = "fakepopper";
        const wrapper = mount(<TestHarness bubbleId={popperId} />);
        const verifyMountedPopper = document.getElementById(popperId);
        expect(verifyMountedPopper).toBeInstanceOf(Element);

        // Act
        wrapper.setProps({hasBubble: false});

        // Assert
        const unmountedPopper = document.getElementById(popperId);
        expect(unmountedPopper).toBeFalsy();
    });

    test("anchor changes, portal remains the same", () => {
        // Arrange
        const bubbleId = "the-bubble";
        const wrapper = mount(
            <TestHarness switchAnchor={true} bubbleId={bubbleId} />,
        );
        const tooltipPortal = getTooltipPortalForBubble(bubbleId);

        // Act
        wrapper.instance().forceUpdate();
        const newTooltipPortal = getTooltipPortalForBubble(bubbleId);

        // Assert
        expect(tooltipPortal).toBe(newTooltipPortal);
    });

    test("no anchor, portal is destroyed", () => {
        // Arrange
        const bubbleId = "the-bubble";
        const wrapper = mount(<TestHarness bubbleId={bubbleId} />);
        const tooltipPortal = getTooltipPortalForBubble(bubbleId);
        expect(tooltipPortal).toBeTruthy();

        // Act
        wrapper.setProps({hasAnchor: false});
        // wrapper.instance().forceUpdate();

        // Assert
        const newTooltipPortal = getTooltipPortalForBubble(bubbleId);
        expect(newTooltipPortal).toBeFalsy();
    });
});
