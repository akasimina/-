<template>
        <n-space align="center" vertical>
            <n-qr-code :value="ssid" error-correction-level="H"/>
            <n-input v-model:value="ssid" :max-length="60" type="password" :round="true"/>
            <n-countdown :duration="countDownTime * 1000" :active="active" class="countdown"></n-countdown>
            <n-input-number v-model:value="countDownTime" :round="true" class="Input" placeholder="请输入秒" />
            <div class="static">
            <n-row>
                <n-col :span="4"></n-col>
                <n-col :span="10">
                    <n-statistic label="已签到人数" :value="attendanceNumber"></n-statistic>
                </n-col>
                <n-col :span="10">
                    <n-statistic label="总人数" :value="props.totalNumber"></n-statistic>
                </n-col>
            </n-row>
            </div>
            <n-grid :x-gap="12" :y-gap="8">
                <n-gi :span="2" />
                <n-gi :span="8"><n-button type="primary" :round="true" @click="startAttendance" :ghost="true">开始考勤</n-button></n-gi>
                <n-gi :span="14"><n-button type="error" :round="true" @click="endAttendance" :ghost="true">结束考勤</n-button></n-gi>
            </n-grid>
        </n-space>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { ref, defineProps } from "vue";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const props = defineProps({
    totalNumber: Number,
    attendanceNumber: Number,
    manual: Array,
    ask_for_leave: Array
})

const _id = uuidv4();

const route = useRoute();

const ssid = ref('');

const countDownTime = ref(0);


const active = ref(false);

const startAttendance = async () => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + countDownTime.value * 1000);
    const formData = {
        _id: _id,
        course: route.params.courseId,
        current_day: startTime.toLocaleDateString(),
        ssid: ssid.value,
        start_time: startTime.toLocaleTimeString(),
        end_time: endTime.toLocaleTimeString(),
    };
    try{
        await axios.post("http://localhost:3000/api/teacher/course/startAttendance", formData);
    }catch(error){
        console.error("Error fetching greeting:", error);
    };
    active.value = true;
}

const endAttendance = async () => {
    active.value = false;
    try{
        const formData = { manuals: props.manual, ask_for_leave: props.ask_for_leave, attendance_id: _id };
        await axios.post("http://localhost:3000/api/teacher/course/endAttendance", formData);
    }catch(error){
        console.error("Error fetching greeting:", error);
    }
}

</script>

<style>
.Input{
    max-width: 20rem;
}
.static{
    min-width: 15rem;
}
</style>







