<template>
  <div id="app">
    <!-- 如果你有一个导航栏可以放在这里，否则就移除这一部分 -->
    <!-- <Navbar /> -->

    <!-- <StudentAttendanceView /> -->
    <!-- <InfoAttendanceView /> -->
    <!-- <ManageView /> -->
    <!-- <CourseView /> -->
    <!-- <StudentAttendanceForm /> -->
    <!-- <LoginView /> -->
    <!-- <SsidQrcode /> -->
    <!-- <CourseManageForm /> -->
    <!-- <CourseManagerThreeButton /> -->
    <!-- <AddCourseButton /> -->
    <!-- <CourseCard :_id="_id" :name="name" :location="location" :time="time" :_class="_class" :college="college"/> -->
    <!-- 路由出口，路由匹配到的组件将渲染在这里 -->
    <router-view />

    <!-- 如果你有一个页脚可以放在这里，否则就移除这一部分 -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
// 如果你有全局组件比如导航栏和页脚可以在这里导入
// import Navbar from './components/Navbar.vue';
// import Footer from './components/Footer.vue';

import LoginForm from './components/LoginForm.vue';
import CourseCard from './components/CourseCard.vue';
import AddCourseButton from './components/AddCourseButton.vue'
import CourseManagerThreeButton from "./components/CourseManagerThreeButton.vue";
import CourseManageForm from "./components/CourseManageForm.vue";
import AttendanceInfoForm from './components/AttendanceInfoForm.vue'
import SsidQrcode from "./components/SsidQrcode.vue";
import LoginView from "./views/LoginView.vue"
import { ref } from 'vue';
import StudentAttendanceForm from "./components/StudentAttendanceForm.vue"
import CourseView from "./views/CourseView.vue"
import ManageView from "./views/ManageView.vue"; 
import InfoAttendanceView from "./views/InfoAttendanceView.vue";
import StudentAttendanceView from "./views/StudentAttendanceView.vue";

// const _id = ref('111');
// const name = ref('111');
// const location = ref('111');
// const time = ref('111');
// const _class = ref('111');
// const college = ref('111');

</script>

<style>
/* 全局样式 */
</style>