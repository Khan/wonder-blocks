import * as React from "react";
import * as ReactDOM from "react-dom";

import {Id} from "@khanacademy/wonder-blocks-core";
import {TooltipPopper} from "@khanacademy/wonder-blocks-tooltip";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {
    Placement,
    PopperElementProps,
} from "@khanacademy/wonder-blocks-tooltip";
import type {RootBoundary} from "@popperjs/core";

import PopoverContent from "./popover-content";
import PopoverContentCore from "./popover-content-core";
import PopoverContext from "./popover-context";
import PopoverAnchor from "./popover-anchor";
import PopoverDialog from "./popover-dialog";
import PopoverEventListener from "./popover-event-listener";
import InitialFocus from "./initial-focus";
import FocusManager from "./focus-manager";

type PopoverContents =
    | React.ReactElement<React.ComponentProps<typeof PopoverContent>>
    | React.ReactElement<React.ComponentProps<typeof PopoverContentCore>>;

type Props = AriaProps &
    Readonly<{
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
        content:
            | PopoverContents
            | ((arg1: {close: () => void}) => PopoverContents);
        /**
         * Where the popover should try to appear in relation to the trigger element.
         */
        placement: Placement;
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
         * The delay in milliseconds before the initial focus is set.
         * This allows any active event listeners to finish before focusing.
         *
         * Defaults to 0.
         */
        initialFocusDelay?: number;
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
        showTail: boolean;
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
         * Optional property to set what the root boundary is for the popper behavior.
         * This is set to "viewport" by default, causing the popper to be positioned based
         * on the user's viewport. If set to "document", it will position itself based
         * on where there is available room within the document body.
         */
        rootBoundary?: RootBoundary;
        /**
         * If `rootBoundary` is `viewport`, this padding value is used to provide
         * spacing between the popper and the viewport. If not provided, default
         * spacing of 12px is applied.
         */
        viewportPadding?: number;
    }>;

/**
 * Popovers provide additional information that is related to a particular
 * element and/or content. They can include text, links, icons and
 * illustrations. The main difference with `Tooltip` is that they must be
 * dismissed by clicking an element.
 *
 * This component uses the `PopoverPopper` component to position the
 * `PopoverContentCore` component according to the children it is wrapping.
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
const Popover = (props: Props): React.ReactElement => {
    const {
        children,
        content,
        placement: initialPlacement = "top",
        dismissEnabled,
        id,
        closedFocusId,
        initialFocusId,
        initialFocusDelay,
        opened: controlledOpened,
        onClose,
        showTail = true,
        portal = true,
        rootBoundary = "viewport",
        viewportPadding,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
    } = props;

    const [internalOpened, setInternalOpened] =
        React.useState(!!controlledOpened);
    const [placement, setPlacement] =
        React.useState<Placement>(initialPlacement);

    const anchorRef = React.useRef<HTMLElement>(null);
    const contentRef = React.useRef<PopoverContent | PopoverContentCore>(null);

    // Sync controlled opened state
    const opened =
        typeof controlledOpened === "boolean"
            ? controlledOpened
            : internalOpened;

    /**
     * Returns focus to a given element.
     */
    const maybeReturnFocus = React.useCallback(() => {
        // Focus on the specified element after dismissing the popover.
        if (closedFocusId) {
            // eslint-disable-next-line import/no-deprecated
            const focusElement = ReactDOM.findDOMNode(
                document.getElementById(closedFocusId),
            ) as any;

            focusElement?.focus();
            return;
        }

        // If no element is specified, focus on the element that triggered the
        // popover.
        if (anchorRef.current) {
            anchorRef.current.focus();
        }
    }, [closedFocusId]);

    /**
     * Popover dialog closed
     */
    const handleClose = React.useCallback(
        (shouldReturnFocus: boolean = true) => {
            setInternalOpened(false);
            onClose?.();

            if (shouldReturnFocus) {
                // Use setTimeout to ensure state updates before returning focus
                setTimeout(() => {
                    maybeReturnFocus();
                }, 0);
            }
        },
        [onClose, maybeReturnFocus],
    );

    /**
     * Popover dialog opened
     */
    const handleOpen = React.useCallback(() => {
        if (dismissEnabled && opened) {
            handleClose(true);
        } else {
            setInternalOpened(true);
        }
    }, [dismissEnabled, opened, handleClose]);

    const renderContent = React.useCallback(
        (uniqueId: string): PopoverContents => {
            const popoverContents: PopoverContents =
                typeof content === "function"
                    ? content({
                          close: handleClose,
                      })
                    : content;

            // @ts-expect-error: TS2769 - No overload matches this call.
            return React.cloneElement(popoverContents, {
                ref: contentRef,
                // internal prop: only injected by Popover
                // This allows us to announce the popover content when it is opened.
                uniqueId,
            });
        },
        [content, handleClose],
    );

    const getHost = React.useCallback((): Element | null | undefined => {
        // If we are in a modal, we find where we should be portalling the
        // popover by using the helper function from the modal package on the
        // trigger element. If we are not in a modal, we use body as the
        // location to portal to.
        return (
            maybeGetPortalMountedModalHostElement(anchorRef.current) ||
            document.body
        );
    }, []);

    const renderPopper = React.useCallback(
        (uniqueId: string): React.ReactNode => {
            const describedBy = ariaDescribedBy || `${uniqueId}-content`;

            const ariaLabelledBy = ariaLabel ? undefined : `${uniqueId}-title`;

            const popperContent = (
                <TooltipPopper
                    anchorElement={anchorRef.current ?? undefined}
                    placement={initialPlacement}
                    rootBoundary={rootBoundary}
                    viewportPadding={viewportPadding}
                >
                    {(props: PopperElementProps) => (
                        <PopoverDialog
                            {...props}
                            aria-label={ariaLabel}
                            aria-describedby={describedBy}
                            aria-labelledby={ariaLabelledBy}
                            id={uniqueId}
                            onUpdate={(placement) => setPlacement(placement)}
                            showTail={showTail}
                        >
                            {renderContent(uniqueId)}
                        </PopoverDialog>
                    )}
                </TooltipPopper>
            );

            if (portal) {
                return (
                    <FocusManager
                        anchorElement={anchorRef.current ?? undefined}
                        initialFocusId={initialFocusId}
                        initialFocusDelay={initialFocusDelay}
                    >
                        {popperContent}
                    </FocusManager>
                );
            } else {
                return (
                    // Ensures the user is focused on the first available element
                    // when popover is rendered without the focus manager.
                    <InitialFocus
                        initialFocusId={initialFocusId}
                        delay={initialFocusDelay}
                    >
                        {popperContent}
                    </InitialFocus>
                );
            }
        },
        [
            initialPlacement,
            rootBoundary,
            viewportPadding,
            ariaLabel,
            ariaDescribedBy,
            showTail,
            portal,
            initialFocusId,
            initialFocusDelay,
            renderContent,
        ],
    );

    const renderPortal = React.useCallback(
        (uniqueId: string, opened: boolean) => {
            if (!opened) {
                return null;
            }

            const popperHost = getHost();

            // Attach the popover to a Portal
            if (portal && popperHost) {
                return ReactDOM.createPortal(
                    renderPopper(uniqueId),
                    popperHost,
                );
            }

            // Otherwise, append the dialog next to the trigger element
            return renderPopper(uniqueId);
        },
        [portal, getHost, renderPopper],
    );

    return (
        <PopoverContext.Provider
            value={{
                close: handleClose,
                placement: placement,
            }}
        >
            <Id id={id}>
                {(uniqueId) => (
                    <React.Fragment>
                        <PopoverAnchor
                            ref={anchorRef}
                            id={`${uniqueId}-anchor`}
                            aria-controls={uniqueId}
                            aria-expanded={opened ? "true" : "false"}
                            onClick={handleOpen}
                        >
                            {children}
                        </PopoverAnchor>
                        {renderPortal(uniqueId, opened)}
                    </React.Fragment>
                )}
            </Id>

            {dismissEnabled && opened && (
                <PopoverEventListener
                    onClose={handleClose}
                    contentRef={contentRef}
                />
            )}
        </PopoverContext.Provider>
    );
};

export default Popover;
