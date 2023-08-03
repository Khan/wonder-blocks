import{a as x}from"./jsx-runtime-309e447d.js";import{r as p}from"./index-9f32f44c.js";import"./render-state-root-891c0d56.js";let j=!1;const b={isServerSide:()=>j,setServerSide:()=>{j=!0}};var y=i=>i==null||typeof i!="object"?i:Array.isArray(i)?i.map(y):Object.keys(i).reduce((e,n)=>(e[n]=y(i[n]),e),{}),A=Object.freeze({Unknown:"Unknown",Internal:"Internal",InvalidInput:"InvalidInput",InvalidUse:"InvalidUse",NotFound:"NotFound",NotAllowed:"NotAllowed",Unauthorized:"Unauthorized",NotImplemented:"NotImplemented"});function u(i,e,n){return(e=function(t){var r=function(s,a){if(typeof s!="object"||s===null)return s;var o=s[Symbol.toPrimitive];if(o!==void 0){var c=o.call(s,a||"default");if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(s)}(t,"string");return typeof r=="symbol"?r:String(r)}(e))in i?Object.defineProperty(i,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[e]=n,i}class m{constructor(e,n,t){u(this,"_name",void 0),u(this,"_message",void 0),u(this,"_stackFrames",void 0),this._name=e,this._message=n,this._stackFrames=[...t]}get message(){return this._message}get name(){return this._name}get messageWithName(){return"".concat(this.name,": ").concat(this.message)}get stack(){return[...this._stackFrames]}get standardizedStack(){return"".concat(this.messageWithName,`
`).concat(this._stackFrames.join(`
`))}static fromConsequenceAndCause(e,n){for(var t,r=[],s=n.stack,a=(t=e==null?void 0:e.stack)!==null&&t!==void 0?t:[],o=s.length-1,c=a.length-1;o>=0&&c>=0&&s[o]===a[c];)r.unshift(s[o]),o--,c--;for(;o>=0;o--)r.unshift(s[o]);for(;c>=0;c--)r.unshift(a[c]);return new m(e.name,((f,h)=>{var l=g=>(g==null?void 0:g.trim())||"(empty message)",k=l(f);return h==null?k:"".concat(k,`
	caused by
		`).concat(l(h))})(e.message,n.messageWithName),r)}static normalize(e){var n,t,r,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,o=(n=e.message.toString().split(`
`).find(l=>l.trim().length))!==null&&n!==void 0?n:"(empty message)",c=e.toString(),f=((t=e.stack)!==null&&t!==void 0&&t.startsWith(c)&&e.stack!==c?e.stack.substring(c.length):(r=e.stack)!==null&&r!==void 0?r:"").split(`
`).filter(l=>l.trim().length),h=f.length>=s+a?s:0;return new m(e.name,o,f.slice(h))}static from(e){var n,t,r=e.toString(),s=((n=e.stack)!==null&&n!==void 0&&n.startsWith(r)&&e.stack!==r?e.stack.substring(r.length):(t=e.stack)!==null&&t!==void 0?t:"").split(`
`).filter(a=>a.trim().length);return new m(e.name,e.message,s)}}class U extends Error{constructor(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A.Unknown,{cause:t,prefix:r,name:s,metadata:a,stripStackFrames:o,minimumFrameCount:c,compositeStack:f}=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Object.freeze({});super(e),u(this,"kind",void 0),u(this,"originalMessage",void 0),u(this,"originalStack",void 0),u(this,"metadata",void 0),u(this,"cause",void 0),this.originalMessage=e,this.metadata=(g=>{if(g==null)return g;var T=y(g);return Object.freeze(T)})(a),this.name="".concat(r??"").concat(n).concat(s??"","Error"),this.kind=n,this.originalStack=this.stack,this.cause=t;var h=m.normalize(this,o??0,c??1);if(delete this.stack,this.stack=h.standardizedStack,t!=null){var l=m.from(t),k=m.fromConsequenceAndCause(h,l);this.message=k.message,f===!0&&(this.stack=k.standardizedStack)}}}const _=Object.freeze({Unknown:"Unknown",Internal:"Internal",InvalidInput:"InvalidInput",Network:"Network",NotAllowed:"NotAllowed",Parse:"Parse",Hydrated:"Hydrated"});class v extends U{constructor(e,n,{metadata:t,cause:r}={}){super(e,n,{metadata:t,cause:r,name:"Data"})}}class G{constructor(e={}){this._cache=e}get inUse(){return Object.keys(this._cache).length>0}set(e,n,t){if(!n||typeof n!="string")throw new v("id must be non-empty string",_.InvalidInput);if(!e||typeof e!="string")throw new v("scope must be non-empty string",_.InvalidInput);if(typeof t=="function")throw new v("value must be a non-function value",_.InvalidInput);this._cache[e]=this._cache[e]??{},this._cache[e][n]=t}get(e,n){var t;return((t=this._cache[e])==null?void 0:t[n])??null}purge(e,n){var t;(t=this._cache[e])!=null&&t[n]&&(delete this._cache[e][n],Object.keys(this._cache[e]).length===0&&delete this._cache[e])}purgeScope(e,n){if(this._cache[e]){if(n==null){delete this._cache[e];return}for(const t of Object.keys(this._cache[e]))n(t,this._cache[e][t])&&delete this._cache[e][t];Object.keys(this._cache[e]).length===0&&delete this._cache[e]}}purgeAll(e){if(e==null){this._cache={};return}for(const n of Object.keys(this._cache))this.purgeScope(n,(t,r)=>e(n,t,r))}}class w extends G{constructor(e={}){try{super(y(e))}catch(n){throw new v(`An error occurred trying to initialize from a response cache snapshot: ${n}`,_.InvalidInput)}}set(e,n,t){super.set(e,n,Object.freeze(y(t)))}clone(){try{return y(this._cache)}catch(e){throw new v("An error occurred while trying to clone the cache",_.Internal,{cause:e})}}}const d="default";let q;class R{constructor(e=null,n=null){this.initialize=t=>{if(this._hydrationCache.inUse)throw new Error("Cannot initialize data response cache more than once");this._hydrationCache=new w({[d]:t})},this.cacheData=(t,r,s)=>this._setCachedResponse(t,{data:r},s),this.cacheError=(t,r,s)=>{const a=typeof r=="string"?r:r.message;return this._setCachedResponse(t,{error:a},s)},this.getEntry=t=>{const s=(b.isServerSide()?this._ssrOnlyCache.get(d,t):null)??this._hydrationCache.get(d,t);return!b.isServerSide()&&s!=null&&this._hydrationCache.purge(d,t),s},this.purgeData=t=>{const r=t?(s,a,o)=>t(a,o):void 0;this._hydrationCache.purgeAll(r),this._ssrOnlyCache.purgeAll(r)},this.cloneHydratableData=()=>this._hydrationCache.clone()[d]??{},this._ssrOnlyCache=n||new w,this._hydrationCache=e||new w}static get Default(){return q||(q=new R),q}_setCachedResponse(e,n,t){const r=Object.freeze(n);return b.isServerSide()&&(t?this._hydrationCache.set(d,e,r):this._ssrOnlyCache.set(d,e,r)),r}}let C;class N{constructor(){this._requests={},this.fulfill=(e,{handler:n,hydrate:t=!0})=>{const r=this._requests[e];if(r)return r;const s=n().then(a=>({status:"success",data:a})).catch(a=>{const o=typeof a=="string"?new v("Request failed",_.Unknown,{metadata:{unexpectedError:a}}):a;return o.name==="AbortError"?{status:"aborted"}:{status:"error",error:o}}).finally(()=>{delete this._requests[e]});return this._requests[e]=s,s},this.abort=e=>{delete this._requests[e]},this.abortAll=()=>{Object.keys(this._requests).forEach(e=>this.abort(e))}}static get Default(){return C||(C=new N),C}}const z=p.createContext(null);z.displayName="TrackerContext";let I;class D{constructor(e=void 0){this._trackedRequests={},this.trackDataRequest=(n,t,r)=>{this._trackedRequests[n]==null&&(this._trackedRequests[n]={handler:t,hydrate:r})},this.reset=()=>{this._trackedRequests={}},this.fulfillTrackedRequests=()=>{const n=[],{cacheData:t,cacheError:r}=this._responseCache;for(const s of Object.keys(this._trackedRequests)){const a=this._trackedRequests[s];try{n.push(this._requestFulfillment.fulfill(s,{...a}).then(o=>{switch(o.status){case"success":t(s,o.data,a.hydrate);break;case"error":r(s,o.error,a.hydrate);break}}))}catch(o){n.push(Promise.resolve(r(s,o,a.hydrate)))}}return this.reset(),Promise.all(n).then(()=>this._responseCache.cloneHydratableData())},this._responseCache=e||R.Default,this._requestFulfillment=new N}static get Default(){return I||(I=new D),I}get hasUnfulfilledRequests(){return Object.keys(this._trackedRequests).length>0}}class W extends p.Component{render(){if(!b.isServerSide())throw new Error("This component is not for use during client-side rendering");return x(z.Provider,{value:D.Default.trackDataRequest,children:this.props.children})}}try{trackdata.displayName="trackdata",trackdata.__docgenInfo={description:"Component to enable data request tracking when server-side rendering.",displayName:"trackdata",props:{}}}catch{}const S=p.createContext([]);S.displayName="InterceptContext";const V=({interceptor:i,children:e})=>{const n=p.useContext(S),t=p.useMemo(()=>[...n,i],[n,i]);return x(S.Provider,{value:t,children:e})};try{interceptrequests.displayName="interceptrequests",interceptrequests.__docgenInfo={description:`This component provides a mechanism to intercept data requests.
This is for use in testing.

This component is not recommended for use in production code as it
can prevent predictable functioning of the Wonder Blocks Data framework.
One possible side-effect is that inflight requests from the interceptor could
be picked up by \`Data\` component requests from outside the children of this
component.

Interceptions within the same component tree are chained such that the
interceptor closest to the intercepted request is called first, and the
furthest interceptor is called last.`,displayName:"interceptrequests",props:{interceptor:{defaultValue:null,description:`Called to intercept and possibly handle the request.
If this returns null, the request will be handled by ancestor
any ancestor interceptors, and ultimately, the original request
handler, otherwise, this interceptor is handling the request.

Interceptors are called in ancestor precedence, with the closest
interceptor ancestor being called first, and the furthest ancestor
being called last.

Beware: Interceptors do not care about what data they are intercepting,
so make sure to only intercept requests that you recognize from the
identifier.`,name:"interceptor",required:!0,type:{name:"(requestId: string) => Promise<TData> | null | undefined"}},children:{defaultValue:null,description:"The children to render within this component. Any requests by `Data`\ncomponents that use same ID as this component will be intercepted.\nIf `InterceptRequests` is used within `children`, that interception will\nbe given a chance to intercept first.",name:"children",required:!0,type:{name:"ReactNode"}}}}}catch{}const E=p.createContext(null);E.displayName="GqlRouterContext";const O=({defaultContext:i,fetch:e,children:n})=>{const t=p.useMemo(()=>({fetch:e,defaultContext:i}),[i,e]);return x(E.Provider,{value:t,children:n})};try{O.displayName="GqlRouter",O.__docgenInfo={description:`Configure GraphQL routing for GraphQL hooks and components.

These can be nested. Components and hooks relying on the GraphQL routing
will use the configuration from their closest ancestral GqlRouter.`,displayName:"GqlRouter",props:{defaultContext:{defaultValue:null,description:"The default context to be used by operations when no context is provided.",name:"defaultContext",required:!0,type:{name:"GqlContext"}},fetch:{defaultValue:null,description:"The function to use when fetching requests.",name:"fetch",required:!0,type:{name:"GqlFetchFn<any, any, TContext>"}},children:{defaultValue:null,description:"The children to be rendered inside the router.",name:"children",required:!0,type:{name:"ReactNode"}}}}}catch{}export{v as D,O as G,V as I,N as R,G as S,W as T,_ as a,S as b,R as c,z as d,b as e};
//# sourceMappingURL=gql-router-027fc1dc.js.map
