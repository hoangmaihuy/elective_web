FROM node:10.19.0-alpine

WORKDIR /app

# Copy code
COPY . .
# Install node modules
RUN npm install
# Build dist
RUN npm run build

# Install serve
RUN npm install -g serve

CMD serve -s build -l $PORT