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
import TooltipBubble from "./tooltip-bubble.js";

type PortalMountTesterProps = {|
    refChild: (Element | ?React.Component<*, *>) => mixed,
|};

type PortalMountTesterState = {
    anchor: ?HTMLElement,
};

/**
 * Simple wrapper to wire up a TooltipPortal.
 */
class PortalMountTester extends React.Component<
    PortalMountTesterProps,
    PortalMountTesterState,
> {
    constructor() {
        super();
    }

    state = {anchor: null};

    updateAnchorRef(node) {
        if (node) {
            const element = ReactDOM.findDOMNode(node);
            if (this.state.anchor !== element) {
                this.setState({anchor: ((element: any): ?HTMLElement)});
            }
        }
    }

    render() {
        const portalContent = (
            <TooltipBubble
                ref={(r) => this.props.refChild(r)}
                anchorElement={this.state.anchor}
            >
                Tooltip!
            </TooltipBubble>
        );
        return (
            <TooltipPortalMounter portalContent={portalContent}>
                <View ref={(r) => this.updateAnchorRef(r)}>Anchor</View>
            </TooltipPortalMounter>
        );
    }
}

describe("TooltipPortalMounter", () => {
    test("When not in modal, mounts its children in document.body", (done) => {
        // Once the child mounts, check that it was mounted directly-ish into
        // `document.body`, and finish the test.
        const childrenRef = (node) => {
            if (node) {
                const element = ReactDOM.findDOMNode(node);
                if (!element) {
                    return;
                }

                // Find the nearest parent, disregarding nodes created by
                // TooltipPortal and by `ReactDOM.render`.
                let parent = element.parentElement;
                while (
                    parent &&
                    (parent.hasAttribute(TooltipPortalAttributeName) ||
                        parent.hasAttribute("data-reactroot"))
                ) {
                    parent = parent.parentNode;
                }

                // This nearest parent _should_ be document.body. It definitely
                // should not be the `data-this-should-not-contain-the-children`
                // element! That element shouldn't be in the ancestor chain at
                // all.
                expect(parent).toBe(document.body);
                done();
            }
        };

        mount(
            // We include an extra wrapper element here, just to extra confirm
            // that this _isn't_ part of the tree where the portal children get
            // mounted.
            <div data-this-should-not-contain-the-portal-children>
                <PortalMountTester refChild={childrenRef} />
            </div>,
        );
    });

    test("When in modal portal, mounts its children in modal portal", (done) => {
        // Once the child mounts, check that it was mounted directly-ish
        // into modal portal, and finish the test.
        const childrenRef = (node) => {
            if (node) {
                const element = ReactDOM.findDOMNode(node);
                // Try to find a parent that is a modal launcher portal.
                const parent = maybeGetPortalMountedModalHostElement(element);

                // We trust that our modal package implementation of
                // getNearestModalLauncherPortal is working to spec.
                // So, if it returned something, we passed!
                expect(parent).toBeDefined();
                done();
            }
        };

        const modal = (
            <StandardModal
                title="My modal"
                footer="Footer"
                content={
                    <View>
                        <PortalMountTester refChild={childrenRef} />
                    </View>
                }
            />
        );

        const wrapper = mount(
            <ModalLauncher modal={modal}>
                {({openModal}) => <button onClick={openModal}>Modal</button>}
            </ModalLauncher>,
        );
        wrapper.find("button").simulate("click");
    });

    test("Children unmount when the portal unmounts", (done) => {
        let postMount = false;

        // Once the child unmounts, check that it wasn't too early (i.e.
        // check that unmounted is true), and finish the test.
        const childrenRef = (element) => {
            if (!element) {
                expect(postMount).toBe(true);
                done();
            }
        };
        const wrapper = mount(<PortalMountTester refChild={childrenRef} />);

        postMount = true;
        setTimeout(() => wrapper.unmount(), 0);
    });
});
