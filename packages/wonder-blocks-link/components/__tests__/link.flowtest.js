// @flow
/* eslint-disable flowtype/no-unused-expressions */
import * as React from "react";

import Link from "../link.js";

// $ExpectError: href must be used with beforeNav
<Link beforeNav={() => Promise.resolve()}>Hello, world!</Link>;

// $ExpectError: href must be used with safeWithNav
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
