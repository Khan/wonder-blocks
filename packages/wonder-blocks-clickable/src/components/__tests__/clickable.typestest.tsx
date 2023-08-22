import * as React from "react";

import Clickable from "../clickable";

<Clickable>{(_) => "Hello, world!"}</Clickable>;

<Clickable href="/foo">{(_) => "Hello, world!"}</Clickable>;

<Clickable href="/foo" target="_blank">
    {(_) => "Hello, world!"}
</Clickable>;

// @ts-expect-error - `href` must be set when using `target="_blank"`.
<Clickable target="_blank">{(_) => "Hello, world!"}</Clickable>;

<Clickable href="/foo" beforeNav={() => Promise.resolve()}>
    {(_) => "Hello, world!"}
</Clickable>;

<Clickable href="/foo" safeWithNav={() => Promise.resolve()}>
    {(_) => "Hello, world!"}
</Clickable>;

<Clickable href="/foo" target="_blank" safeWithNav={() => Promise.resolve()}>
    {(_) => "Hello, world!"}
</Clickable>;

// @ts-expect-error - `target="_blank"` cannot be used with `beforeNav`.
<Clickable href="/foo" target="_blank" beforeNav={() => Promise.resolve()}>
    {(_) => "Hello, world!"}
</Clickable>;

// @ts-expect-error - `target="_blank"` cannot be used with `beforeNav`.
<Clickable
    href="/foo"
    target="_blank"
    beforeNav={() => Promise.resolve()}
    safeWithNav={() => Promise.resolve()}
>
    {(_) => "Hello, world!"}
</Clickable>;

<Clickable
    href="/foo"
    beforeNav={() => Promise.resolve()}
    safeWithNav={() => Promise.resolve()}
>
    {(_) => "Hello, world!"}
</Clickable>;
