import dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config({ path: "/Users/joonhuang/Workspaces/notion-mcp/.env" });
export const ENV = {
    NOTION_API_KEY: process.env.NOTION_API_KEY || ""
};
