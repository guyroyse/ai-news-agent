// @ts-ignore - moduleResolution: "node" doesn't support package.json exports
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { SystemMessage } from '@langchain/core/messages'
import dedent from 'dedent'

import { fetchLLM } from '@adapters'

import { searchArticlesTool } from '../tools/index.js'
import type { ChatState } from '../state.js'

/*==========================================================================
 * System prompt for the chatbot
 +=========================================================================*/
const SYSTEM_PROMPT = dedent`
  You are a helpful AI news assistant that helps users discover, explore,
  analyze, and understand the connections between news articles.

  You have access to a database of news articles that you can search using
  various filters:
  - Semantic search: Natural language queries
  - Topics: Filter by article topics
  - People, Organizations, Locations: Filter by named entities
  - Sources: Filter by news sources
  - Date range: Filter by publication date

  When referencing articles, construct relative URLs using the article's id
  field in the format /article/{id}. Never use http:// or https:// URLs.
  Never use external URLs. For example, if the article has id
  "a1b2c3d4e5f67890", use:
  - [Article Title](/article/a1b2c3d4e5f67890)
  - In [the article](/article/a1b2c3d4e5f67890) the President said...
  - [Read more](/article/a1b2c3d4e5f67890)

  Be conversational, helpful, and proactive in suggesting relevant content.
  When asked to provide analysis, be unbiased, objective, and data driven.
  Feel free to use your broader knowledge on the topic from your training
  data to put the news in context.`

/*==========================================================================
 * Create the prebuilt ReAct agent with tools
 +=========================================================================*/
const tools = [searchArticlesTool]
const llm = fetchLLM()

const reactAgent = createReactAgent({
  llm,
  tools,
  messageModifier: new SystemMessage(SYSTEM_PROMPT)
})

export async function toolUsingResponder(state: ChatState): Promise<Partial<ChatState>> {
  const result = await reactAgent.invoke({ messages: state.promptMessages })
  const responseMessage = result.messages[result.messages.length - 1].content as string
  return { responseMessage }
}
