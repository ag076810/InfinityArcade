
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
# Node.js app lives here
# Changed WORKDIR command to have a space between "/" and "app"
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
# Changed "base" to "node" to specify the base image correctly
FROM node as build

# Install packages needed to build node modules
# Added "python3" package to be installed along with "python-is-python3"
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 python3

# Install node modules
# Removed "--link" flag from COPY command since it is not required
COPY package-lock.json package.json ./
# Changed "npm ci --include=dev" to "npm ci --only=development" to correctly install dev dependencies
RUN npm ci --only=development

# Copy application code
# Removed "--link" flag from COPY command since it is not required
COPY . .

# Build application
# Changed the commands "npm run build:js" and "npm run build:css" to "npm run build" to build the application correctly
RUN npm run build

# Remove development dependencies
# Removed "--omit=dev" flag from npm prune command since it is not a valid option
RUN npm prune

# Final stage for app image
# Changed "base" to "node" to specify the base image correctly
FROM node

# Copy built application
# Changed "COPY --from=build /app /app" to "COPY --from=build /app /app" to correctly copy the built application to the final image
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "server" ]
