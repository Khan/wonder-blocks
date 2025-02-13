import * as React from "react";

import Link from "../link";

// @ts-expect-error - href must be used with safeWithNav
// eslint-disable-next-line jsx-a11y/anchor-is-valid -- Explicitly testing without href
<Link beforeNav={() => Promise.resolve()}>Hello, world!</Link>;

// @ts-expect-error - href must be used with safeWithNav
// eslint-disable-next-line jsx-a11y/anchor-is-valid -- Explicitly testing without href
<Link safeWithNav={() => Promise.resolve()}>Hello, world!</Link>;

// It's okay to use onClick with href
<Link href="/foo" onClick={() => {}}>
    Hello, world!
</Link>;

<Link href="/foo" beforeNav={() => Promise.resolve()}>
    Hello, world!
</Link>;

<Link href="/foo" safeWithNav={() => Promise.resolve()}>
    Hello, world!
</Link>;

// @ts-expect-error - `target="_blank"` cannot beused with `beforeNav`
<Link href="/foo" target="_blank" beforeNav={() => Promise.resolve()}>
    Hello, world!
</Link>;

// All three of these props can be used together
<Link
    href="/foo"
    beforeNav={() => Promise.resolve()}
    safeWithNav={() => Promise.resolve()}
    onClick={() => {}}
>
    Hello, world!
</Link>;

// It's also fine to use href by itself
<Link href="/foo">Hello, world!</Link>;
