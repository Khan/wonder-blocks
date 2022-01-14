// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import {GqlRouterContext} from "../../util/gql-router-context.js";
import {GqlRouter} from "../gql-router.js";

describe("GqlRouter", () => {
    it("should provide the GqlRouterContext as configured", async () => {
        // Arrange
        const defaultContext = {
            foo: "bar",
        };
        const fetch = jest.fn();
        const CaptureContext = ({captureFn}) => {
            captureFn(React.useContext(GqlRouterContext));
            return null;
        };

        // Act
        const result = await new Promise((resolve, reject) => {
            render(
                <GqlRouter defaultContext={defaultContext} fetch={fetch}>
                    <CaptureContext captureFn={resolve} />
                </GqlRouter>,
            );
        });

        // Assert
        expect(result).toStrictEqual({
            defaultContext,
            fetch,
        });
    });

    it("should not render React.memo-ized children if props remain the same", () => {
        // Arrange
        const defaultContext = {
            foo: "bar",
        };
        const fetch = jest.fn();
        let renderCount = 0;
        const Child = React.memo(() => {
            const context = React.useContext(GqlRouterContext);
            renderCount++;
            return <div>{JSON.stringify(context)}</div>;
        });

        // Act
        const {rerender} = render(
            <GqlRouter defaultContext={defaultContext} fetch={fetch}>
                <Child />
            </GqlRouter>,
        );
        rerender(
            <GqlRouter defaultContext={defaultContext} fetch={fetch}>
                <Child />
            </GqlRouter>,
        );

        // Assert
        expect(renderCount).toBe(1);
    });
});
