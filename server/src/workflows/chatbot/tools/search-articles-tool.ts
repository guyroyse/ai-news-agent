import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import dedent from 'dedent'

import { searchArticles as searchArticlesService } from '@services'

/*==========================================================================
 * Tool for searching articles in the database
 *
 * The LLM decides what to search for and how to filter based on the
 * user's request. Returns full article objects.
 +=========================================================================*/

const searchArticlesSchema = z.object({
  semanticQuery: z.string().optional().describe('Natural language search query for semantic similarity search'),
  topics: z.array(z.string()).optional().describe('Filter by topics (AND logic - all must match)'),
  people: z.array(z.string()).optional().describe('Filter by people mentioned (AND logic)'),
  organizations: z.array(z.string()).optional().describe('Filter by organizations mentioned (AND logic)'),
  locations: z.array(z.string()).optional().describe('Filter by locations mentioned (AND logic)'),
  sources: z.array(z.string()).optional().describe('Filter by news sources (OR logic - any can match)'),
  startDate: z.number().optional().describe('Filter articles from this Unix timestamp (seconds)'),
  endDate: z.number().optional().describe('Filter articles until this Unix timestamp (seconds)'),
  limit: z.number().optional().default(5).describe('Maximum number of articles to return')
})

export const searchArticlesTool = tool(
  async ({ semanticQuery, topics, people, organizations, locations, sources, startDate, endDate, limit }) => {
    const criteria = {
      semanticQuery,
      topics,
      people,
      organizations,
      locations,
      sources,
      startDate,
      endDate
    }

    const result = await searchArticlesService(criteria, limit ?? 5)

    if (result.success) {
      // Transform articles to reduce context size and prevent LLM from using actual URLs
      const articles = result.articles.map(({ content, link, ...rest }) => rest)
      return JSON.stringify({ articles })
    }

    return JSON.stringify({ error: result.error, articles: [] })
  },
  {
    name: 'search_articles',
    description: dedent`
      Search the news article database. Use semantic search for natural
      language queries, or filter by topics, people, organizations, locations,
      sources, and date range. Returns articles with id, title, summary, source,
      publicationDate, topics, and namedEntities (people, organizations, locations).
      Construct relative URLs using the article id: [Article Title](/article/{id}).
      Do not use http:// or https:// URLs.`,
    schema: searchArticlesSchema
  }
)
