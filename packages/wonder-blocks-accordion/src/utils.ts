import type {AccordionCornerKindType} from "./components/accordion";

/**
 * Determine if the AccordionSectionHeader should be rounded based on the
 * cornerKind prop, if it is the first or last section, and if it is expanded.
 * It is important to determine this for the AccordionSectionHeader instead
 * of the AccordionSection so that the focus outline around the clickable
 * header is rounded correctly.
 *
 * If the cornerKind is "rounded-per-section", the section should always be
 * rounded at the top, and only rounded at the bottom if the section is closed.
 * If the cornerKind is "rounded", the section should be rounded at the top
 * if it is the first section, and only rounded at the bottom if it is the
 * last section and the section is closed.
 *
 * @param cornerKind The cornerKind prop passed into the AccordionSeciton.
 * This can be "rounded-per-section", "rounded", or "square".
 * @param isFirstSection Whether or not the section is the first section
 * in the Accordion.
 * @param isLastSection Whether or not the section is the last section
 * in the Accordion.
 * @param expanded Whether or not the accordion section is expanded.
 * @returns An object with the roundedTop and roundedBottom values.
 */
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
