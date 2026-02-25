// @ts-ignore - moduleResolution: "node" doesn't support package.json exports
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import dedent from 'dedent'

import { fetchLLM } from '@adapters'

import { searchArticlesTool, showArticleTool } from '../tools/index.js'

/*==========================================================================
 * System prompt for the chatbot
 +=========================================================================*/
const SYSTEM_PROMPT = dedent`
  You are a helpful AI news assistant that helps users discover and explore news articles.

  You have access to a database of news articles that you can search using various filters:
  - Semantic search: Natural language queries
  - Topics: Filter by article topics
  - People, Organizations, Locations: Filter by named entities
  - Sources: Filter by news sources
  - Date range: Filter by publication date

  When you find articles relevant to the user's interests, use the show_article tool to display
  them in the activity panel. Always explain why you're showing an article.

  Be conversational, helpful, and proactive in suggesting relevant content.`

/*==========================================================================
 * Create the prebuilt ReAct agent with tools
 +=========================================================================*/
const tools = [searchArticlesTool, showArticleTool]
const llm = fetchLLM()

export const conversationalist = createReactAgent({
  llm,
  tools,
  messageModifier: SYSTEM_PROMPT
})
