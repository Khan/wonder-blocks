// @flow
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {Popper} from "react-popper";
import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";

import type {PopperChildrenProps} from "react-popper";

type Props = {|
    // The content to be shown in the bubble.
    // TODO(somewhatabstract): Make this the TooltipContent type.
    children: string,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,
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
        const {anchorElement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                //TODO(somewhatabstract): Expose placement as a prop
                placement="bottom"
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
