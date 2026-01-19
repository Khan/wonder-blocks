import * as React from "react";
import {render, screen} from "@testing-library/react";
import {ResponsiveNavigationTabs} from "../responsive-navigation-tabs";

jest.mock("react-popper", () => ({
    ...jest.requireActual("react-popper"),
    Popper: jest.fn().mockImplementation(({children}) => {
        // Mock `isReferenceHidden` to always return false (or true for testing visibility)
        return children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            isReferenceHidden: false, // Mocking isReferenceHidden
        });
    }),
}));

describe("ResponsiveNavigationTabs", () => {});
