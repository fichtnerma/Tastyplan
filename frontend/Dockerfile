###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build
WORKDIR /client

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# remove dev dependencies
RUN npm prune --production

FROM node:18-alpine as production
WORKDIR /client
# copy from build image
COPY --from=build /client/package.json ./package.json
COPY --from=build /client/node_modules ./node_modules
COPY --from=build /client/.next/ ./.next
COPY --from=build /client/public ./public

EXPOSE 8080

CMD ["npm", "run", "start"]
