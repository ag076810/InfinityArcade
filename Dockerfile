# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY package.json package-lock.json /app/
COPY . /app/


# Install the application dependencies
RUN npm install

# Build the React application
RUN npm run build:js && npm run build:css

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
RUN npm run server
