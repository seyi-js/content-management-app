FROM node:latest

WORKDIR /app

ENV PORT=${PORT}

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
