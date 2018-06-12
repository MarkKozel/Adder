FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node", "/app/server-docker.js"]
EXPOSE 3123
LABEL maintainer="Docker@MarkKozel.net"