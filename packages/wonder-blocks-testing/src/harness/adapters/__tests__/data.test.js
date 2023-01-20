// @flow
import * as React from "react";
import {mount} from "enzyme"; // eslint-disable-line no-restricted-imports
import "jest-enzyme";
import * as Data from "../data";

describe("WonderBlocksData.adapter", () => {
    it("should render children when configuration arrays are empty", () => {
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        const wrapper = mount(Data.adapter(children, []), {
            includeDefaultTestHarness: false,
        });

        // Assert
        expect(wrapper).toHaveHTML("<div>CONTENT</div>");
    });

    it("should render children within InterceptRequests when dataIntercepts configured", () => {
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        const wrapper = mount(
            Data.adapter(children, () =>
                Promise.resolve(("INTERCEPTED!": any)),
            ),
            {
                includeDefaultTestHarness: false,
            },
        );

        // Assert
        expect(wrapper).toContainMatchingElement("InterceptRequests");
    });

    it("should render like we expect", () => {
        // Snapshot test is handy to visualize what's going on and help debug
        // test failures of the other cases. The other cases assert specifics.
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        const wrapper = mount(
            Data.adapter(children, () =>
                Promise.resolve(("INTERCEPTED!": any)),
            ),
            {
                includeDefaultTestHarness: false,
            },
        );

        // Assert
        expect(wrapper).toMatchInlineSnapshot(`
            <InterceptRequests
              interceptor={[Function]}
            >
              <div>
                CONTENT
              </div>
            </InterceptRequests>
        `);
    });
});
