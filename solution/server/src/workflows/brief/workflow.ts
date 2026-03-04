import { StateGraph, START, END } from '@langchain/langgraph'

import { articleFetcher, memoryFetcher, briefGenerator } from './agents/index.js'
import { BriefAnnotation } from './state.js'

/* Create the workflow graph for generating a news brief */
const graph = new StateGraph(BriefAnnotation) as any

/* Add nodes */
graph.addNode('article-fetcher', articleFetcher)
graph.addNode('memory-fetcher', memoryFetcher)
graph.addNode('brief-generator', briefGenerator)

/* Add edges - article and memory fetchers run in parallel */
graph.addEdge(START, 'article-fetcher')
graph.addEdge(START, 'memory-fetcher')
graph.addEdge('article-fetcher', 'brief-generator')
graph.addEdge('memory-fetcher', 'brief-generator')
graph.addEdge('brief-generator', END)

/* Compile and export the workflow */
export const briefWorkflow = graph.compile()
