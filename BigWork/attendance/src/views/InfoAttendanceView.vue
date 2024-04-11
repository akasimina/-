<template>

<n-grid :x-gap="12" :y-gap="40">
    <n-gi :span="24">
        <n-grid x-gap="12" :y-gap="8">
            <n-gi :span="2" />
            <n-gi :span="2" ><n-button type="primary" :round="true" :ghost="true" @click="returnManage">Back</n-button></n-gi>
            <n-gi :span="5" />
            <n-gi :span="10"><n-gradient-text class="IcontentTitle">班级签到信息表</n-gradient-text></n-gi>
            <n-gi :span="5" />
        </n-grid>
    </n-gi>
    <n-gi :span="2" />
    <n-gi :span="20" class="IcontentMain">
        <AttendanceInfoForm :course_id="course_id"/>
    </n-gi>
    <n-gi :span="2" />

</n-grid>


</template>

<script setup>
import AttendanceInfoForm from "../components/AttendanceInfoForm.vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const course_id = route.params.courseId;

const returnManage = () => {
    router.push({ name: "CourseManage", params: { courseId: course_id } });
};

</script>

<style>
.IcontentTitle{
    font-size: 2rem;
    font-weight: 1000;
}
.IcontentMain{
    background-color: #B4D4FF;
    min-height: 500px;
    padding: 1rem;
    border-radius: 1rem;
}
</style>



