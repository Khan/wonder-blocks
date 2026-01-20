import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import {Floating, type Placement} from "@khanacademy/wonder-blocks-floating";
import PopoverContent from "./popover-content";
import PopoverContentCore from "./popover-content-core";
import PopoverContext from "./popover-context";
import PopoverAnchor from "./popover-anchor";

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
    initialFocusRef?: React.RefObject<HTMLElement>;
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
     * Optional property to set what the root boundary is for the popper behavior.
     * This is set to "viewport" by default, causing the popper to be positioned based
     * on the user's viewport. If set to "document", it will position itself based
     * on where there is available room within the document body.
     */
    rootBoundary?: "viewport" | "document";
};

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
function Popover(props: Props) {
    const {
        children,
        content,
        placement = "top",
        dismissEnabled,
        id,
        // closedFocusId,
        initialFocusRef,
        opened: openedProp,
        onClose,
        showTail = true,
        portal = true,
        rootBoundary = "viewport",
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
    } = props;

    // Internal opened state for uncontrolled mode
    const [internalOpened, setInternalOpened] = React.useState(!!openedProp);

    // Determine if controlled or uncontrolled
    const isControlled = typeof openedProp === "boolean";
    const opened = isControlled ? openedProp : internalOpened;

    // Sync internal state with controlled prop
    React.useEffect(() => {
        if (isControlled) {
            setInternalOpened(openedProp);
        }
    }, [isControlled, openedProp]);

    /**
     * Popover dialog closed
     */
    const handleClose = React.useCallback(() => {
        if (!isControlled) {
            setInternalOpened(false);
        }
        onClose?.();
    }, [isControlled, onClose]);

    /**
     * Popover dialog opened
     */
    const handleOpen = React.useCallback(() => {
        if (opened) {
            handleClose();
        } else if (!isControlled) {
            setInternalOpened(true);
        }
    }, [opened, handleClose, isControlled]);

    /**
     * Render popover content
     */
    const renderContent = (uniqueId: string): PopoverContents => {
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

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? generatedUniqueId;

    const describedBy = ariaDescribedBy || `${uniqueId}-content`;
    const ariaLabelledBy = ariaLabel ? undefined : `${uniqueId}-title`;

    return (
        <PopoverContext.Provider
            value={{
                close: handleClose,
            }}
        >
            <Floating
                open={opened}
                onOpenChange={setInternalOpened}
                placement={placement}
                showArrow={showTail}
                dismissEnabled={dismissEnabled}
                portal={portal}
                initialFocusRef={initialFocusRef}
                content={
                    <View
                        aria-label={ariaLabel}
                        aria-describedby={describedBy}
                        aria-labelledby={ariaLabelledBy}
                        id={uniqueId}
                        role="dialog"
                    >
                        {renderContent(uniqueId)}
                    </View>
                }
                strategy="fixed"
                rootBoundary={rootBoundary}
                // flip={rootBoundary === "document"}
                // shift={rootBoundary === "viewport"}
            >
                <PopoverAnchor
                    id={`${uniqueId}-anchor`}
                    aria-controls={uniqueId}
                    aria-expanded={opened ? "true" : "false"}
                    onClick={handleOpen}
                >
                    {children}
                </PopoverAnchor>
            </Floating>
        </PopoverContext.Provider>
    );
}

export default Popover;
