# Build Your Own AI News Agent with Redis + LangGraph.js

News. Amirite?

There’s too much of it. As humans, we have to sift through too many sources, too many articles, and way too many rabbit holes just to find the things we actually care about. Historically, we solved this problem with news aggregators and curators—helpful websites that gather, filter, and vet what’s out there to give us just what we want… or at least what *somebody* wants. This is great if your interests are mainstream—sports, politics, the usual—but if you’re into something more esoteric, like Bigfoot sightings or probabilistic data structures, you’re probably out of luck.

So how do we get the news we want? Well, at the risk of sounding trite, AI might be able to help. It can read the news for us. It can filter and vet. It can summarize, analyze, contextualize, cross-reference, and even argue with us about it. Sounds amazing, right? Somebody should build this. And in this workshop, that somebody will be you.

We’ll build a fully agentic news assistant that will:

1.	Ingest news from RSS feeds, summarize it, extract structured data, generate embeddings, and store it all in Redis.
2.	Provide a web interface where you can browse and search that news—semantically and structurally.
3.	Chat with you about the news, using tool-enabled RAG techniques to pull relevant articles and metadata from Redis.

**LangGraph.js** will orchestrate the ingestion workflow and power the chatbot. You’ll use it to write the logic that performs summarization and embedding, stores the resulting structured and vectorized data in Redis, and implements the chatbot’s tools for retrieving relevant news as part of its reasoning process. If you haven’t used LangGraph.js before, that’s perfect—this workshop is exactly where you’ll learn it.

**Redis** and **Redis Query Engine** will store and serve all your news data. Every article—its content, its summary, its metadata, its timestamps, and its embedding—will live in Redis. You’ll learn how to store this data, index it for hybrid (vector + structured) search, and write the code that performs those searches yourself.

**Agent Memory Server** will power the chatbot’s memory. As your agent chats about the news, it will store the conversation's history and any facts it learns along the way, giving it both short- and long-term memory.

Everything is scaffolded so you can focus on the fun parts: orchestrating agent workflows, crafting hybrid search queries, and building an AI memory layer. We’ll skip the boring boilerplate and get right to the good bits. By the end, you’ll have your own personal news agent—and, more importantly, the skills to build your next AI-powered application. Whether you follow “real” news, niche hobbies, or the latest Bigfoot developments, you and your agent will be ready.
