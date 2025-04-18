import { Client } from '@notionhq/client';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const createPage = async (pageData: any) => {
  return await notion.pages.create(pageData);
};

export const getPage = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

export const updatePage = async (pageId: string, properties: any) => {
  return await notion.pages.update({
    page_id: pageId,
    properties,
  });
};

export const deletePage = async (pageId: string) => {
  // Notion API does not support direct deletion of pages.
  // Instead, you can archive the page.
  return await notion.pages.update({
    page_id: pageId,
    archived: true,
  });
};

export function registerToolsForPage(server: McpServer) {
    server.tool(
        "create-notion-page",
        { pageData: z.object({
            parent: z.object({
                database_id: z.string().optional(),
                page_id: z.string().optional()
            }).refine(data => data.database_id || data.page_id, {
                message: "Either database_id or page_id must be provided in parent."
            }),
            properties: z.any().optional(),
            children: z.any().optional()
        }) },
        async ({ pageData }) => {
            const data = await createPage(pageData);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "get-notion-page",
        { pageId: z.string() },
        async ({ pageId }) => {
            const data = await getPage(pageId);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "update-notion-page",
        { pageId: z.string(), properties: z.record(z.string(), z.any()) },
        async ({ pageId, properties }) => {
            // Validate that properties have valid Notion API structure
            const formattedProperties = Object.entries(properties).reduce<Record<string, any>>((acc, [key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    acc[key] = value;
                } else {
                    throw new Error(`Invalid property structure for key: ${key}`);
                }
                return acc;
            }, {});

            const data = await updatePage(pageId, formattedProperties);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "delete-notion-page",
        { pageId: z.string() },
        async ({ pageId }) => {
            const data = await deletePage(pageId);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );
}