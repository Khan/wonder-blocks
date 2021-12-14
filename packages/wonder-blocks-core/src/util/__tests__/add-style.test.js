// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import addStyle from "../add-style.js";

const StyledDiv = addStyle<"div">("div");

const styles = StyleSheet.create({
    foo: {
        height: "100%",
    },
});

describe("addStyle", () => {
    let SNAPSHOT_INLINE_APHRODITE;

    beforeEach(() => {
        SNAPSHOT_INLINE_APHRODITE = global.SNAPSHOT_INLINE_APHRODITE;
        global.SNAPSHOT_INLINE_APHRODITE = false;
    });

    afterEach(() => {
        global.SNAPSHOT_INLINE_APHRODITE = SNAPSHOT_INLINE_APHRODITE;
    });

    it("should set the className if no style is provided", () => {
        const wrapper = mount(<StyledDiv className="foo" />);

        const div = wrapper.find("div");

        expect(div).toHaveProp("className", "foo");
    });

    it("should set the className to include foo and inlineStyles", () => {
        const wrapper = mount(
            <StyledDiv className="foo" style={{width: "100%"}} />,
        );

        const div = wrapper.find("div");

        const classNames = div.props().className.split(" ");
        expect(classNames).toHaveLength(2);
        expect(classNames[0].startsWith("inlineStyles")).toBeTruthy();
        expect(classNames[1]).toEqual("foo");
    });

    it("should set the className if an stylesheet style is provided", () => {
        const wrapper = mount(<StyledDiv style={styles.foo} />);

        const div = wrapper.find("div");

        expect(div).toHaveProp("className", expect.any(String));
    });

    it("should set the className if an stylesheet style is provided", () => {
        const wrapper = mount(<StyledDiv className="foo" style={styles.foo} />);

        const div = wrapper.find("div");

        const classNames = div.props().className.split(" ");
        expect(classNames).toHaveLength(2);
        expect(classNames[0]).toEqual(expect.any(String));
        expect(classNames[1]).toEqual("foo");
    });
});
