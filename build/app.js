import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerToolsForSearch } from "./services/search.js";
import { registerToolsForBlock } from "./services/block.js";
import { registerToolsForPage } from "./services/page.js";
// Create server instance
const server = new McpServer({
    name: "notion-mcp",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Register tools
registerToolsForSearch(server);
registerToolsForBlock(server);
registerToolsForPage(server);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Notion MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
