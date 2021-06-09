// @flow
import * as React from "react";
import ReactDOM from "react-dom";

import {IDProvider} from "@khanacademy/wonder-blocks-core";
import {TooltipPopper} from "@khanacademy/wonder-blocks-tooltip";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {
    Placement,
    PopperElementProps,
} from "@khanacademy/wonder-blocks-tooltip";

import typeof PopoverContent from "./popover-content.js";
import typeof PopoverContentCore from "./popover-content-core.js";
import PopoverContext from "./popover-context.js";
import PopoverAnchor from "./popover-anchor.js";
import PopoverDialog from "./popover-dialog.js";
import FocusManager from "./focus-manager.js";
import PopoverEventListener from "./popover-event-listener.js";

type PopoverContents =
    | React.Element<PopoverContent>
    | React.Element<PopoverContentCore>;

type Props = {|
    ...AriaProps,

    /**
     * The element that triggers the popover. This element will be used to
     * position the popover. It can be either a Node or a function using the
     * children-as-function pattern to pass an open function for use anywhere
     * within children. The latter provides a lot of flexibility in terms of
     * what actions may trigger the `Popover` to launch the popover dialog.
     */
    children:
        | React.Element<any>
        | (({open: () => void, ...}) => React.Element<any>),

    /**
     * The content of the popover. You can either use
     * [PopoverContent](#PopoverContent) with one of the pre-defined variants,
     * or include your own custom content using
     * [PopoverContentCore](#PopoverContentCore directly.
     *
     * If the popover needs to close itself, the close function provided to this
     * callback can be called to close the popover.
     */
    content: PopoverContents | (({|close: () => void|}) => PopoverContents),

    /**
     * Where the popover should try to appear in relation to the trigger element.
     */
    placement: Placement,

    /**
     * When enabled, user can hide the popover content by pressing the `esc` key
     * or clicking/tapping outside of it.
     */
    dismissEnabled?: boolean,

    /**
     * The unique identifier to give to the popover. Provide this in cases where
     * you want to override the default accessibility solution. This identifier
     * will be applied to the popover content.
     *
     * By providing this identifier, the children that this popover anchors to
     * will not be automatically given the
     * [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
     * attribute. Instead, the accessibility solution is the responsibility of
     * the caller.
     *
     * If this is not provided, the
     * [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
     * attribute will be added to the children with a unique identifier pointing
     * to the popover dialog.
     */
    id?: string,

    /**
     * The selector for the element that will be focused when the popover
     * content shows. When not set, the first focusable element within the
     * popover content will be used.
     */
    initialFocusId?: string,

    /**
     * Renders the popover when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component. The
     * parent is responsible for managing the opening/closing of the popover
     * when using this prop.
     */
    opened?: boolean,

    /**
     * Called when the popover closes
     */
    onClose?: () => mixed,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type State = {|
    /**
     * Keeps a reference of the dialog state
     */
    opened: boolean,
    /**
     * Anchor element DOM reference
     */
    anchorElement: ?HTMLElement,
    /**
     * Current popper placement
     */
    placement: Placement,
|};

type DefaultProps = {|
    placement: $PropertyType<Props, "placement">,
|};

/**
 * Popovers provide additional information that is related to a particular
 * element and/or content. They can include text, links, icons and
 * illustrations. The main difference with `Tooltip` is that they must be
 * dismissed by clicking an element.
 *
 * This component uses the `PopoverPopper` component to position the
 * `PopoverContentCore` component according to the children it is wrapping.
 */
export default class Popover extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        placement: "top",
    };

    /**
     * Used to sync the `opened` state when Popover acts as a controlled
     * component
     */
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): ?Partial<State> {
        return {
            opened:
                typeof props.opened === "boolean" ? props.opened : state.opened,
        };
    }

    state: State = {
        opened: !!this.props.opened,
        anchorElement: null,
        placement: this.props.placement,
    };

    /**
     * Popover content ref
     */
    contentRef: RefObject<
        PopoverContent | PopoverContentCore,
    > = React.createRef();

    /**
     * Popover dialog closed
     */
    handleClose: () => void = () => {
        this.setState({opened: false}, () => {
            this.props.onClose && this.props.onClose();
        });
    };

    /**
     * Popover dialog opened
     */
    handleOpen: () => void = () => {
        if (this.props.dismissEnabled && this.state.opened) {
            this.setState({opened: false});
        } else {
            this.setState({opened: true});
        }
    };

    updateRef: (ref: any) => void = (ref) => {
        const actualRef = ref && ReactDOM.findDOMNode(ref);
        if (actualRef && this.state.anchorElement !== actualRef) {
            this.setState({anchorElement: ((actualRef: any): ?HTMLElement)});
        }
    };

    renderContent(): PopoverContents {
        const {content} = this.props;

        return React.cloneElement(
            typeof content === "function"
                ? content({
                      close: this.handleClose,
                  })
                : content,
            {ref: this.contentRef},
        );
    }

    renderPopper(uniqueId: string): React.Node {
        const {initialFocusId, placement} = this.props;
        const {anchorElement} = this.state;

        return (
            <FocusManager
                anchorElement={anchorElement}
                initialFocusId={initialFocusId}
            >
                <TooltipPopper
                    anchorElement={anchorElement}
                    placement={placement}
                >
                    {(props: PopperElementProps) => (
                        <PopoverDialog
                            {...props}
                            aria-describedby={`${uniqueId}-anchor`}
                            id={uniqueId}
                            onUpdate={(placement) => this.setState({placement})}
                        >
                            {this.renderContent()}
                        </PopoverDialog>
                    )}
                </TooltipPopper>
            </FocusManager>
        );
    }

    getHost(): ?Element {
        // If we are in a modal, we find where we should be portalling the
        // popover by using the helper function from the modal package on the
        // trigger element. If we are not in a modal, we use body as the
        // location to portal to.
        return (
            maybeGetPortalMountedModalHostElement(this.state.anchorElement) ||
            document.body
        );
    }

    render(): React.Node {
        const {children, dismissEnabled, id} = this.props;
        const {opened, placement} = this.state;
        const popperHost = this.getHost();

        return (
            <PopoverContext.Provider
                value={{
                    close: this.handleClose,
                    placement: placement,
                }}
            >
                <IDProvider id={id} scope="popover">
                    {(uniqueId) => (
                        <React.Fragment>
                            <PopoverAnchor
                                anchorRef={this.updateRef}
                                id={`${uniqueId}-anchor`}
                                aria-controls={uniqueId}
                                aria-expanded={opened ? "true" : "false"}
                                onClick={this.handleOpen}
                            >
                                {children}
                            </PopoverAnchor>
                            {popperHost &&
                                opened &&
                                ReactDOM.createPortal(
                                    this.renderPopper(uniqueId),
                                    popperHost,
                                )}
                        </React.Fragment>
                    )}
                </IDProvider>

                {dismissEnabled && opened && (
                    <PopoverEventListener
                        onClose={this.handleClose}
                        contentRef={this.contentRef}
                    />
                )}
            </PopoverContext.Provider>
        );
    }
}
