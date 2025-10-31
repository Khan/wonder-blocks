import * as React from "react";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

type Props = AriaProps & {
    /**
     * The element that triggers the popover. This element will be used to
     * position the popover. It can be either a Node or a function using the
     * children-as-function pattern to pass an open function for use anywhere
     * within children. The latter provides a lot of flexibility in terms of
     * what actions may trigger the `Popover` to launch the
     * [PopoverDialog](#PopoverDialog).
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
};

/**
 * The element that triggers the popover dialog. This is also used as reference
 * to position the dialog itself.
 */
const PopoverAnchor = React.forwardRef<HTMLElement, Props>(
    function PopoverAnchor(props, ref) {
        const {
            children,
            id,
            onClick,
            "aria-controls": ariaControls,
            "aria-expanded": ariaExpanded,
        } = props;

        // props that will be injected to both children versions
        const sharedProps = {
            id: id,
            ref: ref,
            "aria-controls": ariaControls,
            "aria-expanded": ariaExpanded,
        } as const;

        if (typeof children === "function") {
            const renderedChildren = children({
                open: onClick,
            });

            // we clone it to allow injecting the sharedProps defined before
            return React.cloneElement(renderedChildren, sharedProps);
        } else {
            // add onClick handler to automatically open the dialog after
            // clicking on this anchor element
            return React.cloneElement(children, {
                ...children.props,
                ...sharedProps,
                onClick: children.props.onClick
                    ? // @ts-expect-error [FEI-5019] - TS7006 - Parameter 'e' implicitly has an 'any' type.
                      (e) => {
                          e.stopPropagation();
                          // This is done to avoid overriding a custom onClick
                          // handler inside the children node
                          children.props.onClick();
                          onClick();
                      }
                    : onClick,
            });
        }
    },
);

export default PopoverAnchor;
