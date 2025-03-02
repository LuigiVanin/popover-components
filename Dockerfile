FROM node:22.10

WORKDIR /usr/app

ENV NODE_ENV=test


COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run setup

RUN pnpm run build:pkg

CMD ["pnpm", "test"]

