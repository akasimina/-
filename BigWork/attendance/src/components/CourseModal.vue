<!-- 用来展示课程模态框 -->
<template>
    <n-modal
        :show="showModal"
        preset="dialog"
        :bordered="true"
        content="请选择接下来的操作"
        :title="props.course_name"
        positive-text="进行签到"
        negative-text="班级管理"
        :closeable="false"
        @mask-click="close"
        @positive-click="inClassClick"
        @negative-click="manageClassClick">
    </n-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { NModal } from 'naive-ui';
import { useRouter } from 'vue-router';

const props = defineProps({
    showModal: Boolean,
    course_name: String,
    course_id: String,
});

const router = useRouter();

const emit = defineEmits(['changeShow']);

console.log("sdfadsf");
console.log(props.course_id);

const close = () => {
    emit("changeShow", false);
};

const inClassClick = () => {
    // 处理逻辑
    router.push({ name: 'CourseStartAttendance', params: { courseId: props.course_id } });
    console.log("inClassClick");
    close();
};

const manageClassClick = () => {
    // 处理逻辑
    router.push({ name: 'CourseManage', params: { courseId: props.course_id } });
    console.log("manageClassClick");
    close();
};
</script>















