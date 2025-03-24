FROM node:20-alpine

WORKDIR /usr/src/app

EXPOSE 8003

COPY package*.json ./
RUN npm install
COPY ./app.js ./

CMD ["node", "--require", "@opentelemetry/auto-instrumentations-node/register", "app.js"]
