import { defineStore } from 'pinia';

export const useTeacherInformation = defineStore('teacher', {
  // 使用 state 来定义响应式状态
  state: () => ({
    teacher_info: {
      _id: '',
      name: '',
      manager: false,
      courses: []
    }
  }),
  // 使用 actions 来定义可以修改状态的方法
  actions: {
    setValueToInfo(id: string, name: string, manager: boolean, courses: []) {
      this.teacher_info._id = id;
      this.teacher_info.name = name;
      this.teacher_info.manager = manager;
      this.teacher_info.courses = courses;
    }
  }
});

// id: string, name: string, manager: boolean, courses: string[]