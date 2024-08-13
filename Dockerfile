# Install the dependencies in a separate stage
FROM oven/bun:latest AS deps
WORKDIR /app
COPY package*.json ./
RUN bun install

# Build the app in a separate stage
FROM oven/bun:latest AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN bun run build

# Create the final image
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["bun", "start"]
