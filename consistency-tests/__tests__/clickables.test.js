// @flow
/**
 * There are a number of components that share common behaviors due to their
 * use of ClickableBehavior.  It's not enough to test ClickableBehavior since
 * each of the components has to connect things correctly.  This set of tests
 * checks that the common behaviors exist on all of these components.
 */
import * as React from "react";

import {ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import Link from "@khanacademy/wonder-blocks-link";
import {mount, unmountAll} from "../../utils/testing/mount.js";

// We create a wrapper around Clickable since it expects a render function for
// is children while all of the other components do not.
const ClickableWrapper = (props: any) => {
    const {children, ...restProps} = props;
    return <Clickable {...restProps}>{(clickableState) => children}</Clickable>;
};

const IconButtonWrapper = (props: any) => (
    <IconButton {...props} icon={icons.search} />
);

describe.each`
    Component            | name
    ${ActionItem}        | ${"ActionItem"}
    ${Button}            | ${"Button"}
    ${ClickableWrapper}  | ${"Clickable"}
    ${IconButtonWrapper} | ${"IconButton"}
    ${Link}              | ${"Link"}
`("$name", ({Component, name, extraProps}) => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment.
        window.location.assign = jest.fn();
        window.open = jest.fn();
        unmountAll();
    });

    afterEach(() => {
        window.location.assign.mockClear();
        window.open.mockClear();
    });

    it("opens a new tab when target='_blank'", () => {
        const wrapper = mount(
            <Component
                href="https://www.khanacademy.org"
                target="_blank"
                {...extraProps}
            >
                Click me
            </Component>,
        );
        wrapper.simulate("click");

        expect(window.open).toHaveBeenCalledWith(
            "https://www.khanacademy.org",
            "_blank",
        );
    });

    it("sets the 'target' prop on the underlying element", () => {
        const wrapper = mount(
            <Component
                href="https://www.khanacademy.org"
                target="_blank"
                {...extraProps}
            >
                Click me
            </Component>,
        );
        wrapper.simulate("click");

        expect(wrapper.find("a")).toHaveProp("target", "_blank");
    });
});
