import * as React from "react";
import {describe, it} from "tstyche";

import {adapter} from "../router";

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
            routes: (children: React.ReactNode) => [
                {path: "/", element: children},
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
});
