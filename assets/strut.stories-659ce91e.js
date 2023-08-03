import{a as e,j as o}from"./jsx-runtime-309e447d.js";import{V as i,l as f}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{S as d,C as V}from"./index-f641b98f.js";import{B as l}from"./button-b2794e32.js";import{S as r}from"./strut-c6011196.js";import{p as y}from"./package-156973aa.js";import{C as k}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const F={title:"Layout / Strut",component:r,parameters:{componentSubtitle:e(k,{name:y.name,version:y.version})},argTypes:{style:{control:{type:"object"}}}},u={render:m=>o(i,{style:t.row,children:[e(l,{children:"Hello, world!"}),e(r,{...m}),e(l,{color:"destructive",children:"Hello, world!"})]}),args:{size:d.xxxLarge_64,style:{}}},s=d.medium_16,c=d.xxxLarge_64,n={render:m=>o(i,{style:t.column,children:[o(i,{style:t.row,children:[e(l,{children:"Hello, world!"}),e(r,{size:s}),e(l,{color:"destructive",children:"Hello, world!"}),e(r,{size:c}),e(l,{color:"destructive",children:"Hello, world!"}),e(r,{size:s}),e(l,{children:"Hello, world!"})]}),o(i,{style:t.row,children:["Hello",e(r,{size:s}),"world!",e(r,{size:c}),"Hello",e(r,{size:s}),"world!"]})]})},a=()=>o(i,{style:t.column,children:[o(i,{style:t.row,children:[e(l,{children:"Hello, world!"}),e(r,{size:s,style:[t.strut,t.thick]}),e(l,{color:"destructive",children:"Hello, world!"}),e(r,{size:c,style:[t.strut,t.thick]}),e(l,{color:"destructive",children:"Hello, world!"}),e(r,{size:s,style:[t.strut,t.thick]}),e(l,{children:"Hello, world!"})]}),e(r,{size:c}),o(i,{style:t.row,children:["Hello",e(r,{size:s,style:[t.strut,t.thin]}),"remarkably",e(r,{size:c,style:[t.strut,t.thin]}),"wonderful",e(r,{size:s,style:[t.strut,t.thin]}),"world!"]})]});n.parameters={chromatic:{disableSnapshot:!0}};a.parameters={chromatic:{disableSnapshot:!0}};const t=f.StyleSheet.create({row:{flexDirection:"row"},column:{flexDirection:"column"},strut:{alignSelf:"center",backgroundColor:V.darkBlue},thin:{height:"4px"},thick:{height:"8px"}});var w,S,p;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut {...args} />
            <Button color="destructive">Hello, world!</Button>
        </View>,
  args: {
    size: Spacing.xxxLarge_64,
    style: {}
  }
}`,...(p=(S=u.parameters)==null?void 0:S.docs)==null?void 0:p.source}}};var z,h,g;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <View style={styles.column}>
            <View style={styles.row}>
                <Button>Hello, world!</Button>
                <Strut size={smallSize} />
                <Button color="destructive">Hello, world!</Button>
                <Strut size={largeSize} />
                <Button color="destructive">Hello, world!</Button>
                <Strut size={smallSize} />
                <Button>Hello, world!</Button>
            </View>
            <View style={styles.row}>
                Hello
                <Strut size={smallSize} />
                world!
                <Strut size={largeSize} />
                Hello
                <Strut size={smallSize} />
                world!
            </View>
        </View>
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var H,B,x;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`() => <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut size={smallSize} style={[styles.strut, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={largeSize} style={[styles.strut, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={smallSize} style={[styles.strut, styles.thick]} />
            <Button>Hello, world!</Button>
        </View>
        <Strut size={largeSize} />
        <View style={styles.row}>
            Hello
            <Strut size={smallSize} style={[styles.strut, styles.thin]} />
            remarkably
            <Strut size={largeSize} style={[styles.strut, styles.thin]} />
            wonderful
            <Strut size={smallSize} style={[styles.strut, styles.thin]} />
            world!
        </View>
    </View>`,...(x=(B=a.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};const G=["Default","Simple","WithStyle"];export{u as Default,n as Simple,a as WithStyle,G as __namedExportsOrder,F as default};
//# sourceMappingURL=strut.stories-659ce91e.js.map
