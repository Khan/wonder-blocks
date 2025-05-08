import {StyleSheet} from "aphrodite";
import * as React from "react";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";

type Props = {
    numRows?: number;
    numColumns?: number;
};
const StyledTd = addStyle("td");
const StyledTh = addStyle("th");
export const ExampleTable = (props: Props) => {
    const {numRows = 5, numColumns = 3} = props;

    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
            }}
        >
            <thead>
                <tr>
                    {Array(numColumns)
                        .fill(0)
                        .map((_, colIndex) => (
                            <StyledTh
                                key={`header-${colIndex}`}
                                style={[styles.cell, styles.headerCell]}
                            >
                                {`Column ${colIndex + 1}`}
                            </StyledTh>
                        ))}
                </tr>
            </thead>
            <tbody>
                {Array(numRows)
                    .fill(0)
                    .map((_, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {Array(numColumns)
                                .fill(0)
                                .map((_, colIndex) => (
                                    <StyledTd
                                        key={`cell-${rowIndex}-${colIndex}`}
                                        style={styles.cell}
                                    >
                                        {`Row ${rowIndex + 1} Column ${colIndex + 1}`}
                                    </StyledTd>
                                ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

const styles = StyleSheet.create({
    cell: {
        borderBottom: `${border.width.thin} solid ${semanticColor.border.subtle}`,
        padding: sizing.size_200,
    },
    headerCell: {
        borderBottom: `${border.width.medium} solid ${semanticColor.border.primary}`,
        textAlign: "left",
    },
});
