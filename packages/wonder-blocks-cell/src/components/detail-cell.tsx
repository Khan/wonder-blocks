import * as React from "react";
import {StyleSheet} from "aphrodite";

import {BodyText} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core";

import type {CellProps, TypographyText} from "../util/types";
import theme from "../theme";

type SubtitleProps = {
    subtitle?: TypographyText;
    /**
     * If true, the subtitle will use the alpha color defined in the parent
     * component/element.
     */
    disabled?: boolean;
};

const Subtitle = ({subtitle, disabled}: SubtitleProps): React.ReactElement => {
    if (!subtitle) {
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return null;
    }

    if (typeof subtitle === "string") {
        return (
            <BodyText
                size="small"
                tag="span"
                style={[
                    !disabled && styles.subtitle,
                    // We override the default font styles to account for the
                    // differences between themes.
                    {
                        fontSize: theme.subtitle.font.size,
                        lineHeight: theme.subtitle.font.lineHeight,
                    },
                ]}
            >
                {subtitle}
            </BodyText>
        );
    }

    return subtitle;
};

type DetailCellProps = CellProps & {
    /**
     * You can either provide a string or a custom node Typography element (or
     * nothing at all). Both a string or a custom node Typography element will
     * occupy the “Subtitle1” area of the Cell.
     */
    subtitle1?: TypographyText;
    /**
     * You can either provide a string or a custom node Typography element (or
     * nothing at all). Both a string or a custom node Typography element will
     * occupy the “Subtitle2” area of the Cell.
     */
    subtitle2?: TypographyText;
};

/**
 * This is a variant of CompactCell that allows adding subtitles, before and
 * after the cell title. They typically represent an item that can be
 * clicked/tapped to view more complex details. They vary in height depending on
 * the presence or absence of subtitles, and they allow for a wide range of
 * functionality depending on which accessories are active.
 *
 * ### Usage
 *
 * ```jsx
 * import {DetailCell} from "@khanacademy/wonder-blocks-cell";
 * import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
 *
 * <DetailCell
 *  leftAccessory={<PhosphorIcon icon={contentVideo} size="medium" />}
 *  subtitle1="Subtitle 1"
 *  title="Detail cell"
 *  subtitle1="Subtitle 2"
 *  rightAccessory={<PhosphorIcon icon={caretRight} size="medium" />}
 * />
 * ```
 */
const DetailCell = function (props: DetailCellProps): React.ReactElement {
    const {contentStyle, title, subtitle1, subtitle2, ...coreProps} = props;

    return (
        <CellCore
            {...coreProps}
            innerStyle={styles.innerWrapper}
            contentStyle={{gap: theme.root.layout.gap.detail, ...contentStyle}}
        >
            <Subtitle subtitle={subtitle1} disabled={coreProps.disabled} />
            {typeof title === "string" ? (
                <BodyText
                    weight="semi"
                    style={{lineHeight: theme.title.font.lineHeight}}
                >
                    {title}
                </BodyText>
            ) : (
                title
            )}
            <Subtitle subtitle={subtitle2} disabled={coreProps.disabled} />
        </CellCore>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        color: theme.subtitle.color.foreground,
    },
    // This is to override the default padding of the CellCore innerWrapper.
    innerWrapper: {
        paddingBlock: theme.root.layout.padding.block.detail,
        paddingInline: theme.root.layout.padding.inline.detail,
    },
});

export default DetailCell;
