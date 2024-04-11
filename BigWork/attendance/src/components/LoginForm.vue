<!-- 这个组件是用来进行登录的 success -->
<template>
    <n-form>
        <n-form-item class="centered-form-item">
            <n-gradient-text :size="48" type="success">
                Login
            </n-gradient-text>
        </n-form-item>
        <n-form-item label="Account">
            <n-input :round="true" size="medium" placeholder="请输入您的工号" v-model:value="formData.id" />
        </n-form-item>
        <n-form-item label="Password">
            <n-input :round="true" size="medium" placeholder="请输入您的密码" v-model:value="formData.password" type="password"/>
        </n-form-item>
        <n-form-item class="centered-form-item">
            <n-button type="primary" @click="handleSubmit" :round="true" :ghost="true">login</n-button>
        </n-form-item>
    <!-- 这里之后在添加一个登陆是否成功的提示 -->
    </n-form>

</template>

<script setup>
import { ref } from 'vue';
import { NForm, NFormItem, NInput, NButton } from 'naive-ui';
import axios from 'axios';
import { useTeacherInformation } from '../stores/teacherStore.ts'
import { useRouter } from 'vue-router';

const store = useTeacherInformation();

const router = useRouter();

const formData = ref({
    id: '',
    password: ''
});

const handleSubmit = async () => {
    // 登陆逻辑
    try{
        const response = await axios.post("http://localhost:3000/api/teacher/login", formData.value);
        store.setValueToInfo(response.data._id, response.data.name , response.manager, response.data.courses);
        console.log( store.teacher_info );
        router.push('/course');
    }catch(error){
        console.error("Error fetching greeting:", error);
    }
};

</script>

<style>
.centered-form-item{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>








