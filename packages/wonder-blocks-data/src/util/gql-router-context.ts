import * as React from "react";
import type {GqlRouterConfiguration} from "./gql-types";

export const GqlRouterContext: React.Context<
    GqlRouterConfiguration<any> | null | undefined
> = React.createContext<GqlRouterConfiguration<any> | null | undefined>(null);
