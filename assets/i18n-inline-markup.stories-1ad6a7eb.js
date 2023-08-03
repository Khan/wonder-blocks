import{a as o,j as g}from"./jsx-runtime-309e447d.js";import{r as h}from"./index-9f32f44c.js";import{C as k}from"./index-f641b98f.js";import{I as v}from"./icon-a4f17d53.js";import{i as V}from"./icon-assets-a0b49981.js";import{T as $,a as j}from"./tooltip-f80a1c8a.js";import{c as y}from"./footnote-761d2bcc.js";import"./_commonjsHelpers-de833af9.js";import"./render-state-root-891c0d56.js";import"./index-9c2d1831.js";import"./one-pane-dialog-da34165b.js";import"./with-action-scheduler-7e779422.js";import"./strut-c6011196.js";import"./icon-button-297fafd1.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";const W={a:"áàăắặâấåäãąā",A:"ÁÀĂẮẶÂẤÅÄÃĄĀ",b:"ƀḃḅ",B:"ɃḂḄ",c:"ćĉčç",C:"ĆĈČÇ",d:"ďđḑ",D:"ĎĐḐ",e:"éèêềěëėęē",E:"ÉÈÊỀĚËĖĘĒ",f:"ḟ",F:"Ḟ",g:"ĝǧģ",G:"ĜǦĢ",h:"ĥȟħḥ",H:"ĤȞĦḤ",i:"íìîïįī",I:"ÎÏÍÌĮĪ",j:"ĵ",J:"Ĵ",k:"ķḱ",K:"ĶḰ",l:"ĺľłļḷ",L:"ĹĽŁĻḶ",m:"ḿṁṃm̃",M:"ḾṀṂM̃",n:"ńňñņŋ",N:"ŃŇÑŅŊ",o:"óòôöőõȯȱøōỏ",O:"ÓÒÔÖŐÕȮȰØŌỏ",p:"ṕṗᵽ",P:"ṔṖⱣ",q:"ʠ",Q:"Ɋ",r:"ŕřŗ",R:"ŔŘŖ",s:"śŝšș",S:"ŚŜŠŞ",t:"ťț",T:"ŤŢ",u:"úùŭûůüųűūư",U:"ÚÙŬÛŮÜŲŰŪƯ",v:"ṽṿ",V:"ṼṾ",w:"ẃẁŵẅ",W:"ẂẀŴẄ",y:"ý",Y:"Ý",x:"ẍẋ",X:"ẌẊ",z:"źžż",Z:"ŹŽŻ"},D=new RegExp(`[${Object.keys(W).join("")}]`,"g");class G{constructor(n=1){if(this.translate=i=>{if(!i)return"";const c={},u=a=>{const l=c[a]||0;return c[a]=l+1,l};return i.replace(D,a=>{const l=W[a],r=u(a);return l[r%l.length].repeat(this._scaleFactor)})},n<1)throw new Error("Scaling factor must be 1 or greater.");this._scaleFactor=n}}const I="□",P=/\w/g;class U{translate(n){return n?n.startsWith("&")?I:n.replace(P,I):""}}let X="en";const q=()=>X,z={boxes:new U,accents:new G(2)};class B{constructor(){this.translate=n=>this._parseAndTranslate(n)}get _translator(){return z[q()]}_translateSegment(n){const i=/((http[s]?|ftp):\/\/)?([\w-]+\.)([\w-.]+)((\/[\w-]+)*)?\/?(#[\w-]*)?(\?[\w-]+(=[\w%"']+)?(&[\w-]+(=[\w%"']+)?)*)?/g,c=/%\([\w]+\)s/g,u=new RegExp(`${i.source}|${c.source}`,"g"),a=s=>this._translator.translate(s),l=[];let r=0,t=u.exec(n);for(;t!==null;)t.index!==r&&l.push(a(n.substring(r,t.index))),l.push(t[0]),r=t.index+t[0].length,t=u.exec(n);return r<n.length&&l.push(a(n.substring(r))),l.join("")}_parseAndTranslate(n){if(!this._translator||n==null)return n;const c=(r=>{const t=document.createElement("template");return t.innerHTML=r,t})(n),u=r=>{for(const t of r.childNodes)if(t.nodeType===Node.TEXT_NODE){const s=this._translateSegment(t.textContent);if(s!=null){const d=document.createTextNode(s);r.replaceChild(d,t)}}else switch(t.nodeName){case"CODE":case"PRE":break;default:u(t);break}};u(c.content);const a=document.createElement("template");return c.innerHTML.replace(/&(\w+);/g,r=>(a.innerHTML=r,a.content.textContent))}}const{translate:J}=new B,K=/%\(([\w_]+)\)s/g,Q=(e,n,i)=>{typeof e=="object"&&e.messages&&(e=e.messages[0]);const c=i(e);return n==null?c:c.replace(K,(u,a)=>{const l=n[a];return l!=null?String(l):u})},_=(e,n)=>Q(e,n,J);function Y(e){const n=/(<([^>^/]+)\s*\/>)|(<([^>]+)>([^<]*)<(\/?)([^>]+)>)|([^<]+)/gm;e=e.trim();const t=[];let s;for(;s=n.exec(e);)if(s[2]!=null){const d=s[2].trim();if(d.includes(" "))throw new Error(`I18nInlineMarkup: expected a tag without attributes, but received: <${d}/>`);t.push({type:"tag",tag:d,children:null})}else if(s[4]!=null){const d=s[4].trim();if(d.includes(" "))throw new Error(`I18nInlineMarkup: expected a tag without attributes, but received: <${s[4]}>`);if(s[6]!=="/")throw new Error(`I18nInlineMarkup: nested tags are not supported, but <${s[7]}> is nested underneath <${d}>.`);const O=s[7].trim();if(d!==O)throw new Error(`I18nInlineMarkup: expected closing tag </${s[4]}>, but got </${s[7]}>`);t.push({type:"tag",tag:d,children:s[5]})}else if(s[8]!=null)t.push({type:"text",text:s[8]});else throw new Error("I18nInlineMarkup: unknown error (maybe you have an extra '<')?");return t.length===1&&(t[0].type==="text"||!t[0].children)&&console.warn("Unnecessary use of I18nInlineMarkup."),t}class p extends h.PureComponent{handleError(n){const{onError:i}=this.props;if(i)return i(n);throw n}render(){const{children:n,elementWrapper:i,...c}=this.props,u=c;let a;try{a=Y(n)}catch(r){return this.handleError(r)}return a.map((r,t)=>{if(r.type==="text")return i?o(h.Fragment,{children:i(r.text,"text",t)},t):r.text;if(r.type==="tag"){const s=u[r.tag];return s?i?o(h.Fragment,{children:i(s(r.children),r.tag,t)},t):o(h.Fragment,{children:s(r.children)},t):this.handleError(new Error(`I18nInlineMarkup: missing render prop for ${r.tag}`))}return this.handleError(new Error("Unknown child type."))})}}try{p.displayName="I18nInlineMarkup",p.__docgenInfo={description:"",displayName:"I18nInlineMarkup",props:{children:{defaultValue:null,description:`A translated string.

TODO(joshuan): if we ever add a type for translated strings, replace
"string" with that type.`,name:"children",required:!1,type:{name:"string & ReactNode"}},elementWrapper:{defaultValue:null,description:`A function which takes each top-level text or rendered tag,
and returns an element that wraps it.

\`type\` is "text" if the element is text, and a pseudotag, like
"newline", or "cirlced-box" otherwise.

We use this on the LOHP and marketing pages to provide a
background around text when they are on top of an illustration.

i is the index of the text or tag.`,name:"elementWrapper",required:!1,type:{name:"((elem: ReactNode, type: string, i: number) => ReactNode)"}},onError:{defaultValue:null,description:"",name:"onError",required:!1,type:{name:"((e: Error) => ReactNode)"}}}}}catch{}const fe={title:"Translations/I18nInlineMarkup",component:p,parameters:{chromatic:{disableSnapshot:!0}}},E={render:()=>o(p,{u:e=>g(h.Fragment,{children:["[Underline:",o("u",{children:e}),"]"]}),children:_("-6°C, Sunny, Fells like: <u>-12</u>, Wind: VR 5 km/h")})},f={render:()=>o(p,{u:e=>g(h.Fragment,{children:["__",o("u",{children:e}),"__"]}),i:e=>g("span",{style:{background:"lightblue"},children:["*",o("i",{style:{fontStyle:"italic"},children:e}),"*"]}),children:_("-6°C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h")})},w={render:()=>o(p,{elementWrapper:e=>o("span",{style:{background:"yellow"},children:e}),u:e=>g("span",{style:{background:"red"},children:["__",o("u",{children:e}),"__"]}),i:e=>g("span",{style:{background:"lightblue"},children:["*",o("i",{style:{fontStyle:"italic"},children:e}),"*"]}),children:_("-6°C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h")})},m={render:()=>o(p,{settings:e=>o(y,{href:"/settings#child-accounts",children:e}),onError:e=>o($,{content:o(j,{children:o(y,{style:{color:k.red},children:e.message})}),children:o(v,{size:"small",icon:V,color:k.red})}),children:_("This HTML is broken <invalid>invalid> innner </invalid>, but here is fine.")})};m.parameters={docs:{description:{story:"This story shows how to handle translation errors. The `onError` prop is called when there is an error parsing the translation. In this example, we're using a tooltip to show the error message."}}};var b,M,x;E.parameters={...E.parameters,docs:{...(b=E.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    return <I18nInlineMarkup u={(t: string) => <React.Fragment>
                        [Underline:<u>{t}</u>]
                    </React.Fragment>}>
                {i18n._("-6\\u00b0C, Sunny, Fells like: <u>-12</u>, Wind: VR 5 km/h")}
            </I18nInlineMarkup>;
  }
}`,...(x=(M=E.parameters)==null?void 0:M.docs)==null?void 0:x.source}}};var S,T,N;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    return <I18nInlineMarkup u={(t: string) => <React.Fragment>
                        __<u>{t}</u>__
                    </React.Fragment>} i={(t: string) => <span style={{
      background: "lightblue"
    }}>
                        *<i style={{
        fontStyle: "italic"
      }}>{t}</i>*
                    </span>}>
                {i18n._("-6\\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h")}
            </I18nInlineMarkup>;
  }
}`,...(N=(T=f.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var L,C,R;w.parameters={...w.parameters,docs:{...(L=w.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    return <I18nInlineMarkup elementWrapper={elem => <span style={{
      background: "yellow"
    }}>{elem}</span>} u={(t: string) => <span style={{
      background: "red"
    }}>
                        __<u>{t}</u>__
                    </span>} i={(t: string) => <span style={{
      background: "lightblue"
    }}>
                        *<i style={{
        fontStyle: "italic"
      }}>{t}</i>*
                    </span>}>
                {i18n._("-6\\u00b0C, <u>Sunny</u>, Fells <i>like</i>: <u>-12</u>,  Wind: VR 5 km/h")}
            </I18nInlineMarkup>;
  }
}`,...(R=(C=w.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var F,A,H;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    return <I18nInlineMarkup settings={(label: string) =>
    // @ts-expect-error(FEI-5000): No overload matches this call.
    <LabelMedium href="/settings#child-accounts">
                        {label}
                    </LabelMedium>} onError={error => <Tooltip content={<TooltipContent>
                                <LabelMedium style={{
        color: Color.red
      }}>
                                    {error.message}
                                </LabelMedium>
                            </TooltipContent>}>
                        <Icon size="small" icon={icons.incorrect} color={Color.red} />
                    </Tooltip>}>
                {i18n._("This HTML is broken \\u003cinvalid\\u003einvalid\\u003e innner \\u003c/invalid\\u003e, but here is fine.")}
            </I18nInlineMarkup>;
  }
}`,...(H=(A=m.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};const we=["SingleShallowSubstitution","MultipleShallowSubstitution","ElementWrapper","HandlingTranslationErrors"];export{w as ElementWrapper,m as HandlingTranslationErrors,f as MultipleShallowSubstitution,E as SingleShallowSubstitution,we as __namedExportsOrder,fe as default};
//# sourceMappingURL=i18n-inline-markup.stories-1ad6a7eb.js.map
