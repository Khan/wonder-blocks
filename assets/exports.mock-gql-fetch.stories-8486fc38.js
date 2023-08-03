import{M as c}from"./index-35e12253.js";import{a as t,j as n,F as h}from"./jsx-runtime-309e447d.js";import{u as i}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function r(o){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",ol:"ol",li:"li"},i(),o.components);return n(h,{children:[t(c,{title:"Testing / Mocking / Exports / mockGqlFetch()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"mockgqlfetch",children:"mockGqlFetch()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`mockGqlFetch(): GqlFetchMockFn;
`})}),`
`,n(e.p,{children:["The ",t(e.code,{children:"mockGqlFetch"})," function provides an API to easily mock GraphQL responses for use with the ",t(e.a,{href:"/docs/data-graphql--page",children:"Wonder Blocks Data GraphQL API"}),". It follows the similar patterns of ",t(e.code,{children:"jest.fn()"})," and jest mocks whereby the returned value is both a proxy for the fetch function that is used by ",t(e.a,{href:"/docs/data-exports-gqlrouter--page",children:t(e.code,{children:"GqlRouter"})})," as well as an API for modifying the behavior of that function."]}),`
`,t(e.h1,{id:"api",children:"API"}),`
`,n(e.p,{children:["Besides being a function that fits the ",t(e.a,{href:"/docs/data-types-gqlfetchfn--page",children:t(e.code,{children:"GqlFetchFn"})})," signature, the return value of ",t(e.code,{children:"mockGqlFetch()"})," has an API to customize the behavior of that function. Used in conjunction with the ",t(e.a,{href:"/docs/testing-mocking-exports-respondwith--page",children:t(e.code,{children:"RespondWith"})})," API, this can create a variety of GraphQL responses for testing and stories."]}),`
`,n(e.table,{children:[t(e.thead,{children:n(e.tr,{children:[t(e.th,{align:"none",children:"Function"}),t(e.th,{align:"none",children:"Purpose"})]})}),n(e.tbody,{children:[n(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"mockOperation"})}),t(e.td,{align:"none",children:"When called, any GraphQL operation that matches the defined mock operation will respond with the given response."})]}),n(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"mockOperationOnce"})}),t(e.td,{align:"none",children:"When called, the first GraphQL operation that matches the defined mock operation will respond with the given response. The mock is only used once."})]})]})]}),`
`,t(e.p,{children:"Both of these functions have the same signature:"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type GqlMockOperationFn = <
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
    TResponseData: GraphQLJson<TData>,
>(
    operation: GqlMockOperation<TData, TVariables, TContext>,
    response: MockResponse<TResponseData>,
) => GqlFetchMockFn;
`})}),`
`,t(e.h1,{id:"operation-matching",children:"Operation Matching"}),`
`,n(e.p,{children:["The ",t(e.code,{children:"matchOperation"})," parameter given to a ",t(e.code,{children:"mockOperation"})," or ",t(e.code,{children:"mockOperationOnce"})," function is a ",t(e.code,{children:"GqlMockOperation"})," defining the actual GraphQL operation to be matched by the mock. The variables and context of the mocked operation change how the mock is matched against requests."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type GqlMockOperation<
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
> = {|
    operation: GqlOperation<TData, TVariables>,
    variables?: TVariables,
    context?: TContext,
|};
`})}),`
`,n(e.ol,{children:[`
`,n(e.li,{children:["When ",t(e.code,{children:"matchOperation.operation"})," is present but ",t(e.code,{children:"matchOperation.variables"})," and ",t(e.code,{children:"matchOperation.context"}),` are not, the mock will match any request for the
same operation, regardless of variables or context on the request.`]}),`
`,n(e.li,{children:["When ",t(e.code,{children:"matchOperation.variables"})," is present but ",t(e.code,{children:"matchOperation.context"})," is not, the mock will match any request for the same operation with matching variables, regardless of context on the request."]}),`
`,n(e.li,{children:["When ",t(e.code,{children:"matchOperation.context"})," is present but ",t(e.code,{children:"matchOperation.variables"})," is not, the mock will match any request for the same operation with matching context, regardless of variables on the request."]}),`
`,n(e.li,{children:["When ",t(e.code,{children:"matchOperation.variables"})," and ",t(e.code,{children:"matchOperation.context"})," are present, the mock will match any request for the same operation with matching variables and context."]}),`
`]})]})}function s(o={}){const{wrapper:e}=Object.assign({},i(),o.components);return e?t(e,{...o,children:t(r,{...o})}):r(o)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const a={title:"Testing / Mocking / Exports / mockGqlFetch()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:s};const M=["__page"];export{M as __namedExportsOrder,l as __page,a as default};
//# sourceMappingURL=exports.mock-gql-fetch.stories-8486fc38.js.map
