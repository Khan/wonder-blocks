import * as React from "react";
import {render, waitFor} from "@testing-library/react";

import Title from "../title";
import Tagline from "../tagline";

describe("Typography elements", () => {
    test.each`
        element    | type
        ${Tagline} | ${HTMLSpanElement}
        ${Title}   | ${HTMLHeadingElement}
    `("$element forwards to ref to $type", async ({element, type}: any) => {
        // Arrange
        const TypographyComponent = element;
        const ref: React.RefObject<HTMLHeadingElement> = React.createRef();

        // Act
        render(
            <TypographyComponent ref={ref}>
                This is a title
            </TypographyComponent>,
        );

        // Assert
        await waitFor(() => {
            expect(ref.current).toBeInstanceOf(type);
        });
    });
});
