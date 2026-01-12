const express = require('express');
const mongoose = require('mongoose');
const app = express();

// سطر الاتصال بالداتابيز بالباسورد الجديد
const mongoURI = "mongodb+srv://hadeer:12345@cluster0.4drd9vh.mongodb.net/GraduationDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ تم الاتصال بمونجو بنجاح!'))
  .catch(err => console.error('❌ فشل الاتصال:', err));

app.get('/', (req, res) => {
  res.send('<h1>الباك إند متصل بالداتابيز وشغال زي الفل!</h1>');
});

app.listen(5000, () => console.log('Server is running on port 5000'));