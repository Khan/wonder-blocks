import * as React from "react";
import {StyleSheet} from "aphrodite";
import {screen, render} from "@testing-library/react";

import {makeStyled} from "../add-style";

const styles = StyleSheet.create({
    foo: {
        height: "100%",
    },
});

const {StyledDiv} = makeStyled("div");

describe("addStyle", () => {
    let SNAPSHOT_INLINE_APHRODITE: any;

    beforeEach(() => {
        // @ts-expect-error [FEI-5019] - TS7017 - Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
        SNAPSHOT_INLINE_APHRODITE = global.SNAPSHOT_INLINE_APHRODITE;
        // @ts-expect-error [FEI-5019] - TS7017 - Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
        global.SNAPSHOT_INLINE_APHRODITE = false;
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS7017 - Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
        global.SNAPSHOT_INLINE_APHRODITE = SNAPSHOT_INLINE_APHRODITE;
    });

    it("should set the className if no style is provided", () => {
        // Arrange
        render(<StyledDiv className="foo" data-testid="styled-div" />);

        // Act
        const div = screen.getByTestId("styled-div");

        // Assert
        expect(div).toHaveAttribute("class", "foo");
    });

    it("should set the className to include foo and inlineStyles", () => {
        // Arrange
        render(
            <StyledDiv
                className="foo"
                style={{width: "100%"}}
                data-testid="styled-div"
            />,
        );

        // Act
        const div = screen.getByTestId("styled-div");

        // Assert
        const classNames = div.className.split(" ");
        expect(classNames).toHaveLength(2);
        expect(classNames[0].startsWith("inlineStyles")).toBeTruthy();
        expect(classNames[1]).toEqual("foo");
    });

    it("should set the class if an stylesheet style is provided", () => {
        // Arrange
        render(<StyledDiv style={styles.foo} data-testid="styled-div" />);

        // Act
        const div = screen.getByTestId("styled-div");

        // Assert
        expect(div).toHaveAttribute("class", expect.any(String));
    });

    it("should set the className if an stylesheet style is provided", () => {
        // Arrange
        render(
            <StyledDiv
                className="foo"
                style={styles.foo}
                data-testid="styled-div"
            />,
        );

        // Act
        const div = screen.getByTestId("styled-div");

        // Assert
        const classNames = div.className.split(" ");
        expect(classNames).toHaveLength(2);
        expect(classNames[0]).toEqual(expect.any(String));
        expect(classNames[1]).toEqual("foo");
    });

    it("should forward a ref to the component", () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();

        render(
            <StyledDiv
                className="foo"
                style={styles.foo}
                data-testid="styled-div"
                ref={ref}
            />,
        );

        // Act
        const div = screen.getByTestId("styled-div");

        // Assert
        expect(div).toBe(ref.current);
    });
});
