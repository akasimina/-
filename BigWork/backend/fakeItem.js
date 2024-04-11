
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const readlineSync = require('readline-sync');
const { Attendance, Teacher, Course, Student } = require('./models');

const mongoURI = 'mongodb://mongo:27017/AttendanceSystem';

// 连接MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

async function addTeacher(){
    const _id = readlineSync.question("Enter teacher id: ");
    const name = readlineSync.question("Enter teacher name: ");
    const password = readlineSync.question('Enter password: ');
    let manager = readlineSync.question('Enter boolean manager: ');

    const hashedPassword = await bcrypt.hash(password, 10);
    manager == 'true' ? manager = true : manager = false;

    const teacher = new Teacher({
        _id,
        name,
        password: hashedPassword,
        manager,
        courses: []
    });

    try{
        await teacher.save();
        console.log('Teacher added successfully');
    }catch (error){
        console.error('Error adding teacher: ', error);
    }
    
}

async function addStudent(){
    const _id = readlineSync.question("Enter student id: ");
    const name = readlineSync.question("Enter student name: ");
    const password = readlineSync.question('Enter student password: ');
    const _class = readlineSync.question('Enter class: ');

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
        _id,
        name,
        password: hashedPassword,
        courses: [],
        _class
    });

    try{
        await student.save();
        console.log('student added successfully');
    }catch (error){
        console.error('Error adding student: ', error);
    }
    
}

async function addCourse(){
    const _id = readlineSync.question("Enter course id: ");
    const name = readlineSync.question("Enter course name: ");
    const location = readlineSync.question('Enter location: ');
    const time = readlineSync.question("Enter time: ");
    const class_ = readlineSync.question("Enter class(选必修): ");
    const college = readlineSync.question("Enter college: ");

    const course = new Course({
        _id,
        name,
        location,
        time,
        class_,
        college,
        teachers: [],
        students: []
    });

    try{
        await course.save();
        console.log('Course added successfully');
    }catch (error){
        console.error('Error adding Course: ', error);
    }
    
}

async function main() {
    await addTeacher();
    await addStudent();
    await addCourse();

    mongoose.disconnect().then(() => {
        console.log('数据库连接已断开');
    });
}

main();