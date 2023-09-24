#FROM node:10.15.1
FROM node:14.21.2

# Create dir for app code inside image => working dir for app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Note NOT copying entire working dir, ONLY copying the package.json files
# This allows us to take advantage of cached Docker layers
RUN npm install

# Copy app source
COPY . .

# App binds to port 22137 - the EXPOSE instruction maps it to the docker daemon
EXPOSE 30022

# Will run node fe-server.js as defined in package.json
CMD [ "npm", "start" ]
