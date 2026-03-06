FROM node:20-alpine
WORKDIR /app

COPY client/package.json client/yarn.lock* ./client/
RUN cd client && yarn install

COPY client/ ./client/
RUN cd client && yarn build

COPY server/package.json server/yarn.lock* ./server/
RUN cd server && yarn install

COPY server/ ./server/

EXPOSE 4200
CMD ["sh", "-c", "cd /app/server && node_modules/.bin/tsx index.ts"]
