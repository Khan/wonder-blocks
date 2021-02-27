// @flow
/* eslint-disable flowtype/no-unused-expressions */
import * as React from "react";

import Button from "../button.js";

// $FlowExpectedError[incompatible-type]: href must be used with beforeNav
<Button beforeNav={() => Promise.resolve()}>Hello, world!</Button>;

// $FlowExpectedError[incompatible-type]: href must be used with safeWithNav
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

const getUrl: () => string = () => "/foo";

// This test purposefully uses a function to get a string to pass with href.
// This can trigger errors if there are ambiguous cases in the disjoint union
// type being used to describe the props.  It's unclear why this error isn't
// trigger by passing a string directly as the href.
// $FlowFixMe[speculation-ambiguous]: this error will go after migrating to TypeScript
<Button href={getUrl()}>Hello, world!</Button>;

// $FlowExpectedError[incompatible-type]: type="submit" can't be used with href since we render an anchor.
<Button href="/foo" type="submit">
    Hello, world!
</Button>;

// type="submit" on its own is fine.
<Button type="submit">Hello, world!</Button>;
