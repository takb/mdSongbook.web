# START FRONTEND BUILDING
FROM node as builder
RUN npm install @vue/cli -g

COPY frontend/package.json /frontend/package.json
WORKDIR /frontend
RUN npm i

COPY frontend/ /frontend/
RUN npm run build

# START APP IMAGE
FROM node as app

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
RUN npm install pm2 -g

COPY package.json /app/package.json
WORKDIR /app
RUN npm i --production

COPY --from=builder /frontend/dist /app/frontend/dist

WORKDIR /app
ENV PORT 8080
EXPOSE 8080
USER node

ENTRYPOINT ["/tini", "--"]

CMD ["pm2", "start", "processes.json", "--no-daemon"]
