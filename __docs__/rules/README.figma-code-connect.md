# Figma Code Connect rules

The goal is to map the Wonder Blocks component to the accompanying Figma component using `/__figma__/[component-name].figma.tsx` files.

These files tell the Figma MCP how to extract the vital data from Figma file markup, and then uses that to create an "example" React component string that the coding agent uses for guidance. The `example (props) => {}` function is never executed, and comments within can be used in place of interpreted code.

## Steps

1. Look at the WB component's API / props and try to map to the Figma props
2. If no mapping exists for Figma component props with WB, note them with possible suggestions and give me a chance to approve or clarify.

## Reference docs

You can find the API for extracting data from the Figma component dev docs:
<https://developers.figma.com/docs/code-connect/react>
When a Figma component should be output as different WB components based on its props' values, look at the variant pattern in the dev docs.
