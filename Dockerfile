FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node", "/app/server.js"]
EXPOSE 8081
LABEL maintainer="Docker@MarkKozel.net"