import { Annotation } from '@langchain/langgraph'
import type { Article, FeedItem } from '@models'

export const ArticleAnnotation = Annotation.Root({
  feedItem: Annotation<FeedItem | null>({
    default: () => null,
    reducer: (_prev, next) => next
  }),
  content: Annotation<string | null>({
    default: () => null,
    reducer: (_prev, next) => next
  }),
  summary: Annotation<string | null>({
    default: () => null,
    reducer: (_prev, next) => next
  }),
  article: Annotation<Article | null>({
    default: () => null,
    reducer: (_prev, next) => next
  })
})

export type ArticleState = typeof ArticleAnnotation.State
