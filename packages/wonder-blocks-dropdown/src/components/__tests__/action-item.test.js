import * as React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter, Link} from "react-router-dom";
import {mount} from "enzyme";
import "jest-enzyme";

import ActionItem from "../action-item.js";

describe("ActionItem", () => {
    it("should render with disabled styles", () => {
        const actionItem = renderer.create(
            <ActionItem href="/foo" disabled={true} />,
        );

        expect(actionItem).toMatchSnapshot();
    });

    it("should render an anchor if there's no router", () => {
        const wrapper = mount(<ActionItem href="/foo" />);

        expect(wrapper.find("a")).toHaveLength(1);
    });

    it("should render a Link if there's a router", () => {
        const wrapper = mount(
            <MemoryRouter>
                <ActionItem href="/foo" />
            </MemoryRouter>,
        );

        expect(wrapper.find(Link)).toHaveLength(1);
    });
});
