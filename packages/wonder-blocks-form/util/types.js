// @flow
// NOTE(sophie): Unfortunately, styleguidist does not pull prop definitions
// from imported types. We've duplicated the shared props for each component
// they apply to, so that the prop definitions will show up on the generated
// guide.
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Shared props for radio-core and checkbox-core
export type ChoiceCoreProps = {|
    /** Whether this component is checked */
    checked: boolean,
    /** Whether this component is disabled */
    disabled: boolean,
    /** Whether this component should show an error state */
    error: boolean,
    /** Name for the checkbox or radio button group */
    groupName?: string,
    /** Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match <label> with <input> elements for screenreaders. */
    id?: string,
    /** Optional test ID for e2e testing */
    testId?: string,
|};

// Props for checkbox and radio button
export type ChoiceComponentProps = {|
    ...ChoiceCoreProps,
    /** Callback when this component is selected. The newCheckedState is the
     * new checked state of the component. */
    onChange: (newCheckedState: boolean) => void,
    /** Optional label for the field. */
    label?: string,
    /** Optional description for the field. */
    description?: string,
    /** Ignored because only applicable to Choice components in a group. */
    value?: string,
    /** Optional styling for the container. Does not style the component. */
    style?: StyleType,
|};

import typeof Choice from "../components/choice.js";
export type SharedGroupProps = {|
    /** Children should be Choice components. */
    children: Choice,
    /** Group name for this checkbox or radio group. Should be unique for all
     * such groups displayed on a page. */
    groupName: string,
    /** Optional label for the group. This label is optional to allow for
     * greater flexibility in implementing checkbox and radio groups. */
    label?: string,
    /** Optional description for the group. */
    description?: string,
    /** Optional error message. If supplied, the group will be displayed in an
     * error state, along with this error message. If no error state is desired,
     * simply do not supply this prop, or pass along null. */
    errorMessage?: string,
    /** Custom styling for this group of checkboxes. */
    style?: StyleType,
|};

export type CheckboxGroupProps = {|
    /** Callback for when selection of the group has changed. Passes the newly
     * selected values. */
    onChange: (selectedValues: Array<string>) => void,
    /** An array of the values of the selected values in this checkbox group. */
    selectedValues: Array<string>,
|};

export type RadioGroupProps = {|
    /** Callback for when the selected value of the radio group has changed. */
    onChange: (selectedValue: string) => void,
    /** Value of the selected radio item. */
    selectedValue: string,
|};
