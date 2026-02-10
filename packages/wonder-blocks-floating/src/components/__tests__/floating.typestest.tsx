import * as React from "react";
import Floating from "../floating";

/**
 * Basic Floating usage
 */
<Floating content="Floating content" open={true}>
    <button>Trigger</button>
</Floating>;

// @ts-expect-error - open is required
<Floating content="Floating content">
    <button>Trigger</button>
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
    <button>Trigger</button>
</Floating>;

// @ts-expect-error - focusManagerEnabled=true is required when initialFocusRef
// is provided
<Floating
    content="Floating content"
    open={true}
    focusManagerEnabled={false}
    initialFocusRef={React.createRef<HTMLElement>()}
>
    <button>Trigger</button>
</Floating>;
