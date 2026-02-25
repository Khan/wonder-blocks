# Wonder Blocks – Agentic Workflows & Storybook MCP

This file helps AI agents and tools work with the Wonder Blocks design system, including the Storybook MCP server.

## Storybook MCP server

Wonder Blocks uses [@storybook/addon-mcp](https://storybook.js.org/addons/@storybook/addon-mcp) so agents can discover components, list stories, and use docs tooling.

### When it’s available

- The MCP server runs **inside** the Storybook dev server.
- Start Storybook with: **`pnpm start`** (or `pnpm start:storybook`).
- Storybook (and the MCP endpoint) are only available while that process is running.

### MCP endpoint

| Environment | Storybook UI        | MCP endpoint              |
|------------|----------------------|---------------------------|
| Local dev  | http://localhost:6061 | http://localhost:6061/mcp |

**Note:** This repo uses port **6061** (not the default 6006). Use the URL above when connecting an MCP client (e.g. Cursor, Claude Desktop).

### Addon configuration

In `.storybook/main.ts`:

- **addon-mcp** is enabled with `toolsets: { dev: true, docs: true }`.
- **experimentalComponentsManifest** is enabled so the addon can expose component metadata.

Typical MCP tools you can use (names may vary by addon version):

- List components / list stories
- Get story details (args, parameters)
- Docs-related tools from the `docs` toolset

### Connecting your MCP client

1. Start Storybook: `pnpm start`.
2. In your MCP client config, add a server that points to `http://localhost:6061/mcp` (HTTP transport, no auth for local).
3. If your client expects a different transport (e.g. stdio), check the [addon-mcp docs](https://storybook.js.org/addons/@storybook/addon-mcp); this repo only runs the in-Storybook HTTP server.

## Repo layout for agents

- **Packages:** `packages/wonder-blocks-*/` – each package has `src/`, exports in `src/index.ts`.
- **Stories & docs:** `__docs__/` – all Storybook stories and MDX live here, grouped by package (e.g. `__docs__/wonder-blocks-button/`).
- **Conventions:** See `CLAUDE.md` and `.cursor/rules/` for coding standards, component patterns, and testing. Use `pnpm lint` and `pnpm typecheck` before submitting.

## Commands

| Command           | Purpose                          |
|-------------------|----------------------------------|
| `pnpm install`    | Install dependencies             |
| `pnpm start`      | Start Storybook (and MCP) on 6061 |
| `pnpm build`      | Build all packages               |
| `pnpm lint`       | Lint                             |
| `pnpm typecheck`  | Type check                       |
| `pnpm test`       | Run Jest tests                   |
| `pnpm test:storybook` | Run Storybook/Vitest tests  |

## Making documentation agent-friendly

- **Stories:** Use consistent `title` hierarchy (e.g. `Packages / Button / Button`) and `argTypes` so MCP and autodocs can infer props.
- **JSDoc:** Document component and prop types; the docs toolset and autodocs rely on this.
- **Accessibility:** Document a11y in MDX (e.g. `*.accessibility.mdx`) so agents can reason about roles and behavior.
