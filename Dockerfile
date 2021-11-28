FROM node:12-alpine
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["node","app.js"]