FROM oven/bun:1.3.4-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Run type checking
RUN bun run typecheck

# Build
RUN API_URL=http://localhost:8080/ bunx --bun vite build

# Start
EXPOSE 3000
ENV HOST=0.0.0.0
CMD ["bun", "run", "start:prod"]
