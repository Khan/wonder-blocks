// @flow
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {Popper} from "react-popper";

import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";

import type {PopperChildrenProps} from "react-popper";
import type {Placement} from "../util/types.js";

type Props = {|
    // The content to be shown in the bubble.
    // TODO(somewhatabstract): Make this the TooltipContent type.
    children: string,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,

    // Where should the bubble try to go with respect to its anchor.
    placement: Placement,
|};

export default class TooltipBubble extends React.Component<Props> {
    _renderContent(childrenProps: PopperChildrenProps) {
        const {children} = this.props;
        const {
            ref,
            outOfBoundaries,
            style,
            placement,
            //  arrowProps,
        } = childrenProps;

        // Here we take the props provided to us by popper.js and use them
        // to position ourselves. We don't use a View because the ref callback
        // for the react-popper integration expects an HTMLElement and coercing
        // a View ref to the right type is a lot of extra lifting for little
        // gain over just using a div.
        return (
            <div
                data-placement={placement}
                ref={ref}
                className={css(styles.bubble, outOfBoundaries && styles.hide)}
                style={style}
            >
                {children}
            </div>
        );
    }

    render() {
        const {anchorElement, placement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                //TODO(somewhatabstract): Expose placement as a prop
                placement={placement}
                modifiers={{
                    wbVisibility: visibilityModifierDefaultConfig,
                    flip: {behavior: "clockwise"},
                    preventOverflow: {boundariesElement: "viewport"},
                }}
            >
                {(props) => this._renderContent(props)}
            </Popper>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        pointerEvents: "none",
    },
    /**
     * The hide style ensures that the bounds of the bubble stay unchanged.
     * This is because popper.js calculates the bubble position based off its
     * bounds and if we stopped rendering it entirely, it wouldn't know where to
     * place it when it reappeared.
     */
    hide: {
        opacity: 0,
        backgroundColor: "transparent",
        color: "transparent",
    },
});
