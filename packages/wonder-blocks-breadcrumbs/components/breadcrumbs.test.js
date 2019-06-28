// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Breadcrumbs from "./breadcrumbs.js";
import BreadcrumbsItem from "./breadcrumbs-item.js";

describe("Breadcrumbs", () => {
    afterEach(() => {
        unmountAll();
    });

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
});
