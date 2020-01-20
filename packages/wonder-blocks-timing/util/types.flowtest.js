/* eslint-disable no-unused-vars */
// @flow
/**
 * This file ensures that our flow types are working right.
 */
import * as React from "react";
import withActionScheduler from "../components/with-action-scheduler.js";

import type {WithActionSchedulerProps} from "./types.js";

/**
 * Test WithActionScheduler and withActionScheduler usage.
 */
/**
 * Case 1: Correct usage
 * Given a react component with action scheduler props, we receive an
 * abstract component of `OwnProps1`.
 */
type Props1 = {|
    test: string,
    ...WithActionSchedulerProps,
|};

const InnerComponent1 = (props: Props1): React.Node => props.test;

const HOCComponent1 = withActionScheduler(InnerComponent1);

/**
 * Case 2: Incorrect Usage
 * The withActionScheduler call is returning a component of type OwnProps2; the
 * variable assigned however is incorrectly specified as Props2.
 */
type Props2 = {|
    test: string,
    ...WithActionSchedulerProps,
|};

const InnerComponent2 = (props: Props2): React.Node => props.test;

/**
 * Cannot assign `withActionScheduler(...)` to `HOCComponent2` because property
 * `schedule` is missing in `OwnProps2` [1] but exists in `WithActionScheduler`
 * [2] in type argument  `Config` [3].
 *
 * $ExpectError
 */
const HOCComponent2 = withActionScheduler(InnerComponent2);

/**
 * Case 3: Incorrect Usage
 * The withActionScheduler call is being passed a component that isn't set up
 * to be used with it as it doesn't have all the props necessary.
 */
type Props3 = {|
    test: string,
    ...WithActionSchedulerProps,
|};

const InnerComponent3 = (props: Props3): React.Node => props.test;

const HOCComponent3 = withActionScheduler(
    /**
     * Cannot call `withActionScheduler` with `InnerComponent3` bound to
     * `Component` because property `schedule` is missing in `OwnProps3` [1]
     * but exists in  `WithActionScheduler` [2] in type argument  `Config` [3].
     *
     * $ExpectError
     */
    InnerComponent3,
);
