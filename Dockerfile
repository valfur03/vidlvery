FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS dev

ENV NODE_ENV dev

COPY . .

RUN npm install

USER node

FROM base AS build

ENV NODE_ENV production

COPY --from=dev /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm ci

USER node

FROM base AS prod

ENV NODE_ENV production

COPY --from=build /app/package.json package.json
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules

CMD ["npm", "run", "start:prod"]
