/**
 * Determines what attributes should be applied to an icon based on if there is
 * an accessible label for the icon.
 *
 * @returns The attributes to apply to an svg element.
 */
export function useImageRoleAttributes(props: {
    "aria-label"?: string;
    "aria-labelledby"?: string;
}) {
    const {"aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy} = props;

    const presentationOnlyAttributes = {
        "aria-hidden": true,
    };

    const iconMeaningAttributes = {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        role: "img",
    };

    const attributes =
        ariaLabel || ariaLabelledBy
            ? iconMeaningAttributes
            : presentationOnlyAttributes;

    return attributes;
}
