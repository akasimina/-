<template>
<n-grid :y-gap="80" :x-gap="12" :col="3">
<n-grid-item :span="24" />
<n-grid-item :span="6" />
<n-grid-item :span="10">
    <LoginForm />
</n-grid-item>
<n-grid-item :span="6" />
</n-grid>

</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'



</script>