import type { ArticleState } from '@root/state'
import { fetchEmbedder } from '@adapters'
import { log } from '@services'

const embeddingModel = fetchEmbedder()

export async function embedder(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract all the data from the state */
  const { feedItem, summary } = state

  log('Embedder', 'Generating embedding')

  /* Make sure we have the required data */
  if (!feedItem) throw new Error('No feed item to process')
  if (!summary) throw new Error('No summary to embed')

  /* Combine title and summary for embedding */
  const textToEmbed = `${feedItem.title}\n\n${summary}`

  log('Embedder', 'Embedding text:', textToEmbed.length, 'characters')

  /* Generate the embedding */
  const embedding = await embeddingModel.embedQuery(textToEmbed)

  log('Embedder', 'Generated embedding:', embedding.length, 'dimensions')

  return { embedding }
}
