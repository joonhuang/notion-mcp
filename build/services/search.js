import { notionClient } from "../config/notionClient.js";
export async function searchPageOrDatabase(request) {
    const response = await notionClient.search(request);
    return response;
}
