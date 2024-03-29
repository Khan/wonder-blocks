import * as React from "react";

import Button from "../button";

<Button beforeNav={() => Promise.resolve()}>Hello, world!</Button>;

<Button safeWithNav={() => Promise.resolve()}>Hello, world!</Button>;

// It's okay to use onClick with href
<Button href="/foo" onClick={() => {}}>
    Hello, world!
</Button>;

<Button href="/foo" beforeNav={() => Promise.resolve()}>
    Hello, world!
</Button>;

<Button href="/foo" safeWithNav={() => Promise.resolve()}>
    Hello, world!
</Button>;

// All three of these props can be used together
<Button
    href="/foo"
    beforeNav={() => Promise.resolve()}
    safeWithNav={() => Promise.resolve()}
    onClick={() => {}}
>
    Hello, world!
</Button>;

// It's also fine to use href by itself
<Button href="/foo">Hello, world!</Button>;

const getUrl = () => "/foo";

// This test purposefully uses a function to get a string to pass with href.
// This can trigger errors if there are ambiguous cases in the disjoint union
// type being used to describe the props.  It's unclear why this error isn't
// trigger by passing a string directly as the href.
<Button href={getUrl()}>Hello, world!</Button>;

<Button href="/foo" type="submit">
    Hello, world!
</Button>;

// type="submit" on its own is fine.
<Button type="submit">Hello, world!</Button>;
