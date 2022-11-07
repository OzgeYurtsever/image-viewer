FROM node:16-alpine 

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app

RUN npm install -g npm-install-peers

COPY . /src/app

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
