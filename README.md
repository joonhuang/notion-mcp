# Notion MCP Project

## Introduction
This project integrates with the Notion API to provide tools and services for interacting with Notion databases and pages. It is built using TypeScript and the `@notionhq/client` library, and it follows the Model Context Protocol (MCP) for tool registration and interaction.

## Summary
The Notion MCP project includes the following features:
- A globally accessible Notion client for API interactions.
- Services for searching Notion pages and databases.
- A structured and modular codebase for maintainability.
- Integration with the MCP Inspector for testing and debugging tools.

## Prerequisites
Before starting, ensure you have the following:
1. **Node.js**: Install Node.js (v18 or later).
2. **npm**: Ensure npm is installed.
3. **Environment Variable**: Set up the `NOTION_API_KEY` in a `.env` file at the root of the project. Example:

   ```properties
   NOTION_API_KEY=<YOUR NOTION INTEGRATION API>
   ```
## How to Start
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build the Project**:
   ```bash
   npm run build
   ```

3. **Run with MCP Inspector**:
   Use the following command to start the application with the MCP Inspector:
   ```bash
   npx @modelcontextprotocol/inspector node build/app.js
   ```

4. **Run with Claude Desktop**:
   Open up the Claude Desktop > Settings > Developer > Edit Config
   ```json
   "notion": {
      "command": "node",
      "args": [
        "/Users/<username>/notion-mcp/build/app.js"
      ]
    }
   ```
This will start the application and allow you to inspect and test the registered tools.