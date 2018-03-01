// @flow

import React from "react";
import {storiesOf} from "@storybook/react";

import Button from "./index.js";

storiesOf("Button", module)
    .add("blue button", () => <Button>Hello, world!</Button>)
    .add("green button", () => <Button color="green">Hello, world!</Button>)
    .add("gold button", () => <Button color="gold">Hello, world!</Button>)
    .add("red button", () => <Button color="red">Hello, world!</Button>);
