# taken from https://gist.github.com/aradalvand/04b2cad14b00e5ffe8ec96a3afbb34fb

FROM node:18-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json pnpm-lock.yaml .
ENV PORT=3000
EXPOSE $PORT
CMD [ "node", "build" ]
