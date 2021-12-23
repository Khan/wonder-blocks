// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelSmall, LabelMedium} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core.js";

import type {CellProps, TypographyText} from "../util/types.js";

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
 * This is a variant of BasicCell that allows adding subtitles, before and after
 * the cell title.
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

    const maybeRenderSubtitle = (subtitle?: TypographyText): React.Node => {
        if (!subtitle) {
            return null;
        }

        if (typeof subtitle === "string") {
            return <LabelSmall style={styles.subtitle}>{subtitle}</LabelSmall>;
        }

        return subtitle;
    };

    return (
        <CellCore {...coreProps}>
            {maybeRenderSubtitle(subtitle1)}
            {typeof title === "string" ? (
                <LabelMedium>{title}</LabelMedium>
            ) : (
                title
            )}
            {/* Add a vertical spacing between the title and the subtitle */}
            {subtitle2 && <Strut size={Spacing.xxxxSmall_2} />}
            {maybeRenderSubtitle(subtitle2)}
        </CellCore>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        color: Color.offBlack64,
    },
});

export default DetailCell;
