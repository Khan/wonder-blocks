import * as React from "react";

import {FloatingReferenceAttributeName} from "@khanacademy/wonder-blocks-floating";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

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
     * The unique identifier to give to the anchor.
     */
    id?: string;
    /**
     * Called when the anchor is clicked
     */
    onClick: () => void;
    /**
     * Injected by `Floating` to identify the trigger's element in the DOM. It is
     * passed along to the trigger so that `Floating` can find that element and
     * use it as the reference (anchor) element.
     */
    [FloatingReferenceAttributeName]?: string;
};

/**
 * The element that triggers the popover dialog. This is also used as reference
 * to position the dialog itself.
 */
export default function PopoverAnchor(props: Props) {
    const {
        children,
        id,
        onClick,
        "aria-controls": ariaControls,
        "aria-expanded": ariaExpanded,
        [FloatingReferenceAttributeName]: floatingReferenceId,
    } = props;

    // props that will be injected to both children versions
    const sharedProps = {
        id: id,
        "aria-controls": ariaControls,
        "aria-expanded": ariaExpanded,
        // Passed along so that the `Floating` component this anchor is rendered
        // in can find the trigger's element in the DOM and position the popover
        // against it. This is why the trigger has to spread the props it is
        // given, and it means it never has to accept or forward a ref.
        [FloatingReferenceAttributeName]: floatingReferenceId,
    } as const;

    // Resolve the trigger element for both the function-as-children and the
    // element-children patterns.
    const isFunctionChildren = typeof children === "function";
    const renderedChildren = isFunctionChildren
        ? children({open: onClick})
        : children;

    if (isFunctionChildren) {
        // we clone it to allow injecting the sharedProps defined before
        return React.cloneElement(renderedChildren, sharedProps);
    }

    // add onClick handler to automatically open the dialog after
    // clicking on this anchor element
    return React.cloneElement(renderedChildren, {
        ...renderedChildren.props,
        ...sharedProps,

        onClick: renderedChildren.props.onClick
            ? (e: React.SyntheticEvent) => {
                  e.stopPropagation();
                  // This is done to avoid overriding a custom onClick
                  // handler inside the children node
                  renderedChildren.props.onClick();
                  onClick();
              }
            : onClick,
    });
}
