import * as React from "react";
import type {GqlRouterConfiguration} from "./gql-types";

const GqlRouterContext: React.Context<
    GqlRouterConfiguration<any> | null | undefined
> = React.createContext<GqlRouterConfiguration<any> | null | undefined>(null);
GqlRouterContext.displayName = "GqlRouterContext";

export {GqlRouterContext};
