import { Annotation } from '@langchain/langgraph'
import type { Article, FeedItem } from '@services'

export const ArticleAnnotation = Annotation.Root({
  feedItem: Annotation<FeedItem>(),
  content: Annotation<string>(),
  summary: Annotation<string>(),
  topics: Annotation<string[]>({
    default: () => [],
    reducer: (prev, next) => [...prev, ...next]
  }),
  people: Annotation<string[]>({
    default: () => [],
    reducer: (prev, next) => [...prev, ...next]
  }),
  organizations: Annotation<string[]>({
    default: () => [],
    reducer: (prev, next) => [...prev, ...next]
  }),
  locations: Annotation<string[]>({
    default: () => [],
    reducer: (prev, next) => [...prev, ...next]
  }),
  embedding: Annotation<number[]>(),
  article: Annotation<Article>()
})

export type ArticleState = typeof ArticleAnnotation.State
