import{M as i}from"./index-35e12253.js";import{a as t,j as n,F as c}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(o){const e=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",a:"a",pre:"pre"},a(),o.components);return n(c,{children:[t(i,{title:"Data / Testing",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"testing-support",children:"Testing Support"}),`
`,t(e.p,{children:"Wonder Blocks Data has been designed to support testing in a variety of environments including jest and storybook. In order to support the various ways in which folks need to test their code, we have considered a number of approaches to testing Wonder Blocks Data."}),`
`,t(e.h2,{id:"spies",children:"Spies"}),`
`,n(e.p,{children:["If you are writing unit tests, you may just want to spy on the methods you are calling using ",t(e.code,{children:"jest.spyOn"})," or similar. This can be a really easy way to intercept the request handler passed to the ",t(e.a,{href:"/docs/data-exports-usecachedeffect--page",children:t(e.code,{children:"useCachedEffect"})})," hook, for example, and check that it is the handler you expect."]}),`
`,t(e.h2,{id:"interceptors",children:"Interceptors"}),`
`,n(e.p,{children:["Each request used by Wonder Blocks Data has to have an identifier. The ",t(e.a,{href:"/docs/data-exports-interceptrequests--page",children:t(e.code,{children:"InterceptRequests"})})," component allows you to wrap the code under test with an interceptor. Interceptors are given the request identifier and get to choose, based off that identifier, if they want to provide their own response rather than let the original request handler deal with it."]}),`
`,n(e.p,{children:["Multiple interceptors can be registered by nesting the ",t(e.a,{href:"/docs/data-exports-interceptrequests--page",children:t(e.code,{children:"InterceptRequests"})})," component as is necessary. Registered interceptors are invoked in ancestral order, with the nearest ancestor to the intercepted request being invoked first."]}),`
`,n(e.p,{children:["When hooks like ",t(e.a,{href:"/docs/data-exports-useservereffect--page",children:t(e.code,{children:"useServerEffect"})}),", ",t(e.a,{href:"/docs/data-exports-usecachedeffect--page",children:t(e.code,{children:"useCachedEffect"})}),", or ",t(e.a,{href:"/docs/data-exports-usehydratedeffect--page",children:t(e.code,{children:"useHydratedEffect"})})," run, they get the chain of registered interceptors and chain those with the original handler in order to determine what to actually do when executing the request."]}),`
`,t(e.p,{children:"This allows you to mock out requests in unit tests, stories, and other scenarios."}),`
`,t(e.h2,{id:"gqlrouter-mockgqlfetch-and-respondwith",children:"GqlRouter, mockGqlFetch, and RespondWith"}),`
`,n(e.p,{children:["If you are testing GraphQL operations, you can configure ",t(e.a,{href:"/docs/data-exports-gqlrouter--page",children:t(e.code,{children:"GqlRouter"})})," with your own function for the ",t(e.code,{children:"fetch"}),` prop. However, crafting the right response to give
the result you want is a bit tricky.`]}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`const myFakeGqlFetch = (
    operation: GqlOperation<TData, TVariables>,
    variables: ?TVariables,
    context: TContext,
): Promise<Response> {
    if (operation.id === "myQuery" && variables?.someVar === 5) {
        return Promise.resolve({
            status: 200,
            text: () =>
                Promise.resolve(
                    JSON.stringify({
                        data: {
                            myQuery: {
                                someField: "someValue",
                            },
                        },
                    }),
                ),
        });
    }

    return Promise.resolve({
        status: 404,
        text: () => Promise.resolve(JSON.stringify({})),
    });
}

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>
`})}),`
`,n(e.p,{children:["As shown above, you can interrogate parts of the requested operation to decide how to respond. However, this can get cumbersome if you have GraphQL requests nested in more complex components as each test has to mock out suitable responses for each one. To help with this the Wonder Blocks Testing package provides a ",t(e.a,{href:"/docs/testing-exports-respondwith--page",children:t(e.code,{children:"RespondWith"})})," type for defining responses that fit a specific scenario, and the ",t(e.a,{href:"/docs/testing-exports-mockgqlfetch--page",children:t(e.code,{children:"mockGqlFetch()"})})," API."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`const myFakeGqlFetch = mockGqlFetch().mockOperationOnce(
    {
        operation: MyQueryOperation,
        variables: {
            someVar: 5,
        },
    },
    RespondWith.success({
        data: {
            myQuery: {
                someField: "someValue",
            },
        },
    }),
);

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>;
`})}),`
`,t(e.p,{children:`In the above example, we now only mock our specific operation once. If something
tries to request this data a second time, it will give an error instead. Not only that, but with a little refactoring, we can create a helper to set this mock up that others can call if they need to mock our operation for their own tests.`}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`const mockMyQuery = (mockGqlFetchFn: GqlFetchMockFn): GqlFetchMockFn =>
    mockGqlFetchFn().mockOperationOnce(
        {
            operation: MyQueryOperation,
            variables: {
                someVar: 5,
            },
        },
        RespondWith.success({
            data: {
                myQuery: {
                    someField: "someValue",
                },
            },
        }),
    );

const myFakeGqlFetch = mockMyQuery(mockGqlFetch());

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>;
`})}),`
`,n(e.p,{children:["Now, using a compose function, multiple mocks can be setup on the same ",t(e.code,{children:"mockGqlFetch"})," instance."]}),`
`,n(e.p,{children:["For more details on this and other testing utilities, see the ",t(e.a,{href:"/docs/testing-overview--page",children:"Wonder Blocks Testing documentation"}),"."]})]})}function h(o={}){const{wrapper:e}=Object.assign({},a(),o.components);return e?t(e,{...o,children:t(s,{...o})}):s(o)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const r={title:"Data / Testing",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:h};const T=["__page"];export{T as __namedExportsOrder,d as __page,r as default};
//# sourceMappingURL=_overview_testing_.stories-bad23ee8.js.map
