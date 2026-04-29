import type {ArgTypes} from "@storybook/react-vite";

/**
 * Shared Storybook argTypes that hides all props in the `AriaProps` type from
 * `@khanacademy/wonder-blocks-core` from the Storybook docs.
 *
 * This is something we need to include to avoid overloading the Storybook docs
 * with all of the AriaProps. Component specific aria prop argtypes can be
 * configured where relevant to override this behaviour so that certain attributes
 * are intentionally included in the docs.
 *
 * @example
 * import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";
 *
 * export default {
 *     argTypes: {
 *         ...AriaArgTypes,
 *         ...componentArgTypes,
 *         "aria-label": { // intentionally configure aria-label arg type for the component },
 *     },
 * } as Meta<typeof Component>;
 */
const AriaArgTypes = {
    role: {table: {disable: true}},
    "aria-activedescendant": {table: {disable: true}},
    "aria-atomic": {table: {disable: true}},
    "aria-autocomplete": {table: {disable: true}},
    "aria-busy": {table: {disable: true}},
    "aria-checked": {table: {disable: true}},
    "aria-colcount": {table: {disable: true}},
    "aria-colindex": {table: {disable: true}},
    "aria-colspan": {table: {disable: true}},
    "aria-controls": {table: {disable: true}},
    "aria-current": {table: {disable: true}},
    "aria-describedby": {table: {disable: true}},
    "aria-details": {table: {disable: true}},
    "aria-disabled": {table: {disable: true}},
    "aria-dropeffect": {table: {disable: true}},
    "aria-errormessage": {table: {disable: true}},
    "aria-expanded": {table: {disable: true}},
    "aria-flowto": {table: {disable: true}},
    "aria-grabbed": {table: {disable: true}},
    "aria-haspopup": {table: {disable: true}},
    "aria-hidden": {table: {disable: true}},
    "aria-invalid": {table: {disable: true}},
    "aria-keyshortcuts": {table: {disable: true}},
    "aria-label": {table: {disable: true}},
    "aria-labelledby": {table: {disable: true}},
    "aria-level": {table: {disable: true}},
    "aria-live": {table: {disable: true}},
    "aria-modal": {table: {disable: true}},
    "aria-multiline": {table: {disable: true}},
    "aria-multiselectable": {table: {disable: true}},
    "aria-orientation": {table: {disable: true}},
    "aria-owns": {table: {disable: true}},
    "aria-placeholder": {table: {disable: true}},
    "aria-posinset": {table: {disable: true}},
    "aria-pressed": {table: {disable: true}},
    "aria-readonly": {table: {disable: true}},
    "aria-relevant": {table: {disable: true}},
    "aria-required": {table: {disable: true}},
    "aria-roledescription": {table: {disable: true}},
    "aria-rowcount": {table: {disable: true}},
    "aria-rowindex": {table: {disable: true}},
    "aria-rowspan": {table: {disable: true}},
    "aria-selected": {table: {disable: true}},
    "aria-setsize": {table: {disable: true}},
    "aria-sort": {table: {disable: true}},
    "aria-valuemax": {table: {disable: true}},
    "aria-valuemin": {table: {disable: true}},
    "aria-valuenow": {table: {disable: true}},
    "aria-valuetext": {table: {disable: true}},
} satisfies ArgTypes;

export default AriaArgTypes;
