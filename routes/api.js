const express = require('express');
const database = require('../models/index');// require the index.js file from this directory
const Student =database.Student// the student model

const router = express.Router();

router.get('/students', (req, res) => {
    //this will query database, get all rows from DB
    //convert to JSON format
    //available in the then function
    Student.findAll({ order: ['name']}).then(students => {
        //order option will help order the names in the database by type, e.g name
        return res.json(students);
    })
})

//post request is used to add data
//creating a new route to handle new data
router.post('/students', (req, res,next) => {
    const newStudent = req.body// client send a request to include new student in the body of the request
    Student.create(newStudent).then( result => {
        return res.status(201).send('new student created successfully!');
        //status code 201 means it has been created. status code that starts with 200 means valid request was made
        //and everything is ok.
    }).catch( err => {
        // this will the tell the user where the error is coming from
        if (err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message )
            return res.status(400).json(messages)
        }else {
            //some other error
            next(err)
        }
        // 400 means status code for bad request- user/client is sending a request cant fulfill
        //return res.status(400).send('Invalid data');
    })
})

router.patch('/students/:id', (req, res, next) => {
    //this going to match requests o /student/1: /student/2 or as the number goes on
    //req.params stores the id value
    //stores any placeholders in the URL

    const studentID = req.params.id;
    const updatedStudent = req.body// updated data about this student
    Student.update(updatedStudent, {where: {id: studentID}}).then( (result)=>{
        //the result parameter tells what was updated, how many rows were changed
        const rowsModified=result[0]//
        //if 1 row was changed, we found student and they were updated
        if (rowsModified===1){
            return res.status(201).send('updated student updated successfully!');
        }
        // student id that does not exist
        else
        {
            //if 0 rows were updated, student was not found
            return res.status(404).send('Student not found!');
        }
        //res.send('successfully updated!');// status is 200 by default
    }).catch( err => {
        // this will the tell the user where the error is coming from
        if (err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message )
            return res.status(400).json(messages)// 400 means bad request, client error
        }else {
            //some other error
            next(err)
        }// database errors - cant connect, or database report error
    })

    //catch error to catch errors such no id exist, invalid data such as no name, database problem

})

router.delete('/students/:id', (req, res, next) => {
 //delete request to api/students/4 will delete student id 4
    const studentID = req.params.id;
 //destroy means delete
    Student.destroy({where: {id: studentID}}).then( rowsDeleted => {
        //const rowsDeleted=result[0]
        if (rowsDeleted===1){
            return res.send('Student deleted successfully!');
        }else{// 0 rows deleted- the student with this id is not in the database
            return res.status(404).send('Student not found!');
        }
 }).catch( err => {
     return next (err)
    })
})


module.exports = router
