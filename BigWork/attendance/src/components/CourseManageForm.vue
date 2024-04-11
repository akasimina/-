
<template>
<n-data-table 
    :columns="columns"
    :data="data"
    :bordered="true"
    :border-radius="12"
/>
<EditStudentModal :showEditStudent="showEditStudent" :student="currentEditStudent" :course_id="course_id" @changeShow="showEditStudent = $event"/>
</template>

<script setup>
import { h, defineProps, ref, onMounted } from 'vue';
import { NButton } from 'naive-ui';
import axios from 'axios';
import EditStudentModal from './EditStudentModal.vue'

const props = defineProps({
    course_id: String,
});

const currentEditStudent = ref(null);

const data = ref([]);

const fetchStudents = async () => {
  try{
    const response = await axios.get("http://localhost:3000/api/teacher/course/displaystudents", { params: { id: props.course_id } });
    data.value = response.data;
    console.log(data);
  } catch( error ){
    console.error("Error fetching greeting:", error);
  }
}

const columns = [
    { title: "_id", key: "_id" },
    { title: "name", key: "name" },
    { title: "_class", key: "_class" },
    { title: "delete", key: "delete", render (row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => deleteStudent(row)
          },
          { default: () => '删除' }
        )
      } },
      { title: "edit", key: "edit", render (row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => editStudent(row)
          },
          { default: () => '修改' }
        )
      } }
];

const showEditStudent = ref(false);

const editStudent = async (row) => {
  showEditStudent.value = !showEditStudent.value;
  currentEditStudent.value = row;
};

const deleteStudent = async (row) => {
  try{
    await axios.post("http://localhost:3000/api/teacher/course/editstudent", { operation: "delete", student_id: row._id, course_id: props.course_id });
    data.value = data.value.filter(item => item._id != row._id);
  }catch(error){
    console.error("Error fetching greeting:", error);
  }

  cosole.log(row.value);
};

onMounted(() => {
  fetchStudents();
})

</script>












