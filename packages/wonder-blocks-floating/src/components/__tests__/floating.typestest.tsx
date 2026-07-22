import * as React from "react";
import Button from "@khanacademy/wonder-blocks-button";
import Floating from "../floating";

/**
 * Basic Floating usage
 */
<Floating content="Floating content" open={true}>
    <Button>Trigger</Button>
</Floating>;

// @ts-expect-error - open is required
<Floating content="Floating content">
    <Button>Trigger</Button>
</Floating>;

/**
 * Focus management
 */
// focusManagerEnabled is true by default so it is not required when
// initialFocusRef is provided.
<Floating
    content="Floating content"
    open={true}
    initialFocusRef={React.createRef<HTMLElement>()}
>
    <Button>Trigger</Button>
</Floating>;

// @ts-expect-error - focusManagerEnabled=true is required when initialFocusRef
// is provided
<Floating
    content="Floating content"
    open={true}
    focusManagerEnabled={false}
    initialFocusRef={React.createRef<HTMLElement>()}
>
    <Button>Trigger</Button>
</Floating>;
