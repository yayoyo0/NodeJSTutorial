FROM node:latest
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm i
CMD node /app/app.js &
EXPOSE 1111
