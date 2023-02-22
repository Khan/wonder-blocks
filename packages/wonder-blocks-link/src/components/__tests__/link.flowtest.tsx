/* eslint-disable ft-flow/no-unused-expressions */
import * as React from "react";

import Link from "../link";

// TODO(FEI-5000): Re-enable test after updating props to be conditional.
// <Link beforeNav={() => Promise.resolve()}>Hello, world!</Link>;

// TODO(FEI-5000): Re-enable test after updating props to be conditional.
// <Link safeWithNav={() => Promise.resolve()}>Hello, world!</Link>;

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
