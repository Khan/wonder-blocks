import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    useWonderBlocksRouter,
    WonderBlocksRouterProvider,
} from "../router-context";

const RouterProbe = () => {
    const router = useWonderBlocksRouter();
    return (
        <div>{router == null ? "no router" : router.resolveHref?.("/a")}</div>
    );
};

describe("WonderBlocksRouterProvider", () => {
    it("returns null when there is no provider", () => {
        // Arrange, Act
        render(<RouterProbe />);

        // Assert
        expect(screen.getByText("no router")).toBeInTheDocument();
    });

    it("returns the router supplied by the provider", () => {
        // Arrange, Act
        render(
            <WonderBlocksRouterProvider
                navigate={jest.fn()}
                resolveHref={(href) => `/base${href}`}
            >
                <RouterProbe />
            </WonderBlocksRouterProvider>,
        );

        // Assert
        expect(screen.getByText("/base/a")).toBeInTheDocument();
    });
});
