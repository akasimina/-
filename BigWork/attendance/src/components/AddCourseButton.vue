<template>
    <n-button :round="true" @click="showAddCourseModal = true">
        创建课程
    </n-button>
    <n-modal
        :show="showAddCourseModal"
        title="请添加新加入的课程字段"
        preset="card"
        @mask-click="close"
        class="custom-modal"
    >
    <n-form @submit.prevent="CreateNewCourse">
        <n-form-item label="课程id">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.course_id"></n-input>
        </n-form-item>
        <n-form-item label="课程名称">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.name"></n-input>
        </n-form-item>
        <n-form-item label="上课地点">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.location"></n-input>
        </n-form-item>
        <n-form-item label="上课时间">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.time"></n-input>
        </n-form-item>
        <n-form-item label="课程类别">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation._class"></n-input>
        </n-form-item>
        <n-form-item label="授课教师">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.teacher"></n-input>
        </n-form-item>
        <n-form-item label="开设学院">
            <n-input :round="true" size="medium" v-model:value="NewCourseInformation.college"></n-input>
        </n-form-item>
        <n-form-item class="centered-form-item">
            <n-button type="primary" native-type="submit" @click="CreateNewCourse" :disabled="isCreating" :round="true" :ghost="true">创建</n-button>
        </n-form-item>
    </n-form>
    </n-modal>

</template>

<script setup>
import { ref, defineProps } from 'vue';
import { NInput } from 'naive-ui';
import axios from "axios"; 

const showAddCourseModal = ref(false);
const props = defineProps({
    teacher_id: String
});

const close = () => {
    showAddCourseModal.value = !showAddCourseModal.value;
}
const isCreating = ref(false); // 用于防止重复提交

const NewCourseInformation = ref({
    course_id: '',
    name: '',
    location: '',
    time: '',
    _class: '',
    college: '',
    teacher: ''
});

const CreateNewCourse = async () => {
    // 创建课程的处理逻辑
    const formData = { 
        operation: "add", 
        course_id: '1234567',
        _id: NewCourseInformation.value.course_id,
        name: NewCourseInformation.value.name,
        location: NewCourseInformation.value.location,
        time: NewCourseInformation.value.time,
        _class: NewCourseInformation.value._class,
        college: NewCourseInformation.value.college,
        teachers: [ NewCourseInformation.value.teacher ]
    };
    console.log(formData);
    await axios.post("http://localhost:3000/api/teacher/course/editCoursesInformation", formData);

    console.log(NewCourseInformation.value);
    close();
}
</script>

<style>
.centered-form-item{
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-modal {
    max-width: 600px; /* 或者其他你想要的宽度 */
}
</style>







