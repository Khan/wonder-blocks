import * as React from "react";
import {render, screen} from "@testing-library/react";

import BodyText from "../../components/body-text";
import BodyMonospace from "../../components/body-monospace";
import Heading from "../../components/heading";
import styles from "../styles";
import typographyClassNames from "../class-names";

describe("typographyClassNames", () => {
    it("has the same keys as the Aphrodite `styles` export", () => {
        // Arrange
        const stylesKeys = Object.keys(styles);

        // Act
        const classNamesKeys = Object.keys(typographyClassNames);

        // Assert
        expect(classNamesKeys).toEqual(stylesKeys);
    });

    it("composes the base class with the size/weight variant class", () => {
        // Arrange

        // Act
        const classNames = typographyClassNames.BodyTextMediumMediumWeight;

        // Assert
        expect(classNames).toBe("bodyText mediumMedium");
    });

    it.each([
        [
            "BodyTextSmallSemiWeight",
            <BodyText key="b" size="small" weight="semi">
                Text
            </BodyText>,
        ],
        [
            "HeadingLargeBoldWeight",
            <Heading key="h" size="large" weight="bold">
                Text
            </Heading>,
        ],
        ["BodyMonospace", <BodyMonospace key="m">Text</BodyMonospace>],
    ] as const)(
        "%s matches the classes the component renders",
        (key, element) => {
            // Arrange
            render(element);

            // Act
            const node = screen.getByText("Text");

            // Assert
            for (const className of typographyClassNames[key].split(" ")) {
                expect(node).toHaveClass(className);
            }
        },
    );
});
