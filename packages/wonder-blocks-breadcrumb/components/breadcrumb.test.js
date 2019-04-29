// @flow
import * as React from "react";
import {shallow} from "enzyme";

import Breadcrumb from "./breadcrumb.js";
import BreadcrumbItem from "./breadcrumb-item.js";

describe("Breadcrumb", () => {
    it("should render a Breadcrumb", () => {
        // Arrange
        const children = <BreadcrumbItem>hello</BreadcrumbItem>;
        // Act
        const wrapper = shallow(<Breadcrumb>{children}</Breadcrumb>);

        // Assert
        expect(wrapper.children()).toHaveLength(1);
    });
});
