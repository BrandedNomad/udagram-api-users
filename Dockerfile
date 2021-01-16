# Use NodeJS base image
FROM node:13

#Set work directory
WORKDIR /usr/src/app

#Copy all files
COPY . .

# install dependencies
RUN npm install

RUN npm install -g typescript

# run build
RUN npm run build

RUN tsc

# set new workdirectory
WORKDIR /www/data

# Move build and remove unes
RUN mv /usr/src/app/www/* /www/data/. && rm -rf usr/src/app

RUN npm install

EXPOSE 8100

CMD ["node", "server.js"]

