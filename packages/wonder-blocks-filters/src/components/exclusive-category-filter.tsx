/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// ExclusiveCategoryFilter options are radio buttons rendered with
// addStyle("button") so the component controls the radio group semantics and
// keyboard interactions.
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle, keys, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

export type ExclusiveCategoryFilterOption = {
    /**
     * A unique value for the option. It is passed to `onChange` when the
     * option is selected.
     */
    value: string;
    /**
     * The visible label for the option. It is also the option's accessible
     * name.
     */
    label: string;
    /**
     * Optional test ID for e2e testing. If not set, the option uses
     * `${testId}-${value}` when the component has a `testId`.
     */
    testId?: string;
};

type Props = {
    /**
     * A unique id to use as the base of the ids for the elements within the
     * component. If the `id` prop is not provided, a base unique id will be
     * auto-generated.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     * - The label will have an id formatted as `${id}-label`
     * - Each option will have an id formatted as `${id}-option-${index}`
     */
    id?: string;
    /**
     * Optional test ID for e2e testing. Here is how the test id is used for
     * the different elements in the component:
     * - The root will have a testId formatted as `${testId}`
     * - Each option will have a testId formatted as `${testId}-${value}`,
     *   unless the option sets its own `testId`.
     */
    testId?: string;
    /**
     * The visible label for the group of options (e.g. "Filter by subject").
     * It is also used as the accessible name of the radio group.
     */
    label: string;
    /**
     * The options to render, in order.
     */
    options: ReadonlyArray<ExclusiveCategoryFilterOption>;
    /**
     * The value of the selected option. Exactly one option is always
     * selected.
     *
     * If it doesn't match any option, the first option is selected by
     * default. `onChange` is not called until the user chooses an option.
     */
    selectedValue: string;
    /**
     * Called with the value of the newly selected option. It is not called
     * when the selected option is clicked again, since the selection can't
     * be cleared.
     */
    onChange: (value: string) => unknown;
    /**
     * Custom styles for the `ExclusiveCategoryFilter` component.
     * - `root`: Styles the root element.
     * - `label`: Styles the label element.
     * - `options`: Styles the element that contains the options.
     * - `option`: Styles all the option elements.
     */
    styles?: {
        root?: StyleType;
        label?: StyleType;
        options?: StyleType;
        option?: StyleType;
    };
};

const StyledButton = addStyle("button");

/**
 * A group of options for filtering a list by one category at a time. Exactly
 * one option is always selected.
 *
 * The component follows the ARIA APG Radio Group pattern: the options are
 * radio buttons with a single tab stop, and the arrow keys move focus to the
 * next or previous option and select it.
 */
export const ExclusiveCategoryFilter = React.forwardRef(
    function ExclusiveCategoryFilter(
        props: Props,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) {
        const {
            id,
            testId,
            label,
            options,
            selectedValue,
            onChange,
            styles: stylesProp,
        } = props;

        const generatedUniqueId = React.useId();
        const uniqueId = id ?? generatedUniqueId;
        const labelId = `${uniqueId}-label`;

        /**
         * Keep track of refs for each option so focus can be moved with the
         * arrow keys.
         */
        const optionRefs = React.useRef<{
            [value: string]: HTMLButtonElement | null;
        }>({});

        const matchingIndex = options.findIndex(
            (option) => option.value === selectedValue,
        );
        // If the selected value doesn't match any option, the first option is
        // selected by default so there is always exactly one selected option.
        const selectedIndex = matchingIndex === -1 ? 0 : matchingIndex;

        const selectOption = React.useCallback(
            (value: string) => {
                optionRefs.current[value]?.focus();
                // Compare with the `selectedValue` prop rather than the
                // option shown as selected: when the prop matches no option,
                // choosing the first option still tells the parent.
                if (value !== selectedValue) {
                    onChange(value);
                }
            },
            [onChange, selectedValue],
        );

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                const currentIndex = options.findIndex(
                    (option) => option.value === event.currentTarget.value,
                );
                // Use the nearest element with a `dir` attribute, so a
                // `dir="ltr"` container inside an RTL page is respected.
                const isRtl =
                    event.currentTarget
                        .closest("[dir]")
                        ?.getAttribute("dir") === "rtl";

                let nextIndex: number;
                switch (event.key) {
                    case keys.up:
                    case isRtl && keys.right:
                    case !isRtl && keys.left: {
                        nextIndex =
                            (currentIndex - 1 + options.length) %
                            options.length;
                        break;
                    }
                    case keys.down:
                    case isRtl && keys.left:
                    case !isRtl && keys.right: {
                        nextIndex = (currentIndex + 1) % options.length;
                        break;
                    }
                    default: {
                        return;
                    }
                }

                // Prevent the page from scrolling with the arrow keys
                event.preventDefault();
                selectOption(options[nextIndex].value);
            },
            [options, selectOption],
        );

        if (options.length === 0) {
            return <React.Fragment />;
        }

        return (
            <View
                ref={ref}
                id={uniqueId}
                testId={testId}
                style={[styles.root, stylesProp?.root]}
            >
                <BodyText tag="span" id={labelId} style={stylesProp?.label}>
                    {label}
                </BodyText>
                <View
                    role="radiogroup"
                    aria-labelledby={labelId}
                    style={[styles.options, stylesProp?.options]}
                >
                    {options.map((option, index) => {
                        const checked = index === selectedIndex;
                        const optionTestId =
                            option.testId ??
                            (testId ? `${testId}-${option.value}` : undefined);

                        return (
                            <StyledButton
                                key={option.value}
                                ref={(element: HTMLButtonElement | null) => {
                                    optionRefs.current[option.value] = element;
                                }}
                                id={`${uniqueId}-option-${index}`}
                                data-testid={optionTestId}
                                type="button"
                                role="radio"
                                aria-checked={checked}
                                // Like native radio buttons, only one option
                                // is in the tab order. The arrow keys move
                                // between options.
                                tabIndex={checked ? 0 : -1}
                                value={option.value}
                                onClick={() => selectOption(option.value)}
                                onKeyDown={handleKeyDown}
                                style={stylesProp?.option}
                            >
                                {option.label}
                            </StyledButton>
                        );
                    })}
                </View>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    root: {
        gap: sizing.size_080,
    },
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: sizing.size_080,
    },
});
