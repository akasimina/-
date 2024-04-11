<template>
<n-data-table 
    :columns="columns"
    :border="false"
    :data="data1"
/>
</template>

<script setup>
import { h, ref, defineProps, onMounted } from 'vue';
import { NButton } from 'naive-ui';
import axios from 'axios';
 
const props = defineProps({
  course_id: String,
});

const data1 = ref([]);

const columns = [
    { title: "_id", key: "_id" },
    { title: "ssid", key: "ssid" },
    { title: "current_day", key: "current_day" },
    { title: "start_time", key: "start_time" },
    { title: "end_time", key: "end_time" },
    { title: "check", key: "check",  render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => CheckInfo(row),
          },
          { default: () => "Check" }
        );
      },}
];

const getAttendanceInfo = async () => {
    try{
      const response = await axios.get("http://localhost:3000/api/teacher/course/getattendanceForm", { params: { id: props.course_id } });
      data1.value = response.data;
    }catch(error){
      console.error("Error fetching greeting:", error);
    }
};


const CheckInfo = (row) => {
    console.log(row);
};  

onMounted(() => {
  getAttendanceInfo();
})

</script>















