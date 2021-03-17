FROM node:10.19.0-alpine

WORKDIR /app

# Copy code
COPY . .
# Install node modules
RUN npm install
# Build dist
RUN npm run build

CMD node server.js