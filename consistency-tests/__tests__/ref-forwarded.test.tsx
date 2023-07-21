import * as React from "react";
import {render} from "@testing-library/react";

import LabelLarge from "../../packages/wonder-blocks-typography/src/components/label-large";
import LabelMedium from "../../packages/wonder-blocks-typography/src/components/label-medium";
import LabelSmall from "../../packages/wonder-blocks-typography/src/components/label-small";
import LabelXSmall from "../../packages/wonder-blocks-typography/src/components/label-xsmall";
import Tagline from "../../packages/wonder-blocks-typography/src/components/tagline";
import Title from "../../packages/wonder-blocks-typography/src/components/title";

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
        expect(ref.current).toBeInstanceOf(type);
    });
});
