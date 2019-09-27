//@flow
import * as React from "react";
import renderer from "react-test-renderer";

import OptionItem from "./option-item.js";
import DropdownCoreVirtualized from "./dropdown-core-virtualized.js";

describe("DropdownCoreVirtualized", () => {
    it("should render a virtualized list", () => {
        // Arrange
        const items = new Array(100).fill(null).map((item, i) => ({
            component: (
                <OptionItem
                    key={i}
                    value={(i + 1).toString()}
                    label={`School ${i + 1} in Wizarding World`}
                />
            ),
            focusable: true,
            onClick: jest.fn(),
            role: "option",
            populatedProps: {
                selected: false,
                variant: "checkbox",
            },
        }));

        // Act
        const tree = renderer
            .create(
                <DropdownCoreVirtualized
                    data={items}
                    height={360}
                    width={288}
                />,
            )
            .toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });
});
