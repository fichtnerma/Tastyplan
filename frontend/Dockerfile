FROM node:18-alpine as base
EXPOSE 8080
WORKDIR /client
CMD ["npm", "run", "start"]

FROM base as build


###################
# BUILD FOR BUILDING
###################

ENV NODE_ENV development

COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force && npm prune

COPY --chown=node:node . .
RUN npm run build

USER node

###################
# BUILD FOR DEV
###################

FROM build as dev

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM base as production
ENV NODE_ENV production

COPY --from=build --chown=node:node /client/package.json ./package.json
COPY --from=build --chown=node:node /client/node_modules ./node_modules
COPY --from=build --chown=node:node /client/.next ./.next
COPY --from=build --chown=node:node /client/public ./public
