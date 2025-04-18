import { SearchResponse, SearchParameters } from "@notionhq/client/build/src/api-endpoints.js";
import { notionClient } from "../config/notionClient.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Performs a search for pages or databases in Notion using the Notion API.
 * @param request - The search parameters for the Notion API.
 * @returns {Promise<SearchResponse>} - The search response from the Notion API.
 */
export async function searchPageOrDatabase(request: SearchParameters): Promise<SearchResponse> {
    const response = await notionClient.search(request);
    return response;
}

/**
 * MCP Server Tool registration. Allows searching for Notion pages and databases.
 * @param server - The MCP server instance.
 * @returns {void}
 * @example
 * // Register the tools for search
 * registerToolsForSearch(server); 
 */
export function registerToolsForSearch(server: McpServer) {
    // specificallt for pages
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

    // specifically for databases
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
}