import * as React from "react";
import {describe, it} from "tstyche";

import ClickableBehavior from "../clickable-behavior";

describe("ClickableBehavior", () => {
    it("should be usable with no props", () => {
        <ClickableBehavior>
            {(_, childrenProps) => <div {...childrenProps} />}
        </ClickableBehavior>;
    });

    it("should accept target prop", () => {
        <ClickableBehavior target="_blank">
            {(_, childrenProps) => <div {...childrenProps} />}
        </ClickableBehavior>;
    });

    it("should accept beforeNav prop", () => {
        <ClickableBehavior beforeNav={() => Promise.resolve()}>
            {(_, childrenProps) => <div {...childrenProps} />}
        </ClickableBehavior>;
    });

    it("should reject combining target and beforeNav props", () => {
        // @ts-expect-error Types of property 'beforeNav' are incompatible
        <ClickableBehavior target="_blank" beforeNav={() => Promise.resolve()}>
            {(_, childrenProps) => <div {...childrenProps} />}
        </ClickableBehavior>;
    });
});
