FROM node:12.16.0
# Make a folder in your image where your app's source code can live
# RUN mkdir -p /src/app
# Tell your container where your app's source code will live
WORKDIR /
# ENV PORT 80
COPY package.json ./
COPY package-lock.json ./
COPY . /
# Does your app have any dependencies that should be installed?
RUN npm install
# What source code do you what to copy, and where to put it?

# What port will the container talk to the outside world with once created?
EXPOSE 3001
# How do you start your app?
CMD [ "node", "server/index.js" ]
