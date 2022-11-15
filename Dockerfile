ARG NODE_VERSION=19.1.0-alpine3.16

FROM node:${NODE_VERSION} AS builder

# Create building directory
WORKDIR /root

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci

# Copy the source, configuration and server files
COPY . ./

# Build and bundle the source files
RUN npm run build:prod



# Create a dedicated image for the compiled app
FROM node:${NODE_VERSION}

# Create app directory
WORKDIR /app

# Install app dependencies
COPY --from=builder /root/package*.json ./

RUN npm ci --omit=dev

# Copy the server files to the new image
COPY --from=builder /root/server.js /root/apiMethods.js ./

# Copy the compiled files to the new image
COPY --from=builder /root/dist ./dist


# Set production mode
ENV NODE_ENV=production

# Expose a default port for the server
EXPOSE 3000



# Start the app server
ENTRYPOINT [ "node", "server.js" ]
