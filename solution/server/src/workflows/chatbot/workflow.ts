import { StateGraph, START, END } from '@langchain/langgraph'

import { memoryFetcher, memorySaver, articleCollector, conversationalist } from './agents/index.js'
import { ChatAnnotation } from './state.js'

/* Create the workflow graph for processing a chat message */
const graph = new StateGraph(ChatAnnotation) as any

/* Add nodes */
graph.addNode('memory-fetcher', memoryFetcher)
graph.addNode('conversationalist', conversationalist)
graph.addNode('memory-saver', memorySaver)
graph.addNode('article-collector', articleCollector)

/* Add edges */
graph.addEdge(START, 'memory-fetcher')
graph.addEdge('memory-fetcher', 'conversationalist')
graph.addEdge('conversationalist', 'memory-saver')
graph.addEdge('memory-saver', 'article-collector')
graph.addEdge('article-collector', END)

/* Compile and export the workflow */
export const chatWorkflow = graph.compile()
