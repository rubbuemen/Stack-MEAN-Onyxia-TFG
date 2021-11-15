FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
RUN npm install -g @angular/cli@12.1.4
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm","start"]