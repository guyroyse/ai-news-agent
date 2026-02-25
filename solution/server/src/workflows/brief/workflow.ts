import { StateGraph, START, END } from '@langchain/langgraph'

import { dateCalculator, articleFetcher, memoryFetcher, briefGenerator } from './agents/index.js'
import { BriefAnnotation } from './state.js'

/* Create the workflow graph for generating a news brief */
const graph = new StateGraph(BriefAnnotation) as any

/* Add nodes */
graph.addNode('date-calculator', dateCalculator)
graph.addNode('article-fetcher', articleFetcher)
graph.addNode('memory-fetcher', memoryFetcher)
graph.addNode('brief-generator', briefGenerator)

/* Add edges - article and memory fetch can happen after date calculation */
graph.addEdge(START, 'date-calculator')
graph.addEdge('date-calculator', 'article-fetcher')
graph.addEdge('article-fetcher', 'memory-fetcher')
graph.addEdge('memory-fetcher', 'brief-generator')
graph.addEdge('brief-generator', END)

/* Compile and export the workflow */
export const briefWorkflow = graph.compile()

