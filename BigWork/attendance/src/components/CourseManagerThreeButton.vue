<template>
  <n-space>
    <n-button type="primary" @click="showEditCourse = true" :round="true" :ghost="true"
      >编辑课程信息</n-button
    >
    <n-modal
      :show="showEditCourse"
      preset="card"
      title="编辑课程信息"
      @mask-click="showEditCourse = false"
      class="custom-modal"
    >
      <n-form @submit.prevent="editCourseInfo">
        <n-form-item label="课程名称">
          <n-input :round="true" size="medium" v-model:value="editInformation.name"></n-input>
        </n-form-item>
        <n-form-item label="上课地点">
          <n-input :round="true" size="medium" v-model:value="editInformation.location"></n-input>
        </n-form-item>
        <n-form-item label="上课时间">
          <n-input :round="true" size="medium" v-model:value="editInformation.time"></n-input>
        </n-form-item>
        <n-form-item label="课程类别">
          <n-input :round="true" size="medium" v-model:value="editInformation._class"></n-input>
        </n-form-item>
        <n-form-item label="开设学院">
          <n-input :round="true" size="medium" v-model:value="editInformation.college"></n-input>
        </n-form-item>
        <n-form-item class="centered-form-item">
          <n-button
            type="primary"
            native-type="submit"
            @click="editCourseInfo"
            :disabled="isCreating"
            :round="true"
            :ghost="true"
            >修改</n-button
          >
        </n-form-item>
      </n-form>
    </n-modal>

    <n-button type="primary" :ghost="true" :round="true" @click="showAddStudent = true"
      >添加学生</n-button
    >
    <n-modal
      :show="showAddStudent"
      preset="card"
      title="添加学生"
      @mask-click="showAddStudent = false"
      class="custom-modal"
    >
      <n-form>
        <n-form-item label="请输入学生学号">
          <n-input :round="true" size="medium" v-model:value="student_id"></n-input>
        </n-form-item>
        <n-form-item class="centered-form-item">
          <n-button
            type="primary"
            native-type="submit"
            @click="AddStudentInfo"
            :disabled="isCreating"
            :round="true"
            :ghost="true"
            >添加学生</n-button
          >
        </n-form-item>
      </n-form>
    </n-modal>

    <n-button type="primary" :ghost="true" :round="true" @click="jumpAttendanceInfo"
      >签到信息表</n-button
    >
  </n-space>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();
const showEditCourse = ref(false)
const showAddStudent = ref(false)
const isCreating = ref(false) // 用于防止重复提交

const props = defineProps({
  course_id: String,
});

const editInformation = ref({
  name: '',
  location: '',
  time: '',
  _class: '',
  college: '',
})

const student_id = ref('')

const editCourseInfo = async () => {
  // 编辑课程信息逻辑
  console.log('成功编辑')
  try{
    await axios.post("http://localhost:3000/api/teacher/course/editCoursesInformation", { operation: "edit", course_id: props.course_id, update: editInformation.value });
  } catch( error ){
    console.error("Error fetching greeting:", error);
  };
  console.log(editInformation.value);
  showEditCourse.value = !showEditCourse.value
}

const AddStudentInfo = async () => {
  try{
    await axios.post("http://localhost:3000/api/teacher/course/editstudent", { operation: "add", student_id: student_id.value, course_id: props.course_id });
  }catch( error ){
    console.error("Error fetching greeting:", error);
  }

  showAddStudent.value = !showAddStudent.value
}

const jumpAttendanceInfo = () => {
  router.push({ name: "CourseAttendance", params: {  courseId: props.course_id } });
}
</script>

<style>
.centered-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-modal {
  max-width: 600px; /* 或者其他你想要的宽度 */
}
</style>
