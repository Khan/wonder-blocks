// @flow
import * as React from "react";
import type {GqlRouterConfiguration} from "./gql-types";

export const GqlRouterContext: React.Context<?GqlRouterConfiguration<any>> =
    React.createContext<?GqlRouterConfiguration<any>>(null);
