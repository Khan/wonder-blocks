// @flow
import * as React from "react";

import {
    setupFixtures,
    fixtures,
    fixtureAdapters as adapters,
} from "../index.js";

// Normally would call setup from the storybook.preview.js for a project.
setupFixtures({
    adapter: adapters.storybook(),
});

type Props = {|
    propA: string,
    propB?: string,
|};

const MyComponent = (props: Props) =>
    `I am a component. Here are my props: ${JSON.stringify(props, null, 2)}`;

const Wrapper = (props) => (
    <>
        Wrapper &gt;&gt;&gt;
        <MyComponent {...props} />
        &lt;&lt;&lt; Wrapper
    </>
);

const stories: Array<mixed> = Object.values(
    fixtures<typeof MyComponent, _>(
        {
            component: MyComponent,
            title: "Testing / Fixtures / Basic",
        },
        (fixture) => {
            fixture("This is a fixture with some regular props", {
                propA: "this is a prop",
                propB: "this is another",
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
                        propA: "prop was made from a function",
                    };
                },
            );

            fixture(
                "This fixture uses a custom wrapper",
                {
                    propA: "some props again",
                    propB: "this one",
                },
                Wrapper,
            );
        },
    ) ?? {},
);

export default stories[0];
export const F1 = stories[1];
export const F2 = stories[2];
export const F3 = stories[3];
