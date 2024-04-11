const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const teacherRoutes = require('./routers'); // 引入您定义的路由
const TeacherController = require('./Controller');

// !!! 数据库触发器还没有设置

// MongoDB连接字符串
const mongoURI = 'mongodb://mongo:27017/AttendanceSystem';

// 连接MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// 创建Express应用
const app = express();

// 使用中间件
app.use(cors()); // 启用CORS
app.use(morgan('dev')); // 启用日志记录
app.use(bodyParser.json()); // 解析JSON格式的请求体

// 挂载路由
app.use('/api', teacherRoutes);

TeacherController.setupAttendanceChangeSteam();

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 设置端口并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
