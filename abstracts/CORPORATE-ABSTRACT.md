# Building Agentic AI Applications with Redis and LangGraph.js
## A Practical Demonstration Using a News Intelligence Workflow

AI agents are quickly moving from interesting prototypes to real production systems. As they do, one challenge stands out: agents need a fast, reliable way to store what they learn, retrieve what they’ve seen, and reason over data as it evolves. Whether you’re building solutions for customer support, document analysis, finance, or operations, the core requirements look the same—agents must ingest information, extract structure, retain memory, and query it efficiently.

In this workshop, we’ll walk through a complete agentic AI workflow that demonstrates these patterns end to end. Our example use case—a news intelligence agent—keeps things concrete and relatable, but the techniques apply across many enterprise AI applications. You’ll build a system that:

- Ingests and enriches unstructured data, turning raw text into summaries, structured metadata, and vector embeddings.
- Stores and indexes that data in Redis using vector search and structured filtering for fast, relevant retrieval.
- Enables an AI agent to analyze and discuss the stored information using Retrieval-Augmented Generation (RAG).

**LangGraph.js** will drive both the ingestion process and the conversational agent. You’ll see how workflows, tool calls, and LLM interactions can be organized into consistent, repeatable patterns that are easy to extend and reason about.

All enriched data—content, summaries, metadata, timestamps, and embeddings—will be stored in **Redis** and indexed through **Redis Query Engine**. This creates a unified memory layer that supports hybrid search and real-time contextualization, making it easy for agents to work with large and frequently updated datasets.

To support natural conversation and continuity, we’ll also integrate **Redis Agent Memory Server**, giving the agent both short- and long-term memory as it processes and responds to user queries.

By the end of the workshop, you’ll have a clear, practical understanding of how Redis can power agentic AI systems. The news intelligence workflow simply highlights the core building blocks—in ingestion, enrichment, storage, indexing, retrieval, and reasoning—that form the foundation of today’s AI-driven applications.


