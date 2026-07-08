import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Id, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import RadioCore from "./radio-core";
import theme from "../theme";

// Keep synced with ChoiceComponentProps in ../util/types.js
type ChoiceComponentProps = AriaProps & {
    /**
     * Whether this component is checked
     */
    checked: boolean;
    /**
     * Whether this component is disabled
     */
    disabled?: boolean;
    /**
     * Whether this component should show an error state
     */
    error?: boolean;
    /**
     * Callback when this component is selected. The newCheckedState is the
     * new checked state of the component.
     */
    onChange: (newCheckedState: boolean) => unknown;
    /**
     * Optional label for the field.
     */
    label?: React.ReactNode;
    /**
     * Optional description for the field.
     */
    description?: React.ReactNode;
    /**
     * Optional content rendered at the end of the row (e.g. a "Recommended"
     * label or an icon). Maps to the underlying `DetailCell`'s `rightAccessory`.
     * Most useful with `appearance="cell"`.
     */
    rightAccessory?: React.ReactNode;
    /**
     * Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */
    id?: string;
    /**
     * Optional styling for the container. Does not style the component.
     */
    style?: StyleType;
    /**
     * Adds CSS classes to the Radio.
     */
    className?: string;
    /**
     * Optional test ID for e2e testing
     */
    testId?: string;
    /**
     * Name for the checkbox or radio button group. Only applicable for group
     * contexts, auto-populated by group components via Choice.
     * @ignore
     */
    groupName?: string;
    /**
     * Controls the visual appearance of the radio.
     *
     * - `"default"` (the default) renders the radio as a compact row (radio
     *   input + label + description) with no surrounding padding or border.
     * - `"cell"` renders the radio as an individually bordered, rounded card
     *   (with the `DetailCell` padding). When checked, the card's border uses
     *   the selected/instructive color, so a group of radios reads as a set of
     *   selectable cards.
     *
     * In both cases the layout is composed from `DetailCell`.
     */
    appearance?: "default" | "cell";
};

/**
 * 🔘 A nicely styled radio button for all your non-AMFM radio button needs. Can
 * optionally take label and description props.
 *
 * This component should not really be used by itself because radio buttons are
 * often grouped together. See RadioGroup.
 *
 * Internally, `Radio` is composed from `DetailCell`: the radio input is rendered
 * as the cell's `leftAccessory`, the label as its `title`, and the description
 * as its `subtitle2`. The cell has no `onClick`/`href` so it renders a plain
 * container (not a `Clickable`), keeping the native `<input>` as the single
 * interactive element.
 */ const Radio = React.forwardRef(function Radio(
    props: ChoiceComponentProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        checked,
        description,
        disabled = false,
        error = false,
        id,
        label,
        onChange,
        style,
        className,
        testId,
        groupName,
        appearance = "default",
        rightAccessory,
        ...ariaProps
    } = props;

    const handleClick: () => void = () => {
        // Radio buttons cannot be unchecked.
        if (checked) {
            return;
        }
        onChange(!checked);
    };

    return (
        // A radio element should always have a unique ID set so that the label
        // can always refer to this element. This guarantees that clicking on
        // the label will always click on the radio as well. If an ID is passed
        // in as a prop, use that one. Otherwise, create a unique ID.
        <Id id={id}>
            {(uniqueId) => {
                // Create a unique ID for the description section to be used by
                // this element's `aria-describedby`.
                const descriptionId = description
                    ? `${uniqueId}-description`
                    : undefined;

                const labelNode = label ? (
                    <BodyText
                        tag="div"
                        weight="semi"
                        style={[styles.label, disabled && styles.disabledLabel]}
                    >
                        <label htmlFor={uniqueId}>{label}</label>
                    </BodyText>
                ) : (
                    // DetailCell requires a title; render an empty node when
                    // there is no label.
                    ""
                );

                const descriptionNode = description ? (
                    <BodyText
                        size="small"
                        id={descriptionId}
                        style={styles.description}
                    >
                        {description}
                    </BodyText>
                ) : undefined;

                return (
                    <View style={style} className={className}>
                        <DetailCell
                            testId={testId}
                            // Both appearances draw their own separators (the
                            // "cell" appearance renders each radio as a bordered
                            // card), so DetailCell's built-in rule is never used.
                            horizontalRule="none"
                            styles={
                                appearance === "cell"
                                    ? {
                                          // Render the radio as a bordered card
                                          // that shows a colored border when
                                          // checked (the "radio as cell" look).
                                          root: [
                                              styles.cellCard,
                                              checked &&
                                                  styles.cellCardSelected,
                                          ],
                                          content: styles.cellContent,
                                          leftAccessory: styles.cellAccessory,
                                          rightAccessory: styles.cellAccessory,
                                      }
                                    : {
                                          root: styles.compactRoot,
                                          content: styles.compactContent,
                                          leftAccessory:
                                              styles.compactAccessory,
                                      }
                            }
                            leftAccessory={
                                <RadioCore
                                    {...ariaProps}
                                    id={uniqueId}
                                    checked={checked}
                                    disabled={disabled}
                                    error={error}
                                    groupName={groupName}
                                    aria-describedby={descriptionId}
                                    onClick={handleClick}
                                    ref={ref}
                                />
                            }
                            title={labelNode}
                            subtitle2={descriptionNode}
                            rightAccessory={rightAccessory}
                        />
                    </View>
                );
            }}
        </Id>
    );
});

const styles = StyleSheet.create({
    // Strip the DetailCell padding/min-height/background so the default
    // appearance renders as the compact radio row it was before.
    compactRoot: {
        paddingBlock: 0,
        paddingInline: 0,
        minBlockSize: 0,
        gap: sizing.size_080,
        background: semanticColor.core.transparent,
        // DetailCell clips overflow to contain its selected/press indicator.
        // The compact radio has no such indicator, and clipping would cut off
        // the radio input's focus ring, so restore visible overflow.
        overflow: "visible",
        // DetailCell's wrapper uses `flex: 1`, which makes the cell grow to
        // fill the container. That would swallow any vertical alignment (e.g.
        // `justifyContent`/fixed height) applied by a consumer to the choice's
        // container. Keep the cell at its natural height so those styles work
        // as they did before this component composed DetailCell.
        flex: "0 1 auto",
    },
    // Top-align the label/description with the radio input, and match the
    // original 4px (size_040) spacing between the label and description
    // (DetailCell's default content gap is only 2px).
    compactContent: {
        alignSelf: "flex-start",
        gap: sizing.size_040,
    },
    // Account for half of the default label lineHeight difference, which is
    // 18px (label text) - 16px (radio size). This equals 1 pixel above and 1
    // pixel below to be vertically centered with the label.
    compactAccessory: {
        alignSelf: "flex-start",
        marginBlockStart: sizing.size_010,
    },
    // "cell" appearance: render each radio as an individually bordered,
    // rounded card (keeping DetailCell's padding). The border width stays
    // constant across states to avoid layout shift when selecting.
    cellCard: {
        borderStyle: "solid",
        borderWidth: border.width.thin,
        borderColor: semanticColor.core.border.neutral.subtle,
        borderRadius: border.radius.radius_120,
    },
    // When checked, the card shows the instructive (selected) border color.
    cellCardSelected: {
        borderColor: semanticColor.core.border.instructive.default,
        borderWidth: border.width.medium,
    },
    // Align the title/subtitle and the radio to the top of the card so the
    // radio lines up with the title rather than the vertical center.
    cellContent: {
        alignSelf: "flex-start",
    },
    cellAccessory: {
        alignSelf: "flex-start",
        // Nudge the radio down to vertically center it against the title's
        // line height.
        marginBlockStart: sizing.size_010,
    },
    label: {
        color: semanticColor.core.foreground.neutral.strong,
        lineHeight: font.body.lineHeight.small,
    },
    disabledLabel: {
        // Match disabled text input label color
        color: semanticColor.core.foreground.disabled.subtle,
    },
    description: {
        color: theme.description.color.foreground,
    },
});

export default Radio;
