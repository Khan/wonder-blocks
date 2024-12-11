import * as React from "react";

import {render} from "@testing-library/react";
import {Id} from "../id";

describe("Id", () => {
    it("should provide an id to the children", () => {
        // Arrange
        const childrenFn = jest.fn().mockReturnValue(null);

        // Act
        render(<Id>{childrenFn}</Id>);

        // Assert
        expect(childrenFn).toHaveBeenCalledWith(expect.any(String));
    });

    it("should pass through the given id to the children", () => {
        // Arrange
        const childrenFn = jest.fn().mockReturnValue(null);

        // Act
        render(<Id id="my-id">{childrenFn}</Id>);

        // Assert
        expect(childrenFn).toHaveBeenCalledWith("my-id");
    });
});
