FROM node:11
RUN npm install pm2 -g

WORKDIR /app
ADD . /app
RUN npm i --production

WORKDIR /app/frontend
RUN npm i --production
RUN npm run build

WORKDIR /app
ENV PORT 5800
EXPOSE 5800
CMD ["pm2", "start", "processes.json", "--no-daemon"]
