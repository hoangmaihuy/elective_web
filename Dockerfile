FROM node:10.19.0-alpine

WORKDIR /app

ARG APP_ENV

ENV REACT_APP_ENV $APP_ENV

# Copy code
COPY . .
# Install node modules
RUN npm install
# Build dist
RUN npm run build

# Install serve
RUN npm install -g serve

CMD serve -s dist -l $PORT
