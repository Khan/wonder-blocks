import * as React from "react";
import type {StrictArgs} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {addStyle, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    breakpoint,
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

const StyledTable = addStyle("table");
const StyledTh = addStyle("th");
const StyledTd = addStyle("td");
const StyledUl = addStyle("ul");

function getAriaLabel(
    rowName: string | React.ReactNode,
    columnName: string | React.ReactNode,
): string {
    const rowLabel = typeof rowName === "string" ? rowName : "";
    const columnLabel = typeof columnName === "string" ? columnName : "";

    return `${rowLabel} ${columnLabel}`;
}

type Variant = {name: string | React.ReactNode; props: StrictArgs};

type Props = {
    /**
     * The children as a function that receives the state props used to render
     * each variant of the component.
     */
    children: ({
        props,
        name,
        className,
    }: {
        props: any;
        name?: string;
        className?: string;
    }) => React.ReactNode;
    /**
     * The categories to display in the table as columns.
     */
    rows: Array<Variant>;
    /**
     * The states to display in the table as rows.
     */
    columns: Array<Variant>;
    /**
     * The layout for AllVariants.
     * - `responsive`: variants will be displayed in a table at larger screen
     * sizes and in a list at smaller screen sizes
     * - `list`: variants will always be displayed in a list
     */
    layout?: "responsive" | "list";

    /**
     * Custom styles for the `AllVariants` component.
     * - `rowHeader`: Styles all the row headers in the table.
     * - `cell`: Styles all the cells in the table.
     */
    styles?: {
        rowHeader?: StyleType;
        cell?: StyleType;
    };

    /**
     * The title of the table.
     */
    title?: string;
};

/**
 * A table that displays all possible variants of a component.
 */
export function AllVariants(props: Props) {
    const {
        children,
        rows,
        columns,
        layout = "responsive",
        styles: stylesProp,
        title = "Category / State",
    } = props;

    return (
        <>
            {layout === "responsive" && (
                <StyledTable style={[styles.table]}>
                    <thead>
                        <tr>
                            <StyledTh style={styles.cell}>
                                <LabelLarge>{title}</LabelLarge>
                            </StyledTh>
                            {columns.map((col, index) => (
                                <StyledTh
                                    key={index}
                                    scope="col"
                                    style={styles.cell}
                                >
                                    <LabelLarge>{col.name}</LabelLarge>
                                </StyledTh>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <StyledTh
                                    scope="row"
                                    style={[styles.cell, stylesProp?.rowHeader]}
                                >
                                    {typeof row.name === "string" ? (
                                        <LabelLarge>{row.name}</LabelLarge>
                                    ) : (
                                        row.name
                                    )}
                                </StyledTh>
                                {columns.map((col, index) => {
                                    const ariaLabel = getAriaLabel(
                                        row.name,
                                        col.name,
                                    );

                                    return (
                                        <StyledTd
                                            key={index}
                                            style={[
                                                styles.cell,
                                                {
                                                    border: `${border.width.thin} dashed ${semanticColor.core.border.neutral.subtle}`,
                                                },
                                                stylesProp?.cell,
                                            ]}
                                        >
                                            {children({
                                                props: {
                                                    "aria-label": ariaLabel,
                                                    ...row.props,
                                                    ...col.props,
                                                },
                                                name: ariaLabel,
                                            })}
                                        </StyledTd>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            )}
            {/* TODO(WB-1925): Make sure to include state labels properly for each children (see `state-sheet.tsx`) */}
            <StyledUl
                style={[
                    styles.list,
                    layout === "responsive" && styles.listResponsive,
                ]}
            >
                {rows.map((row) => {
                    return columns.map((column) => {
                        const ariaLabel = getAriaLabel(row.name, column.name);

                        return (
                            <li key={`${row.name} ${column.name}`}>
                                <LabelLarge>
                                    Column: {column.name}, Row: {row.name}
                                </LabelLarge>

                                <View style={styles.childrenWrapper}>
                                    {children({
                                        props: {
                                            "aria-label": ariaLabel,
                                            ...column.props,
                                            ...row.props,
                                        },
                                        name: ariaLabel,
                                    })}
                                </View>
                            </li>
                        );
                    });
                })}
            </StyledUl>
        </>
    );
}

const styles = StyleSheet.create({
    table: {
        borderCollapse: "collapse",
        textAlign: "left",
        [breakpoint.mediaQuery.smOrSmaller]: {
            display: "none",
        },
        maxWidth: "100%",
    },
    list: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
    },
    listResponsive: {
        [breakpoint.mediaQuery.mdOrLarger]: {
            display: "none",
        },
    },
    cell: {
        margin: spacing.medium_16,
        padding: spacing.medium_16,
    },
    childrenWrapper: {
        padding: sizing.size_080,
        marginBlock: sizing.size_080,
        border: `${border.width.thin} dashed ${semanticColor.core.border.neutral.subtle}`,
    },
});
