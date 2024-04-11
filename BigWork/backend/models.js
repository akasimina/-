const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeacherSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: String,
    password: String,
    manager: Boolean,
    courses: [ {type: String, ref: 'Course'} ]  
});

const StudentSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: String,
    password: String,
    _class: String,
    courses: [ { type: String, ref: 'Course' } ]
});

const CourseSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: String,
    location: String,
    time: String,
    _class: String, // 选修还是必修
    college: String,  // 开设学院
    teachers: [ { type: String, ref: 'Teacher' } ],
    students: [ { type: String, ref: 'Student' } ]
});

const attendanceSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    course: { type: String, ref: 'Course' },
    current_day: String,
    ssid: String,
    start_time: String,
    end_time: String,
    normal_attendance: [{ type: String, ref: 'Student' }],
    late_attendance: [{ type: String, ref: 'Student' }],
    absence_attendance: [{ type: String, ref: 'Student' }],
    ask_for_leave: [{ type: String, ref: 'Student' }]
});

module.exports = {
    Attendance: mongoose.model('Attendance', attendanceSchema),
    Teacher: mongoose.model('Teacher', TeacherSchema),
    Course: mongoose.model('Course', CourseSchema),
    Student: mongoose.model('Student', StudentSchema)
  };







