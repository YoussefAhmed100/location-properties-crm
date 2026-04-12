# Use lightweight node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build nest app
RUN npm run build

# Expose app port
EXPOSE 3000

# Run application
CMD ["node", "dist/main"]