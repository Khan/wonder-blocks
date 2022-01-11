// @flow
import * as React from "react";

import {useDataInternal} from "../hooks/use-data-internal.js";

import type {ValidData, Result, IRequestHandler} from "../util/types.js";

type Props<TOptions, TData> = {|
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    children: (result: Result<TData>) => React.Node,
|};

/**
 * This component is responsible for actually handling the data request.
 * It is wrapped by Data in order to support intercepts and be exported for use.
 *
 * TODO: Delete this component since it is now entirely implemented with
 * the hook.
 *
 * INTERNAL USE ONLY
 */
const InternalData = <TOptions, TData: ValidData>(
    props: Props<TOptions, TData>,
): React.Node => {
    const data = useDataInternal(props.handler, props.options);
    return props.children(data);
};
export default InternalData;
