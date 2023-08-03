import{a as e,j as o}from"./jsx-runtime-309e447d.js";import{V as l,l as B}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{C as V}from"./index-f641b98f.js";import{B as s}from"./button-b2794e32.js";import{a as t,S as H}from"./strut-c6011196.js";import{p as a}from"./package-156973aa.js";import{C as v}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const q={title:"Layout / Spring",component:t,parameters:{componentSubtitle:e(v,{name:a.name,version:a.version})},argTypes:{style:{control:{type:"object"}}}},i={render:f=>o(l,{style:r.row,children:[e(s,{children:"Hello, world!"}),e(t,{...f}),e(s,{color:"destructive",children:"Hello, world!"})]})},c={render:()=>o(l,{style:r.column,children:[o(l,{style:r.row,children:[e(s,{children:"Hello, world!"}),e(t,{}),e(s,{color:"destructive",children:"Hello, world!"})]}),e(H,{size:16}),o(l,{style:r.row,children:["Hello",e(t,{}),"world!"]})]})},n=()=>o(l,{style:r.column,children:[o(l,{style:r.row,children:[e(s,{children:"Hello, world!"}),e(t,{style:[r.spring,r.thick]}),e(s,{color:"destructive",children:"Hello, world!"}),e(t,{style:[r.spring,r.thick]}),e(s,{children:"Hello, world!"})]}),e(H,{size:32}),o(l,{style:r.row,children:["Hello",e(t,{style:[r.spring,r.thin]}),"wonderful",e(t,{style:[r.spring,r.thin]}),"world!"]})]});n.parameters={docs:{description:{story:"`<Spring/>` can have a style."}}};const r=B.StyleSheet.create({row:{flexDirection:"row"},column:{flexDirection:"column"},spring:{alignSelf:"center",backgroundColor:V.darkBlue},thin:{height:"4px"},thick:{height:"8px"}});var p,d,m;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring {...args} />
            <Button color="destructive">Hello, world!</Button>
        </View>
}`,...(m=(d=i.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,w,y;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <View style={styles.column}>
            <View style={styles.row}>
                <Button>Hello, world!</Button>
                <Spring />
                <Button color="destructive">Hello, world!</Button>
            </View>
            <Strut size={16} />
            <View style={styles.row}>
                Hello
                <Spring />
                world!
            </View>
        </View>
}`,...(y=(w=c.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var g,h,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring style={[styles.spring, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Spring style={[styles.spring, styles.thick]} />
            <Button>Hello, world!</Button>
        </View>
        <Strut size={32} />
        <View style={styles.row}>
            Hello
            <Spring style={[styles.spring, styles.thin]} />
            wonderful
            <Spring style={[styles.spring, styles.thin]} />
            world!
        </View>
    </View>`,...(S=(h=n.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};const A=["Default","Simple","WithStyle"];export{i as Default,c as Simple,n as WithStyle,A as __namedExportsOrder,q as default};
//# sourceMappingURL=spring.stories-ce9644b4.js.map
