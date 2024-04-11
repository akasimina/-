
<template>
<n-grid :x-gap="12" :y-gap="40">
    <n-grid-item :span="24">
        <n-grid :x-gap="6" :y-gap="4">
            <n-grid-item :span="9" />
            <n-grid-item :span="9">
                <n-gradient-text :size="24" type="success" class="CcontentClass">请选择要操作的班级</n-gradient-text>
            </n-grid-item>
            <n-grid-item :span="6">
                <AddCourseButton :teacher_id="store.teacher_info._id"/>
            </n-grid-item>
        </n-grid>
    </n-grid-item>
    <n-grid-item :span="2" />
    <n-grid-item :span="20" class="CcontentMain">
        <n-grid  :x-gap="12" :y-gap="8">
            <n-grid-item v-for="course in courses_2" :key="course._id" :span="6">
                <CourseCard :_id="course._id" :name="course.name" :location="course.location" :time="course.time" :_class="course._class" :college="course.college" />
            </n-grid-item>
        </n-grid>
    </n-grid-item>
    <n-grid-item :span="2" />
</n-grid>
</template>

<script setup>
import AddCourseButton from '../components/AddCourseButton.vue';
import CourseCard from '../components/CourseCard.vue';
import { ref } from "vue";
import axios from 'axios'
import { useTeacherInformation } from '@/stores/teacherStore.ts'; 
import { onMounted } from 'vue';

const store = useTeacherInformation();
const courses_2 = ref([]);

const fetchCourses = async () => {
    try{
        const response = await axios.post("http://localhost:3000/api/teacher/displaycourse", { courses: store.teacher_info.courses });
        courses_2.value = response.data;
        console.log(courses_2.value);
    } catch (error){
        console.error("Error fetching greeting:", error);
    }
}

onMounted(() => {
    fetchCourses();
})

</script>

<style>
.CcontentMain{
    border-radius: 1rem;
    background-color: #FAF2D3;
    min-height: 40rem;
    padding: 1rem;
}
.CcontentClass{
    font-weight: 1000;
}
</style>



