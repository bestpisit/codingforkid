# Stage 1: Build stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Prisma
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl

# Copy the dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the Prisma client
COPY --from=build /app/prisma ./prisma

# Copy the application code from the build stage
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Environment variables for Prisma
ENV DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Command to run the application
CMD ["node", "index.js"]
