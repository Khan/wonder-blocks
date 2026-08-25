import * as React from "react";

import {acceptsRef} from "../accepts-ref";

describe("acceptsRef", () => {
    it("should return true for host elements", () => {
        // Arrange
        const element = <button>Trigger</button>;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true for forwardRef components", () => {
        // Arrange
        const Trigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
            <button ref={ref} />
        ));
        const element = <Trigger />;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true for memoized forwardRef components", () => {
        // Arrange
        const Trigger = React.memo(
            React.forwardRef<HTMLButtonElement>((props, ref) => (
                <button ref={ref} />
            )),
        );
        const element = <Trigger />;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true for class components", () => {
        // Arrange
        class Trigger extends React.Component {
            render() {
                return <button />;
            }
        }
        const element = <Trigger />;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return false for function components", () => {
        // Arrange
        const Trigger = () => <button />;
        const element = <Trigger />;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for memoized function components", () => {
        // Arrange
        const Trigger = React.memo(() => <button />);
        const element = <Trigger />;

        // Act
        const result = acceptsRef(element);

        // Assert
        expect(result).toBe(false);
    });
});
