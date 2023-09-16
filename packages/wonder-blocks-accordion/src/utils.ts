import type {AccordionCornerKindType} from "./components/accordion";

export function getRoundedValuesForHeader(
    cornerKind: AccordionCornerKindType,
    isFirstSection: boolean,
    isLastSection: boolean,
    expanded: boolean,
) {
    switch (cornerKind) {
        case "rounded-per-section":
            return {
                roundedTop: true,
                // When the section is closed, the header is the last element
                // in the AccordionSection, so we need to round the bottom.
                // If the section is expanded, the content expands under the
                // header, so it should not longer be rounded (the content
                // will be rounded instead).
                roundedBottom: !expanded,
            };
        case "rounded":
            return {
                roundedTop: isFirstSection,
                // When the section is closed, the header is the last element
                // in the AccordionSection, so we need to round the bottom.
                // If the section is expanded, the content expands under the
                // header, so it should not longer be rounded (the content
                // will be rounded instead).
                roundedBottom: isLastSection && !expanded,
            };
        default:
            return {
                roundedTop: false,
                roundedBottom: false,
            };
    }
}
