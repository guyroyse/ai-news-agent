import dedent from 'dedent'

import { fetchLLM } from '@adapters'

import type { BriefState } from '../state.js'

/*==========================================================================
 * Generates a personalized news brief using the LLM
 +=========================================================================*/
export async function briefGenerator(state: BriefState): Promise<Partial<BriefState>> {
  const { period, articles, memories } = state

  // If no articles, return a simple message
  if (articles.length === 0) {
    return {
      brief: `No news articles found for the ${period} period.`
    }
  }

  // Build context from user memories
  const memoryContext =
    memories.length > 0
      ? dedent`
        ## User Interests and Preferences
        Based on previous conversations, the user is interested in:
        ${memories.map(m => `- ${m.text}`).join('\n')}

        Prioritize news that relates to these interests.
      `
      : ''

  // Build articles context
  const articlesContext = articles
    .map(
      a => dedent`
      ### ${a.title}
      - Source: ${a.source}
      - Topics: ${a.topics.join(', ')}
      - People: ${a.namedEntities.people.join(', ') || 'None'}
      - Organizations: ${a.namedEntities.organizations.join(', ') || 'None'}
      - Summary: ${a.content.slice(0, 500)}...
    `
    )
    .join('\n\n')

  const periodLabel = period === 'daily' ? 'last 24 hours' : period === 'weekly' ? 'last week' : 'last month'

  const prompt = dedent`
    You are a personalized news briefing assistant. Generate a concise, engaging news brief
    based on the following articles from the ${periodLabel}.

    ${memoryContext}

    ## Available Articles (${articles.length} total)
    ${articlesContext}

    ## Instructions
    - Create a brief summary highlighting the most important and relevant news
    - If user interests are provided, prioritize stories that match those interests
    - Group related stories together
    - Be concise but informative
    - Use markdown formatting with headers and bullet points
    - Don't include all articles - focus on the most significant ones
    - Maximum 500 words
  `

  const llm = fetchLLM()
  const response = await llm.invoke(prompt)
  const brief = typeof response.content === 'string' ? response.content : JSON.stringify(response.content)

  return { brief }
}

