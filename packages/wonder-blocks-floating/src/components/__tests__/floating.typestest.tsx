import * as React from "react";
import {describe, it} from "tstyche";
import Button from "@khanacademy/wonder-blocks-button";

import Floating from "../floating";

describe("Floating", () => {
    it("should accept basic usage", () => {
        <Floating content="Floating content" open={true}>
            <Button>Trigger</Button>
        </Floating>;
    });

    it("should require the open prop", () => {
        // @ts-expect-error Property 'open' is missing
        <Floating content="Floating content">
            <Button>Trigger</Button>
        </Floating>;
    });

    it("should accept initialFocusRef when focus management is enabled", () => {
        // focusManagerEnabled is true by default so it is not required when
        // initialFocusRef is provided.
        <Floating
            content="Floating content"
            open={true}
            initialFocusRef={React.createRef<HTMLElement>()}
        >
            <Button>Trigger</Button>
        </Floating>;
    });

    it("should reject initialFocusRef when focus management is disabled", () => {
        // focusManagerEnabled=true is required when initialFocusRef is
        // provided
        // @ts-expect-error Type 'RefObject<HTMLElement>' is not assignable to type 'undefined'
        <Floating
            content="Floating content"
            open={true}
            focusManagerEnabled={false}
            initialFocusRef={React.createRef<HTMLElement>()}
        >
            <Button>Trigger</Button>
        </Floating>;
    });
});
