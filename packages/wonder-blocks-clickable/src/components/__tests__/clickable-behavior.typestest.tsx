import * as React from "react";

import ClickableBehavior from "../clickable-behavior";

<ClickableBehavior>
    {(_, childrenProps) => <div {...childrenProps} />}
</ClickableBehavior>;

<ClickableBehavior target="_blank">
    {(_, childrenProps) => <div {...childrenProps} />}
</ClickableBehavior>;

<ClickableBehavior beforeNav={() => Promise.resolve()}>
    {(_, childrenProps) => <div {...childrenProps} />}
</ClickableBehavior>;

// @ts-expect-error Types of property 'beforeNav' are incompatible
<ClickableBehavior target="_blank" beforeNav={() => Promise.resolve()}>
    {(_, childrenProps) => <div {...childrenProps} />}
</ClickableBehavior>;
