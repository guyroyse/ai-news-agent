import type { ArticleState } from '@root/state'
import { fetchEmbedder } from '@adapters'

const embeddingModel = fetchEmbedder()

export async function embedder(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract all the data from the state */
  const { feedItem, summary } = state

  console.log(`[Embedder] Generating embedding`)

  /* Make sure we have the required data */
  if (!feedItem) throw new Error('No feed item to process')
  if (!summary) throw new Error('No summary to embed')

  /* Combine title and summary for embedding */
  const textToEmbed = `${feedItem.title}\n\n${summary}`

  console.log(`-> Embedding text (${textToEmbed.length} characters)`)

  /* Generate the embedding */
  const embedding = await embeddingModel.embedQuery(textToEmbed)

  console.log(`-> Generated embedding (${embedding.length} dimensions)`)
  console.log()

  return { embedding }
}
