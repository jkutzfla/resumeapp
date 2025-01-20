FROM node:lts-alpine
ENV NODE_ENV=development

LABEL version="0.0.3"

WORKDIR /express-api
COPY backend/package.json ./ 
RUN npm install
COPY backend/app.js .

EXPOSE 3003
CMD ["node", "app.js"]


# CMD ["echo", "hello world"]


#
# Commands:

# docker build -t my-node-app .
# docker run -p 3003:3003  my-node-app
#
