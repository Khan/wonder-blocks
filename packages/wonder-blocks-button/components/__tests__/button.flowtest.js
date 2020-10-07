/* eslint-disable flowtype/no-unused-expressions */
// @flow
import * as React from "react";

import Button from "../button.js";

// $ExpectError: can't use href and onClick together
<Button href="/foo" onClick={() => {}}>
    Hello, world
</Button>;

<Button href="/foo" beforeNav={async (e: SyntheticEvent<>) => {}}>
    Hello, world
</Button>;

<Button href="/foo" safeWithNav={async (e: SyntheticEvent<>) => {}}>
    Hello, world
</Button>;
