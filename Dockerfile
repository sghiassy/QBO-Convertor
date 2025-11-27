FROM node:20

WORKDIR /app

COPY package*.json ./

# Install all dependencies including devDependencies (needed for Grunt build)
RUN npm install

# Copy all the files over
COPY . .

# Run Grunt build process to generate build/ directory
RUN npx grunt build

EXPOSE 4000

# Run the command (grunt already executed during build)
CMD ["node", "web.js"]
