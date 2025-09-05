import {
    findOrCreateLayerRoot,
    getLayerRootElement,
    setLayerRootModalState,
    getLayerRootModalState,
    useLayerRootTarget,
    removeLayerRoot,
    LAYER_ROOT_ID,
    LAYER_ROOT_TESTID,
} from "../util/manage-layer-root";

describe("Layer Root Utilities", () => {
    beforeEach(() => {
        // Clean up any existing layer root before each test
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        // Clean up after each test
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    describe("findOrCreateLayerRoot", () => {
        it("should create a new layer root when none exists", () => {
            const layerRoot = findOrCreateLayerRoot();

            expect(layerRoot).toBeInstanceOf(HTMLElement);
            expect(layerRoot.id).toBe(LAYER_ROOT_ID);
            expect(layerRoot.getAttribute("data-testid")).toBe(
                LAYER_ROOT_TESTID,
            );
            expect(layerRoot.getAttribute("aria-modal")).toBe("false");
            expect(document.body.contains(layerRoot)).toBe(true);
        });

        it("should return existing layer root if it already exists", () => {
            const firstCall = findOrCreateLayerRoot();
            const secondCall = findOrCreateLayerRoot();

            expect(firstCall).toBe(secondCall);
            expect(document.querySelectorAll(`#${LAYER_ROOT_ID}`)).toHaveLength(
                1,
            );
        });

        it("should attach layer root to document.body", () => {
            const layerRoot = findOrCreateLayerRoot();

            expect(layerRoot.parentElement).toBe(document.body);
        });

        it("should create layer root with correct attributes", () => {
            // Arrange: Ensure clean state
            removeLayerRoot();

            // Act: Create layer root
            const layerRoot = findOrCreateLayerRoot();

            // Assert: Layer root has expected attributes
            expect(layerRoot.tagName).toBe("DIV");
        });
    });

    describe("getLayerRootElement", () => {
        it("should return null when no layer root exists", () => {
            expect(getLayerRootElement()).toBeNull();
        });

        it("should return existing layer root", () => {
            // Arrange: Create layer root
            const created = findOrCreateLayerRoot();

            // Act: Get layer root element
            const retrieved = getLayerRootElement();

            // Assert: Should return the same element
            expect(retrieved).toBe(created);
        });
    });

    describe("setLayerRootModalState", () => {
        it("should set aria-modal to true when isModal is true", () => {
            const layerRoot = findOrCreateLayerRoot();

            setLayerRootModalState(true);

            expect(layerRoot.getAttribute("aria-modal")).toBe("true");
        });

        it("should set aria-modal to false when isModal is false", () => {
            const layerRoot = findOrCreateLayerRoot();

            // First set to true, then false
            setLayerRootModalState(true);
            setLayerRootModalState(false);

            expect(layerRoot.getAttribute("aria-modal")).toBe("false");
        });

        it("should do nothing when layer root doesn't exist", () => {
            // Should not throw when layer root doesn't exist
            expect(() => setLayerRootModalState(true)).not.toThrow();
            expect(() => setLayerRootModalState(false)).not.toThrow();
        });

        it("should handle multiple state changes", () => {
            const layerRoot = findOrCreateLayerRoot();

            setLayerRootModalState(true);
            expect(layerRoot.getAttribute("aria-modal")).toBe("true");

            setLayerRootModalState(false);
            expect(layerRoot.getAttribute("aria-modal")).toBe("false");

            setLayerRootModalState(true);
            expect(layerRoot.getAttribute("aria-modal")).toBe("true");
        });
    });

    describe("getLayerRootModalState", () => {
        it("should return false when layer root doesn't exist", () => {
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should return false when aria-modal is false", () => {
            findOrCreateLayerRoot();
            setLayerRootModalState(false);

            expect(getLayerRootModalState()).toBe(false);
        });

        it("should return true when aria-modal is true", () => {
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            expect(getLayerRootModalState()).toBe(true);
        });

        it("should return current state correctly", () => {
            findOrCreateLayerRoot();

            // Initial state should be false
            expect(getLayerRootModalState()).toBe(false);

            setLayerRootModalState(true);
            expect(getLayerRootModalState()).toBe(true);

            setLayerRootModalState(false);
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("useLayerRootTarget", () => {
        it("should return existing layer root when it exists", () => {
            const layerRoot = findOrCreateLayerRoot();
            const target = useLayerRootTarget();

            expect(target).toBe(layerRoot);
        });

        it("should create and return layer root when createIfMissing is true (default)", () => {
            const target = useLayerRootTarget();

            expect(target).toBeInstanceOf(HTMLElement);
            expect(target.id).toBe(LAYER_ROOT_ID);
            expect(document.body.contains(target)).toBe(true);
        });

        it("should create and return layer root when createIfMissing is explicitly true", () => {
            const target = useLayerRootTarget(true);

            expect(target).toBeInstanceOf(HTMLElement);
            expect(target.id).toBe(LAYER_ROOT_ID);
            expect(document.body.contains(target)).toBe(true);
        });

        it("should return document.body when createIfMissing is false and no layer root exists", () => {
            const target = useLayerRootTarget(false);

            expect(target).toBe(document.body);
            expect(getLayerRootElement()).toBeNull();
        });

        it("should return document.body when createIfMissing is false and layer root doesn't exist", () => {
            // Arrange: Ensure no layer root exists
            removeLayerRoot();

            // Act: Get target without creating layer root
            const target = useLayerRootTarget(false);

            // Assert: Should fallback to document.body
            expect(target).toBe(document.body);
        });
    });

    describe("removeLayerRoot", () => {
        it("should remove layer root from DOM", () => {
            const layerRoot = findOrCreateLayerRoot();
            expect(document.body.contains(layerRoot)).toBe(true);

            removeLayerRoot();

            expect(document.body.contains(layerRoot)).toBe(false);
            expect(getLayerRootElement()).toBeNull();
        });

        it("should do nothing when layer root doesn't exist", () => {
            expect(() => removeLayerRoot()).not.toThrow();
        });

        it("should handle layer root without parent", () => {
            const layerRoot = findOrCreateLayerRoot();
            // Manually remove from parent to test edge case
            layerRoot.remove();

            expect(() => removeLayerRoot()).not.toThrow();
        });
    });

    describe("integration scenarios", () => {
        it("should handle multiple create/remove cycles", () => {
            // Create and remove multiple times
            const first = findOrCreateLayerRoot();
            removeLayerRoot();

            const second = findOrCreateLayerRoot();
            expect(second.id).toBe(LAYER_ROOT_ID);
            expect(document.body.contains(second)).toBe(true);

            // First should no longer be in DOM
            expect(document.body.contains(first)).toBe(false);
        });

        it("should maintain state across function calls", () => {
            const layerRoot = findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Getting the element again should maintain the state
            const retrieved = getLayerRootElement();
            expect(retrieved?.getAttribute("aria-modal")).toBe("true");
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should work with rapid state changes", () => {
            const layerRoot = findOrCreateLayerRoot();

            // Rapid state changes
            for (let i = 0; i < 10; i++) {
                setLayerRootModalState(i % 2 === 0);
                expect(getLayerRootModalState()).toBe(i % 2 === 0);
            }
        });
    });
});
