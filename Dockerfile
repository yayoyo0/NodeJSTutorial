FROM node:latest
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm i
CMD npm run start
EXPOSE 1111
