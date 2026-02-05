import { StateGraph, START, END } from '@langchain/langgraph'

import {
  textExtractor,
  summarizer,
  topicClassifier,
  entityExtractor,
  embedder,
  articleAssembler
} from './agents/index.js'
import { ArticleAnnotation } from './state.js'

/* Create the workflow graph for processing a single feed item into an article */
const graph = new StateGraph(ArticleAnnotation) as any

/* Add nodes */
graph.addNode('text-extractor', textExtractor)
graph.addNode('summarizer', summarizer)
graph.addNode('topic-classifier', topicClassifier)
graph.addNode('entity-extractor', entityExtractor)
graph.addNode('embedder', embedder)
graph.addNode('article-assembler', articleAssembler, { defer: true })

/* Add edges */
graph.addEdge(START, 'text-extractor')

/* After text extraction, three paths run in parallel */
graph.addEdge('text-extractor', 'summarizer')
graph.addEdge('text-extractor', 'topic-classifier')
graph.addEdge('text-extractor', 'entity-extractor')

/* Embedder waits for summarizer to complete */
graph.addEdge('summarizer', 'embedder')

/* All three enrichment nodes must complete before article assembler */
graph.addEdge('topic-classifier', 'article-assembler')
graph.addEdge('entity-extractor', 'article-assembler')
graph.addEdge('embedder', 'article-assembler')

graph.addEdge('article-assembler', END)

/* Compile and export the workflow */
export const articleWorkflow = graph.compile()
