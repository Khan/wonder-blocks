import * as React from "react";
import {render, waitFor} from "@testing-library/react";

import Title from "../title";
import Tagline from "../tagline";

describe("Typography elements", () => {
    test.each`
        Component  | name         | type                  | typeName
        ${Tagline} | ${"Tagline"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Title}   | ${"Title"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
    `("$name forwards ref to $typeName", async ({Component, type}: any) => {
        // Arrange
        const ref: React.RefObject<HTMLHeadingElement> = React.createRef();

        // Act
        render(<Component ref={ref}>This is a title</Component>);

        // Assert
        await waitFor(() => {
            expect(ref.current).toBeInstanceOf(type);
        });
    });
});
