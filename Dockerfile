# Use Bun to manage dependencies and build the app
FROM bun:latest AS deps

WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies with Bun
RUN bun install

# Build the app
FROM bun:latest AS builder

WORKDIR /app

COPY . .

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Build the application with Bun
RUN bun run build

# Create the final image
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
