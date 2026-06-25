import * as React from "react";
import {describe, expect, it} from "tstyche";

import {adapter} from "../router";
import type {Config} from "../router";

describe("router adapter config", () => {
    it("should accept a context-mode location string", () => {
        adapter(null, "/math");
    });

    it("should accept a context-mode location object", () => {
        adapter(null, {location: "/math"});
    });

    it("should accept a context-mode forceStatic object", () => {
        adapter(null, {location: "/math", forceStatic: true});
    });

    it("should accept a context-mode initialEntries object", () => {
        adapter(null, {initialEntries: ["/math"], path: "/math/*"});
    });

    it("should accept a data-routes array config", () => {
        adapter(null, {
            routes: [{path: "/", loader: () => ({})}],
            initialEntries: ["/"],
        });
    });

    it("should accept a data-routes function config", () => {
        adapter(null, {
            routes: (harnessedComponent: React.ReactNode) => [
                {path: "/", element: harnessedComponent},
            ],
        });
    });

    it("should accept data-routes hydrationData", () => {
        adapter(null, {
            routes: [{id: "root", path: "/"}],
            hydrationData: {loaderData: {root: null}},
        });
    });

    it("should reject combining context-mode location with data-routes routes", () => {
        // @ts-expect-error: is not assignable to type 'undefined'
        adapter(null, {location: "/math", routes: [{path: "/"}]});
    });

    it("should reject combining forceStatic with data-routes routes", () => {
        adapter(null, {
            forceStatic: true,
            location: "/math",
            // @ts-expect-error: is not assignable to type 'undefined'
            routes: [{path: "/"}],
        });
    });

    it("should reject combining context-mode path with data-routes routes", () => {
        // @ts-expect-error: is not assignable to type 'undefined'
        adapter(null, {path: "/math/*", routes: [{path: "/"}]});
    });

    it("should reject combining location with initialEntries", () => {
        // @ts-expect-error: is not assignable to type 'undefined'
        adapter(null, {location: "/math", initialEntries: ["/math"]});
    });

    it("should reject combining forceStatic location with initialEntries", () => {
        adapter(null, {
            location: "/math",
            forceStatic: true,
            // @ts-expect-error: is not assignable to type 'undefined'
            initialEntries: ["/math"],
        });
    });
});

/**
 * These assertions check the exported `Config` type directly (rather than
 * through the `adapter` call site). They exercise structural assignability,
 * which - unlike passing a fresh object literal as a function argument - does
 * NOT rely on excess-property checking. That is exactly the guarantee TS 6.0
 * weakened, so these are the regression tests for the `NotLocation` /
 * `NotInitialEntries` / `NotDataRoutes` `never` guards that make `Config` a
 * disjoint union.
 */
describe("Config (disjoint union)", () => {
    it("accepts a bare location string", () => {
        expect("/math").type.toBeAssignableTo<Config>();
    });

    it("accepts a location object", () => {
        expect({location: "/math"}).type.toBeAssignableTo<Config>();
    });

    it("accepts a forceStatic location object", () => {
        expect({
            location: "/math",
            forceStatic: true,
        } as const).type.toBeAssignableTo<Config>();
    });

    it("accepts an initialEntries object", () => {
        expect({initialEntries: ["/math"]}).type.toBeAssignableTo<Config>();
    });

    it("accepts a data-routes object", () => {
        expect({routes: [{path: "/"}]}).type.toBeAssignableTo<Config>();
    });

    it("accepts data-routes combined with initialEntries", () => {
        expect({
            routes: [{path: "/"}],
            initialEntries: ["/"],
        }).type.toBeAssignableTo<Config>();
    });

    it("rejects combining location with initialEntries", () => {
        expect({
            location: "/math",
            initialEntries: ["/math"],
        }).type.not.toBeAssignableTo<Config>();
    });

    it("rejects combining location with data-routes routes", () => {
        expect({
            location: "/math",
            routes: [{path: "/"}],
        }).type.not.toBeAssignableTo<Config>();
    });

    it("rejects combining context-mode path with data-routes routes", () => {
        expect({
            path: "/math/*",
            routes: [{path: "/"}],
        }).type.not.toBeAssignableTo<Config>();
    });

    it("rejects combining location with data-routes hydrationData", () => {
        expect({
            location: "/math",
            hydrationData: {loaderData: {}},
        }).type.not.toBeAssignableTo<Config>();
    });
});
