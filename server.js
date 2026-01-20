const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();

// 1. تفعيل CORS للسماح للفرونت إند يكلم الباك إند
app.use(cors()); 
app.use(express.json()); 

// 2. استخدام متغير البيئة (Environment Variable) اللي حطناه في Azure
// لو مش موجود هيستخدم السطر بتاعك كاحتياطي (Fallback)
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://hadeer:12345@cluster0.4drd9vh.mongodb.net/GraduationDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ متصل بمونجو ومستعد لاستقبال بيانات الطلاب!'))
  .catch(err => console.error('❌ فشل الاتصال:', err));

// 3. تصميم هيكل بيانات الطلاب
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    department: String,
    studentID: String,
    createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// 4. نقطة النهاية (Route) لاستقبال بيانات الطلاب
app.post('/add-student', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "🚀 تم تسجيل الطالب بنجاح!" });
    } catch (error) {
        res.status(400).json({ error: "خطأ في عملية التسجيل" });
    }
});

// 5. نقطة اختبار للسيرفر
app.get('/', (req, res) => {
  res.send('<h1>سيرفر مشروع هدير شغال وجاهز للربط بـ Azure!</h1>');
});

// 6. البورت: Azure بيستخدم process.env.PORT بشكل تلقائي
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));