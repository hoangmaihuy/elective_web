FROM node:10.19.0-alpine

WORKDIR /app

ENV REACT_APP_ENV $REACT_APP_ENV

# Copy code
COPY . .
# Install node modules
RUN npm install
# Build dist
RUN npm run build

# Install serve
RUN npm install -g serve

CMD serve -s build -l $PORT