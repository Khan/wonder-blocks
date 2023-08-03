import{M as i}from"./index-35e12253.js";import{a as n,j as s,F as l}from"./jsx-runtime-309e447d.js";import{u as r}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(t){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},r(),t.components);return s(l,{children:[n(i,{title:"Testing / Mocking / Exports / RespondWith",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"respondwith",children:"RespondWith"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`interface RespondWith {
    /**
     * Rejects with an AbortError to simulate an aborted request.
     */
    abortedRequest: (signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * A non-200 status code with empty text body.
     * Equivalent to calling \`ResponseWith.text("", statusCode)\`.
     */
    errorStatusCode: (
        statusCode: number,
        signal: ?SettleSignal = null,
    ) => MockResponse<any>;

    /**
     * Response with GraphQL data JSON body and status code 200.
     */
    graphQLData: <TData: {...}>(
        data: TData,
        signal: ?SettleSignal = null,
    ) => MockResponse<GraphQLJson<TData>>;

    /**
     * Response that is a GraphQL errors response with status code 200.
     */
    graphQLErrors: (
        errorMessages: $ReadOnlyArray<string>,
        signal: ?SettleSignal = null,
    ) => MockResponse<any>;

    /**
     * Response with JSON body and status code 200.
     */
    json: <TJson: {...}>(
        json: TJson,
        signal: ?SettleSignal = null,
    ): MockResponse<TJson>;

    /**
     * Response body that is valid JSON but not a valid GraphQL response.
     */
    nonGraphQLBody: (signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * Rejects with the given error.
     */
    reject: (error: Error, signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * Response with text body and status code.
     * Status code defaults to 200.
     */
    text: <TData = string>(
        text: string,
        statusCode: number = 200,
        signal: ?SettleSignal = null,
    ) => MockResponse<TData>;

    /**
     * Response with body that will not parse as JSON and status code 200.
     */
    unparseableBody: (signal: ?SettleSignal = null) => MockResponse<any>;
});
`})}),`
`,s(e.p,{children:["The ",n(e.code,{children:"RespondWith"}),` object is a helper for defining mock responses to use with
mock request methods such as `,n(e.a,{href:"/docs/testing-mocking-exports-mockgqlfetch--page",children:n(e.code,{children:"mockGqlFetch"})}),"."]}),`
`,s(e.p,{children:["Each call takes an optional ",n(e.code,{children:"signal"})," that can be used to control when the promise generated from the call resolves. See ",n(e.a,{href:"/docs/testing-mocking-exports-settlecontroller--page",children:n(e.code,{children:"SettleController"})})," for related information."]})]})}function c(t={}){const{wrapper:e}=Object.assign({},r(),t.components);return e?n(e,{...t,children:n(a,{...t})}):a(t)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const o={title:"Testing / Mocking / Exports / RespondWith",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:c};const D=["__page"];export{D as __namedExportsOrder,p as __page,o as default};
//# sourceMappingURL=exports.respond-with.stories-5998a55a.js.map
