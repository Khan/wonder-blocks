import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StoryObj} from "@storybook/react-vite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {
    buttonComponents,
    feedbackComponents,
    floatingComponents,
    inputComponents,
    layoutBlocksComponents,
    navigationAndMenuComponents,
    overlayComponents,
    typographyAndIconsComponents,
} from "./components-config";
import {CatalogComponentInfo, ComponentList} from "./catalog-component-info";

export default {
    title: "Catalog",
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            // Catalog is for manual review. Individual components should have
            // coverage with their own stories
            disableSnapshot: true,
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Ignoring color contrast violations at this level, this
                        // is covered at the component level
                        id: "color-contrast",
                        enabled: false,
                    },
                    {
                        // Ignore unique landmark violation since structures are
                        // often reused to show variants / props combinations
                        id: "landmark-unique",
                        enabled: false,
                    },
                    {
                        // Ignore aria-valid-attr-value violations at this level,
                        // this is covered at the component level
                        id: "aria-valid-attr-value",
                        enabled: false,
                    },
                    {
                        // Ignore label violations at this level,
                        // this is covered at the component level
                        id: "label",
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export const TypographyAndIcons = {
    render: ComponentList,
    args: {components: typographyAndIconsComponents},
};

export const Buttons = {
    render: ComponentList,
    args: {components: buttonComponents},
};

export const Inputs = {
    render: ComponentList,
    args: {components: inputComponents},
};

export const Feedback = {
    render: ComponentList,
    args: {components: feedbackComponents},
};

export const NavigationAndMenus = {
    render: ComponentList,
    args: {components: navigationAndMenuComponents},
};

export const LayoutBlocks = {
    render: ComponentList,
    args: {components: layoutBlocksComponents},
};

export const Overlays: StoryObj = {
    render: function Render(_args, {globals}) {
        return (
            <View style={styles.allComponents} key={globals.theme}>
                {overlayComponents.map((component) => (
                    <View key={component.name}>
                        <Heading
                            tag="h2"
                            size="large"
                            weight="bold"
                            style={styles.componentHeading}
                        >
                            {component.name}
                        </Heading>
                        <iframe
                            title={component.name}
                            src={`/iframe.html?id=${component.storyId}&globals=theme:${globals.theme};direction:${globals.direction}`}
                            style={{
                                height: "500px",
                                border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
                            }}
                        />
                    </View>
                ))}
            </View>
        );
    },
};

export const FloatingComponents = {
    render: function Render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: sizing.size_200,
                    flexWrap: "wrap",
                }}
            >
                {floatingComponents.map((component) => (
                    <View style={styles.openedComponent} key={component.name}>
                        <CatalogComponentInfo {...component} />
                    </View>
                ))}
            </View>
        );
    },
};

const styles = StyleSheet.create({
    componentHeading: {
        marginBlockEnd: sizing.size_120,
    },
    allComponents: {
        gap: sizing.size_480,
        padding: sizing.size_200,
        flexWrap: "wrap",
    },
    openedComponent: {
        marginBlockEnd: "300px",
    },
});
