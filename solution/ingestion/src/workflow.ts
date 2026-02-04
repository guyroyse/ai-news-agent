import { StateGraph, START, END } from '@langchain/langgraph'

import { textExtractor, summarizer, articleAssembler } from './agents/index.js'
import { ArticleAnnotation } from './state.js'

/* Create the workflow graph for processing a single feed item into an article */
const graph = new StateGraph(ArticleAnnotation) as any

/* Add nodes */
graph.addNode('text-extractor', textExtractor)
graph.addNode('summarizer', summarizer)
graph.addNode('article-assembler', articleAssembler)

/* Add edges */
graph.addEdge(START, 'text-extractor')
graph.addEdge('text-extractor', 'summarizer')
graph.addEdge('summarizer', 'article-assembler')
graph.addEdge('article-assembler', END)

/* Compile and export the workflow */
export const articleWorkflow = graph.compile()
