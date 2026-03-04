import { Annotation } from '@langchain/langgraph'

import type { SearchedArticle, LongTermMemory } from '@services'
import type { BriefPeriod } from './types.js'

/*==========================================================================
 * State annotation for the brief workflow
 +=========================================================================*/
export const BriefAnnotation = Annotation.Root({
  period: Annotation<BriefPeriod>(),
  articles: Annotation<SearchedArticle[]>(),
  memories: Annotation<LongTermMemory[]>(),
  brief: Annotation<string>()
})

export type BriefState = typeof BriefAnnotation.State
