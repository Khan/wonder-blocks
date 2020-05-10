import * as React from "react";
import renderer from "react-test-renderer";
import {Link} from "react-router-dom";
import {shallow} from "enzyme";
import ReactRouterEnzymeContext from "react-router-enzyme-context";

import ActionItem from "../action-item.js";

describe("ActionItem", () => {
    it("should render with disabled styles", () => {
        const actionItem = renderer.create(
            <ActionItem href="/foo" disabled={true} />,
        );

        expect(actionItem).toMatchSnapshot();
    });

    it("should render an anchor if there's no router", () => {
        const wrapper = shallow(<ActionItem href="/foo" />);

        expect(
            wrapper
                // call the props.children(state, handlers) with empty objects for both params
                .renderProp("children")({}, {})
                // shallow render the first child of that result to unwrap StyledAnchor HOC
                .first()
                .shallow()
                // check that it includes an <a> tag
                .find("a"),
        ).toHaveLength(1);
    });

    it("should render a Link if there's a router", () => {
        // Same thing as the previous test but this time include a router context
        // when shallow rendering.
        const options = new ReactRouterEnzymeContext();
        const wrapper = shallow(<ActionItem href="/foo" />, options.get());

        expect(
            wrapper.renderProp("children")({}, {}).first().shallow().find(Link),
        ).toHaveLength(1);
    });
});
