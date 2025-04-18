import { Client } from "@notionhq/client";
import { ENV } from "./env.js";

// Create and export a singleton instance of the Notion client
export const notionClient = new Client({
  auth: ENV.NOTION_API_KEY
});