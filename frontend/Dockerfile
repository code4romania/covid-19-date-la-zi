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

HEALTHCHECK --interval=60s --timeout=3s --retries=3 \
    CMD wget -q http://localhost || exit 1

EXPOSE 80

# Add bash
RUN apk add --no-cache bash

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
#CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
