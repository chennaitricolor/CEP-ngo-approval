FROM node:10-alpine as UIbuilder
WORKDIR /app
COPY ./client ./
RUN npm install
RUN npm run build

FROM node:10-alpine 
WORKDIR /app
COPY ./server ./
COPY --from=UIbuilder /app/build /build
RUN mkdir temp
RUN npm install -g pm2
RUN npm install
EXPOSE 4000
CMD npm run deploy