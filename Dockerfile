# START FRONTEND BUILDING
FROM node:alpine as builder

COPY frontend/package.json /frontend/package.json
WORKDIR /frontend
RUN npm i

COPY frontend/ /frontend/
RUN npm run build

# START APP IMAGE
FROM node:alpine as app

RUN apk add --no-cache tini
RUN npm install pm2 -g

COPY package.json /app/package.json
WORKDIR /app
RUN npm i --production

COPY --from=builder /frontend/dist /app/frontend

WORKDIR /app
ENV PORT 8080
EXPOSE 8080
USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["pm2", "start", "processes.json", "--no-daemon"]
