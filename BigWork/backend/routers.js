
const TeacherController = require('./Controller');
const express = require('express');

const router = express.Router();
const teacherController = new TeacherController();

router.post('/teacher/login', teacherController.teacherLogin);

router.post('/teacher/displaycourse', teacherController.displayCourse);

router.get('/teacher/course/displaystudents', teacherController.displayStudent);

router.post('/teacher/course/editstudent', teacherController.editStudentInformation);

router.post('/teacher/course/editCoursesInformation', teacherController.editCoursesInformation);

router.get("/teacher/course/getattendanceForm", teacherController.getattendanceForm);

router.get("/teacher/course/attendanceForm", teacherController.attendanceForm)

router.post("/teacher/course/startAttendance", teacherController.startAttendance);

router.get("/teacher/course/acceptAttendance", teacherController.sendStudents);

router.post("/teacher/course/endAttendance", teacherController.endAttendance);

module.exports = router;





