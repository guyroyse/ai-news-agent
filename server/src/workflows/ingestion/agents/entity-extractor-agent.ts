import dedent from 'dedent'
import { z } from 'zod'

import type { ArticleState } from '../state.js'
import { fetchLLM } from '@adapters'
import { log } from '@services'

/* Schema for named entity extraction output */
const namedEntitiesSchema = z.object({
  people: z.array(z.string()).describe('Names of individuals mentioned in the article'),
  organizations: z.array(z.string()).describe('Companies, institutions, or government bodies mentioned'),
  locations: z.array(z.string()).describe('Countries, cities, or regions mentioned')
})

/* Create the LLM instance with structured output */
const llm = fetchLLM().withStructuredOutput(namedEntitiesSchema)

export async function entityExtractor(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the feed item and content from the state */
  const { feedItem, content } = state

  log('Entity Extractor', 'Extracting named entities')

  /* Make sure we have the required data */
  if (!feedItem) throw new Error('No feed item to process')
  if (!content) throw new Error('No content to extract entities from')

  /* Build the prompt and call the LLM with structured output */
  const prompt = buildPrompt(feedItem.title, content)
  const namedEntities = await llm.invoke(prompt)

  /* Log the etracted entities */
  log('Entity Extractor', 'Extracted named entities:')
  log('Entity Extractor', '  People:', namedEntities.people.join(', ') || 'none')
  log('Entity Extractor', '  Organizations:', namedEntities.organizations.join(', ') || 'none')
  log('Entity Extractor', '  Locations:', namedEntities.locations.join(', ') || 'none')

  return {
    people: namedEntities.people,
    organizations: namedEntities.organizations,
    locations: namedEntities.locations
  }
}

function buildPrompt(title: string, content: string): string {
  return dedent`
    Extract named entities from the following news article.
    Identify and categorize entities into three types:
    - People: Names of individuals (e.g., "Elon Musk", "Joe Biden", "Madonna")
    - Organizations: Companies, institutions, government bodies, etc. (e.g., "Microsoft", "NASA", "European Union")
    - Locations: Countries, cities, regions (e.g., "United States", "San Francisco", "Europe", "Appalachia")

    Title: ${title}

    Article: ${content}`
}
