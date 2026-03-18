# Redis + LangGraph.js Workshop

This repo contian the solution to a hands-on workshop for building agentic AI applications using Redis and LangGraph.js. While the workshop is currently under development (i.e. not done) this completed solution is ready to run and complete. You can learn from if you want to stare down the code until it gives up the information you want. When it's ready, you can take the workshop too!

The application itself is a news aggregator that fetches articles from RSS feeds and does all the AI things with them. It allows you to search them using both strucuted and semantic search, chat about them using a chatbot, and generate a new brief covering recent stories.

It's all written in TypeScript and uses the latest, greatest, and most updatest AI tools from Redis.

## What's Covered

The application demonstrates key patterns for building AI-powered systems:

- **Ingestion workflows** — Fetch RSS feeds, summarize articles, extract named entities, generate embeddings, and store everything in Redis
- **Hybrid search** — Combine vector similarity with structured filtering using Redis Search
- **Tool-enabled RAG** — Build a chatbot that retrieves and reasons over news articles
- **Agent memory** — Give your agent short-term and long-term memory with Redis Agent Memory Server

## Implementation

This application is a **fully working implementation**. It includes:

- **Express API server** with LangGraph.js workflows for ingestion, chat, and news briefings
- **Svelte 5 frontend** for browsing articles, chatting, and generating personalized news briefs
- **Docker Compose setup** for running the entire stack with one command

This would make an excellent demo for showcasing Redis + LangGraph.js capabilities.

👉 **[See the SETUP file for setup instructions](SETUP.md)**

## Tech Stack

- **[LangGraph.js](https://github.com/langchain-ai/langgraphjs)** — Workflow orchestration for AI agents
- **[Redis](https://redis.io/)** — Data storage with vector search and structured filtering
- **[Redis Agent Memory Server](https://github.com/redis-developer/agent-memory-server)** — Short and long-term memory for agents
- **[Svelte 5](https://svelte.dev/)** — Modern reactive frontend
- **[Express](https://expressjs.com/)** — Node.js API server
- **[OpenAI](https://openai.com/)** — LLM and embedding models

## Talk Abstracts

The `abstracts/` folder contains two versions of the talk abstract:

- **CONFERENCE-ABSTRACT.md** — A version for developer conferences
- **CORPORATE-ABSTRACT.md** — A version for corporate/enterprise events

I have a favorite here.
