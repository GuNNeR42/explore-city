FROM node:20-alpine

WORKDIR /app

# Install dependencies early for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose app port (change if needed)
EXPOSE 3000

# Run in dev mode with hot-reloading
CMD ["npm", "run", "start:dev"]
