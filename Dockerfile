FROM node:14.15.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "run", "prod"]