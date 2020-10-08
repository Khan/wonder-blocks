// @flow
/* eslint-disable flowtype/no-unused-expressions */
import * as React from "react";

import Button from "../button.js";

// $ExpectError: href must be used with beforeNav
<Button beforeNav={() => Promise.resolve()}>Hello, world!</Button>;

// $ExpectError: href must be used with safeWithNav
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
