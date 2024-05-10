FROM node:20.12.2

RUN mkdir -p /app
WORKDIR /app

ADD ./package.json /app
ADD ./package-lock.json /app
RUN npm install

ADD . /app

EXPOSE 80 80

CMD ["node", "index.js"]