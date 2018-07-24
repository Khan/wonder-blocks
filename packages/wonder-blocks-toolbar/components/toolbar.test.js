// @flow
import * as React from "react";
import {shallow} from "enzyme";

import Toolbar from "./toolbar.js";

describe("Toolbar", () => {
    test("Has a title component", () => {
        const title = "Test title";
        const wrapper = shallow(<Toolbar title={title} />);

        const wrapperTitle = wrapper.find("#wb-toolbar-title");

        expect(wrapperTitle.exists()).toBe(true);
        expect(wrapperTitle.containsMatchingElement(title)).toBe(true);
    });
    test("Adds left and right components", () => {
        const componentLeft = "Left component";
        const componentRight = "Left component";
        const wrapper = shallow(
            <Toolbar
                leftContent={componentLeft}
                rightContent={componentRight}
            />,
        );

        expect(wrapper.containsMatchingElement(componentLeft)).toBe(true);
        expect(wrapper.containsMatchingElement(componentRight)).toBe(true);
    });
});
