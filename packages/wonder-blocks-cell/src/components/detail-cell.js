// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelSmall, LabelMedium} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core.js";
import {CellMeasurements} from "./internal/common.js";

import type {CellProps, TypographyText} from "../util/types.js";

type SubtitleProps = {|
    subtitle?: TypographyText,
    /**
     * If true, the subtitle will use the alpha color defined in the parent
     * component/element.
     */
    disabled?: boolean,
|};

const Subtitle = ({subtitle, disabled}: SubtitleProps): React.Node => {
    if (!subtitle) {
        return null;
    }

    if (typeof subtitle === "string") {
        return (
            <LabelSmall style={!disabled && styles.subtitle}>
                {subtitle}
            </LabelSmall>
        );
    }

    return subtitle;
};

type DetailCellProps = {|
    ...CellProps,

    /**
     * You can either provide a string or a custom node Typography element (or
     * nothing at all). Both a string or a custom node Typography element will
     * occupy the “Subtitle1” area of the Cell.
     */
    subtitle1?: TypographyText,

    /**
     * You can either provide a string or a custom node Typography element (or
     * nothing at all). Both a string or a custom node Typography element will
     * occupy the “Subtitle2” area of the Cell.
     */
    subtitle2?: TypographyText,
|};

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
 *
 * <DetailCell
 *  leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
 *  subtitle1="Subtitle 1"
 *  title="Detail cell"
 *  subtitle1="Subtitle 2"
 *  rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
 * />
 * ```
 */
function DetailCell(props: DetailCellProps): React.Node {
    const {title, subtitle1, subtitle2, ...coreProps} = props;

    return (
        <CellCore {...coreProps} innerStyle={styles.innerWrapper}>
            <Subtitle subtitle={subtitle1} disabled={coreProps.disabled} />
            {subtitle1 && <Strut size={Spacing.xxxxSmall_2} />}
            {typeof title === "string" ? (
                <LabelMedium>{title}</LabelMedium>
            ) : (
                title
            )}
            {/* Add a vertical spacing between the title and the subtitle */}
            {subtitle2 && <Strut size={Spacing.xxxxSmall_2} />}
            <Subtitle subtitle={subtitle2} disabled={coreProps.disabled} />
        </CellCore>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        color: Color.offBlack64,
    },

    // This is to override the default padding of the CellCore innerWrapper.
    innerWrapper: {
        padding: `${CellMeasurements.detailCellPadding.paddingVertical}px ${CellMeasurements.detailCellPadding.paddingHorizontal}px`,
    },
});

export default DetailCell;
