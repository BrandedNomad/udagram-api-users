# Use NodeJS base image
FROM node:13

#Set work directory
WORKDIR /usr/src/app

#Copy all files
COPY . .

# install dependencies
RUN npm install

# run build
RUN npm run build

# set new workdirectory
WORKDIR /www/data

# Move build and remove unescesarry files
RUN mv /user/src/app/www/* /www/data/. && rm -rf user/src/app

# Set PORT
EXPOSE 8080

# Run server
CMD ["node", "server.js"]

