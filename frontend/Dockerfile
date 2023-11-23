FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

CMD npm run dev