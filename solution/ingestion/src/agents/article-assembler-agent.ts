import type { ArticleState } from '@root/state'
import type { Article } from '@models'

export async function articleAssembler(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the feed item, content, and summary from the state */
  const { feedItem, content, summary } = state

  console.log(`[Article Assembler] Assembling final article`)

  /* Make sure we have all the required data */
  if (!feedItem) throw new Error('No feed item to assemble')
  if (!content) throw new Error('No content to assemble')
  if (!summary) throw new Error('No summary to assemble')

  /* Assemble the final article */
  const article: Article = {
    title: feedItem.title,
    link: feedItem.link,
    publicationDate: feedItem.pubDate,
    source: {
      title: feedItem.feedTitle,
      link: feedItem.feedLink
    },
    content: content,
    summary: summary
  }

  console.log(`-> Article assembled successfully`)
  console.log()

  return { article }
}
