
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM node as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --only=development

# Copy application code
COPY . .

# Build application
RUN npm run build:js && npm run build:css

# Remove development dependencies
RUN npm prune

# Final stage for app image
FROM node

# Copy built application from the build stage to the final stage
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "server" ]
