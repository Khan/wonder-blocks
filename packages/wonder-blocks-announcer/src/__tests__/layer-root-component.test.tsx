import * as React from "react";
import {render, act, screen} from "@testing-library/react";
import {
    LayerRoot,
    useLayerRoot,
    useLayerRootModalState,
} from "../components/layer-root";
import {
    findOrCreateLayerRoot,
    setLayerRootModalState,
    removeLayerRoot,
    LAYER_ROOT_ID,
    LAYER_ROOT_TESTID,
} from "../util/manage-layer-root";

// Test component that uses the hooks
const TestHookComponent = () => {
    const layerRoot = useLayerRoot();
    const isModalState = useLayerRootModalState();

    return (
        <div>
            <div data-testid="layer-root-exists">
                {layerRoot ? "exists" : "null"}
            </div>
            <div data-testid="modal-state">
                {isModalState ? "true" : "false"}
            </div>
        </div>
    );
};

describe("LayerRoot Component", () => {
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

    describe("LayerRoot", () => {
        it("should create layer root element when rendered", async () => {
            // Arrange: Render LayerRoot component
            render(<LayerRoot />);

            // Act: Wait for useEffect to run
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert: Layer root should be created with correct attributes
            const layerRoot = screen.getByTestId(LAYER_ROOT_TESTID);
            expect(layerRoot).toBeInTheDocument();
            expect(layerRoot).toHaveAttribute("aria-modal", "false");
        });

        it("should not render children when no children provided", () => {
            // Arrange: Render LayerRoot without children
            const {container} = render(<LayerRoot />);

            // Assert: Should not render any visible content
            expect(container).toBeEmptyDOMElement();
        });

        it("should render children into layer root via portal", async () => {
            // Arrange: Render LayerRoot with children
            const {rerender} = render(
                <LayerRoot>
                    <div data-testid="portal-content">Portal Content</div>
                </LayerRoot>,
            );

            // Act: Wait for multiple render cycles to complete initialization
            await act(async () => {
                // Wait for isClient to be set to true
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            // Force a re-render to trigger the second useEffect
            rerender(
                <LayerRoot>
                    <div data-testid="portal-content">Portal Content</div>
                </LayerRoot>,
            );

            await act(async () => {
                // Wait for layer root to be created and portal to render
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            // Assert: Portal content should be rendered
            const portalContent = screen.getByTestId("portal-content");
            expect(portalContent).toBeInTheDocument();
        });

        it("should apply custom testId to layer root", async () => {
            // Arrange: Render LayerRoot with custom testId
            render(<LayerRoot testId="custom-layer-root" />);

            // Act: Wait for layer root creation
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert: Layer root should have custom testId
            const layerRoot = screen.getByTestId("custom-layer-root");
            expect(layerRoot).toBeInTheDocument();
        });

        it("should handle cleanupOnUnmount=false", async () => {
            // Arrange: Render LayerRoot with cleanupOnUnmount=false
            const {unmount} = render(<LayerRoot cleanupOnUnmount={false} />);

            // Act: Wait for layer root creation
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();

            // Act: Unmount component
            unmount();

            // Assert: Layer root should still exist after unmount
            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();
        });

        it("should handle cleanupOnUnmount=true (default)", async () => {
            // Arrange: Render LayerRoot with default cleanupOnUnmount=true
            const {unmount} = render(<LayerRoot />);

            // Act: Wait for layer root creation
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();

            // Act: Unmount component
            unmount();

            // Assert: Layer root should be removed after unmount
            expect(
                screen.queryByTestId(LAYER_ROOT_TESTID),
            ).not.toBeInTheDocument();
        });

        it("should render nothing on server side when children provided", () => {
            // Mock isClient to false (simulating server-side)
            const mockUseState = jest.spyOn(React, "useState");
            mockUseState.mockImplementationOnce(() => [false, jest.fn()]);

            const {container} = render(
                <LayerRoot>
                    <div>Server side content</div>
                </LayerRoot>,
            );

            expect(container).toBeEmptyDOMElement();

            mockUseState.mockRestore();
        });

        it("should handle multiple LayerRoot components gracefully", async () => {
            // Arrange: Render multiple LayerRoot components
            render(
                <>
                    <LayerRoot testId="first" />
                    <LayerRoot testId="second" />
                </>,
            );

            // Act: Wait for layer roots to be created
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert: The last rendered component's testId should win
            const layerRoot = screen.getByTestId("second");
            expect(layerRoot).toBeInTheDocument();

            // Assert: Should have the layer root ID
            expect(layerRoot).toHaveAttribute("id", LAYER_ROOT_ID);
        });
    });

    describe("useLayerRoot hook", () => {
        it("should return layer root element after initialization", async () => {
            // Arrange: Render component with hook
            render(<TestHookComponent />);

            // Act: Wait for useEffect to create layer root
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert: Hook should return the layer root element
            expect(screen.getByTestId("layer-root-exists")).toHaveTextContent(
                "exists",
            );
        });

        it("should return the same layer root instance across multiple hook calls", async () => {
            const TestMultipleHooks = () => {
                const layerRoot1 = useLayerRoot();
                const layerRoot2 = useLayerRoot();

                return (
                    <div data-testid="same-instance">
                        {layerRoot1 === layerRoot2 ? "same" : "different"}
                    </div>
                );
            };

            render(<TestMultipleHooks />);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            expect(screen.getByTestId("same-instance")).toHaveTextContent(
                "same",
            );
        });
    });

    describe("useLayerRootModalState hook", () => {
        it("should return false when layer root doesn't exist", () => {
            render(<TestHookComponent />);

            expect(screen.getByTestId("modal-state")).toHaveTextContent(
                "false",
            );
        });

        it("should return false when aria-modal is false", async () => {
            render(<TestHookComponent />);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            expect(screen.getByTestId("modal-state")).toHaveTextContent(
                "false",
            );
        });

        it("should return true when aria-modal is true", async () => {
            // Arrange: Set layer root to modal state before rendering
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act: Render component with hook
            render(<TestHookComponent />);

            // Assert: Hook should return true for modal state
            expect(screen.getByTestId("modal-state")).toHaveTextContent("true");
        });

        it("should return false when aria-modal is false", async () => {
            // Arrange: Ensure layer root exists and is not in modal state
            findOrCreateLayerRoot();
            setLayerRootModalState(false);

            // Act: Render component with hook
            render(<TestHookComponent />);

            // Assert: Hook should return false for non-modal state
            expect(screen.getByTestId("modal-state")).toHaveTextContent(
                "false",
            );
        });
    });

    describe("integration scenarios", () => {
        it("should work with pre-existing layer root", async () => {
            // Arrange: Create layer root before component renders
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            // Act: Render component with hooks
            render(<TestHookComponent />);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert: Hooks should work with pre-existing layer root
            expect(screen.getByTestId("layer-root-exists")).toHaveTextContent(
                "exists",
            );
            expect(screen.getByTestId("modal-state")).toHaveTextContent("true");
        });

        it("should handle rapid component mount/unmount cycles", async () => {
            // Arrange & Act: Perform multiple mount/unmount cycles
            for (let i = 0; i < 5; i++) {
                const {unmount} = render(<LayerRoot />);

                await act(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 0));
                });

                expect(
                    screen.getByTestId(LAYER_ROOT_TESTID),
                ).toBeInTheDocument();

                unmount();
            }

            // Assert: Should end with no layer root
            expect(
                screen.queryByTestId(LAYER_ROOT_TESTID),
            ).not.toBeInTheDocument();
        });

        it("should portal multiple children correctly", async () => {
            // Arrange: Render LayerRoot with multiple children
            const {rerender} = render(
                <LayerRoot>
                    <div data-testid="child-1">Child 1</div>
                    <div data-testid="child-2">Child 2</div>
                    <span data-testid="child-3">Child 3</span>
                </LayerRoot>,
            );

            // Act: Wait for initialization and force re-render
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            rerender(
                <LayerRoot>
                    <div data-testid="child-1">Child 1</div>
                    <div data-testid="child-2">Child 2</div>
                    <span data-testid="child-3">Child 3</span>
                </LayerRoot>,
            );

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            // Assert: First child should be rendered
            const child1 = screen.getByTestId("child-1");
            expect(child1).toBeInTheDocument();
        });
    });
});
