<template>

<n-grid :x-gap="12" :y-gap="40">
    <n-gi :span="24">
        <n-grid :x-gap="12" :y-gap="8">
            <n-gi :span="3" />
            <n-gi :span="2"><n-button type="primary" :round="true" :ghost="true" @click="returnCourse">Back</n-button></n-gi>
            <n-gi :span="4" />
            <n-gi :span="15"><n-gradient-text class="ScontentTitle">学生签到页面</n-gradient-text></n-gi>
        </n-grid>
    </n-gi>
    <n-gi :span="2" />
    <n-gi :span="6" class="ScontentSide">
        <SsidQrcode :totalNumber="totalNumber" 
                    :manual="manual" 
                    :ask_for_leave="ask_for_leave"
                    :attendanceNumber="attendanceNumber"/></n-gi>
    <n-gi :span="14" class="ScontentMain">
        <StudentAttendanceForm :course_id="route.params.courseId" 
                                @returnTotal="totalNumber = $event" 
                                :manual="manual" 
                                :ask_for_leave="ask_for_leave"
                                @addManual="manual.push($event)"
                                @addAskForLeave="ask_for_leave.push($event)"
                                @addStudentNumber="attendanceNumber = attendanceNumber + $event"
                                /></n-gi>
    <n-gi :span="2" />
</n-grid>

</template>

<script setup>
import SsidQrcode from "../components/SsidQrcode.vue";
import StudentAttendanceForm from "../components/StudentAttendanceForm.vue";
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

const manual = ref([]);
const ask_for_leave = ref([]);

const totalNumber = ref(0);
const attendanceNumber = ref(0);

const returnCourse = () => {
    router.push({ name: "Course"});
};

</script>

<style>
.ScontentTitle{
    font-size: 2rem;
    font-weight: 1000;
}
.ScontentMain{
    background-color:#F6D6D6;
    min-height: 500px;
    padding: 1rem;
    border-radius: 1rem;
}
.ScontentSide{
    background-color: #F1EFEF;
    min-height: 500px;
    padding: 1rem;
    padding-top: 4rem;
    border-radius: 1rem;
}
</style>


