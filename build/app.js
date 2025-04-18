import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerToolsForSearch } from "./services/search.js";
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
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Notion MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
