// @flow
import * as React from "react";

import {I18nInlineMarkup} from "./i18n-inline-markup.js";

export default {
    title: "Translations/I18nInlineMarkup",
    parameters: {
        // We don't really care what the output looks for these stories.
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const SingleShallowSubstitution = (): React.Node => {
    const props = {
        u: (t) => (
            <React.Fragment>
                [Underline:<u>{t}</u>]
            </React.Fragment>
        ),
        children: "-6\u00b0C, Sunny, Fells like: <u>-12</u>,  Wind: VR 5 km/h",
    };
    return <I18nInlineMarkup {...props} />;
};

export const MultipleShallowSubstituion = (): React.Node => {
    const props = {
        u: (t) => (
            <React.Fragment>
                __<u>{t}</u>__
            </React.Fragment>
        ),
        i: (t) => (
            <span style={{background: "lightblue"}}>
                *<i style={{fontStyle: "italic"}}>{t}</i>*
            </span>
        ),
        children:
            "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
    };
    return <I18nInlineMarkup {...props} />;
};

export const ElementWrapper = (): React.Node => {
    const props = {
        elementWrapper: (t) => <span style={{background: "yellow"}}>{t}</span>,
        u: (t) => (
            <span style={{background: "red"}}>
                __<u>{t}</u>__
            </span>
        ),
        i: (t) => (
            <span style={{background: "lightblue"}}>
                *<i style={{fontStyle: "italic"}}>{t}</i>*
            </span>
        ),
        children:
            "-6\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h",
    };
    return <I18nInlineMarkup {...props} />;
};
