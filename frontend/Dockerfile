# Use official Node image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the Vite port
EXPOSE 5173

# Run the dev server and expose it to the Docker network
CMD ["npm", "run", "dev", "--", "--host"]