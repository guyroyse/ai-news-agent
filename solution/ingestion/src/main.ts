import { StateGraph, START, END } from '@langchain/langgraph'

import { cleanupRedisConnection } from '@adapters'
import { textExtractor, summarizer, articleAssembler } from '@agents'
import { fetchFeeds, saveArticle } from '@services'
import { ArticleAnnotation } from '@state'

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

/* Compile the workflow */
const workflow = graph.compile()

/* Fetch all feed items from RSS feeds */
const feedItems = await fetchFeeds()
console.log(`Fetched ${feedItems.length} feed items to process`)

/* Process all feed items through the workflow and save to Redis */
for (const feedItem of feedItems) {
  const result = await workflow.invoke({ feedItem })
  if (result.article) await saveArticle(result.article)
}

console.log(`Processed ${feedItems.length} articles`)

/* Close Redis connection */
await cleanupRedisConnection()
