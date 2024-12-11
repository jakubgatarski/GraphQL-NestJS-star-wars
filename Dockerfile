# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:18

# Set working directory
WORKDIR /app

# Install Redis CLI
RUN apt-get update && apt-get install -y redis-tools

# Copy only the production build
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
