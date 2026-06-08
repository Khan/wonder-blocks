import * as React from "react";
import {StyleSheet} from "aphrodite";
import {screen, render} from "@testing-library/react";

import addStyle from "../add-style";

const StyledDiv = addStyle("div");

const styles = StyleSheet.create({
    foo: {
        height: "100%",
    },
});

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

    it("should wrap inline styles into a generated class alongside the consumer className", () => {
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

        // Assert — inline styles are wrapped into a generated aphrodite class
        // (so they can outweigh aphrodite's `!important`); the consumer's
        // `className` is appended and no inline `style` attribute is emitted.
        const classNames = div.className.split(" ");
        expect(classNames).toHaveLength(2);
        expect(classNames[0]).toEqual(expect.any(String));
        expect(classNames[1]).toEqual("foo");
        expect(div).not.toHaveAttribute("style");
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

    describe("CSS Modules", () => {
        it("should forward a CSS module class name (string `style`) as a className", () => {
            // Arrange
            render(<StyledDiv style="module-class" data-testid="styled-div" />);

            // Act
            const div = screen.getByTestId("styled-div");

            // Assert
            expect(div).toHaveAttribute("class", "module-class");
        });

        it("should not generate an inline style attribute for a CSS module class name", () => {
            // Arrange
            render(<StyledDiv style="module-class" data-testid="styled-div" />);

            // Act
            const div = screen.getByTestId("styled-div");

            // Assert
            expect(div).not.toHaveAttribute("style");
        });

        it("should combine a CSS module class name with the consumer's className", () => {
            // Arrange
            render(
                <StyledDiv
                    className="foo"
                    style="module-class"
                    data-testid="styled-div"
                />,
            );

            // Act
            const div = screen.getByTestId("styled-div");

            // Assert — the CSS module class flows through `processStyleList`,
            // then the consumer's `className` is appended.
            expect(div).toHaveAttribute("class", "module-class foo");
        });

        it("should join multiple CSS module class names passed via `style`", () => {
            // Arrange
            render(
                <StyledDiv
                    style={["module-a", "module-b"]}
                    data-testid="styled-div"
                />,
            );

            // Act
            const div = screen.getByTestId("styled-div");

            // Assert
            expect(div).toHaveAttribute("class", "module-a module-b");
        });

        it("should append a CSS module class name after an aphrodite-generated class", () => {
            // Arrange
            render(
                <StyledDiv
                    style={[styles.foo, "module-class"]}
                    data-testid="styled-div"
                />,
            );

            // Act
            const div = screen.getByTestId("styled-div");

            // Assert — aphrodite-generated class first, then the CSS module class.
            const classNames = div.className.split(" ");
            expect(classNames[1]).toEqual("module-class");
        });
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
