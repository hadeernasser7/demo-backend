const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. استدعاء مكتبة CORS

const app = express();

// 2. تفعيل الإعدادات الأساسية
app.use(cors()); // السماح لأي فرونت إند بطلب بيانات من السيرفر
app.use(express.json()); // السماح للسيرفر بفهم بيانات الـ JSON اللي جاية من الطالب

// سطر الاتصال بمونجو
const mongoURI = "mongodb+srv://hadeer:12345@cluster0.4drd9vh.mongodb.net/GraduationDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ متصل بمونجو ومستعد لاستقبال بيانات الطلاب!'))
  .catch(err => console.error('❌ فشل الاتصال:', err));

// 3. تصميم هيكل بيانات الطلاب (Schema)
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

app.get('/', (req, res) => {
  res.send('<h1>سيرفر مشروع هدير شغال وجاهز للربط بـ Azure!</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));