FROM node:20-alpine
WORKDIR /app

COPY client/package.json client/yarn.lock* ./client/
RUN cd client && yarn install

ARG VITE_AUTH_MODE=jwt
ARG VITE_METABASE_INSTANCE_URL
ARG VITE_DASHBOARD_ID=1

ENV VITE_AUTH_MODE=$VITE_AUTH_MODE
ENV VITE_METABASE_INSTANCE_URL=$VITE_METABASE_INSTANCE_URL
ENV VITE_DASHBOARD_ID=$VITE_DASHBOARD_ID

COPY client/ ./client/
RUN cd client && yarn build

COPY server/package.json server/yarn.lock* ./server/
RUN cd server && yarn install

COPY server/ ./server/

EXPOSE 4200
CMD ["sh", "-c", "cd /app/server && node_modules/.bin/tsx index.ts"]
