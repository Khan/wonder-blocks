import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import {z} from "zod";

const server = new McpServer(
    {
        name: "wonder-blocks-mcp-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

const docsPath = path.join(os.homedir(), "khan", "wonder-blocks", "__docs__");

function listComponents() {
    const components: Array<{
        component: string;
        package: string;
    }> = [];
    const dirs = fs.readdirSync(docsPath, {withFileTypes: true});
    for (const dir of dirs) {
        if (dir.isDirectory() && dir.name.startsWith("wonder-blocks-")) {
            const contents = fs.readdirSync(path.join(docsPath, dir.name));
            for (const content of contents) {
                if (content.endsWith(".stories.tsx")) {
                    const name = content.slice(
                        0,
                        content.indexOf(".stories.tsx"),
                    );
                    components.push({component: name, package: dir.name});
                }
            }
        }
    }
    return components;
}

function researchComponent(componentNameRaw: string) {
    const components = listComponents();
    // Convert componentNameRaw to lower kebab-case for matching
    const componentName = componentNameRaw
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
    const componentEntry = components.find(
        (c) => c.component === componentName,
    );
    if (componentEntry) {
        const packageName = componentEntry.package;
        const packagePath = path.join(docsPath, packageName);
        const contents = fs.readdirSync(packagePath);
        const story = fs.readFileSync(
            path.join(packagePath, `${componentName}.stories.tsx`),
            "utf-8",
        );
        const argTypes = contents.includes(`${componentName}.argTypes.ts`)
            ? fs.readFileSync(
                  path.join(packagePath, `${componentName}.argTypes.ts`),
                  "utf-8",
              )
            : undefined;
        const a11y = contents.includes("accessibility.mdx")
            ? fs.readFileSync(
                  path.join(packagePath, "accessibility.mdx"),
                  "utf-8",
              )
            : undefined;
        return {
            component: componentName,
            package: packageName,
            story,
            argTypes,
            accessibility: a11y,
        };
    } else {
        throw new Error(`Component ${componentName} not found`);
    }
}

function toTextResult(payload: unknown): CallToolResult {
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(payload),
            },
        ],
    };
}

function toErrorResult(error: unknown): CallToolResult {
    const message = error instanceof Error ? error.message : String(error);
    return {
        content: [
            {
                type: "text",
                text: `Error executing tool: ${message}`,
            },
        ],
    };
}

server.registerTool(
    "list_components",
    {
        description:
            "List all of the available WonderBlocks components that a consumer may use",
        inputSchema: z.object({}).strict(),
    },
    async (): Promise<CallToolResult> => {
        try {
            return toTextResult({content: listComponents()});
        } catch (error) {
            return toErrorResult(error);
        }
    },
);

server.registerTool(
    "list_packages",
    {
        description:
            "List all of the available WonderBlocks packages that a consumer may import",
        inputSchema: z.object({}).strict(),
    },
    async (): Promise<CallToolResult> => {
        try {
            const packages = Array.from(
                new Set(listComponents().map((c) => c.package)),
            );
            return toTextResult({content: packages});
        } catch (error) {
            return toErrorResult(error);
        }
    },
);

server.registerTool(
    "research_component",
    {
        description:
            "Research a Wonder Blocks component and provide relevant information about its usage, props, and best practices. Use kebab-case for the component name.",
        inputSchema: z
            .object({
                componentName: z
                    .string()
                    .describe(
                        "The name of the Wonder Blocks component to research (e.g., Button, Modal, etc.)",
                    ),
            })
            .strict(),
    },
    async ({componentName}): Promise<CallToolResult> => {
        try {
            return toTextResult(researchComponent(componentName));
        } catch (error) {
            return toErrorResult(error);
        }
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error starting Wonder Blocks MCP Server:", err);
    process.exit(1);
});
