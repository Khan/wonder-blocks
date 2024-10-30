import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

/**
 * The props that can be passed to a styled component. Removes the `style` prop
 * from the original component and replaces with the Aphrodite style object.
 */
type StyledProps<
    T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
> = {
    className?: string;
    style?: StyleType;
    children?: React.ReactNode;
} & Omit<React.ComponentProps<T>, "style">;

/**
 * This type only exists to be mapped in NamedStyledTag.
 * An object with a key, `Styled`, and the value is the styled component.
 * There may be a way to accomplish this without an intermediate type, but
 * this was the simplest way to get it working.
 */
interface StyledTag<T extends keyof JSX.IntrinsicElements> {
    Styled: ReturnType<typeof addStyle<T, StyledProps<T>>>;
}

/**
 * A mapped type that appends the tag name to the keys in StyledTag. Since
 * there is only one key in StyledTag, the key will be `Styled${Tag}`. For
 * example, if Tag is "div", the key will be `StyledDiv`. The value is the
 * styled component.
 */
type NamedStyledTag<Tag extends string & keyof JSX.IntrinsicElements> = {
    [Property in keyof StyledTag<Tag> as `${Property}${Capitalize<Tag>}`]: StyledTag<Tag>[Property];
};

/**
 * Creates a styled component with the given tag name.
 * @param tag The tag name of the native element.
 * @param defaultStyle Optional. The default style to apply to the component.
 * @returns An object with a single key, `Styled${tag}`, which is the styled component.
 */
export const makeStyled = <Tag extends string & keyof JSX.IntrinsicElements>(
    tag: Tag,
    defaultStyle?: StyleType,
) =>
    ({
        [`Styled${tag.charAt(0).toUpperCase()}${tag.slice(1)}`]: addStyle(
            tag,
            defaultStyle,
        ),
    } as NamedStyledTag<Tag>);

/**
 * If you are decorating a native element, use `makeStyled` instead.
 */
export default function addStyle<
    // We extend `React.ComponentType<any>` to support `addStyle(Link)` with
    // react-router's `Link` component.
    T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
    Props extends StyledProps<T>,
>(
    Component: T,
    defaultStyle?: StyleType,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Props> &
        React.RefAttributes<
            // We need to lookup the HTML/SVG element type based on the tag name, but only
            // for JSX intrinsics (aka HTML/SVG tags).
            T extends keyof JSX.IntrinsicElements ? IntrinsicElementsMap[T] : T
        >
> {
    return React.forwardRef<
        // We need to lookup the HTML/SVG element type based on the tag name, but only
        // for JSX intrinsics (aka HTML/SVG tags).
        T extends keyof JSX.IntrinsicElements ? IntrinsicElementsMap[T] : T,
        Props
    >((props, ref) => {
        // eslint-disable-next-line react/prop-types
        const {className, style, ...otherProps} = props;
        const reset =
            typeof Component === "string" ? overrides[Component] : null;

        const {className: aphroditeClassName, style: inlineStyles} =
            processStyleList([reset, defaultStyle, style]);

        return (
            // @ts-expect-error: TS says this is not assignable to the return forwardRef()'s return type.
            // Type 'Omit<PropsWithChildren<Props>, "style" | "className"> & { ref: ForwardedRef<ElementMap[T]>; className: string; style: CSSProperties; }' is not assignable to type 'IntrinsicAttributes & LibraryManagedAttributes<T, SVGProps<SVGSymbolElement> & ClassAttributes<HTMLObjectElement> & ... 179 more ... & SVGProps<...>>'.
            //   Type 'Omit<PropsWithChildren<Props>, "style" | "className"> & { ref: ForwardedRef<ElementMap[T]>; className: string; style: CSSProperties; }' is not assignable to type 'LibraryManagedAttributes<T, SVGProps<SVGSymbolElement> & ClassAttributes<HTMLObjectElement> & ObjectHTMLAttributes<HTMLObjectElement> & ... 178 more ... & SVGProps<...>>'
            <Component
                {...otherProps}
                ref={ref}
                className={[aphroditeClassName, className]
                    .filter(Boolean)
                    .join(" ")}
                style={inlineStyles}
            />
        );
    });
}

/**
 * These are necessary to override various custom styles that browsers add so that
 * elements have consistent styles across all browsers.  Only add styles here if
 * they appear in https://github.com/necolas/normalize.css/blob/master/normalize.css.
 */
const overrides = StyleSheet.create({
    button: {
        margin: 0, // Safari adds 2px left/right margins
        "::-moz-focus-inner": {
            border: 0, // Firefox adds an inner focus ring around text
        },
    },
});

// This mapping is based on `ReactHTML` and `ReactSVG` interfaces in the type definitions
// for React.  This is used to determine the HTML/SVG element type from the tag string.
type IntrinsicElementsMap = {
    // HTML
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    area: HTMLAreaElement;
    article: HTMLElement;
    aside: HTMLElement;
    audio: HTMLAudioElement;
    b: HTMLElement;
    base: HTMLBaseElement;
    bdi: HTMLElement;
    bdo: HTMLElement;
    big: HTMLElement;
    blockquote: HTMLElement;
    body: HTMLBodyElement;
    br: HTMLBRElement;
    button: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    caption: HTMLElement;
    cite: HTMLElement;
    code: HTMLElement;
    col: HTMLTableColElement;
    colgroup: HTMLTableColElement;
    data: HTMLDataElement;
    datalist: HTMLDataListElement;
    dd: HTMLElement;
    del: HTMLElement;
    details: HTMLElement;
    dfn: HTMLElement;
    dialog: HTMLDialogElement;
    div: HTMLDivElement;
    dl: HTMLDListElement;
    dt: HTMLElement;
    em: HTMLElement;
    embed: HTMLEmbedElement;
    fieldset: HTMLFieldSetElement;
    figcaption: HTMLElement;
    figure: HTMLElement;
    footer: HTMLElement;
    form: HTMLFormElement;
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    head: HTMLHeadElement;
    header: HTMLElement;
    hgroup: HTMLElement;
    hr: HTMLHRElement;
    html: HTMLHtmlElement;
    i: HTMLElement;
    iframe: HTMLIFrameElement;
    img: HTMLImageElement;
    input: HTMLInputElement;
    ins: HTMLModElement;
    kbd: HTMLElement;
    keygen: HTMLElement;
    label: HTMLLabelElement;
    legend: HTMLLegendElement;
    li: HTMLLIElement;
    link: HTMLLinkElement;
    main: HTMLElement;
    map: HTMLMapElement;
    mark: HTMLElement;
    menu: HTMLElement;
    menuitem: HTMLElement;
    meta: HTMLMetaElement;
    meter: HTMLElement;
    nav: HTMLElement;
    noindex: HTMLElement;
    noscript: HTMLElement;
    object: HTMLObjectElement;
    ol: HTMLOListElement;
    optgroup: HTMLOptGroupElement;
    option: HTMLOptionElement;
    output: HTMLElement;
    p: HTMLParagraphElement;
    param: HTMLParamElement;
    picture: HTMLElement;
    pre: HTMLPreElement;
    progress: HTMLProgressElement;
    q: HTMLQuoteElement;
    rp: HTMLElement;
    rt: HTMLElement;
    ruby: HTMLElement;
    s: HTMLElement;
    samp: HTMLElement;
    slot: HTMLSlotElement;
    script: HTMLScriptElement;
    section: HTMLElement;
    select: HTMLSelectElement;
    small: HTMLElement;
    source: HTMLSourceElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    style: HTMLStyleElement;
    sub: HTMLElement;
    summary: HTMLElement;
    sup: HTMLElement;
    table: HTMLTableElement;
    template: HTMLTemplateElement;
    tbody: HTMLTableSectionElement;
    td: HTMLElement; // HTMLTableDataCellElement;
    textarea: HTMLTextAreaElement;
    tfoot: HTMLTableSectionElement;
    th: HTMLElement; // HTMLTableHeaderCellElement;
    thead: HTMLTableSectionElement;
    time: HTMLElement;
    title: HTMLTitleElement;
    tr: HTMLTableRowElement;
    track: HTMLTrackElement;
    u: HTMLElement;
    ul: HTMLUListElement;
    var: HTMLElement;
    video: HTMLVideoElement;
    wbr: HTMLElement;
    webview: HTMLElement; // HTMLWebViewElement;

    // SVG
    svg: SVGSVGElement;

    animate: SVGElement; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGElement;
    animateTransform: SVGElement; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGCircleElement;
    clipPath: SVGClipPathElement;
    defs: SVGDefsElement;
    desc: SVGDescElement;
    ellipse: SVGEllipseElement;
    feBlend: SVGFEBlendElement;
    feColorMatrix: SVGFEColorMatrixElement;
    feComponentTransfer: SVGFEComponentTransferElement;
    feComposite: SVGFECompositeElement;
    feConvolveMatrix: SVGFEConvolveMatrixElement;
    feDiffuseLighting: SVGFEDiffuseLightingElement;
    feDisplacementMap: SVGFEDisplacementMapElement;
    feDistantLight: SVGFEDistantLightElement;
    feDropShadow: SVGFEDropShadowElement;
    feFlood: SVGFEFloodElement;
    feFuncA: SVGFEFuncAElement;
    feFuncB: SVGFEFuncBElement;
    feFuncG: SVGFEFuncGElement;
    feFuncR: SVGFEFuncRElement;
    feGaussianBlur: SVGFEGaussianBlurElement;
    feImage: SVGFEImageElement;
    feMerge: SVGFEMergeElement;
    feMergeNode: SVGFEMergeNodeElement;
    feMorphology: SVGFEMorphologyElement;
    feOffset: SVGFEOffsetElement;
    fePointLight: SVGFEPointLightElement;
    feSpecularLighting: SVGFESpecularLightingElement;
    feSpotLight: SVGFESpotLightElement;
    feTile: SVGFETileElement;
    feTurbulence: SVGFETurbulenceElement;
    filter: SVGFilterElement;
    foreignObject: SVGForeignObjectElement;
    g: SVGGElement;
    image: SVGImageElement;
    line: SVGLineElement;
    linearGradient: SVGLinearGradientElement;
    marker: SVGMarkerElement;
    mask: SVGMaskElement;
    metadata: SVGMetadataElement;
    mpath: SVGElement;
    path: SVGPathElement;
    pattern: SVGPatternElement;
    polygon: SVGPolygonElement;
    polyline: SVGPolylineElement;
    radialGradient: SVGRadialGradientElement;
    rect: SVGRectElement;
    stop: SVGStopElement;
    switch: SVGSwitchElement;
    symbol: SVGSymbolElement;
    text: SVGTextElement;
    textPath: SVGTextPathElement;
    tspan: SVGTSpanElement;
    use: SVGUseElement;
    view: SVGViewElement;
};
