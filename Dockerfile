FROM node:18-alpine
WORKDIR /app
# بنقول له انسخ الملفات من نفس الفولدر اللي أنت فيه
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]