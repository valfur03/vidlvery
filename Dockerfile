FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS dev

ENV NODE_ENV dev

COPY --chown=node:node . .

RUN npm install

USER node

FROM base AS build

ENV NODE_ENV production

COPY --chown=node:node --from=dev /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
RUN npm ci

USER node

FROM base AS prod

ENV NODE_ENV production

COPY --chown=node:node --from=build /app/package.json package.json
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["npm", "run", "start:prod"]
