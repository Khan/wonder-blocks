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
        it("should create HTMLElement when no layer root exists", () => {
            // Arrange & Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
            expect(layerRoot).toBeInstanceOf(HTMLElement);
        });

        it("should assign correct ID to new layer root", () => {
            // Arrange & Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
            expect(layerRoot.id).toBe(LAYER_ROOT_ID);
        });

        it("should assign correct testId to new layer root", () => {
            // Arrange & Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
            expect(layerRoot.getAttribute("data-testid")).toBe(
                LAYER_ROOT_TESTID,
            );
        });

        it("should set aria-modal to false on new layer root", () => {
            // Arrange & Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
            expect(layerRoot.getAttribute("aria-modal")).toBe("false");
        });

        it("should append new layer root to document body", () => {
            // Arrange & Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
            expect(document.body.contains(layerRoot)).toBe(true);
        });

        it("should return same element on multiple calls", () => {
            // Arrange & Act
            const firstCall = findOrCreateLayerRoot();
            const secondCall = findOrCreateLayerRoot();

            // Assert
            expect(firstCall).toBe(secondCall);
        });

        it("should create only one layer root element on multiple calls", () => {
            // Arrange & Act
            findOrCreateLayerRoot();
            findOrCreateLayerRoot();

            // Assert
            expect(document.querySelectorAll(`#${LAYER_ROOT_ID}`)).toHaveLength(
                1,
            );
        });

        it("should attach layer root to document.body", () => {
            const layerRoot = findOrCreateLayerRoot();

            expect(layerRoot.parentElement).toBe(document.body);
        });

        it("should create layer root as DIV element", () => {
            // Arrange
            removeLayerRoot();

            // Act
            const layerRoot = findOrCreateLayerRoot();

            // Assert
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
            // Arrange
            const layerRoot = findOrCreateLayerRoot();

            // Act
            setLayerRootModalState(true);

            // Assert
            expect(layerRoot.getAttribute("aria-modal")).toBe("true");
        });

        it("should set aria-modal to false when isModal is false", () => {
            // Arrange
            const layerRoot = findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act
            setLayerRootModalState(false);

            // Assert
            expect(layerRoot.getAttribute("aria-modal")).toBe("false");
        });

        it("should not throw when setting true on non-existent layer root", () => {
            // Arrange & Act & Assert
            expect(() => setLayerRootModalState(true)).not.toThrow();
        });

        it("should not throw when setting false on non-existent layer root", () => {
            // Arrange & Act & Assert
            expect(() => setLayerRootModalState(false)).not.toThrow();
        });

        it("should maintain correct state after multiple changes", () => {
            // Arrange
            const layerRoot = findOrCreateLayerRoot();

            // Act
            setLayerRootModalState(true);
            setLayerRootModalState(false);
            setLayerRootModalState(true);

            // Assert
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

        it("should return false for initial state", () => {
            // Arrange
            findOrCreateLayerRoot();

            // Act & Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should return true after setting state to true", () => {
            // Arrange
            findOrCreateLayerRoot();

            // Act
            setLayerRootModalState(true);

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should return false after changing state from true to false", () => {
            // Arrange
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act
            setLayerRootModalState(false);

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("useLayerRootTarget", () => {
        it("should return existing layer root when it exists", () => {
            const layerRoot = findOrCreateLayerRoot();
            const target = useLayerRootTarget();

            expect(target).toBe(layerRoot);
        });

        it("should create HTMLElement when createIfMissing is true by default", () => {
            // Arrange & Act
            const target = useLayerRootTarget();

            // Assert
            expect(target).toBeInstanceOf(HTMLElement);
        });

        it("should assign correct ID when createIfMissing is true by default", () => {
            // Arrange & Act
            const target = useLayerRootTarget();

            // Assert
            expect(target.id).toBe(LAYER_ROOT_ID);
        });

        it("should append to document body when createIfMissing is true by default", () => {
            // Arrange & Act
            const target = useLayerRootTarget();

            // Assert
            expect(document.body.contains(target)).toBe(true);
        });

        it("should create HTMLElement when createIfMissing is explicitly true", () => {
            // Arrange & Act
            const target = useLayerRootTarget(true);

            // Assert
            expect(target).toBeInstanceOf(HTMLElement);
        });

        it("should assign correct ID when createIfMissing is explicitly true", () => {
            // Arrange & Act
            const target = useLayerRootTarget(true);

            // Assert
            expect(target.id).toBe(LAYER_ROOT_ID);
        });

        it("should append to document body when createIfMissing is explicitly true", () => {
            // Arrange & Act
            const target = useLayerRootTarget(true);

            // Assert
            expect(document.body.contains(target)).toBe(true);
        });

        it("should return document.body when createIfMissing is false and no layer root exists", () => {
            // Arrange & Act
            const target = useLayerRootTarget(false);

            // Assert
            expect(target).toBe(document.body);
        });

        it("should not create layer root when createIfMissing is false", () => {
            // Arrange & Act
            useLayerRootTarget(false);

            // Assert
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
        it("should remove layer root element from document body", () => {
            // Arrange
            const layerRoot = findOrCreateLayerRoot();

            // Act
            removeLayerRoot();

            // Assert
            expect(document.body.contains(layerRoot)).toBe(false);
        });

        it("should make getLayerRootElement return null after removal", () => {
            // Arrange
            findOrCreateLayerRoot();

            // Act
            removeLayerRoot();

            // Assert
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
        it("should create new element with correct ID after create/remove cycle", () => {
            // Arrange
            findOrCreateLayerRoot();
            removeLayerRoot();

            // Act
            const second = findOrCreateLayerRoot();

            // Assert
            expect(second.id).toBe(LAYER_ROOT_ID);
        });

        it("should append new element to document body after create/remove cycle", () => {
            // Arrange
            findOrCreateLayerRoot();
            removeLayerRoot();

            // Act
            const second = findOrCreateLayerRoot();

            // Assert
            expect(document.body.contains(second)).toBe(true);
        });

        it("should remove previous element from DOM after create/remove cycle", () => {
            // Arrange
            const first = findOrCreateLayerRoot();
            removeLayerRoot();

            // Act
            findOrCreateLayerRoot();

            // Assert
            expect(document.body.contains(first)).toBe(false);
        });

        it("should maintain aria-modal attribute across function calls", () => {
            // Arrange
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act
            const retrieved = getLayerRootElement();

            // Assert
            expect(retrieved?.getAttribute("aria-modal")).toBe("true");
        });

        it("should maintain modal state across function calls", () => {
            // Arrange
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act & Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should maintain correct state after rapid changes", () => {
            // Arrange
            findOrCreateLayerRoot();

            // Act
            for (let i = 0; i < 10; i++) {
                setLayerRootModalState(i % 2 === 0);
            }

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });
});
