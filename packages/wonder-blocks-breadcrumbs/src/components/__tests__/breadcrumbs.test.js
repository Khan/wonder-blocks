// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";
import Breadcrumbs from "../breadcrumbs.js";
import BreadcrumbsItem from "../breadcrumbs-item.js";

describe("Breadcrumbs", () => {
    it("should set aria-current to the last item", () => {
        // Arrange
        const wrapper = mount(
            <Breadcrumbs>
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Act
        const lastItem = wrapper.find(BreadcrumbsItem).last();

        // Assert
        expect(lastItem.prop("aria-current")).toBe("page");
    });

    it("should add data-test-id if testId is set", () => {
        // Arrange, Act
        const wrapper = mount(
            <Breadcrumbs testId="test">
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Assert
        expect(wrapper.find(`[data-test-id="test"]`)).toExist();
    });
});
