import { tool } from '@langchain/core/tools'
import { z } from 'zod'

import type { SearchedArticle } from '@services'

/*==========================================================================
 * Tool for showing an article in the activity panel
 *
 * When the LLM calls this tool, it signals that this article should be
 * displayed to the user in the activity panel. The article is returned
 * for collection by the workflow.
 +=========================================================================*/

const showArticleSchema = z.object({
  article: z.object({
    title: z.string(),
    link: z.string(),
    content: z.string(),
    source: z.string(),
    publicationDate: z.number(),
    topics: z.array(z.string()),
    namedEntities: z.object({
      people: z.array(z.string()),
      organizations: z.array(z.string()),
      locations: z.array(z.string())
    })
  }).describe('The full article object to show in the activity panel'),
  reason: z.string().describe('Brief explanation of why this article is relevant to the user')
})

export const showArticleTool = tool(
  async ({ article, reason }) => {
    // The tool returns the article so the workflow can collect it
    // The actual display happens on the frontend when it receives the response
    return JSON.stringify({
      shown: true,
      article: article as SearchedArticle,
      reason
    })
  },
  {
    name: 'show_article',
    description:
      'Show an article to the user in the activity panel. Use this when you find an article ' +
      'that is particularly relevant to the user\'s interests or request. ' +
      'Include the full article object and a brief reason why it\'s relevant.',
    schema: showArticleSchema
  }
)

