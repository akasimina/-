const { Attendance, Teacher, Course, Student } = require('./models');
const { jwtSecret } = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class TeacherController{

    static clients = [];

    // 登陆验证
    async teacherLogin(req, res){
        console.log(111);
        try{
            const { id, password } = req.body;

            const teacher = await Teacher.findOne({ _id: id }).exec();

            if( !teacher ) return res.status(400).json({message: "Teacher does not exist"});

            const isMatch = await bcrypt.compare(password, teacher.password);

            if( !isMatch ) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ teacherId: teacher._id }, jwtSecret, { expiresIn: '1h' });

            res.json({
                token,
                _id: teacher._id,
                name: teacher.name,
                courses: teacher.courses,
                manager: teacher.manager
            });
        } catch( error ) { res.status(500).json({ message: 'Server error' }); }
    }

    // 展示所有的课程
    async displayCourse(req, res){
        console.log(11111);
        const { courses } = req.body;
        try{
           
            const courseData = await Course.find({ _id: { $in: courses } });

            res.json(courseData);
        }catch( error ) { res.status(500).send(error.message); }
    }

    // 展示学生列表
    // 这里需要查询字符串
    async displayStudent(req, res){
        const courseId = req.query.id;
        try{
            const course = await Course.findById(courseId);
            if( !course ) return res.status(404).send();

            const studentIds = course.students;
            const students = await Student.find({ _id: { $in: studentIds } }).select("_id name _class");;

            res.json(students);
        }catch( error ){
            res.status(500).send(error.message);
        }
    }

    // 编辑学生信息，这一步有三个步骤
    async editStudentInformation(req, res){
        const { operation, student_id, course_id } = req.body;
        try{

            if( operation == 'edit' ){
                const { update } = req.body;
                console.log(update);
                await Student.findByIdAndUpdate( student_id, { $set: update } );
            }else if( operation == 'add' ){
                try{ 
                    await Course.findByIdAndUpdate(
                        course_id,
                        { $addToSet: { students: student_id } },
                        { new: true }
                    );
                }catch ( error ){
                    console.error('Error adding student to course:', error);
                    throw error;
                }
            }else if( operation == 'delete' ){
                try{
                    await Course.findByIdAndUpdate(
                        course_id,
                        { $pull: { students: student_id } },
                        { new: true }
                    );
                }catch ( error ){
                    console.error('Error deleting student to course:', error);
                    throw error;
                }
            }

            res.send("操作成功");

        }catch ( error ) { res.status(500).send(error.message); }
    }

    // 编辑课程信息
    async editCoursesInformation(req, res){
        const { operation, course_id } = req.body;
        try{
            
            if( operation == 'edit' ){
                const { update } = req.body;
                await Course.findByIdAndUpdate( course_id, { $set: update } );
            }else if( operation == 'add' ){
                const { _id, name, location, time, _class, college, teachers } = req.body;
                const newCourse = new Course({
                    _id,
                    name,
                    location,
                    time,
                    _class,
                    college,
                    teachers,
                    students: []
                });
                console.log(11111111);
                try {
                    // 保存新课程
                    await newCourse.save();
                    console.log(222222);
                    // 遍历教师数组，并更新每个教师的课程列表
                    for (let teacherId of newCourse.teachers) {
                        await Teacher.findByIdAndUpdate(
                            teacherId, 
                            { $addToSet: { courses: newCourse.id } }, // 使用 $addToSet 添加新课程ID
                            { new: true }
                        );
                    }
                    console.log(3333333);
                }catch (error) {
                    console.error('Error adding new course and updating teachers:', error);
                    res.status(500).send(error.message);
                }
            }else if( operation == 'delete' ){
                const session = await mongoose.startSession(); 
                session.startTransaction();
                try{
                    // 先删除包含courseid的teahcer中的course中的值
                    await Teacher.updateMany(
                        { courses: course_id },
                        { $pull: { courses: course_id } },
                        { session }
                    )
                    // 然后删除包含courseid的student中的student中的course中的值
                    await Student.updateMany(
                        { courses: course_id },
                        { $pull: { courses: course_id } },
                        { session }
                    )
                    // 删除所有相关的考勤记录
                    await Attendance.deleteMany(
                        { course: course_id },
                        { session }
                    );
                    // 最后再删除course自己
                    await Course.findByIdAndDelete(course_id, { session });

                    // 提交事务
                    await session.commitTransaction();
                    console.log('Course and related data successfully removed.');
                }catch ( error ){
                    await session.abortTransaction();
                    console.error('Error removing course:', error);
                    throw error;
                }finally { session.endSession(); }
            }
            
            res.send("操作成功");

        }catch ( error ) { res.status(500).send(error.message) };
    }

    // 展示签到信息表，不将学生列表到前端
    // 使用get的查询字符串
    async getattendanceForm(req, res){
        const courseId = req.query.id;

        try{
            const attendance = await Attendance.find({ course: courseId }).select("_id ssid current_day start_time end_time");

            res.json(attendance);
        }catch (error){ res.status(500).send(error.message) };

    }

    // 展示特定的一个出勤记录
    async attendanceForm(req, res){
        const attendance_id = req.query.id;

        try{
            const attendanceRecord = await Attendance.findById(attendance_id);
            if( !attendanceRecord ) return res.status(404).send("出勤记录未找到");

            const normalStudents = await Student.find({ _id: { $in: attendanceRecord.normal_attendance } }).select("_id name _class");
            const lateStudents = await Student.find({ _id: { $in: attendanceRecord.late_attendance } }).select("_id name _class");
            const absentStudents = await Student.find({ _id: { $in: attendanceRecord.absence_attendance } }).select("_id name _class");
            const leaveStudents = await Student.find({ _id: { $in: attendanceRecord.ask_for_leave } }).select("_id name _class");


            res.json({
                '正常': normalStudents,
                '迟到': lateStudents,
                '缺勤': absentStudents,
                '请假': leaveStudents
            });
        }catch ( error ) { res.status(500).send(error.message); }
    }

    // 创建一个考勤记录
    async startAttendance(req, res){
        const { _id, ssid, course, current_day, start_time, end_time } = req.body;

        try{
            const newAttendance = new Attendance({
                _id,
                course,
                current_day,
                ssid,
                start_time,
                end_time,
                normal_attendance: [],
                late_attendance: [],
                absence_attendance: [],
                ask_for_leave: []
            });
            await newAttendance.save();
            res.status(201).json(newAttendance);
        } catch( error ) { res.status(500).send(error.message); }
    }

    //SSE单项数据流，
    sendStudents(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        clients.push(res);

        req.on('close', () => {
            clients = clients.filter(client => client !== res);
        })
    }

    //数据库触发器，用来监听考勤记录
    static setupAttendanceChangeSteam() {
        const changeStream = Attendance.watch();
        
        changeStream.on('change', (change) => {
            if( change.operationType === 'update' ){
                const updatedFields = change.updateDescription.updatedFields;
                const attendanceFields = ['normal_attendance', 'late_attendance', 'absence_attendance', 'ask_for_leave'];
                
                let updatesToSend = {};

                attendanceFields.forEach(field => {
                    if( updatedFields.hasOwnProperty(field) ){
                        const newEntries = updatedFields[field];
                        const newEntry = newEntries[newEntries.length - 1];
                        updatesToSend[field] = newEntry;
                    }
                });

                if (Object.keys(updatesToSend).length > 0){
                    clients.forEach(client => {
                        client.write(`data: ${JSON.stringify(updatesToSend)}\n\n`);
                    })
                }
            }
        })

    }

    // 结束考勤
    async endAttendance(req, res){
        const { manuals, ask_for_leave, attendance_id } = req.body;
        
        try{
            const attendance = await Attendance.findById(attendance_id);

            if( !attendance ) { return res.status(404).send('考勤记录未找到'); }

            attendance.normal_attendance = attendance.normal_attendance.concat(manuals);
            attendance.ask_for_leave = attendance.ask_for_leave.concat(ask_for_leave);

            await attendance.save();
            res.status(200).send('考勤更新成功');
        } catch(error){ res.status(500).send(error.message); }

    }


}

module.exports = TeacherController














