import * as React from "react";
import {canAcceptRef, getElementRef} from "../trigger-refs";

describe("canAcceptRef", () => {
    it("should return true for a host element", () => {
        // Arrange
        const element = <button />;

        // Act
        const result = canAcceptRef(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true for a forwardRef component", () => {
        // Arrange
        const ForwardRefComponent = React.forwardRef<HTMLButtonElement>(
            (props, ref) => <button ref={ref} />,
        );

        // Act
        const result = canAcceptRef(<ForwardRefComponent />);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true for a memoized forwardRef component", () => {
        // Arrange
        // `memo` is transparent here: it can receive a ref as long as the
        // component it wraps can.
        const MemoComponent = React.memo(
            React.forwardRef<HTMLButtonElement>((props, ref) => (
                <button ref={ref} />
            )),
        );

        // Act
        const result = canAcceptRef(<MemoComponent />);

        // Assert
        expect(result).toBe(true);
    });

    it("should return false for a plain function component", () => {
        // Arrange
        const FunctionComponent = () => <button />;

        // Act
        const result = canAcceptRef(<FunctionComponent />);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for a memoized plain function component", () => {
        // Arrange
        const MemoComponent = React.memo(() => <button />);

        // Act
        const result = canAcceptRef(<MemoComponent />);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for a class component", () => {
        // Arrange
        // A class component can receive a ref, but it resolves to the component
        // instance rather than to a DOM element. We don't write new class
        // components, but consumers may still pass one in as a trigger.
        class ClassComponent extends React.Component {
            render() {
                return <button />;
            }
        }

        // Act
        const result = canAcceptRef(<ClassComponent />);

        // Assert
        expect(result).toBe(false);
    });
});

describe("getElementRef", () => {
    it("should return the ref the element was created with", () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        const result = getElementRef(<button ref={ref} />);

        // Assert
        expect(result).toBe(ref);
    });

    it("should return undefined for an element created without a ref", () => {
        // Arrange
        const element = <button />;

        // Act
        const result = getElementRef(element);

        // Assert
        expect(result).toBeUndefined();
    });
});
