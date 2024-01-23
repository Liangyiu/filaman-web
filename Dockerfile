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
