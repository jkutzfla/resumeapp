FROM node:lts-alpine AS builder
ENV NODE_ENV=development

LABEL version="0.0.3"

WORKDIR /app
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY backend/package.json ./ 
RUN npm install --omit=dev
COPY --from=builder /app/dist ./public
COPY backend/app.js .

EXPOSE 3003
CMD ["node", "app.js"]


# CMD ["echo", "hello world"]


#
# Commands:

# docker build -t my-node-app .
# docker run -p 3003:3003  my-node-app
#
