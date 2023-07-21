import * as React from "react";
import {render} from "@testing-library/react";

import Title from "../../packages/wonder-blocks-typography/src/components/title";
import Tagline from "../../packages/wonder-blocks-typography/src/components/tagline";

describe("Typography elements", () => {
    test.each`
        Component  | name         | type                  | typeName
        ${Tagline} | ${"Tagline"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Title}   | ${"Title"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
    `("$name forwards ref to $typeName", ({Component, type}: any) => {
        // Arrange
        const ref: React.RefObject<HTMLHeadingElement> = React.createRef();

        // Act
        render(<Component ref={ref}>This is a title</Component>);

        // Assert
        expect(ref.current).toBeInstanceOf(type);
    });
});
