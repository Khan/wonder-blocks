import{M as i}from"./index-35e12253.js";import"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{I as a}from"./gql-router-027fc1dc.js";import{a as t,j as r,F as d}from"./jsx-runtime-309e447d.js";import{u as c}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(n){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre"},c(),n.components);return r(d,{children:[t(i,{title:"Data / Exports / InterceptRequests",component:a,parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"interceptrequests",children:"InterceptRequests"}),`
`,r(e.p,{children:[`When you want to generate tests that check the loading state and
subsequent loaded state are working correctly for your uses of `,t(e.code,{children:"Data"}),` you can
use the `,t(e.code,{children:"InterceptRequests"}),` component. You can also use this component to
register request interceptors for any code that uses the `,t(e.code,{children:"useRequestInterception"}),`
hook.`]}),`
`,t(e.p,{children:"This component takes the children to be rendered, and an interceptor function."}),`
`,t(e.p,{children:`Note that this component is expected to be used only within test cases or
stories. Be careful want request IDs are matched to avoid intercepting the
wrong requests and remember that in-flight requests for a given request ID
can be shared - which means a bad request ID match could share requests across
different request IDs..`}),`
`,r(e.p,{children:["The ",t(e.code,{children:"interceptor"})," intercept function has the form:"]}),`
`,t(e.pre,{children:t(e.code,{className:"language-js",children:`(requestId: string) => ?Promise<TData>;
`})}),`
`,r(e.p,{children:["If this method returns ",t(e.code,{children:"null"}),`, then the next interceptor in the chain is
invoked, ultimately ending with the original handler. This
means that a request will be made for data via the handler assigned to the
`,t(e.code,{children:"Data"})," component being intercepted if no interceptor handles the request first."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-jsx",children:`import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptRequests, Data} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const myHandler = () => Promise.reject(new Error("You should not see this!"));

const interceptor = (requestId) =>
    requestId === "INTERCEPT_EXAMPLE"
        ? Promise.resolve("INTERCEPTED DATA!")
        : null;

<InterceptRequests interceptor={interceptor}>
    <View>
        <Body>This received intercepted data!</Body>
        <Data handler={myHandler} requestId="INTERCEPT_EXAMPLE">
            {(result) => {
                if (result.status !== "success") {
                    return "If you see this, the example is broken!";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
</InterceptRequests>;
`})})]})}function p(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,{...n,children:t(s,{...n})}):s(n)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const o={title:"Data / Exports / InterceptRequests",parameters:{chromatic:{disableSnapshot:!0}},component:a,tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:p};const j=["__page"];export{j as __namedExportsOrder,h as __page,o as default};
//# sourceMappingURL=exports.intercept-requests.stories-0725c226.js.map
