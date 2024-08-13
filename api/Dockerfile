# Stage 1: Install dependencies
FROM oven/bun:latest AS deps

WORKDIR /app

COPY package*.json ./

RUN bun install

# Stage 2: Build the application
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy the application code and the node_modules from the deps stage
COPY --from=deps /app/node_modules /app/node_modules

# Copy only necessary files to avoid conflicts
COPY . .

RUN bun run build

# Stage 3: Final image
FROM oven/bun:latest

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000

CMD ["bun", "start"]
