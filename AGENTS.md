# Wonder Blocks – Agentic Workflows & Storybook MCP

This file helps AI agents and tools work with the Wonder Blocks design system, including the Storybook MCP server.

## Installing the MCP (consumer setup)

If you want to use the Wonder Blocks Storybook MCP from another project (e.g. Cursor, Claude Desktop), you run Wonder Blocks locally and point your MCP client at it.

1. **Clone the Wonder Blocks repo** (if you haven’t already):
   ```bash
   git clone git@github.com:Khan/wonder-blocks.git
   cd wonder-blocks
   ```

2. **Install dependencies and start Storybook** (the MCP server runs inside Storybook):
   ```bash
   pnpm install
   pnpm start
   ```
   Keep this process running. Storybook (and the MCP) will be available at `http://localhost:6061`.

3. **Configure your MCP client** to use the local MCP endpoint. Add a server entry that uses the HTTP transport and the URL below.

   **Example `mcp.json` (Cursor and other clients that support HTTP):**
   ```json
   {
     "mcpServers": {
       "wonder-blocks": {
         "url": "http://localhost:6061/mcp"
       }
     }
   }
   ```

   Use `http://localhost:6061/mcp` as the MCP server URL. No API keys or auth are required for local use.

**Note:** The MCP is only available while Storybook is running (`pnpm start`). If you stop Storybook, your MCP client will lose the connection until you start it again.

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

For full setup (clone, run locally, configure `mcp.json`), see [Installing the MCP (consumer setup)](#installing-the-mcp-consumer-setup) above. In short: run `pnpm start` in the Wonder Blocks repo, then add `http://localhost:6061/mcp` to your MCP client config (HTTP transport, no auth for local). If your client expects a different transport (e.g. stdio), see the [addon-mcp docs](https://storybook.js.org/addons/@storybook/addon-mcp); this repo only runs the in-Storybook HTTP server.

## Repo layout for agents

- **Packages:** `packages/wonder-blocks-*/` – each package has `src/`, exports in `src/index.ts`.
- **Stories & docs:** `__docs__/` – all Storybook stories and MDX live here, grouped by package (e.g. `__docs__/wonder-blocks-button/`).
- **Conventions:** See `CLAUDE.md` for coding standards and component patterns. Use `pnpm lint` and `pnpm typecheck` before submitting.
- **Agent skills:** `.agents/skills/storybook/SKILL.md` (for `*.stories.tsx`), `.agents/skills/unit-tests/SKILL.md` (for `*.test.ts(x)`).

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
