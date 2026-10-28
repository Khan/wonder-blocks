import {parseTransitions} from "../transitions";

describe("parseTransitions", () => {
    it("should expand a shorthand property to its RN keys", () => {
        // Arrange, Act
        const [transition] = parseTransitions("border-radius 0.1s ease-in-out");

        // Assert
        expect(transition.keys).toEqual([
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomRightRadius",
            "borderBottomLeftRadius",
        ]);
    });

    it.each([
        ["0.1s", 100],
        ["250ms", 250],
    ])("should parse a duration of %s as %ims", (duration, expected) => {
        // Arrange, Act
        const [transition] = parseTransitions(`opacity ${duration}`);

        // Assert
        expect(transition.durationMs).toBe(expected);
    });

    it("should parse the second time as the delay", () => {
        // Arrange, Act
        const [transition] = parseTransitions("opacity 100ms linear 50ms");

        // Assert
        expect(transition.delayMs).toBe(50);
    });

    it.each([
        ["ease-in-out", [0.42, 0, 0.58, 1]],
        ["cubic-bezier(0.1, 0.2, 0.3, 0.4)", [0.1, 0.2, 0.3, 0.4]],
    ])("should parse the %s timing function", (easing, expected) => {
        // Arrange, Act
        const [transition] = parseTransitions(`opacity 100ms ${easing}`);

        // Assert
        expect(transition.easing).toEqual(expected);
    });

    it("should split a list without breaking on commas in cubic-bezier()", () => {
        // Arrange, Act
        const transitions = parseTransitions(
            "opacity 100ms cubic-bezier(0, 0, 1, 1), height 200ms",
        );

        // Assert
        expect(transitions.map((t) => t.keys)).toEqual([
            ["opacity"],
            ["height"],
        ]);
    });

    it("should expand `all` to the element's numeric keys", () => {
        // Arrange, Act
        const [transition] = parseTransitions("all 100ms", [
            "height",
            "opacity",
        ]);

        // Assert
        expect(transition.keys).toEqual(["height", "opacity"]);
    });

    it("should skip zero-duration transitions", () => {
        // Arrange, Act
        const transitions = parseTransitions("opacity 0s");

        // Assert
        expect(transitions).toEqual([]);
    });
});
