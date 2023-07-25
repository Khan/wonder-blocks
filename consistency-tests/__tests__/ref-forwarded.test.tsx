import * as React from "react";
import {render} from "@testing-library/react";

import Text from "../../packages/wonder-blocks-core/src/components/text";

// Typography imports
import Body from "../../packages/wonder-blocks-typography/src/components/body";
import BodyMonospace from "../../packages/wonder-blocks-typography/src/components/body-monospace";
import BodySerif from "../../packages/wonder-blocks-typography/src/components/body-serif";
import BodySerifBlock from "../../packages/wonder-blocks-typography/src/components/body-serif-block";
import Caption from "../../packages/wonder-blocks-typography/src/components/caption";
import Footnote from "../../packages/wonder-blocks-typography/src/components/footnote";
import HeadingLarge from "../../packages/wonder-blocks-typography/src/components/heading-large";
import HeadingMedium from "../../packages/wonder-blocks-typography/src/components/heading-medium";
import HeadingSmall from "../../packages/wonder-blocks-typography/src/components/heading-small";
import HeadingXSmall from "../../packages/wonder-blocks-typography/src/components/heading-xsmall";
import LabelLarge from "../../packages/wonder-blocks-typography/src/components/label-large";
import LabelMedium from "../../packages/wonder-blocks-typography/src/components/label-medium";
import LabelSmall from "../../packages/wonder-blocks-typography/src/components/label-small";
import LabelXSmall from "../../packages/wonder-blocks-typography/src/components/label-xsmall";
import Tagline from "../../packages/wonder-blocks-typography/src/components/tagline";
import Title from "../../packages/wonder-blocks-typography/src/components/title";

describe("Typography elements", () => {
    test.each`
        Component         | name                | type                  | typeName
        ${Text}           | ${"Text"}           | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Body}           | ${"Body"}           | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodyMonospace}  | ${"BodyMonospace"}  | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodySerif}      | ${"BodySerif"}      | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodySerifBlock} | ${"BodySerifBlock"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Caption}        | ${"Caption"}        | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Footnote}       | ${"Footnote"}       | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${HeadingLarge}   | ${"HeadingLarge"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingMedium}  | ${"HeadingMedium"}  | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingSmall}   | ${"HeadingSmall"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingXSmall}  | ${"HeadingXSmall"}  | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${LabelLarge}     | ${"LabelLarge"}     | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelMedium}    | ${"LabelMedium"}    | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelSmall}     | ${"LabelSmall"}     | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelXSmall}    | ${"LabelXSmall"}    | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Tagline}        | ${"Tagline"}        | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Title}          | ${"Title"}          | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
    `("$name forwards ref to $typeName", async ({Component, type}: any) => {
        // Arrange
        const ref: React.RefObject<typeof type> = React.createRef();

        // Act
        render(<Component ref={ref}>This is a title</Component>);

        // Assert
        expect(ref.current).toBeInstanceOf(type);
    });
});
