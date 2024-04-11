const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Teacher } = require('../models.js');

// MongoDB 连接字符串
const mongoURI = 'mongodb://localhost:27017/AttendanceSystem';

// 连接到数据库
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// 创建并保存用户的函数
async function createUser(userData) {
  try {
    // 生成盐并哈希密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 创建用户对象
    const user = new Teacher({
      ...userData,
      password: hashedPassword
    });

    // 保存到数据库
    await user.save();
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // 断开数据库连接
    mongoose.connection.close();
  }
}

// 调用函数以创建新用户
createUser({
  _id: 'T12306',
  teacher_name: 'John Doe',
  password: '111222333' // 这是未哈希的密码
});
