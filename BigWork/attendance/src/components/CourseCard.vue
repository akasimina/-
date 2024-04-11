<!-- 用来展示课程卡片 -->
<template>
    <n-card :title="props.name" hoverable @click="showOrNot" class="roundCard">
        <div>上课地点:{{ props.location }}</div>
        <div>上课时间:{{ props.time }}</div>
        <div>课程类别:{{ props._class }}</div>
        <div>开设学院:{{ props.college }}</div>
    </n-card>
    <CourseModal :showModal="showModal" :course_id="props._id" :course_name="props.name" @changeShow="showModal = $event" />
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { NCard } from 'naive-ui';
import CourseModal from './CourseModal.vue';

const props = defineProps({
    _id: String,
    name: String,
    location: String,
    time: String,
    _class: String,
    college: String
});

const showModal = ref(false);

const showOrNot = () => { showModal.value = !showModal.value; };
 
</script>

<style>
.roundCard{
    border-radius: 1rem;
}
</style>





