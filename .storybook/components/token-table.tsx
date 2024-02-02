import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

const StyledTable = addStyle("table");
const StyledTableRow = addStyle("tr");
const StyledTableHeader = addStyle("th");
const StyledTableCell = addStyle("td");

type Column<T> = {
    // The label to display in the table header.
    label: string | React.ReactNode;
    // The key to access the data in the row.
    dataKey?: string;
    // Custom cell renderer. If not provided, the value at `dataKey` will be
    // used.
    cell: string | ((row: T) => React.ReactNode);
};

type Props<T> = {
    /**
     * The data to render in the table.
     * NOTE: We use generic types here to ensure that the data passed in is of
     * the same type as the data in the rows.
     */
    tokens: Record<string, string | number | T>;
    /**
     * The columns to include in the table.
     */
    columns: Array<Column<T>>;
};

export default function TokenTable<T>({
    columns,
    tokens,
}: Props<T>): React.ReactElement {
    // Convert the tokens object into an array of objects.
    const data = Object.entries(tokens).map(
        ([key, value]) => ({label: key, value} as T),
    );

    return (
        <StyledTable style={styles.table}>
            <thead>
                <StyledTableRow style={styles.header}>
                    {columns.map((column, i) => (
                        <StyledTableHeader key={i} style={styles.cell}>
                            {column.label}
                        </StyledTableHeader>
                    ))}
                </StyledTableRow>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <StyledTableRow key={idx} style={styles.row}>
                        {columns.map((column, i) => (
                            <StyledTableCell key={i} style={styles.cell}>
                                {/* We pass the value directly or via the result of a function call. */}
                                {typeof column.cell === "string"
                                    ? row[column.cell]
                                    : column.cell(row)}
                            </StyledTableCell>
                        ))}
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
        margin: `${spacing.xLarge_32}px 0`,
        textAlign: "left",
        width: "100%",
    },
    header: {
        backgroundColor: color.offWhite,
    },
    row: {
        borderTop: `1px solid ${color.offBlack8}`,
        backgroundColor: color.white,
    },
    cell: {
        padding: spacing.xSmall_8,
        verticalAlign: "middle",
    },
});
