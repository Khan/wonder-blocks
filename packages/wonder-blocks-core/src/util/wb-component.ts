/**
 * The name of the DOM attribute that Wonder Blocks components set on their
 * root element to identify themselves (e.g. `data-wb-component="Button"`).
 *
 * The attribute is always rendered (including in production builds) so that
 * tooling (e.g. page inspectors or browser extensions) can find Wonder Blocks
 * components in the rendered DOM without reading React internals.
 *
 * NOTE: This attribute is meant for tooling only. It should not be used for
 * styling or as a test selector.
 */
export const WB_COMPONENT_ATTRIBUTE = "data-wb-component";

/**
 * Props used by Wonder Blocks components that can be rendered as the root of
 * another public Wonder Blocks component.
 *
 * When a public component renders another public component as its root
 * element (e.g. `Heading` renders `Text`), the outer component passes its own
 * name down using this prop so that the outermost component's name is the one
 * that ends up in the DOM.
 */
export type WBComponentProps = {
    /**
     * The name of the outermost public Wonder Blocks component that renders
     * this element. Set internally by Wonder Blocks components.
     * @ignore
     */
    [WB_COMPONENT_ATTRIBUTE]?: string;
};

/**
 * Returns the `data-wb-component` attribute to spread onto the root element
 * of a Wonder Blocks component.
 *
 * If an outer Wonder Blocks component passed its own name down (via the
 * `data-wb-component` prop), that name wins. Otherwise, `name` is used.
 *
 * @param name The public export name of the component (e.g. `"Button"`).
 * @param props The props received by the component, which might include a
 * `data-wb-component` value passed down by an outer Wonder Blocks component.
 * @returns An object with the `data-wb-component` attribute.
 *
 * @example
 * ```tsx
 * <div {...getWBComponentProps("Heading", props)} />
 * ```
 */
export function getWBComponentProps(
    name: string,
    props?: WBComponentProps | null,
): Required<WBComponentProps> {
    return {
        [WB_COMPONENT_ATTRIBUTE]: props?.[WB_COMPONENT_ATTRIBUTE] || name,
    };
}
