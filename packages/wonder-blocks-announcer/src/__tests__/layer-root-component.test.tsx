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
            // Arrange
            render(<LayerRoot />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            const layerRoot = screen.getByTestId(LAYER_ROOT_TESTID);
            expect(layerRoot).toBeInTheDocument();
        });

        it("should set aria-modal to false on layer root by default", async () => {
            // Arrange
            render(<LayerRoot />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            const layerRoot = screen.getByTestId(LAYER_ROOT_TESTID);
            expect(layerRoot).toHaveAttribute("aria-modal", "false");
        });

        it("should not render children when no children provided", () => {
            // Arrange
            const {container} = render(<LayerRoot />);

            // Assert
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

        it("should create layer root when cleanupOnUnmount is false", async () => {
            // Arrange
            render(<LayerRoot cleanupOnUnmount={false} />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();
        });

        it("should preserve layer root after unmount when cleanupOnUnmount is false", async () => {
            // Arrange
            const {unmount} = render(<LayerRoot cleanupOnUnmount={false} />);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Act
            unmount();

            // Assert
            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();
        });

        it("should create layer root when cleanupOnUnmount is true by default", async () => {
            // Arrange
            render(<LayerRoot />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            expect(screen.getByTestId(LAYER_ROOT_TESTID)).toBeInTheDocument();
        });

        it("should remove layer root after unmount when cleanupOnUnmount is true", async () => {
            // Arrange
            const {unmount} = render(<LayerRoot />);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Act
            unmount();

            // Assert
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

        it("should use testId from last rendered LayerRoot component", async () => {
            // Arrange
            render(
                <>
                    <LayerRoot testId="first" />
                    <LayerRoot testId="second" />
                </>,
            );

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            const layerRoot = screen.getByTestId("second");
            expect(layerRoot).toBeInTheDocument();
        });

        it("should assign correct ID to layer root with multiple LayerRoot components", async () => {
            // Arrange
            render(
                <>
                    <LayerRoot testId="first" />
                    <LayerRoot testId="second" />
                </>,
            );

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            const layerRoot = screen.getByTestId("second");
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
        it("should detect existing layer root element via hook", async () => {
            // Arrange
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            render(<TestHookComponent />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            expect(screen.getByTestId("layer-root-exists")).toHaveTextContent(
                "exists",
            );
        });

        it("should read correct modal state from pre-existing layer root", async () => {
            // Arrange
            findOrCreateLayerRoot();
            setLayerRootModalState(true);

            render(<TestHookComponent />);

            // Act
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            // Assert
            expect(screen.getByTestId("modal-state")).toHaveTextContent("true");
        });

        it("should clean up layer root after multiple mount/unmount cycles", async () => {
            // Arrange & Act
            for (let i = 0; i < 5; i++) {
                const {unmount} = render(<LayerRoot />);

                await act(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 0));
                });

                unmount();
            }

            // Assert
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
