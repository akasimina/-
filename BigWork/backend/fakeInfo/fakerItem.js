const faker = require('faker');
const mongoose = require('mongoose');
const { Attendance, Teacher, Course, Student } = require('../models');
const crypto = require('crypto');

const mongoURI = 'mongodb://localhost:27017/AttendanceSystem';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


async function generateFakeCourses() {
    const courses = [];
    for (let i = 0; i < 4; i++) {
        const courseId = 'C' + faker.datatype.number({ min: 100000, max: 999999 });
        const courseName = faker.random.arrayElement(['软件工程', '计算机科学', '数据分析', '人工智能']);
        const weekday = faker.random.arrayElement(['一', '二', '三', '四', '五']);
        const startHour = faker.datatype.number({ min: 8, max: 16 });
        const endHour = startHour + 1;
        const courseTime = `周${weekday} ${startHour}:00-${startHour}:40; ${startHour}:50-${endHour}:30`;
        const courseLocation = `C${faker.datatype.number({ min: 1, max: 9 })}-${faker.datatype.number({ min: 100, max: 999 })}`;

        courses.push({
            _id: courseId,
            course_name: courseName,
            course_time: courseTime,
            course_location: courseLocation
        });
    }
    try{
        await Course.insertMany(courses);
        console.log('Fake courses inserted into database.');
    }catch( error ){
        console.error("Error inserting fake courses:", error);
    }// }finally{
    //     mongoose.connection.close();
    // }
    
}

async function generateFakeTeachers(){
    const teachers = [];

    for ( let i = 0; i < 2; i++ ){
        const teacherId = 'T' + faker.datatype.number({ min: 100000000, max: 999999999 });

        const rawPassword = faker.internet.password();

        console.log("teacher "+ i + ":" + rawPassword);

        const hashedPassword = crypto.createHash('sha256').update(rawPassword).digest('hex');
        
        const teacher = {
            _id: teacherId,
            teacher_name: faker.name.findName(),
            password: hashedPassword, // 存储哈希后的密码
            // 'courses' 和 'Initiate_attendance' 暂时不包含
          };
          teachers.push(teacher);
    }
    try{
        await Teacher.insertMany(teachers);
        console.log('Fake teachers inserted into database.');
    }catch( error ){
        console.error("Error inserting fake teachers:", error);
    }// }finally{
    //     mongoose.connection.close();
    // }

}

async function generateFakeStudents() {
    const students = [];
    for (let i = 0; i < 4; i++) {
        const studentId = 'S' + faker.datatype.number({ min: 100000000, max: 999999999 });
        const studentName = faker.name.findName();
        const rawPassword = faker.internet.password();

        // 使用 SHA-256 哈希算法加密密码
        const hashedPassword = crypto.createHash('sha256').update(rawPassword).digest('hex');

        students.push({
            _id: studentId,
            name: studentName,
            password: hashedPassword,
            // 'attendance_record' 和 'courses' 暂时留空
            attendance_record: [],
            courses: []
        });
    }
    try{
        await Student.insertMany(students);
        console.log('Fake students inserted into database.');
    }catch( error ){
        console.error("Error inserting fake students:", error);
    }
}

async function generateFakeAttendances() {
    const attendances = [];
    for (let i = 0; i < 4; i++) {
        const attendanceId = faker.datatype.uuid();
        const courseOwnership = 'C' + faker.datatype.number({ min: 100000, max: 999999 });

        // 随机生成开始和结束时间
        const startTime = faker.date.recent();
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 假设课程时长为2小时

        // 随机生成出勤学生数量
        const attendanceNumber = faker.datatype.number({ min: 1, max: 30 });

        attendances.push({
            _id: attendanceId,
            attendance_student: [], // 在实际应用中，这里可以填充学生ID
            course_ownership: courseOwnership,
            start_time: startTime,
            end_time: endTime,
            attendance_number: attendanceNumber
        });
    }
    try{
        await Attendance.insertMany(attendances);
        console.log('Fake attendances inserted into database.');
    }catch( error ){
        console.error("Error inserting fake attendances:", error);
    }
    
}

async function main() {
    try {
      await generateFakeCourses();
      await generateFakeTeachers();
      await generateFakeStudents();
      await generateFakeAttendances();
    } catch (error) {
      console.error('Error during data generation:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  main();