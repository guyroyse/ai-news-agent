# AI News Agent

An AI-powered news aggregator that fetches articles from RSS feeds, enriches them with embeddings and named entity extraction, and provides a chat interface for exploring the news.

## Quick Start

### Prerequisites

- Docker (for Redis and Agent Memory Server)

### Setup

This is the easiest way to get started. Docker handles Redis, Agent Memory Server, and the app itself.

1. **Copy the environment file and add your OpenAI API key:**

```bash
cp .env.sample .env
```

2. **Edit the .env file and add your OpenAI API key:**

```bash
nano .env
```

If you have any issues with the ports, you can change them in the .env file too. The defaults are fine for most cases.

3. **Start everything:**

```bash
docker compose up --build
```

4. **Open the app:**

Just open http://localhost:8080 in your browser.

That's it! The app will automatically create the Redis index and start ingesting news articles.

## Environment Variables

Copy `.env.sample` to `.env` and configure as needed. All variables have sensible defaults except `OPENAI_API_KEY` which is required.

| Variable         | Default                | Description                             |
| ---------------- | ---------------------- | --------------------------------------- |
| `OPENAI_API_KEY` | (required)             | Your OpenAI API key                     |
| `API_PORT`       | 3000                   | External port for the Express API       |
| `WEB_PORT`       | 8080                   | External port for the web frontend      |
| `REDIS_PORT`     | 6379                   | External port for Redis                 |
| `AMS_PORT`       | 8000                   | External port for Agent Memory Server   |
| `REDIS_URL`      | redis://localhost:6379 | Redis connection URL (dev mode only)    |
| `AMS_URL`        | http://localhost:8000  | Agent Memory Server URL (dev mode only) |

## Development Mode

If you want to run the server and web app locally (without Docker), you'll need to manage Redis and AMS yourself.

### Prerequisites

- Docker (for Redis and Agent Memory Server)
- Node.js 22+

### Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start Redis and AMS** (via Docker or locally):

   ```bash
   docker compose up redis agent-memory-server
   ```

   This will start Redis and Agent Memory Server in Docker. You can also run them locally if you prefer, if you're feeling ambitious, and if you have the tokens to ask ChatGPT how to do it.

3. **Copy environment file:**

   ```bash
   cp .env.sample .env
   ```

4. **Edit the .env file and add your OpenAI API key:**

   ```bash
   nano .env
   ```

   If you have any issues with the ports, you can change them in the .env file too. The defaults are fine for most cases.

5. **Start the web app and the server:**

   ```bash
   npm run dev
   ```

6. **Open the app:**

Just open http://localhost:5173 in your browser.

### Building

```bash
npm run build
```

This builds both the server and web workspaces.

## Project Structure

```
solution/
├── server/              # Express API + LangGraph workflows
│   └── src/
│       ├── adapters/    # LLM and embedding adapters
│       ├── routes/      # API endpoints
│       ├── services/    # Redis, article management
│       └── workflows/   # LangGraph agents (chatbot, brief, ingestion)
│
├── web/                 # Svelte 5 frontend
│   └── src/
│       ├── components/  # UI components
│       ├── panels/      # Main app panels
│       ├── services/    # API client
│       └── stores/      # Svelte stores
│
├── docker-compose.yaml
├── Dockerfile
└── .env.sample
```

## Services

| Service                 | Description                       | Default Port |
| ----------------------- | --------------------------------- | ------------ |
| **redis**               | Redis database                    | 6379         |
| **agent-memory-server** | Redis AMS for long-term memory    | 8000         |
| **app**                 | Express API + static web frontend | 3000, 8080   |
