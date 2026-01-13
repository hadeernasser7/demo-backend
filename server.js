const express = require('express');
const mongoose = require('mongoose');
const app = express();

// سطر الاتصال بتاعك
const mongoURI = "mongodb+srv://hadeer:12345@cluster0.4drd9vh.mongodb.net/GraduationDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ تم الاتصال بمونجو بنجاح!');
    
    // --- الجزء ده عشان يجبر الداتابيز تظهر عندك ---
    const TestSchema = new mongoose.Schema({ message: String, date: { type: Date, default: Date.now } });
    const TestModel = mongoose.model('Test', TestSchema);
    
    try {
      await TestModel.create({ message: "أول بيان تجريبي من مشروع هدير!" });
      console.log('🚀 تم إنشاء أول سجل بنجاح، شوفي مونجو دلوقتي!');
    } catch (e) {
      console.log('البيان موجود بالفعل أو حصل خطأ بسيط');
    }
    // --------------------------------------------
  })
  .catch(err => console.error('❌ فشل الاتصال:', err));

app.get('/', (req, res) => {
  res.send('<h1>الباك إند متصل وشغال، والبيانات اتبعتت لمونجو!</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));