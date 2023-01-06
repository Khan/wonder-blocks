// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

const StyledTable = addStyle("table");
const StyledTableRow = addStyle("tr");
const StyledTableHeader = addStyle("th");
const StyledTableCell = addStyle("td");

export default function SpacingTable(): React.Node {
    return (
        <StyledTable style={styles.table}>
            <thead>
                <StyledTableRow style={styles.header}>
                    <StyledTableHeader style={styles.cell}>
                        Name
                    </StyledTableHeader>
                    <StyledTableHeader style={styles.cell}>
                        Size
                    </StyledTableHeader>
                    <StyledTableHeader style={styles.cell}>
                        Example horizontal
                    </StyledTableHeader>
                    <StyledTableHeader style={styles.cell}>
                        Example vertical
                    </StyledTableHeader>
                </StyledTableRow>
            </thead>
            <tbody>
                {Object.keys(Spacing).map((spaceName, idx) => (
                    <StyledTableRow key={idx} style={styles.row}>
                        <StyledTableCell style={styles.cell}>
                            <LabelMedium style={styles.tag}>
                                {spaceName}
                            </LabelMedium>
                        </StyledTableCell>
                        <StyledTableCell style={styles.cell}>
                            <LabelMedium>{Spacing[spaceName]}px</LabelMedium>
                        </StyledTableCell>
                        <StyledTableCell style={styles.cell}>
                            <View
                                style={{
                                    backgroundColor: Color.purple,
                                    width: Spacing[spaceName],
                                    height: Spacing.medium_16,
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell style={styles.cell}>
                            <View
                                style={{
                                    backgroundColor: Color.purple,
                                    width: Spacing.medium_16,
                                    height: Spacing[spaceName],
                                }}
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </tbody>
        </StyledTable>
    );
}

const styles = StyleSheet.create({
    table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
        margin: `${Spacing.xLarge_32}px 0`,
        textAlign: "left",
        width: "100%",
    },
    header: {
        backgroundColor: Color.offWhite,
    },
    row: {
        borderTop: `1px solid ${Color.offBlack8}`,
    },
    cell: {
        padding: Spacing.xSmall_8,
        verticalAlign: "middle",
    },
    tag: {
        background: Color.offWhite,
        border: `solid 1px ${Color.offBlack8}`,
        borderRadius: Spacing.xxxxSmall_2,
        display: "inline-block",
        margin: `${Spacing.xxxSmall_4}px 0`,
        padding: `0 ${Spacing.xxxSmall_4}px`,
    },
});
