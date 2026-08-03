import * as React from "react";

import {Floating} from "@khanacademy/wonder-blocks-floating";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import PopoverContent from "./popover-content";
import PopoverContentCore from "./popover-content-core";
import PopoverContext from "./popover-context";
import PopoverAnchor from "./popover-anchor";
import PopoverDialog from "./popover-dialog";

import type {Placement, RootBoundary} from "../util/types";

type PopoverContents =
    | React.ReactElement<React.ComponentProps<typeof PopoverContent>>
    | React.ReactElement<React.ComponentProps<typeof PopoverContentCore>>;

type Props = AriaProps & {
    /**
     * The element that triggers the popover. This element will be used to
     * position the popover. It can be either a Node or a function using the
     * children-as-function pattern to pass an open function for use anywhere
     * within children. The latter provides a lot of flexibility in terms of
     * what actions may trigger the `Popover` to launch the popover dialog.
     */
    children:
        | React.ReactElement<any>
        | ((arg1: {open: () => void}) => React.ReactElement<any>);
    /**
     * The content of the popover. You can either use
     * [PopoverContent](#PopoverContent) with one of the pre-defined variants,
     * or include your own custom content using
     * [PopoverContentCore](#PopoverContentCore directly.
     *
     * If the popover needs to close itself, the close function provided to this
     * callback can be called to close the popover.
     */
    content: PopoverContents | ((arg1: {close: () => void}) => PopoverContents);
    /**
     * Where the popover should try to appear in relation to the trigger element.
     * Defaults to "top".
     */
    placement?: Placement;
    /**
     * When enabled, user can hide the popover content by pressing the `esc` key
     * or clicking/tapping outside of it.
     */
    dismissEnabled?: boolean;
    /**
     * The unique identifier to give to the popover. Provide this in cases
     * where you want to override the default accessibility solution. This
     * identifier will be applied to the popover title and content.
     *
     * This is also used as a prefix to the IDs of the popover's elements.
     *
     * For example, if you pass `"my-popover"` as the ID, the popover title
     * will have the ID `"my-popover-title"` and the popover content will
     * have the ID `"my-popover-content"`.
     *
     */
    id?: string;
    /**
     * The selector for the element that will be focused after the popover
     * dialog closes. When not set, the element that triggered the popover
     * will be used.
     */
    closedFocusId?: string;
    /**
     * The selector for the element that will be focused when the popover
     * content shows. When not set, the first focusable element within the
     * popover content will be used.
     */
    initialFocusId?: string;
    /**
     * Renders the popover when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component. The
     * parent is responsible for managing the opening/closing of the popover
     * when using this prop.
     */
    opened?: boolean;
    /**
     * Called when the popover closes
     */
    onClose?: () => unknown;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Whether to show the popover tail or not. Defaults to true.
     */
    showTail?: boolean;
    /**
     * Optional property to enable the portal functionality of popover.
     * This is very handy in cases where the Popover can't be easily
     * injected into the DOM structure and requires portaling to
     * the trigger location.
     *
     * Set to "true" by default.
     *
     * CAUTION: Turning off portal could cause some clipping issues
     * especially around legacy code with usage of z-indexing,
     * Use caution when turning this functionality off and ensure
     * your content does not get clipped or hidden.
     */
    portal?: boolean;
    /**
     * Optional property to set what the root boundary is for the positioning
     * behavior. This is set to "viewport" by default, causing the popover to be
     * positioned based on the user's viewport. If set to "document", it will
     * position itself based on where there is available room within the
     * document body.
     */
    rootBoundary?: RootBoundary;
    /**
     * If `rootBoundary` is `viewport`, this padding value is used to provide
     * spacing between the popover and the viewport. If not provided, default
     * spacing of 12px is applied.
     */
    viewportPadding?: number;
    /**
     * Whether the popover should update its position when the anchor
     * element changes size or position.
     *
     * @deprecated The popover now always keeps its position in sync with the
     * anchor element (via floating-ui's `autoUpdate`), so this prop no longer
     * has any effect.
     */
    autoUpdate?: boolean;
    /**
     * The delay in milliseconds before the initial focus is set.
     *
     * @deprecated Initial focus is now handled by floating-ui and is applied
     * synchronously when the popover opens, so this prop no longer has any
     * effect.
     */
    initialFocusDelay?: number;
};

/**
 * Popovers provide additional information that is related to a particular
 * element and/or content. They can include text, links, icons and
 * illustrations. The main difference with `Tooltip` is that they must be
 * dismissed by clicking an element.
 *
 * This component uses the `Floating` component (powered by floating-ui) to
 * position the popover content according to the element it is wrapping.
 *
 * ### Usage
 *
 * ```jsx
 * import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
 *
 * <Popover
 *  onClose={() => {}}
 *  content={
 *      <PopoverContent title="Title" content="Some content" closeButtonVisible />
 *  }>
 *      {({ open }) => <Button onClick={open}>Open popover</Button>}
 *  </Popover>
 * ```
 */
function Popover(props: Props) {
    const {
        children,
        content,
        placement: placementProp = "top",
        dismissEnabled,
        id,
        closedFocusId,
        initialFocusId,
        opened: openedProp,
        onClose,
        showTail = true,
        portal = true,
        rootBoundary = "viewport",
        viewportPadding,
        testId,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
    } = props;

    // Determine if controlled or uncontrolled.
    const isControlled = typeof openedProp === "boolean";

    // Internal opened state for uncontrolled mode.
    const [internalOpened, setInternalOpened] = React.useState(!!openedProp);
    const opened = isControlled ? openedProp : internalOpened;

    // The resolved placement (after floating-ui middleware runs). This is
    // shared via PopoverContext so PopoverContent can reposition its
    // illustration if the popover flips.
    const [placement, setPlacement] = React.useState<Placement>(placementProp);

    // The element that receives initial focus when the popover opens. It is
    // resolved from `initialFocusId` when the dialog mounts.
    const initialFocusRef = React.useRef<HTMLElement | null>(null);

    // The element that receives focus when the popover closes. It is resolved
    // from `closedFocusId` while the popover is open.
    const returnFocusRef = React.useRef<HTMLElement | null>(null);

    // Ensures `onClose` is only called once per open/close cycle. floating-ui
    // (and the Floating component's own effects) can request a close through
    // multiple channels, so we guard against calling `onClose` more than once.
    const closeFiredRef = React.useRef(false);

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? generatedUniqueId;

    // Resolve the element to return focus to when the popover closes.
    React.useEffect(() => {
        if (opened && closedFocusId) {
            returnFocusRef.current = document.getElementById(closedFocusId);
        }
    }, [opened, closedFocusId]);

    /**
     * Handles opening/closing driven by the Floating component (e.g. dismiss on
     * escape/outside click/focus out) as well as internal open/close requests.
     */
    const handleOpenChange = React.useCallback(
        (nextOpened: boolean) => {
            if (!isControlled) {
                setInternalOpened(nextOpened);
            }

            if (nextOpened) {
                closeFiredRef.current = false;
            } else if (!closeFiredRef.current) {
                closeFiredRef.current = true;
                onClose?.();
            }
        },
        [isControlled, onClose],
    );

    /**
     * Closes the popover. Provided to the popover content (via context) so
     * elements such as the close button and actions can dismiss it.
     */
    const handleClose = React.useCallback(() => {
        handleOpenChange(false);
    }, [handleOpenChange]);

    /**
     * Toggles the popover when the anchor is clicked, preserving the previous
     * behavior: clicking the trigger opens the popover, and (when
     * `dismissEnabled`) clicking it again closes it.
     */
    const handleAnchorClick = React.useCallback(() => {
        if (!opened) {
            handleOpenChange(true);
        } else if (dismissEnabled) {
            handleOpenChange(false);
        }
    }, [opened, dismissEnabled, handleOpenChange]);

    /**
     * Keeps the shared placement in sync with the resolved floating-ui
     * placement, normalized to one of the four coarse values Popover reasons
     * about.
     */
    const handlePlacementChange = React.useCallback((nextPlacement: string) => {
        setPlacement(nextPlacement.split("-")[0] as Placement);
    }, []);

    /**
     * Resolves the initial focus element (from `initialFocusId`) as soon as the
     * dialog element is committed to the DOM, before floating-ui's focus
     * manager applies the initial focus.
     */
    const handleDialogRef = React.useCallback(
        (node: HTMLElement | null) => {
            if (node && initialFocusId) {
                initialFocusRef.current = node.querySelector<HTMLElement>(
                    `#${initialFocusId}`,
                );
            }
        },
        [initialFocusId],
    );

    /**
     * Renders the popover content, injecting the unique id so the content can
     * wire up its title/content elements for accessibility.
     */
    const renderContent = (): PopoverContents => {
        const popoverContents: PopoverContents =
            typeof content === "function"
                ? content({close: handleClose})
                : content;

        // @ts-expect-error: TS2769 - No overload matches this call.
        return React.cloneElement(popoverContents, {
            // internal prop: only injected by Popover
            // This allows us to announce the popover content when it is opened.
            uniqueId,
        });
    };

    const describedBy = ariaDescribedBy || `${uniqueId}-content`;
    const ariaLabelledBy = ariaLabel ? undefined : `${uniqueId}-title`;

    const dialog = (
        <PopoverDialog
            ref={handleDialogRef}
            id={uniqueId}
            placement={placement}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={describedBy}
        >
            {renderContent()}
        </PopoverDialog>
    );

    return (
        <PopoverContext.Provider
            value={{
                close: handleClose,
                placement: placement,
            }}
        >
            <Floating
                open={opened}
                strategy="fixed"
                onOpenChange={handleOpenChange}
                placement={placementProp}
                onPlacementChange={handlePlacementChange}
                content={dialog}
                dismissEnabled={!!dismissEnabled}
                // When dismissal is enabled, the popover should also close when
                // focus leaves it (e.g. the user tabs past the last focusable
                // element).
                closeOnFocusOut={!!dismissEnabled}
                showArrow={showTail}
                portal={portal}
                rootBoundary={rootBoundary}
                shiftPadding={viewportPadding}
                initialFocusRef={initialFocusId ? initialFocusRef : undefined}
                returnFocus={closedFocusId ? returnFocusRef : true}
                testId={testId}
            >
                <PopoverAnchor
                    id={`${uniqueId}-anchor`}
                    aria-controls={uniqueId}
                    aria-expanded={opened ? "true" : "false"}
                    onClick={handleAnchorClick}
                >
                    {children}
                </PopoverAnchor>
            </Floating>
        </PopoverContext.Provider>
    );
}

export default Popover;
