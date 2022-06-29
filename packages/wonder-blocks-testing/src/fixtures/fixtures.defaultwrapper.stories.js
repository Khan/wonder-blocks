// @flow
import * as React from "react";

import {fixtures} from "../index.js";

type Props = {...};

const MyComponent = (props: Props) =>
    `My props: ${JSON.stringify(props, null, 2)}`;

const Wrapper = (props) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const DefaultWrapper = (props: Props): React.Node => (
    <>
        DefaultWrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; DefaultWrapper
    </>
);

const fixture = fixtures(DefaultWrapper);

export const F1: mixed = fixture(
    "This is a fixture with some regular props and the default wrapper",
    {
        see: "this is a prop",
        and: "this is another",
    },
);

export const F2: mixed = fixture(
    "This fixture uses a custom wrapper",
    {
        just: "some props again",
        like: "this one",
    },
    Wrapper,
);

export default {
    title: "Testing / Fixtures / DefaultWrapper",
    component: DefaultWrapper,
};
