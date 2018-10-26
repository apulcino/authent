
FROM node:8
WORKDIR /usr/src
COPY ./package.json /usr/src/authent/
COPY ./package-lock.json /usr/src/authent/
COPY . /usr/src/authent/
COPY ./config /usr/src/config/
RUN cd /usr/src/authent; npm install
RUN cd /usr/src/authent/library; npm install
RUN cd .. && cd ..
CMD ["node", "./authent/server.js"]
EXPOSE 8080

