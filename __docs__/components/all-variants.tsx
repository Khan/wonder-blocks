import * as React from "react";
import type {StrictArgs} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

const StyledTable = addStyle("table");
const StyledTh = addStyle("th");
const StyledTd = addStyle("td");

type Variant = {name: string; props: StrictArgs};

type Props = {
    /**
     * The children as a function that receives the state props used to render
     * each variant of the component.
     */
    children: (props: any) => React.ReactNode;
    /**
     * The categories to display in the table as columns.
     */
    rows: Array<Variant>;
    /**
     * The states to display in the table as rows.
     */
    columns: Array<Variant>;
};

/**
 * A table that displays all possible variants of a component.
 */
export function AllVariants({children, columns, rows}: Props) {
    return (
        <StyledTable style={styles.table}>
            <thead>
                <tr>
                    <StyledTh style={styles.cell}>
                        <LabelLarge>Category / State</LabelLarge>
                    </StyledTh>
                    {columns.map((col, index) => (
                        <StyledTh key={index} scope="col" style={styles.cell}>
                            <LabelLarge>{col.name}</LabelLarge>
                        </StyledTh>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx}>
                        <StyledTh scope="col" style={styles.cell}>
                            <LabelLarge>{row.name}</LabelLarge>
                        </StyledTh>
                        {columns.map((col) => (
                            <StyledTd
                                key={col.name}
                                style={[
                                    styles.cell,
                                    {
                                        border: `${border.width.hairline}px dashed ${semanticColor.border.primary}`,
                                    },
                                ]}
                            >
                                {children({
                                    ...row.props,
                                    ...col.props,
                                })}
                            </StyledTd>
                        ))}
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
}

const styles = StyleSheet.create({
    table: {
        borderCollapse: "collapse",
        textAlign: "left",
    },
    cell: {
        margin: spacing.medium_16,
        padding: spacing.medium_16,
    },
});
