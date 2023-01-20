// @flow
import * as React from "react";

import {fixtures} from "../index";

type Props = {|
    propA: string,
    propB?: string,
|};

const MyComponent = (props: Props): React.Node =>
    `I am a component. Here are my props: ${JSON.stringify(props, null, 2)}`;

const Wrapper = (props) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const fixture = fixtures(MyComponent);

export const F1: mixed = fixture("This is a fixture with some regular props", {
    propA: "this is a prop",
    propB: "this is another",
});

export const F2: mixed = fixture(
    "This is a fixture with props from functions, and a bit of logging",
    ({log}) => {
        log("This is a log from a fixture during props generation", {
            and: "some data",
        });
        return {
            propA: "prop was made from a function",
        };
    },
);

export const F3: mixed = fixture(
    "This fixture uses a custom wrapper",
    {
        propA: "some props again",
        propB: "this one",
    },
    Wrapper,
);

export default {
    title: "Testing / Fixtures / Basic",
    component: MyComponent,
};
