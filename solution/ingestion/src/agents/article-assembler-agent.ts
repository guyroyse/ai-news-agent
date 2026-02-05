import type { ArticleState } from '@root/state'
import type { Article } from '@services'
import { log } from '@services'

export async function articleAssembler(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract all the data from the state */
  const { feedItem, content, summary, topics, people, organizations, locations, embedding } = state

  log('Article Assembler', 'Assembling final article')

  /* Make sure we have all the required data */
  if (!feedItem) throw new Error('No feed item to assemble')
  if (!content) throw new Error('No content to assemble')
  if (!summary) throw new Error('No summary to assemble')
  if (!topics) throw new Error('No topics to assemble')
  if (!people) throw new Error('No people to assemble')
  if (!organizations) throw new Error('No organizations to assemble')
  if (!locations) throw new Error('No locations to assemble')
  if (!embedding) throw new Error('No embedding to assemble')

  /* Assemble the final article */
  const article: Article = {
    title: feedItem.title,
    link: feedItem.link,
    publicationDate: Math.floor(new Date(feedItem.pubDate).getTime() / 1000),
    source: {
      title: feedItem.feedTitle,
      link: feedItem.feedLink
    },
    content: content,
    summary: summary,
    topics: topics,
    namedEntities: {
      people: people,
      organizations: organizations,
      locations: locations
    },
    embedding: embedding
  }

  log('Article Assembler', 'Article assembled successfully')

  return { article }
}
