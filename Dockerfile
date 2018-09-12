FROM node:carbon

WORKDIR /app

RUN npm install -g nodemon

CMD npm install ; nodemon
