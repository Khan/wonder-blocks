/**
 * Type to help ensure aria-label or aria-labelledby is set.
 */
export type AriaLabelOrAriaLabelledby =
    | {
          /**
           * If there is no visible label for the tabs, set aria-label to a
           * label describing the tabs.
           */
          "aria-label": string;
          "aria-labelledby"?: never;
      }
    | {
          /**
           * If the tabs have a visible label, set aria-labelledby to a value
           * that refers to the labelling element.
           */
          "aria-labelledby": string;
          "aria-label"?: never;
      };
