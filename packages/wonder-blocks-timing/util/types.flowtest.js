/* eslint-disable no-unused-vars */
// @flow
/**
 * This file ensures that our flow types are working right.
 */
import * as React from "react";
import withActionScheduler from "../components/with-action-scheduler.js";

import type {WithActionScheduler} from "./types.js";

/**
 * Test WithActionScheduler and withActionScheduler usage.
 */
/**
 * Case 1: Correct usage
 * Given a react component with action scheduler props, we receive an
 * abstract component of `OwnProps1`.
 */
type OwnProps1 = {|
    test: string,
|};

type Props1 = WithActionScheduler<OwnProps1>;

const InnerComponent1: React.AbstractComponent<Props1> = (
    props: Props1,
): React.Node => props.test;

const HOCComponent1: React.AbstractComponent<OwnProps1> = withActionScheduler(
    InnerComponent1,
);

/**
 * Case 2: Incorrect Usage
 * The withActionScheduler call is returning a component of type OwnProps2; the
 * variable assigned however is incorrectly specified as Props2.
 */
type OwnProps2 = {|
    test: string,
|};

type Props2 = WithActionScheduler<OwnProps2>;

const InnerComponent2: React.AbstractComponent<Props2> = (
    props: Props2,
): React.Node => props.test;

/**
 * Cannot assign `withActionScheduler(...)` to `HOCComponent2` because property
 * `schedule` is missing in `OwnProps2` [1] but exists in `WithActionScheduler`
 * [2] in type argument  `Config` [3].
 *
 * $FlowExpectError
 */
const HOCComponent2: React.AbstractComponent<Props2> = withActionScheduler(
    InnerComponent2,
);

/**
 * Case 3: Incorrect Usage
 * The withActionScheduler call is being passed a component that isn't set up
 * to be used with it as it doesn't have all the props necessary.
 */
type OwnProps3 = {|
    test: string,
|};

const InnerComponent3: React.AbstractComponent<OwnProps3> = (
    props: OwnProps3,
): React.Node => props.test;

const HOCComponent3: React.AbstractComponent<OwnProps3> = withActionScheduler(
    /**
     * Cannot call `withActionScheduler` with `InnerComponent3` bound to
     * `Component` because property `schedule` is missing in `OwnProps3` [1]
     * but exists in  `WithActionScheduler` [2] in type argument  `Config` [3].
     *
     * $FlowExpectError
     */
    InnerComponent3,
);
