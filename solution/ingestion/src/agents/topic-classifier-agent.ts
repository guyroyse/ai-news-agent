import dedent from 'dedent'
import { z } from 'zod'

import type { ArticleState } from '@root/state'
import { fetchLLM } from '@adapters'

/* Schema for topic classification output */
const topicsSchema = z.object({
  topics: z.array(z.string()).describe('Broad topics or categories for the article')
})

/* Create the LLM instance with structured output */
const llm = fetchLLM().withStructuredOutput(topicsSchema)

export async function topicClassifier(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the feed item and content from the state */
  const { feedItem, content } = state

  console.log(`[Topic Classifier] Extracting topics`)

  /* Make sure we have the required data */
  if (!feedItem) throw new Error('No feed item to process')
  if (!content) throw new Error('No content to classify')

  /* Build the prompt and call the LLM with structured output */
  const prompt = buildPrompt(feedItem.title, content)
  const result = await llm.invoke(prompt)

  /* Log the extracted topics */
  console.log(`-> Extracted topics: ${result.topics.join(', ')}`)
  console.log()

  return { topics: result.topics }
}

function buildPrompt(title: string, content: string): string {
  return dedent`
    Extract 1-3 broad topics or categories for the following news article.
    Topics should be general categories like "Technology", "Politics", "Science", "Business", etc.
    You can also use more specific topics like "Artificial Intelligence", "Climate Change", "Space Exploration", etc.

    Title: ${title}

    Article: ${content}`
}
