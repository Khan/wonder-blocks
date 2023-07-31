import * as React from "react";

// Reusable stories
import {
    Default,
    Emphasized,
    WithIcon,
    WithIllustration,
} from "./popover-content.stories";
import {
    WithIcon as CoreWithIcon,
    WithDetailCell as CoreWithDetailCell,
    Dark as CoreDark,
} from "./popover-content-core.stories";

// NOTE: Casting to any to avoid type errors.
const DefaultWrapper = Default as React.ElementType;
const EmphasizedWrapper = Emphasized as React.ElementType;
const WithIconWrapper = WithIcon as React.ElementType;
const WithIllustrationWrapper = WithIllustration as React.ElementType;
const CoreWithIconWrapper = CoreWithIcon as React.ElementType;
const CoreWithDetailCellWrapper = CoreWithDetailCell as React.ElementType;
const CoreDarkWrapper = CoreDark as React.ElementType;

export const ContentMappings: {
    [key: string]: React.ReactNode;
} = {
    withTextOnly: <DefaultWrapper {...Default.args} />,
    withEmphasis: <EmphasizedWrapper {...Emphasized.args} />,
    withIcon: <WithIconWrapper {...WithIcon.args} />,
    withIllustration: <WithIllustrationWrapper {...WithIllustration.args} />,
    coreWithIcon: <CoreWithIconWrapper {...CoreWithIcon.args} />,
    coreWithCell: <CoreWithDetailCellWrapper {...CoreWithDetailCell.args} />,
    coreDark: <CoreDarkWrapper {...CoreDark.args} />,
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
        options: Object.keys(ContentMappings) as Array<React.ReactNode>,
        mapping: ContentMappings,
    },
};
