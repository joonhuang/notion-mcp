import { Client } from '@notionhq/client';
import { z } from "zod";
const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const getBlock = async (blockId) => {
    return await notion.blocks.retrieve({ block_id: blockId });
};
export const updateBlock = async (blockId, properties) => {
    return await notion.blocks.update({
        block_id: blockId,
        ...properties,
    });
};
export const deleteBlock = async (blockId) => {
    return await notion.blocks.delete({ block_id: blockId });
};
export const appendBlockChildren = async (blockId, children) => {
    return await notion.blocks.children.append({
        block_id: blockId,
        children,
    });
};
export function registerToolsForBlock(server) {
    server.tool("get-notion-block", { blockId: z.string() }, async ({ blockId }) => {
        const data = await getBlock(blockId);
        return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });
    server.tool("update-notion-block", { blockId: z.string(), properties: z.any() }, async ({ blockId, properties }) => {
        const data = await updateBlock(blockId, properties);
        return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });
    server.tool("delete-notion-block", { blockId: z.string() }, async ({ blockId }) => {
        const data = await deleteBlock(blockId);
        return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });
    server.tool("append-notion-block-children", { blockId: z.string(), children: z.array(z.any()) }, async ({ blockId, children }) => {
        const data = await appendBlockChildren(blockId, children);
        return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });
}
