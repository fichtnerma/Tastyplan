FROM node:18-alpine as base
USER node
EXPOSE 8080
WORKDIR /client
CMD ["npm", "run", "start"]

FROM base as build

###################
# BUILD FOR BUILDING
###################

ENV NODE_ENV development

COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force && npm prune

COPY --chown=node:node . .
RUN npm run build

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

COPY --from=build /client/package.json ./package.json
COPY --from=build /client/node_modules ./node_modules
COPY --from=build /client/.next ./.next
COPY --from=build /client/public ./public
