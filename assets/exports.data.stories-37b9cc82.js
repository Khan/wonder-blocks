import{M as z}from"./index-35e12253.js";import"./render-state-root-891c0d56.js";import{r as c}from"./index-9f32f44c.js";import{D as k,a as C,S as U,b as L,c as P,d as X,e as $,R as V}from"./gql-router-027fc1dc.js";import{a as n,j as y,F as G}from"./jsx-runtime-309e447d.js";import{u as j}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";const J=()=>{const[,t]=c.useState({});return c.useCallback(()=>{t({})},[])},h={CacheBeforeNetwork:"CacheBeforeNetwork",CacheAndNetwork:"CacheAndNetwork",CacheOnly:"CacheOnly",NetworkOnly:"NetworkOnly"},N=new U,q=(t,e,r)=>{if(!t||typeof t!="string")throw new k("id must be a non-empty string",C.InvalidInput);if(!e||typeof e!="string")throw new k("scope must be a non-empty string",C.InvalidInput);const o=c.useCallback(a=>a==null?N.purge(e,t):N.set(e,t,a),[t,e]);let s=N.get(e,t);if(s==null&&r!==void 0){const a=typeof r=="function"?r():r;a!=null&&(o(a),s=a)}return[s,o]},K=Object.freeze({status:"loading"}),Q=Object.freeze({status:"aborted"}),w=Object.freeze({loading:()=>K,aborted:()=>Q,success:t=>({status:"success",data:t}),error:t=>({status:"error",error:t})}),Y=t=>{if(t==null)return null;const{data:e,error:r}=t;return r!=null?w.error(new k(r,C.Hydrated)):e!=null?w.success(e):w.aborted()},T=(t,e)=>{const r=c.useContext(L);return c.useCallback(()=>r.reduceRight((a,i)=>a??i(t),null)??e(),[e,r,t])},Z=(t,e,r={})=>{const{hydrate:o=!0,skip:s=!1}=r,a=T(t,e),i=P.Default.getEntry(t),l=c.useContext(X);return!s&&i==null&&$.isServerSide()&&(l==null||l(t,a,o)),i==null?null:Y(i)},ee="useCachedEffect",te=(t,e,r={})=>{const{fetchPolicy:o=h.CacheBeforeNetwork,skip:s=!1,retainResultOnChange:a=!1,onResultChanged:i,scope:l=ee}=r,d=T(t,e),[p,g]=q(t,l),v=J(),f=c.useRef(),u=c.useRef(),R=c.useMemo(()=>{var O;return(O=u.current)==null||O.cancel(),u.current=null,f.current=null,()=>{var A,I;if(o===h.CacheOnly)throw new k("Cannot fetch with CacheOnly policy",C.NotAllowed);const S=V.Default.fulfill(`${t}|${l}`,{handler:d});if(S===((A=u.current)==null?void 0:A.request))return;f.current=null,(I=u.current)==null||I.cancel();let M=!1;S.then(x=>{u.current=null,!M&&(g(x),f.current=x,i!=null?i(x):v())}),u.current={requestId:t,request:S,cancel(){M=!0,V.Default.abort(t)}}}},[t,i,v,g,o]),E=c.useMemo(()=>{if(s)return!1;switch(o){case h.CacheOnly:return!1;case h.CacheBeforeNetwork:return p==null;case h.CacheAndNetwork:case h.NetworkOnly:return f.current==null}},[p,o,s]);c.useEffect(()=>{if(E)return R(),()=>{var D;(D=u.current)==null||D.cancel(),u.current=null}},[E,R]);const B=c.useRef(w.loading()),F=a?B.current:w.loading(),H=(o===h.NetworkOnly?f.current:p)??F;return B.current=H,[H,R]},m={DoNotHydrate:"DoNotHydrate",ExecuteWhenNoResult:"ExecuteWhenNoResult",ExecuteWhenNoSuccessResult:"ExecuteWhenNoSuccessResult",AlwaysExecute:"AlwaysExecute"},ne="useHydratableEffect",re=(t,e,r={})=>{const{clientBehavior:o=m.ExecuteWhenNoSuccessResult,skip:s=!1,retainResultOnChange:a=!1,onResultChanged:i,scope:l=ne}=r,d=Z(t,e,{hydrate:o!==m.DoNotHydrate,skip:s}),p=c.useCallback(()=>{switch(o){case m.DoNotHydrate:case m.AlwaysExecute:return null;case m.ExecuteWhenNoResult:return d;case m.ExecuteWhenNoSuccessResult:return(d==null?void 0:d.status)==="success"?d:null}},[d]);q(t,l,p);const[g]=te(t,e,{skip:s,onResultChanged:i,retainResultOnChange:a,scope:l,fetchPolicy:h.CacheBeforeNetwork});return d??g},_=({requestId:t,handler:e,children:r,retainResultOnChange:o=!1,clientBehavior:s=m.ExecuteWhenNoSuccessResult})=>{const a=re(t,e,{retainResultOnChange:o,clientBehavior:s});return r(a)};function W(t){const e=Object.assign({h1:"h1",p:"p",code:"code",h4:"h4",h5:"h5",h6:"h6",pre:"pre"},j(),t.components);return y(G,{children:[n(z,{title:"Data / Exports / Data",component:_,parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"data",children:"Data"}),`
`,y(e.p,{children:["The ",n(e.code,{children:"Data"}),` component is the frontend piece of our data architecture.
It describes a data requirement in terms of a handler and an identifier.
It also has props to govern hydrate behavior as well as loading and client-side
request behavior.`]}),`
`,n(e.p,{children:"The handler is responsible for fulfilling the request when asked to do so."}),`
`,n(e.h4,{id:"server-side-rendering-and-hydration",children:"Server-side Rendering and Hydration"}),`
`,n(e.p,{children:`The Wonder Blocks Data framework uses an in-memory cache for supporting
server-side rendering (SSR) and hydration.`}),`
`,n(e.h5,{id:"server-side-behavior",children:"Server-side behavior"}),`
`,n(e.h6,{id:"cache-miss",children:"Cache miss"}),`
`,y(e.p,{children:["When the ",n(e.code,{children:"Data"}),` component does not get data or an error from the cache and it
is rendering server-side, it tells our request tracking that it wants data, and
it renders in its `,n(e.code,{children:"loading"}),` state. It will always render in this state if there
is no cached response.`]}),`
`,n(e.h6,{id:"cache-hit",children:"Cache hit"}),`
`,y(e.p,{children:["When the ",n(e.code,{children:"Data"}),` component gets data or an error from the cache and it is
rendering server-side, it will render as loaded, with that data or error,
as it would client-side. In this situation, it does not track the request it
would have made, as it already has the data and doesn't need to.`]}),`
`,n(e.h5,{id:"client-side-behavior",children:"Client-side behavior"}),`
`,n(e.h6,{id:"cache-miss-1",children:"Cache miss"}),`
`,n(e.p,{children:`When the hydration cache does not contain the data, the data will be requested.
While the request is pending, the data is rendered in the loading state.
In this example, we use a 3 second delayed promise to simulate the request.
We start out without any data and so the request is made. Upon receipt of that
data or an error, we re-render.`}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {Data} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const myValidHandler = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve("I'm DATA from a request"), 3000),
    );

const myInvalidHandler = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => reject("I'm an ERROR from a request"), 3000),
    );

<View>
    <View>
        <Body>This request will succeed and give us data!</Body>
        <Data handler={myValidHandler} requestId="VALID">
            {(result) => {
                if (result.status === "loading") {
                    return "Loading...";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
    <Strut size={Spacing.small_12} />
    <View>
        <Body>This request will go boom and give us an error!</Body>
        <Data handler={myInvalidHandler} requestId="INVALID">
            {(result) => {
                if (result.status === "loading") {
                    return "Loading...";
                }

                return (
                    <BodyMonospace style={{color: Color.red}}>
                        ERROR: {result.error}
                    </BodyMonospace>
                );
            }}
        </Data>
    </View>
</View>;
`})}),`
`,n(e.h6,{id:"cache-hit-1",children:"Cache hit"}),`
`,y(e.p,{children:[`If the hydration cache already contains data or an error for our request, then
the `,n(e.code,{children:"Data"}),` component will render it immediately. The hydration cache is
populated using the `,n(e.code,{children:"initializeHydrationCache"})," method before rendering."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {Data, initializeHydrationCache} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const myHandler = () => {
    throw new Error(
        "If you're seeing this error, the examples are broken and data isn't in the cache that should be.",
    );
};

initializeHydrationCache({
    DATA: {
        data: "I'm DATA from the hydration cache",
    },
});

<View>
    <View>
        <Body>This cache has data!</Body>
        <Data handler={myHandler} requestId="DATA">
            {(result) => {
                if (result.status !== "success") {
                    return "If you see this, the example is broken!";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
</View>;
`})})]})}function ae(t={}){const{wrapper:e}=Object.assign({},j(),t.components);return e?n(e,{...t,children:n(W,{...t})}):W(t)}const oe=()=>{throw new Error("Docs-only story")};oe.parameters={docsOnly:!0};const b={title:"Data / Exports / Data",parameters:{chromatic:{disableSnapshot:!0}},component:_,tags:["stories-mdx"],includeStories:["__page"]};b.parameters=b.parameters||{};b.parameters.docs={...b.parameters.docs||{},page:ae};const Se=["__page"];export{Se as __namedExportsOrder,oe as __page,b as default};
//# sourceMappingURL=exports.data.stories-37b9cc82.js.map
