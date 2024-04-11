
<template>

<n-grid :x-gap="12" :y-gap="40">

    <n-gi :span="24" class="contentTitle">
        <n-grid>
            <n-gi :span="2" />
            <n-gi :span="4"><n-button type="primary" :round="true" @click="returnCourse">Back</n-button></n-gi>
            <n-gi :span="5" />
            <n-gi :span="5"><n-gradient-text class="McontentTitle">班级管理</n-gradient-text></n-gi>
            <n-gi :span="8"><CourseManagerThreeButton :course_id="course_id"/></n-gi>
            <n-gi :span="2" />
        </n-grid>
    </n-gi>
    <n-gi :span="3" />
    <n-gi :span="20" class="McontentMain">
        <CourseManageForm :course_id="course_id"/>
    </n-gi>
    <n-gi :span="1" />

</n-grid>

</template>

<script setup>
import CourseManageForm from "../components/CourseManageForm.vue"
import CourseManagerThreeButton from "../components/CourseManagerThreeButton.vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
console.log(route.params.courseId);
const course_id = route.params.courseId;

const returnCourse = () => {
    router.push("/course");
};

</script>

<style>
.McontentTitle{
    font-weight: 1000;
    font-size: 2rem;
}
.McontentMain{
    background-color: #CDF5FD;
    min-height: 600px;
    padding: 1rem;
    border-radius: 1rem;
}
</style>






