// @flow
import * as React from "react";

import {setupFixtures, fixtures, adapters} from "../index.js";

// Normally would call setup from the storybook.main.js for a project.
setupFixtures({
    adapter: adapters.storybook(),
});

const MyComponent = (props) => `My props: ${JSON.stringify(props, null, 2)}`;

const Wrapper = (props) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const DefaultWrapper = (props) => (
    <>
        DefaultWrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; DefaultWrapper
    </>
);

const stories: Array<mixed> = Object.values(
    fixtures(
        {
            component: MyComponent,
            title: "Testing/Fixtures/DefaultWrapper",
            defaultWrapper: DefaultWrapper,
        },
        (fixture) => {
            fixture(
                "This is a fixture with some regular props and the default wrapper",
                {
                    see: "this is a prop",
                    and: "this is another",
                },
            );

            fixture(
                "This fixture uses a custom wrapper",
                {
                    just: "some props again",
                    like: "this one",
                },
                Wrapper,
            );
        },
    ) ?? {},
);

export default stories[0];
export const F1 = stories[1];
export const F2 = stories[2];
