import type { ArticleState } from '@state'
import type { Article } from '@models'

export async function articleAssembler(state: ArticleState): Promise<Partial<ArticleState>> {
  const { feedItem, content, summary } = state

  if (!feedItem) throw new Error('No feed item to assemble')
  if (!content) throw new Error('No content to assemble')
  if (!summary) throw new Error('No summary to assemble')

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

  return { article }
}
