import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchPageOrDatabase } from "./services/search.js";
import { SearchParameters } from "@notionhq/client/build/src/api-endpoints.js";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register the tool
server.tool(
  "search-notion-page",
  { keyword: z.string() },
  async ({ keyword }) => {
    const request: SearchParameters = {
      query: keyword,
      filter: {
        value: "page",
        property: "object",
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
    };
    const data = await searchPageOrDatabase(request); // Use the service
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

server.tool(
  "search-notion-database",
  { keyword: z.string() },
  async ({ keyword }) => {
    const request: SearchParameters = {
      query: keyword,
      filter: {
        value: "database",
        property: "object",
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
    };
    const data = await searchPageOrDatabase(request); // Use the service
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Notion MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});