// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import propTypes from "prop-types";

import type {MediaSize, MediaSpec} from "./types.js";
import type {StyleType} from "./types.js";

function flatten<T: Object>(
    list?: StyleType<T>,
    mediaSize: MediaSize,
): Array<T> {
    const result: Array<T> = [];

    if (typeof list === "function") {
        list = list(mediaSize);
    }

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item, mediaSize));
        }
    } else {
        result.push(list);
    }

    return result;
}

export function processStyleList<T: Object>(
    style?: StyleType<T>,
    mediaSize: MediaSize = "large",
) {
    const stylesheetStyles = [];
    const inlineStyles = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    // Check to see if we should inline all the styles for snapshot tests.
    const shouldInlineStyles =
        typeof global !== "undefined" && global.SNAPSHOT_INLINE_APHRODITE;

    flatten(style, mediaSize).forEach((child: T) => {
        // Check for aphrodite internal property
        if ((child: any)._definition) {
            if (shouldInlineStyles) {
                inlineStyles.push(child._definition);
            } else {
                stylesheetStyles.push(child);
            }
        } else {
            inlineStyles.push(child);
        }
    });

    const inlineStylesObject = Object.assign({}, ...inlineStyles);

    // TODO(somewhatabstract): When aphrodite no longer puts "!important" on
    // all the styles, remove this <ADD JIRA ISSUE HERE IF THIS PASSES REVIEW>
    // If we're not snapshotting styles, let's create a class for the inline
    // styles so that they can apply to the element even with aphrodite's
    // use of !important.
    if (inlineStyles.length > 0 && !shouldInlineStyles) {
        const inlineStylesStyleSheet = StyleSheet.create({
            inlineStyles: inlineStylesObject,
        });
        stylesheetStyles.push(inlineStylesStyleSheet.inlineStyles);
    }

    return {
        style: shouldInlineStyles ? inlineStylesObject : {},
        className: css(...stylesheetStyles),
    };
}

export const mediaContextTypes = {
    mediaSize: propTypes.string,
    mediaSpec: propTypes.object,
};

export function MediaLayoutWrapper<Props: {}>(
    Component: React.ComponentType<Props>,
): React.ComponentType<
    $Diff<Props, {mediaSize: MediaSize | void, mediaSpec: MediaSpec | void}>,
> {
    const WrappedComponent = (
        props: Props,
        {
            mediaSize,
            mediaSpec,
        }: {
            mediaSize: MediaSize,
            mediaSpec: MediaSpec,
        },
    ) => {
        return (
            <Component {...props} mediaSize={mediaSize} mediaSpec={mediaSpec} />
        );
    };

    WrappedComponent.contextTypes = mediaContextTypes;

    return WrappedComponent;
}
