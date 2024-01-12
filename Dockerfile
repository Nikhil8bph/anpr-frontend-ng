# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run ng serve when the container launches
CMD ["ng", "serve", "--host", "0.0.0.0"]
