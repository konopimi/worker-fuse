FROM node:20.5.0
# Installing necessary libraries for headless operation with Puppeteer
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Installing npm dependencies
COPY package*.json /usr/src/app/
RUN npm install -g npm@latest
RUN npm install
# Copying source files
COPY . /usr/src/app
# Build the app
RUN npm run build
# Clean npm cache
RUN npm cache clean --force
EXPOSE 3000
# Running the app
CMD [ "npm", "start"]
