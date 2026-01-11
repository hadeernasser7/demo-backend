# اختيار النسخة
FROM node:18-alpine

# تحديد مكان العمل
WORKDIR /app

# نسخ ملفات المكتبات
COPY package*.json ./

# تحميل المكتبات
RUN npm install

# نسخ الكود بالكامل
COPY . .

# فتح المنفذ (البورت)
EXPOSE 5000

# تشغيل السيرفر
CMD ["node", "server.js"]