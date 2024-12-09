import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {mande} from "mande";

const studentAPI = mande('api/students')

export  const useStudentStore =  defineStore('students', ()=>{

 const sortedStudents = ref([]);

 const mostRecentStudent = ref({});
 //normal js function to add a new student

const addNewStudentErrors = ref([])

 function getAllStudents() {
     //make an api request to get all the student and save them in the store
     studentAPI.get().then( students => {// students is the JSON response from the API
         sortedStudents.value = students;
     }).catch(err =>{
         console.log(err);
     })
 }
//function to add new student
 function addNewStudent(student) {
     //make API call to add new student
     //call getAllStudents to re-request list of students from API server
     studentAPI.post(student).then( ()=> {
         getAllStudents();
     }).catch(err =>{
         addNewStudentErrors.value = err.body;
     })
     //studentList.value.push(student);
 }

 // function to delete using filter
 function deleteStudent(studentToDelete) {
    const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`);
    deleteStudentAPI.delete().then( result => {
        mostRecentStudent.value = {};
        getAllStudents()
    }).catch(err =>{
        console.log(err);
    })
     // studentList.value = studentList.value.filter ( (student) => {
     //     return studentToDelete!== student
     // })
     //mostRecentStudent.value = {}// resets most recent mess
 }
//function to check which student is there or not
 function arrivedOrLeft (student) {
    const editStudentAPI = mande(`/api/students/${student.id}`)
     editStudentAPI.patch(student).then(()=>{
         mostRecentStudent.value =student;
         getAllStudents();//making a request for updated list from the server
     }).catch(err =>{
         console.log(err);
     })
    // mostRecentStudent.value = student;
 }
 // function to check the number of students in the list
 const studentCount = computed(()=>{
     return sortedStudents.value.length;
 })

    // const sortedStudents = computed(()=>{
    //     return studentList.value.toSorted(  (s1,s2) =>{
    //         return s1.name.localeCompare(s2.name);
    //     })
    // })


 return{
     //reactive data
    // studentList,
     sortedStudents,
     addNewStudentErrors,
     mostRecentStudent,
     addNewStudent,
     deleteStudent,
     arrivedOrLeft,
     studentCount,
     getAllStudents
 }

})