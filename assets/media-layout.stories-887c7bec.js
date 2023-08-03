import{a as o,j as S}from"./jsx-runtime-309e447d.js";import{V as m,l as t}from"./render-state-root-891c0d56.js";import{C as e,S as n}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{B as H,H as V,b as q}from"./footnote-761d2bcc.js";import{M as c,b as v}from"./strut-c6011196.js";import{C as D}from"./component-info-cedbe096.js";import{p as h}from"./package-156973aa.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";const Q={title:"Layout / MediaLayout (Deprecated)",component:c,parameters:{componentSubtitle:o(D,{name:h.name,version:h.version})}},l={render:r=>o(c,{...r,children:({mediaSize:u,mediaSpec:p,styles:a})=>o(m,{style:a.test,children:"Hello, world!"})}),args:{styleSheets:{large:t.StyleSheet.create({test:{backgroundColor:e.darkBlue,color:e.white}}),medium:t.StyleSheet.create({test:{backgroundColor:e.blue,color:e.white}}),small:t.StyleSheet.create({test:{backgroundColor:e.lightBlue,color:e.white}})}}};l.parameters={chromatic:{disableSnapshot:!0}};const s=()=>{const r={large:t.StyleSheet.create({test:{backgroundColor:e.darkBlue,color:e.white}}),medium:t.StyleSheet.create({test:{backgroundColor:e.blue,color:e.white}}),small:t.StyleSheet.create({test:{backgroundColor:e.lightBlue,color:e.white}})};return o(c,{styleSheets:r,children:({mediaSize:u,mediaSpec:p,styles:a})=>o(m,{style:a.test,children:"Hello, world!"})})};s.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`You can switch styles for different screen sizes.
        By default, MediaLayout uses \`MEDIA_DEFAULT_SPEC\`. Here you can
        see an example that changes styles depending on the current spec.
        It's dark blue for a large window size, blue for a medium window
        size, and light blue for a small window size.`}}};const i=()=>{const r={all:t.StyleSheet.create({test:{color:e.white,padding:n.medium_16}}),large:t.StyleSheet.create({test:{backgroundColor:e.darkBlue,padding:n.xxLarge_48}}),medium:t.StyleSheet.create({test:{backgroundColor:e.blue}}),small:t.StyleSheet.create({test:{backgroundColor:e.lightBlue}})};return o(c,{styleSheets:r,children:({styles:u})=>o(m,{style:u.test,children:"Hello, world!"})})};i.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`You can define a shared style for all sizes.
            You can use the \`all\` key to define styles for all the
            different sizes. This means that by using this key, all
            the sizes (small, medium, large) will use the styles defined
            in \`all\`, and in case there are duplicate properties,
            more specific sizes will take more importance.`}}};const d=()=>{const r={large:t.StyleSheet.create({example:{alignItems:"center",backgroundColor:e.darkBlue,color:e.white,padding:n.xxxLarge_64}}),small:t.StyleSheet.create({example:{backgroundColor:e.lightBlue,padding:n.small_12}})},p={ssrSize:"large",mediaSpec:{small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:n.medium_16,marginWidth:n.medium_16},large:{query:"(min-width: 768px)",totalColumns:12,gutterWidth:n.xLarge_32,marginWidth:n.xxLarge_48}}};return o(v.Provider,{value:p,children:o(c,{styleSheets:r,children:({mediaSize:a,styles:z})=>{const E=a==="small"?V:q;return S(m,{style:z.example,children:[S(E,{children:["Current mediaSpec: ",a]}),o(H,{tag:"p",children:`Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.`})]})}})})};d.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"You can use a custom spec.\n        There are cases when you might need to use a custom media query spec.\n        For that situation you can define your own custom `MEDIA_SPEC`.\n        You need to use the `MediaLayoutContext.Provider` to specify this\n        spec value.\n        **NOTE**: Make sure to import the `MediaSpec` and\n        `MediaLayoutContextValue` type definitions."}}};var g,y,C;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <MediaLayout {...args}>
            {({
      mediaSize,
      mediaSpec,
      styles
    }) => {
      return <View style={styles.test}>Hello, world!</View>;
    }}
        </MediaLayout>,
  args: {
    styleSheets: {
      large: StyleSheet.create({
        test: {
          backgroundColor: Color.darkBlue,
          color: Color.white
        }
      }),
      medium: StyleSheet.create({
        test: {
          backgroundColor: Color.blue,
          color: Color.white
        }
      }),
      small: StyleSheet.create({
        test: {
          backgroundColor: Color.lightBlue,
          color: Color.white
        }
      })
    }
  }
}`,...(C=(y=l.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var x,w,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const styleSheets = ({
    large: StyleSheet.create({
      test: {
        backgroundColor: Color.darkBlue,
        color: Color.white
      }
    }),
    medium: StyleSheet.create({
      test: {
        backgroundColor: Color.blue,
        color: Color.white
      }
    }),
    small: StyleSheet.create({
      test: {
        backgroundColor: Color.lightBlue,
        color: Color.white
      }
    })
  } as const);
  return <MediaLayout styleSheets={styleSheets}>
            {({
      mediaSize,
      mediaSpec,
      styles
    }) => {
      return <View style={styles.test}>Hello, world!</View>;
    }}
        </MediaLayout>;
}`,...(b=(w=s.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var k,f,L;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const styleSheets = ({
    all: StyleSheet.create({
      // use shared styles for all sizes
      test: {
        color: Color.white,
        padding: Spacing.medium_16
      }
    }),
    large: StyleSheet.create({
      // override the \`padding\` prop\` here
      test: {
        backgroundColor: Color.darkBlue,
        padding: Spacing.xxLarge_48
      }
    }),
    medium: StyleSheet.create({
      test: {
        backgroundColor: Color.blue
      }
    }),
    small: StyleSheet.create({
      test: {
        backgroundColor: Color.lightBlue
      }
    })
  } as const);
  return <MediaLayout styleSheets={styleSheets}>
            {({
      styles
    }) => {
      return <View style={styles.test}>Hello, world!</View>;
    }}
        </MediaLayout>;
}`,...(L=(f=i.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var M,_,B;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const styleSheets = ({
    large: StyleSheet.create({
      example: {
        alignItems: "center",
        backgroundColor: Color.darkBlue,
        color: Color.white,
        padding: Spacing.xxxLarge_64
      }
    }),
    small: StyleSheet.create({
      example: {
        backgroundColor: Color.lightBlue,
        padding: Spacing.small_12
      }
    })
  } as const);

  // Custom media spec definition
  const MEDIA_CUSTOM_SPEC: MediaSpec = {
    small: {
      query: "(max-width: 767px)",
      totalColumns: 4,
      gutterWidth: Spacing.medium_16,
      marginWidth: Spacing.medium_16
    },
    large: {
      query: "(min-width: 768px)",
      totalColumns: 12,
      gutterWidth: Spacing.xLarge_32,
      marginWidth: Spacing.xxLarge_48
    }
  };
  const contextValue: MediaLayoutContextValue = {
    ssrSize: "large",
    mediaSpec: MEDIA_CUSTOM_SPEC
  };
  return <MediaLayoutContext.Provider value={contextValue}>
            <MediaLayout styleSheets={styleSheets}>
                {({
        mediaSize,
        styles
      }) => {
        const HeadingComponent = mediaSize === "small" ? HeadingSmall : HeadingLarge;
        return <View style={styles.example}>
                            <HeadingComponent>
                                Current mediaSpec: {mediaSize}
                            </HeadingComponent>
                            <Body tag="p">
                                {\`Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.\`}
                            </Body>
                        </View>;
      }}
            </MediaLayout>
        </MediaLayoutContext.Provider>;
}`,...(B=(_=d.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};const R=["Default","ScreenSizeStyles","AllStyles","CustomSpec"];export{i as AllStyles,d as CustomSpec,l as Default,s as ScreenSizeStyles,R as __namedExportsOrder,Q as default};
//# sourceMappingURL=media-layout.stories-887c7bec.js.map
