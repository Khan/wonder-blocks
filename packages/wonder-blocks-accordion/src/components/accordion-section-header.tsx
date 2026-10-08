import * as React from "react";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import type {AccordionCornerKindType} from "./accordion";
import type {TagType} from "./accordion-section";
import {getRoundedValuesForHeader} from "../utils";
import styles from "./accordion-section-header.module.css";

const HEADING_SELECTOR = 'h1,h2,h3,h4,h5,h6,[role="heading"]';

type Props = {
    // Unique ID for this section's button.
    id: string;
    // Header content.
    header: string | React.ReactElement;
    // Whether the caret shows up at the start or end of the header block.
    caretPosition: "start" | "end";
    // Corner roundedness type.
    cornerKind: AccordionCornerKindType;
    // Whether the section is collapsible or not. If false, the header will
    // not be clickable, and the section will stay expanded at all times.
    collapsible?: boolean;
    // Whether the section is expanded or not.
    expanded: boolean;
    // Whether to include animation on the header. This should be false
    // if the user has `prefers-reduced-motion` opted in. Defaults to false.
    animated: boolean;
    // Called on header click.
    onClick?: () => void;
    // The ID for the content that the header's `aria-controls` should
    // point to.
    sectionContentUniqueId: string;
    // Custom styles for the header container.
    headerStyle?: StyleType;
    // The semantic tag for this clickable header (e.g. "h1", "h2", etc.)
    // Please use this to ensure that the header is hierarchically correct.
    tag?: TagType;
    // The test ID used for e2e testing.
    testId?: string;
    // Whether this section is the first section in the accordion.
    // For internal use only.
    isFirstSection: boolean;
    // Whether this section is the last section in the accordion.
    // For internal use only.
    isLastSection: boolean;
};

const AccordionSectionHeader = React.forwardRef(function AccordionSectionHeader(
    props: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {
        id,
        header,
        caretPosition,
        cornerKind,
        collapsible = true,
        expanded,
        animated,
        onClick,
        sectionContentUniqueId,
        headerStyle,
        tag = "h2",
        testId,
        isFirstSection,
        isLastSection,
    } = props;

    const headerIsString = typeof header === "string";

    // Checking the DOM rather than the `header` element also catches headings
    // rendered inside a consumer's own components, which the
    // no-heading-in-accordion-header lint rule can't see.
    const headerContentRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production" || headerIsString) {
            return;
        }

        if (headerContentRef.current?.querySelector(HEADING_SELECTOR)) {
            // eslint-disable-next-line no-console
            console.warn(
                "AccordionSection's header contains a heading. It is rendered " +
                    "inside a <button> that AccordionSection already wraps in " +
                    "a heading, which is invalid HTML. Set the heading level " +
                    "with the `tag` prop instead, and use " +
                    '`<BodyText tag="span">` with `font.heading.*` tokens for ' +
                    "heading-sized text.",
            );
        }
    }, [header, headerIsString]);

    const {roundedTop, roundedBottom} = getRoundedValuesForHeader(
        cornerKind,
        isFirstSection,
        isLastSection,
        expanded,
    );

    return (
        <Heading size="medium" tag={tag} style={styles.heading}>
            <Clickable
                id={id}
                aria-expanded={expanded}
                aria-controls={sectionContentUniqueId}
                onClick={onClick}
                disabled={!collapsible}
                testId={testId ? `${testId}-header` : undefined}
                style={[
                    styles.headerWrapper,
                    animated && styles.headerWrapperWithAnimation,
                    caretPosition === "start" && styles.headerWrapperCaretStart,
                    roundedTop && styles.roundedTop,
                    roundedBottom && styles.roundedBottom,
                    headerStyle,
                    !collapsible && styles.disabled,
                ]}
                ref={ref}
            >
                {() => (
                    <>
                        <View
                            style={[
                                styles.headerContent,
                                headerIsString && styles.headerString,
                            ]}
                            ref={headerContentRef}
                        >
                            {headerIsString ? (
                                <View
                                    style={[
                                        caretPosition === "end"
                                            ? styles.headerStringCaretEnd
                                            : styles.headerStringCaretStart,
                                    ]}
                                >
                                    {header}
                                </View>
                            ) : (
                                header
                            )}
                        </View>
                        {collapsible && (
                            <PhosphorIcon
                                icon={caretDown}
                                color={
                                    semanticColor.core.foreground.neutral
                                        .default
                                }
                                size="small"
                                style={[
                                    animated && styles.iconWithAnimation,
                                    caretPosition === "start"
                                        ? styles.iconStart
                                        : styles.iconEnd,
                                    expanded && styles.iconExpanded,
                                ]}
                                testId={
                                    testId ? `${testId}-caret-icon` : undefined
                                }
                            />
                        )}
                    </>
                )}
            </Clickable>
        </Heading>
    );
});

export default AccordionSectionHeader;
