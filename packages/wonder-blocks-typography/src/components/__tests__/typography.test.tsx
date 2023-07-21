import * as React from "react";
import {render, waitFor} from "@testing-library/react";

import LabelLarge from "../label-large";
import LabelMedium from "../label-medium";
import LabelSmall from "../label-small";
import LabelXSmall from "../label-xsmall";
import Tagline from "../tagline";
import Title from "../title";

describe("Typography elements", () => {
    test.each`
        Component      | name             | type                  | typeName
        ${LabelLarge}  | ${"LabelLarge"}  | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelMedium} | ${"LabelMedium"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelSmall}  | ${"LabelSmall"}  | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelXSmall} | ${"LabelXSmall"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Tagline}     | ${"Tagline"}     | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Title}       | ${"Title"}       | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
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
