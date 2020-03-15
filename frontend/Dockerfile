# Build environment
FROM node:12.16.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

# Production environment
FROM nginx:1.17.9-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
