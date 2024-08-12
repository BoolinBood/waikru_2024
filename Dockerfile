# Install the depedenices in a separate stage
FROM node:20-alpine AS deps

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the app in a separate stage
FROM node:20-alpine AS builder

COPY . .

COPY --from=deps ./node_modules /node_modules

RUN npm run build

# Create the final image
FROM node:20-alpine

# Copy only the necessary files from the builder stage
COPY --from=builder /package*.json ./
COPY --from=builder /.next ./.next
COPY --from=builder /public ./public
COPY --from=builder /next.config.mjs ./
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /src ./src
COPY --from=builder /tsconfig.json ./tsconfig.json

# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]