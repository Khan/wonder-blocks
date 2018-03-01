// @flow

import React from "react";
import {storiesOf} from "@storybook/react";

import {Title, Heading} from "./index.js";

storiesOf("Title", module).add("with text", () => <Title>Hello, world!</Title>);

storiesOf("Heading.Large", module).add("with text", () => (
    <Heading.Large>Hello, world!</Heading.Large>
));
