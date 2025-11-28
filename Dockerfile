FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

# Copy source
COPY . .

# Build
RUN bun run build

# Start
EXPOSE 3000
ENV HOST=0.0.0.0
CMD ["bun", "run", "start"]
