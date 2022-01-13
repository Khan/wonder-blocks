// @flow
/**
 * A GraphQL operation.
 */
export type GqlOperation<
    TType: "mutation" | "query",
    // TData is not used to define a field on this type, but it is used
    // to ensure that calls using this operation will properly return the
    // correct data type.
    // eslint-disable-next-line no-unused-vars
    TData,
    // TVariables is not used to define a field on this type, but it is used
    // to ensure that calls using this operation will properly consume the
    // correct variables type.
    // eslint-disable-next-line no-unused-vars
    TVariables: {...} = Empty,
> = {|
    type: TType,
    id: string,
|};

/**
 * A GraphQL query definition.
 */
export type GqlQuery<TData, TVariables: {...} = Empty> = GqlOperation<
    "query",
    TData,
    TVariables,
>;

/**
 * A GraphQL mutation definition.
 */
export type GqlMutation<TData, TVariables: {...} = Empty> = GqlOperation<
    "mutation",
    TData,
    TVariables,
>;

/**
 * These types allow us to add the __typename field to all depths of an object.
 */
type RecursiveAddTypename<O: Object> = $ObjMap<O, typeof addTypename>;
type RecursiveAddTypenameObj<O: Object> = {|
    ...RecursiveAddTypename<O>,
    __typename: string,
|};

// We need to use multiple dispatch within flow for this to work so we have to
// redeclare the same method in a few different ways.
/* eslint-disable no-redeclare */
declare function addTypename<I, O, F: (I) => O>(F): F;
declare function addTypename<A: Array<Object>>(
    A,
): Array<RecursiveAddTypename<A[number]>>;
declare function addTypename<I: string | boolean | number | void | null>(I): I;
declare function addTypename<I: Array<string> | Array<boolean> | Array<number>>(
    I,
): Array<I[number]>;
declare function addTypename<O: Object>(O): RecursiveAddTypenameObj<O>;
/* eslint-enable no-redeclare */

/**
 * Add the required __typename field to all depths of the object type.
 * This is for use with TData types and as such, does not add it to the root
 * level.
 */
export type DataWithTypename<O: Object> = RecursiveAddTypename<O>;

export type GqlContext = {|
    [key: string]: string,
|};

/**
 * Functions that make fetches.
 * Supports `fetch` and similar methods.
 */
export type FetchFn = <TRequestOptions: RequestOptions = RequestOptions>(
    url: string,
    options?: TRequestOptions,
) => Promise<Response>;

/**
 * Functions that details of a GQL request and generate the URL.
 */
export type GetURLForOperation = <
    TVariables: {...},
    TContext: GqlContext,
    TType,
>(
    operation: GqlOperation<TType>,
    variables: ?TVariables,
    context: TContext,
) => URL;

/**
 * The configuration stored in the GqlRouterContext context.
 */
export type GqlRouterConfiguration<TContext: GqlContext> = {|
    fetch: FetchFn,
    getURLForOperation: GetURLForOperation,
    defaultContext: TContext,
|};
