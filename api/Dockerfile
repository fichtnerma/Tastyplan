###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
# Run the build command which creates the production bundle
RUN npm run build
RUN cp -rv ./images ./dist/

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force


###################
# PRODUCTION
###################

FROM node:18-alpine as production

# Copy the bundled code from the build stage to the production image
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

