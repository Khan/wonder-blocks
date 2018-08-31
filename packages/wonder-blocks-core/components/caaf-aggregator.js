// @flow
import * as React from "react";

type CaaFComponent<P> = {|
    type: React.ComponentType<P>,
    props?: P,
|};

type Props = {|
    /**
     * The children-as-a-function (CaaF) components that are to be aggregated.
     */
    caafs: Array<CaaFComponent<any>>,
    /**
     * The function called to render the children of this component. It is
     * passed an array that contains the results of each aggregated CaaF in the
     * order the CaaFs were provided in the `caaf` prop.
     */
    children: (Array<any>) => React.Node,
|};

/**
 * This children-as-a-function (CaaF) component provides a mechanism for
 * gathering the output of several CaaF components into a single CaaF, removing
 * the need for nesting the components.
 *
 * @export
 * @class CaaFAggregator
 * @extends {React.Component<Props>}
 */
export default class CaaFAggregator extends React.Component<Props> {
    render() {
        const {caafs, children} = this.props;
        const provided = [];
        let i = 0;
        const buildProviders = (...args) => {
            if (i > 0) {
                if (args.length === 0) {
                    // We need to have something in the array so that consumers
                    // can correlate the provider definition with the values
                    // we give.
                    provided.push(undefined);
                } else if (args.length === 1) {
                    // We unpack the array to a single value.
                    // Is this bad? I don't think so.
                    // Consumers of the results should know if something is
                    // providing multiple values, and single values are the
                    // more common use case so we should make that the easiest.
                    provided.push(...args);
                } else {
                    // We have lots of args so let's push the argument array.
                    provided.push(args);
                }
            }
            if (i < caafs.length) {
                // For each provider, we tell it that its children is our little
                // function. This allows us to gather its CaaF arguments into
                // our array and then tell that provider that its child is the
                // next provider.
                const providerEl = React.createElement(caafs[i].type, {
                    ...caafs[i].props,
                    children: buildProviders,
                });
                i++;
                return providerEl;
            } else {
                // If we have made it through all the providers, we return the
                // result of the real children, given the now gathered provided
                // values (which are in the same order as the providers array
                // passed to the props, ensuring an intuitive ordering for
                // consumers).
                return children(provided);
            }
        };

        return buildProviders();
    }
}
