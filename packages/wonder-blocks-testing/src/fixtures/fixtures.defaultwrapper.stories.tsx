import * as React from "react";

import {fixtures} from "../index";

type Props = Record<any, any>;

const MyComponent = (props: Props): React.ReactElement => (
    <>{`My props: ${JSON.stringify(props, null, 2)}`}</>
);

const Wrapper = (props: any) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const DefaultWrapper = (props: Props): React.ReactElement => (
    <>
        DefaultWrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; DefaultWrapper
    </>
);

const fixture = fixtures(DefaultWrapper);

export const F1: unknown = fixture(
    "This is a fixture with some regular props and the default wrapper",
    {
        see: "this is a prop",
        and: "this is another",
    },
);

export const F2: unknown = fixture(
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
