<script setup>
import {onMounted} from "vue";// function that is automatically first called when loaded on the screen

import NewStudentForm from "./NewStudentForm.vue";
import StudentTable from "./StudentTable.vue";
import StudentMessage from "./StudentMessage.vue";

import {useStudentStore} from "./store/StudentStore.js";

const studentStore = useStudentStore();

onMounted(()=>{
  // this will be run when the component is first displayed
  studentStore.getAllStudents()
})
</script>

<template>

  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>/
  <StudentMessage></StudentMessage>


</template>

<style scoped>

#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}



</style>