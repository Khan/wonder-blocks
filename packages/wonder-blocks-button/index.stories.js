// @flow
import React from "react";
import {storiesOf} from "@storybook/react";

import Button from "./index.js";

storiesOf("Button", module)
    .addWithJSX("blue button", () => <Button>Hello, world!</Button>)
    .addWithJSX("green button", () => <Button color="green">Hello, world!</Button>)
    .addWithJSX("gold button", () => <Button color="gold">Hello, world!</Button>)
    .addWithJSX("red button", () => <Button color="red">Hello, world!</Button>);
