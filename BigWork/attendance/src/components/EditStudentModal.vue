
<template>
    <n-modal
        :show="props.showEditStudent"
        preset="card"
        title="编辑学生信息"
        @mask-click="close"
        class="Edit-modal">
        <n-form>
            <n-form-item label="请修改姓名">
                <n-input :round="true" size="medium" v-model:value="student_name"></n-input>
            </n-form-item>
            <n-form-item label="请修改班级">
                <n-input :round="true" size="medium" v-model:value="student_class"></n-input>
            </n-form-item>
            <n-form-item class="centered-form-item">
                <n-button
                    type="primary"
                    @click="EditStudentInfo"
                    :round="true"
                    :ghost="true"
                >确认修改</n-button>
            </n-form-item>
        </n-form>

    </n-modal>
</template>

<script setup>

import { defineProps, ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['changeShow', 'changeName', 'changeClass']);

const props = defineProps({
    showEditStudent: Boolean,
    student: Object,
    course_id: String
});

const student_class = ref('');
const student_name = ref('');

const close = () => {
    emit("changeShow", false);
};

const EditStudentInfo = async () => {
    const formDataParams = { 
        operation: "edit", 
        student_id: props.student._id, 
        course_id: props.course_id, 
        update: { name: student_name.value, _class: student_class.value } 
    };
    try{
        await axios.post("http://localhost:3000/api/teacher/course/editstudent", formDataParams);
    }catch( error ){
        console.error("Error fetching greeting:", error);
    }
    close();
};

</script>

<style>
.Edit-modal {
  max-width: 600px; /* 或者其他你想要的宽度 */
}
</style>