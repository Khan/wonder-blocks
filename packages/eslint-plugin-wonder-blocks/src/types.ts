// We need to define our own PluginDocs type in order for us to be
// able to set the `recommended` field in meta.docs when calling
// `createRule`.  For more info, see:
// https://typescript-eslint.io/developers/custom-rules/#extra-rule-docs-types
export interface WonderBlocksPluginDocs {
    recommended: boolean;
}
