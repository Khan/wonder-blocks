import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {useCachedEffect} from "@khanacademy/wonder-blocks-data";
import * as Data from "../data";

describe("WonderBlocksData.adapter", () => {
    it("should render children when configuration arrays are empty", () => {
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        render(Data.adapter(children, []));

        // Assert
        expect(screen.getByText("CONTENT")).toBeInTheDocument();
    });

    it("should support request interception via configured dataIntercepts", async () => {
        // Arrange

        const TestFixture = () => {
            const [result] = useCachedEffect("ID", jest.fn());

            return (
                <div>
                    CONTENT:{" "}
                    {result.status === "success" ? result.data : undefined}
                </div>
            );
        };

        // Act
        const {container} = render(
            Data.adapter(<TestFixture />, () =>
                Promise.resolve("INTERCEPTED!" as any),
            ),
        );

        // Assert
        await waitFor(() => expect(container).toContainHTML("INTERCEPTED!"));
    });

    it("should render like we expect", () => {
        // Snapshot test is handy to visualize what's going on and help debug
        // test failures of the other cases. The other cases assert specifics.
        // Arrange
        const TestFixture = () => {
            const [result] = useCachedEffect("ID", jest.fn());

            return (
                <div>
                    CONTENT:
                    {result.status === "success" ? result.data : undefined}
                </div>
            );
        };

        // Act
        const {container} = render(
            Data.adapter(<TestFixture />, () =>
                Promise.resolve("INTERCEPTED!" as any),
            ),
        );

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                CONTENT:
                INTERCEPTED!
              </div>
            </div>
        `);
    });
});
