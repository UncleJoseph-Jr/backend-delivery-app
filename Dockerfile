FROM node:18
WORKDIR /app
COPY package.json .
COPY package-json.json .
RUN npm install
COPY ..
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "start"]