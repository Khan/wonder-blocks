import * as React from "react";
import {describe, it} from "tstyche";

import Clickable from "../clickable";

describe("Clickable", () => {
    it("should be usable with no props", () => {
        <Clickable>{(_) => "Hello, world!"}</Clickable>;
    });

    it("should accept an href", () => {
        <Clickable href="/foo">{(_) => "Hello, world!"}</Clickable>;
    });

    it("should accept href and target", () => {
        <Clickable href="/foo" target="_blank">
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should reject target without href", () => {
        // @ts-expect-error Property 'href' is missing
        <Clickable target="_blank">{(_) => "Hello, world!"}</Clickable>;
    });

    it("should accept href and beforeNav", () => {
        <Clickable href="/foo" beforeNav={() => Promise.resolve()}>
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should accept href and safeWithNav", () => {
        <Clickable href="/foo" safeWithNav={() => Promise.resolve()}>
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should accept href, target, and safeWithNav", () => {
        <Clickable
            href="/foo"
            target="_blank"
            safeWithNav={() => Promise.resolve()}
        >
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should reject beforeNav when target is set", () => {
        // @ts-expect-error Types of property 'beforeNav' are incompatible
        <Clickable
            href="/foo"
            target="_blank"
            beforeNav={() => Promise.resolve()}
        >
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should reject beforeNav when target and safeWithNav are set", () => {
        // @ts-expect-error Types of property 'beforeNav' are incompatible
        <Clickable
            href="/foo"
            target="_blank"
            beforeNav={() => Promise.resolve()}
            safeWithNav={() => Promise.resolve()}
        >
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should accept href, beforeNav, and safeWithNav", () => {
        <Clickable
            href="/foo"
            beforeNav={() => Promise.resolve()}
            safeWithNav={() => Promise.resolve()}
        >
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should be usable with just beforeNav", () => {
        <Clickable beforeNav={() => Promise.resolve()}>
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should be usable with just safeWithNav", () => {
        <Clickable safeWithNav={() => Promise.resolve()}>
            {(_) => "Hello, world!"}
        </Clickable>;
    });

    it("should be usable with just beforeNav and safeWithNav", () => {
        <Clickable
            beforeNav={() => Promise.resolve()}
            safeWithNav={() => Promise.resolve()}
        >
            {(_) => "Hello, world!"}
        </Clickable>;
    });
});
