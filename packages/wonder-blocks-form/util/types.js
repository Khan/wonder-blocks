// Shared props for radio-core and checkbox-core
export type ChoiceCoreProps = {|
    /** Whether this component is checked */
    checked: boolean,
    /** Whether this component is disabled */
    disabled?: boolean,
    /** Whether this component should show an error state */
    error?: boolean,
    /** Name for the checkbox or radio button group */
    groupName?: string,
    /** Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page. */
    id?: string,
    /** Optional test ID for e2e testing */
    testId?: string,
    /** Optional styling for the container. Does not style the component. */
    style?: any,
|};

// Props for checkbox and radio button
export type ChoiceProps = {|
    ...ChoiceCoreProps,
    /** Callback when this component is selected. The originalCheckedState is the
     * original checked state of the component. */
    onChange: (originalCheckedState: boolean) => void,
|};
