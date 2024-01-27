FROM node:18-alpine as base
WORKDIR /app
USER node
CMD [ "npm", "run", "start:prod:migrate" ]

###################
# BUILD FOR BUILDER
###################

FROM base as build

ENV NODE_ENV development

COPY --chown=node:node package*.json .
COPY --chown=node:node prisma ./prisma/
RUN npm ci && npm cache clean --force && npm prune

COPY --chown=node:node . .

RUN npx prisma generate

RUN npm run build
RUN cp -rv ./images ./dist/

###################
# BUILD FOR DEV
###################

FROM build as dev
ENV NODE_ENV development
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM base as production
ENV NODE_ENV production

COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package*.json ./
COPY --from=build --chown=node:node /app/dist dist
COPY --from=build --chown=node:node /app/prisma ./prisma
