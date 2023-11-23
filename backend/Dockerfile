FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json ./

COPY src src
COPY prisma prisma

RUN npm install
RUN npx prisma generate

CMD npm run start