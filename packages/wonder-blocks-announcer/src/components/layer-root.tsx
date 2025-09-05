import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    findOrCreateLayerRoot,
    removeLayerRoot,
} from "../util/manage-layer-root";

type Props = {
    /**
     * Optional children to render within the layer root.
     * If not provided, the layer root serves as a portal target only.
     */
    children?: React.ReactNode;

    /**
     * Optional testId for the layer root element
     */
    testId?: string;

    /**
     * Whether to remove the layer root when component unmounts
     * Default: true (cleanup on unmount)
     */
    cleanupOnUnmount?: boolean;
};

/**
 * LayerRoot - Creates a common ancestor element for Wonder Blocks Announcer and Modal components
 *
 * This component establishes a single container element that:
 * - Contains Announcer live regions
 * - Contains Modal content when modals are open
 * - Has an aria-modal attribute that gets toggled by modal state
 * - Exists as a sibling container to other app content
 *
 * Usage:
 *
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <LayerRoot />
 *       <YourAppContent />
 *     </>
 *   );
 * }
 * ```
 *
 * This creates a `wb-layer-root` container separate from your app content.
 * This container will hold announcer live regions and modal content when needed.
 */
export const LayerRoot = ({
    children,
    testId,
    cleanupOnUnmount = true,
}: Props): React.ReactElement | null => {
    const layerRootRef = React.useRef<HTMLElement | null>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        if (!isClient) {
            return;
        }

        // Find or create the layer root element
        layerRootRef.current = findOrCreateLayerRoot();

        // Apply custom testId if provided
        if (testId && layerRootRef.current) {
            layerRootRef.current.setAttribute("data-testid", testId);
        }

        return () => {
            if (cleanupOnUnmount) {
                removeLayerRoot();
            }
        };
    }, [isClient, testId, cleanupOnUnmount]);

    // Primary use case: <LayerRoot /> just ensures the layer root exists
    // The layer root will be used by Announcer and Modal components as a portal target
    if (!children) {
        return null;
    }

    // Secondary use case: <LayerRoot>{content}</LayerRoot>
    // This renders content directly into the layer root (useful for modal content)
    if (!isClient || !layerRootRef.current) {
        return null; // Don't render anything on server side
    }

    // Use React Portal to render children into the layer root
    return ReactDOM.createPortal(children, layerRootRef.current);
};

/**
 * Hook to access the Layer Root element
 * Useful for components that need direct access to the layer root
 */
export const useLayerRoot = () => {
    const [layerRoot, setLayerRoot] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        // Find or create layer root on mount
        const layerRootElement = findOrCreateLayerRoot();
        setLayerRoot(layerRootElement);
    }, []);

    return layerRoot;
};

/**
 * Hook to check if the Layer Root is in modal state
 * This simply reads the current aria-modal attribute value
 */
export const useLayerRootModalState = (): boolean => {
    const layerRootElement = useLayerRoot();

    if (!layerRootElement) {
        return false;
    }

    return layerRootElement.getAttribute("aria-modal") === "true";
};

export default LayerRoot;
