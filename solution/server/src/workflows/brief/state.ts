import { Annotation } from '@langchain/langgraph'

import type { SearchedArticle, LongTermMemory } from '@services'
import type { BriefPeriod } from './types.js'

/*==========================================================================
 * State annotation for the brief workflow
 +=========================================================================*/
export const BriefAnnotation = Annotation.Root({
  // Input fields
  sessionId: Annotation<string>(),
  period: Annotation<BriefPeriod>(),

  // Intermediate state
  startDate: Annotation<number>(), // Unix timestamp (seconds)
  articles: Annotation<SearchedArticle[]>({
    default: () => [],
    reducer: (_, next) => next
  }),
  memories: Annotation<LongTermMemory[]>({
    default: () => [],
    reducer: (_, next) => next
  }),

  // Output fields
  brief: Annotation<string>(),
  articleCount: Annotation<number>()
})

export type BriefState = typeof BriefAnnotation.State
