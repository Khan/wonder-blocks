import * as React from "react";
import {describe, it} from "tstyche";

import Link from "../link";

describe("Link", () => {
    it("should reject beforeNav without href", () => {
        // @ts-expect-error Property 'href' is missing
        // eslint-disable-next-line jsx-a11y/anchor-is-valid -- Explicitly testing without href
        <Link beforeNav={() => Promise.resolve()}>Hello, world!</Link>;
    });

    it("should reject safeWithNav without href", () => {
        // @ts-expect-error Property 'href' is missing
        // eslint-disable-next-line jsx-a11y/anchor-is-valid -- Explicitly testing without href
        <Link safeWithNav={() => Promise.resolve()}>Hello, world!</Link>;
    });

    it("should accept onClick with href", () => {
        <Link href="/foo" onClick={() => {}}>
            Hello, world!
        </Link>;
    });

    it("should accept href and beforeNav", () => {
        <Link href="/foo" beforeNav={() => Promise.resolve()}>
            Hello, world!
        </Link>;
    });

    it("should accept href and safeWithNav", () => {
        <Link href="/foo" safeWithNav={() => Promise.resolve()}>
            Hello, world!
        </Link>;
    });

    it("should reject beforeNav when target is set", () => {
        // @ts-expect-error Types of property 'beforeNav' are incompatible
        <Link href="/foo" target="_blank" beforeNav={() => Promise.resolve()}>
            Hello, world!
        </Link>;
    });

    it("should accept href, beforeNav, safeWithNav, and onClick together", () => {
        <Link
            href="/foo"
            beforeNav={() => Promise.resolve()}
            safeWithNav={() => Promise.resolve()}
            onClick={() => {}}
        >
            Hello, world!
        </Link>;
    });

    it("should accept href by itself", () => {
        <Link href="/foo">Hello, world!</Link>;
    });
});
