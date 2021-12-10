// @flow
import * as React from "react";

import {setupFixtures, fixtures, adapters} from "../index.js";

// Normally would call setup from the storybook.main.js for a project.
setupFixtures({
    adapter: adapters.storybook(),
});

const MyComponent = (props) =>
    `I am a component. Here are my props: ${JSON.stringify(props, null, 2)}`;

const Wrapper = (props) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const stories: Array<mixed> = Object.values(
    fixtures(
        {
            component: MyComponent,
            title: "Testing/Fixtures/Basic",
        },
        (fixture) => {
            fixture("This is a fixture with some regular props", {
                see: "this is a prop",
                and: "this is another",
            });

            fixture(
                "This is a fixture with props from functions, and a bit of logging",
                ({log}) => {
                    log(
                        "This is a log from a fixture during props generation",
                        {
                            and: "some data",
                        },
                    );
                    return {
                        this: "prop was made from a function",
                    };
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
export const f1 = stories[1];
export const f2 = stories[2];
export const f3 = stories[3];
