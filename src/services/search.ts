import { SearchResponse, SearchParameters } from "@notionhq/client/build/src/api-endpoints.js";
import { notionClient } from "../config/notionClient.js";

export async function searchPageOrDatabase(request: SearchParameters): Promise<SearchResponse> {
    const response = await notionClient.search(request);
    return response;
}