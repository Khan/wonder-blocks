import{a as e,j as C}from"./jsx-runtime-309e447d.js";import{B as w}from"./footnote-761d2bcc.js";import{W as l,V as t}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{p as R}from"./package-8a90d7b9.js";import{C as b}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";const G={title:"Core / WithSSRPlaceholder",component:l,parameters:{componentSubtitle:e(b,{name:R.name,version:R.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},chromatic:{disableSnapshot:!0}},args:{placeholder:()=>e(t,{children:"This gets rendered on server, and also on the client for the very first render (the rehydration render)"}),children:()=>e(t,{children:"This is rendered only by the client, for all renders after the rehydration render."})}},m={},h=()=>e(l,{placeholder:null,children:()=>e(t,{children:"This is rendered only by the client, while nothing was rendered on the server."})});h.parameters={docs:{description:{story:"This example shows how you can use a `null` placeholder to display nothing during server-side render."}}};const p=()=>{const o=[],c="nossr-example-2-results",s=r=>{const n=document.createElement("li");return n.appendChild(document.createTextNode(r)),n},a=r=>{const n=document.getElementById(c);if(n){for(let i=0;i<o.length;i++)n.append(s(o[i]));o.length=0,n.append(s(r))}else o.push(r)},d=r=>(a(r),r);return C(t,{children:[e(w,{children:"The list below should have three render entries; root placeholder, root children render, and child children render. If there are two child renders that means that the second forced render is still occurring for nested WithSSRPlaceholder components, which would be a bug."}),e("ul",{id:c}),e(w,{children:"And below this is the actual WithSSRPlaceholder nesting, which should just show the child render."}),e(l,{placeholder:()=>e(t,{children:d("Root: placeholder")}),children:()=>(a("Root: render"),e(l,{placeholder:()=>e(t,{children:d("Child: placeholder (should never see me)")}),children:()=>e(t,{children:d("Child: render")})}))})]})};p.parameters={docs:{description:{story:"Here, we nest two `WithSSRPlaceholder` components and use an array to track rendering, so that we can see how only the top level `WithSSRPlaceholder` component skips the initial render."}}};const u=()=>{const o=[],c="nossr-example-3-results",s=r=>{const n=document.createElement("li");return n.appendChild(document.createTextNode(r)),n},a=r=>{const n=document.getElementById(c);if(n){for(let i=0;i<o.length;i++)n.append(s(o[i]));o.length=0,n.append(s(r))}else o.push(r)},d=r=>(a(r),r);return C(t,{children:[e(w,{children:"The list below should have six render entries; 2 x root placeholder, 2 x root children render, and 2 x child children render."}),e("ul",{id:c}),e(w,{children:"And below this are the WithSSRPlaceholder component trees, which should just show their child renders."}),e(l,{placeholder:()=>e(t,{children:d("Root 1: placeholder")}),children:()=>(a("Root 1: render"),e(l,{placeholder:()=>e(t,{children:d("Child 1: placeholder (should never see me)")}),children:()=>e(t,{children:d("Child 1: render")})}))}),e(l,{placeholder:()=>e(t,{children:d("Root 2: placeholder")}),children:()=>(a("Root 2: render"),e(l,{placeholder:()=>e(t,{children:d("Child 2: placeholder (should never see me)")}),children:()=>e(t,{children:d("Child 2: render")})}))})]})};u.parameters={docs:{description:{story:"In this example, we have side-by-side `WithSSRPlaceholder` components. This demonstrates how component non-nested `WithSSRPlaceholder` components independently track the first render."}}};var S,g,y;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(y=(g=m.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var k,x,f;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`() => <WithSSRPlaceholder placeholder={null}>
        {() => <View>
                This is rendered only by the client, while nothing was rendered
                on the server.
            </View>}
    </WithSSRPlaceholder>`,...(f=(x=h.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var A,W,P;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`(): React.ReactElement => {
  const trackingArray: Array<string> = [];
  const resultsId = "nossr-example-2-results";
  const newLi = (text: string) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
  };
  const addTrackedRender = (text: string) => {
    const el = document.getElementById(resultsId);
    if (el) {
      for (let i = 0; i < trackingArray.length; i++) {
        el.append(newLi(trackingArray[i]));
      }
      trackingArray.length = 0;
      el.append(newLi(text));
    } else {
      // We may not have rendered the results element yet, so if we haven't
      // use an array to keep track of the things until we have.
      trackingArray.push(text);
    }
  };
  const trackAndRender = (text: string) => {
    addTrackedRender(text);
    return text;
  };
  return <View>
            <Body>
                The list below should have three render entries; root
                placeholder, root children render, and child children render. If
                there are two child renders that means that the second forced
                render is still occurring for nested WithSSRPlaceholder
                components, which would be a bug.
            </Body>
            <ul id={resultsId} />
            <Body>
                And below this is the actual WithSSRPlaceholder nesting, which
                should just show the child render.
            </Body>
            <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root: placeholder")}</View>}>
                {() => {
        addTrackedRender("Root: render");
        return <WithSSRPlaceholder placeholder={() => <View>
                                    {trackAndRender("Child: placeholder (should never see me)")}
                                </View>}>
                            {() => <View>{trackAndRender("Child: render")}</View>}
                        </WithSSRPlaceholder>;
      }}
            </WithSSRPlaceholder>
        </View>;
}`,...(P=(W=p.parameters)==null?void 0:W.docs)==null?void 0:P.source}}};var V,v,T;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`(): React.ReactElement => {
  const trackingArray: Array<string> = [];
  const resultsId = "nossr-example-3-results";
  const newLi = (text: string) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
  };
  const addTrackedRender = (text: string) => {
    const el = document.getElementById(resultsId);
    if (el) {
      for (let i = 0; i < trackingArray.length; i++) {
        el.append(newLi(trackingArray[i]));
      }
      trackingArray.length = 0;
      el.append(newLi(text));
    } else {
      // We may not have rendered the results element yet, so if we haven't
      // use an array to keep track of the things until we have.
      trackingArray.push(text);
    }
  };
  const trackAndRender = (text: string) => {
    addTrackedRender(text);
    return text;
  };
  return <View>
            <Body>
                The list below should have six render entries; 2 x root
                placeholder, 2 x root children render, and 2 x child children
                render.
            </Body>
            <ul id={resultsId} />
            <Body>
                And below this are the WithSSRPlaceholder component trees, which
                should just show their child renders.
            </Body>
            <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root 1: placeholder")}</View>}>
                {() => {
        addTrackedRender("Root 1: render");
        return <WithSSRPlaceholder placeholder={() => <View>
                                    {trackAndRender("Child 1: placeholder (should never see me)")}
                                </View>}>
                            {() => <View>{trackAndRender("Child 1: render")}</View>}
                        </WithSSRPlaceholder>;
      }}
            </WithSSRPlaceholder>
            <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root 2: placeholder")}</View>}>
                {() => {
        addTrackedRender("Root 2: render");
        return <WithSSRPlaceholder placeholder={() => <View>
                                    {trackAndRender("Child 2: placeholder (should never see me)")}
                                </View>}>
                            {() => <View>{trackAndRender("Child 2: render")}</View>}
                        </WithSSRPlaceholder>;
      }}
            </WithSSRPlaceholder>
        </View>;
}`,...(T=(v=u.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};const J=["Default","WithoutPlaceholder","NestedComponent","SideBySide"];export{m as Default,p as NestedComponent,u as SideBySide,h as WithoutPlaceholder,J as __namedExportsOrder,G as default};
//# sourceMappingURL=with-ssr-placeholder.stories-6a27f96e.js.map
