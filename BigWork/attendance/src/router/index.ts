import { createRouter, createWebHistory } from 'vue-router';

// 引入视图组件
import LoginView from "../views/LoginView.vue";
import CourseView from '../views/CourseView.vue';
import ManageView from '../views/ManageView.vue';
import InfoAttendanceView from '../views/InfoAttendanceView.vue';
import StudentAttendanceView from '../views/StudentAttendanceView.vue';

// 定义路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView, // 登录页面视图
  },
  {
    path: '/course',
    name: 'Course',
    component: CourseView,
  },
  {
    path: '/course/manage/:courseId',
    name: 'CourseManage',
    component: ManageView,
  },
  {
    path: '/course/attendances/:courseId',
    name: 'CourseAttendance',
    component: InfoAttendanceView
  },
  {
    path: '/course/startAttendance/:courseId',
    name: 'CourseStartAttendance',
    component: StudentAttendanceView
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;