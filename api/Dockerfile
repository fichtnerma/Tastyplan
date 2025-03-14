
###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine as build

WORKDIR /app

COPY --chown=node:node package*.json .
COPY --chown=node:node prisma ./prisma/
RUN npm ci

COPY --chown=node:node . .

RUN npx prisma generate
# Run the build command which creates the production bundle
RUN npm run build
RUN cp -rv ./images ./dist/


# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force && npm prune

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine as production
# Copy the bundled code from the build stage to the production image
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package*.json ./
COPY --from=build --chown=node:node /app/dist dist
COPY --from=build --chown=node:node /app/prisma ./prisma

# Start the server using the production build
CMD [ "npm", "run", "start:prod:migrate" ]



