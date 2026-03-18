# ===============================
# Build stage
# ===============================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json ./
COPY server/package.json ./server/
COPY web/package.json ./web/

# Install all dependencies
RUN npm ci

# Copy source code
COPY server ./server
COPY web ./web

# Build all workspaces
RUN npm run build


# ===============================
# Production stage
# ===============================
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json ./
COPY server/package.json ./server/
COPY web/package.json ./web/

# Install production dependencies only
RUN npm ci --omit=dev

# Install concurrently and http-server for runtime
RUN npm install -g concurrently http-server

# Copy built applications from builder
COPY --from=builder /app/server/dist ./server
COPY --from=builder /app/web/dist ./web

# Expose ports
EXPOSE 80 3000

# Start both services
CMD ["concurrently", "-n", "server,web", "-c", "blue,green", \
     "node server/server.js", \
     "http-server web -p 80 -P http://localhost:3000"]

