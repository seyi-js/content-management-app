FROM node:latest

WORKDIR /app

ENV PORT=${PORT}

COPY package.json /app

RUN npm install

RUN npm install --save-dev sequelize-cli@6.3.0

COPY . /app

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
