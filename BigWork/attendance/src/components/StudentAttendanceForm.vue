<template>
<n-data-table
    :columns="columns"
    :border="false"
    :data="data1"
/>
</template>

<script setup>
import { h, ref, onMounted, defineProps, defineEmits } from 'vue';
import { NButton } from 'naive-ui';
import axios from 'axios';

const props = defineProps({
    course_id: String,
    manual: Array,
    ask_for_leave: Array
});

const emit = defineEmits(['returnTotal', 'addManual', 'addAskForLeave', 'addStudentNumber']);

const data1 = ref([]);

const getStudentInfo = async () => {
    try{
        console.log(props.courseId);
        const response = await axios.get("http://localhost:3000/api/teacher/course/displaystudents", { params: { id: props.course_id } });
        data1.value = response.data;
        data1.value = response.data.map(student => ({
            ...student,
            attendance: "未签到" // 添加 'attendance' 字段并设置默认值
        }));
        emit("returnTotal", data1.value.length);
        console.log(data1);
    }catch( error ){
        console.error("Error fetching greeting:", error);
    }
};  

const columns = [
    { title: "_id", key:"_id" },
    { title: "name", key: "name" },
    { title: "_class", key: "_class" },
    { title: "attendance", key: "attendance" },
    { title: "ask_for_leave", key: "ask_for_leave", render(row){
        return h(
            NButton,
            {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => askForLeave(row),
          },
          { default: () => "请假" }
        )
    } },
    { title: "manual", key: "manual", render(row){
        return h(
            NButton,
            {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => ManualAttendance(row),
          },
          { default: () => "手动签到" }
        )
    } }
];


const ManualAttendance = (row) => {
    row.attendance = "手动签到";
    emit("addManual", row._id);
    emit("addStudentNumber", 1);
};

const askForLeave = (row) => {
    row.attendance = "请假";
    emit("addAskForLeave", row._id);
};

onMounted(() => {
    getStudentInfo();
});

</script>






