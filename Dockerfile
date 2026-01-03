# Dependencies stage
FROM node:20.10.0-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production && npm cache clean --force

# Builder stage
FROM node:20.10.0-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy source code and other necessary files
COPY . .

# Build the application
RUN npm run build

# Runner stage
FROM node:20.10.0-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy production dependencies from deps stage
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Copy package.json for runtime reference
COPY --chown=nestjs:nodejs package.json ./

# Copy environment file for production (as fallback)
COPY --chown=nestjs:nodejs .env.production ./

# Create uploads directory structure (uploads is git-ignored, so we create it here)
RUN mkdir -p uploads/members uploads/products && chown -R nestjs:nodejs uploads

# Switch to non-root user
USER nestjs

# Expose port (Cloud Run will set PORT env var)
EXPOSE 3003

# Start the application
CMD ["node", "dist/server.js"]
