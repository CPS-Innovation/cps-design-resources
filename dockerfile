# Use an official Node.js LTS image (ARM64 compatible)
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g gulp  # Install gulp globally

# Copy the rest of the application into the container
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]