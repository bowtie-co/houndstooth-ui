####################################################
# Base node image for dev + builder
####################################################
FROM node:8-alpine as dev
LABEL maintainer "Charlie McClung <charlie@bowtie.co>"
ENV BASE_DIR /app
RUN mkdir -p ${BASE_DIR} && \
    npm i -g npm && \
    apk add --no-cache git openssh bash
WORKDIR ${BASE_DIR}
COPY package.json package-lock.json ./
RUN npm install
COPY . ${BASE_DIR}
COPY node-entrypoint.sh /
ENTRYPOINT [ "/node-entrypoint.sh" ]
CMD [ "npm", "start" ]

####################################################
# run builder from dev for both staging & production
####################################################
FROM dev as builder
LABEL maintainer "Charlie McClung <charlie@bowtie.co>"
ENV BASE_DIR /app
RUN APP_ENV=staging npm run build && mv build ${BASE_DIR}/staging
RUN APP_ENV=production npm run build && mv build ${BASE_DIR}/production

####################################################
# run staging/production environment (based on ENV)
####################################################
FROM nginx:1.13.9-alpine
LABEL maintainer "Charlie McClung <charlie@bowtie.co>"
ENV BASE_DIR /app
RUN rm -rf /etc/nginx/conf.d
COPY nginx-entrypoint.sh /
COPY nginx /etc/nginx
COPY --from=builder ${BASE_DIR} ${BASE_DIR}
EXPOSE 80
ENTRYPOINT [ "/nginx-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
