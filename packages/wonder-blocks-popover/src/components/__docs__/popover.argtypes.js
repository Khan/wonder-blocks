// @flow
import * as React from "react";

// Reusable stories
import {
    Default,
    Emphasized,
    WithIcon,
    WithIllustration,
} from "./popover-content.stories.js";
import {
    WithIcon as CoreWithIcon,
    WithDetailCell as CoreWithDetailCell,
    Dark as CoreDark,
} from "./popover-content-core.stories.js";

export const ContentMappings: {|[key: string]: React.Node|} = {
    withTextOnly: <Default {...Default.args} />,
    withEmphasis: <Emphasized {...Emphasized.args} />,
    withIcon: <WithIcon {...WithIcon.args} />,
    withIllustration: <WithIllustration {...WithIllustration.args} />,
    coreWithIcon: <CoreWithIcon {...CoreWithIcon.args} />,
    coreWithCell: <CoreWithDetailCell {...CoreWithDetailCell.args} />,
    coreDark: <CoreDark {...CoreDark.args} />,
};

export default {
    children: {
        control: {
            type: null,
        },
    },
    placement: {
        control: {
            type: "select",
            options: ["top", "bottom", "right", "left"],
        },
    },
    content: {
        control: {type: "select"},
        defaultValue: ContentMappings.withTextOnly,
        options: (Object.keys(ContentMappings): Array<React.Node>),
        mapping: ContentMappings,
    },
};
