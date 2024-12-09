const {Sequelize, DataType, DataTypes} = require('sequelize');// importing sequelize and dataTypes

const configJson = require('../config.json');// this is the object we have defined in config.json
const createStudentModel = require('./student.js')

//this means look for an environment variable that will be called NODE_ENV and read it's value
//environment variables are set for your whole computer ( or for a server)
//or any application running on thus computer (or server) can read these environment variable
// at Azure, we will create an environment variable called NODE_ENV and set it to "production"
//if there is not NODE_ENV set, like on your computer, we will use the value 'development'
const env = process.env.NODE_ENV || 'development';

const config = configJson[env]// read the configuration object for 'development' or 'production'

//setting up a sequelize object based on the config
const sequelize = new Sequelize(config);
// setting the database with the sequelize objected created on line 16

const database = {
    sequelize: sequelize,
    Sequelize:Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes);
const studentModelName = studentModel.name // this will be 'Student'
database[studentModelName] =studentModel;//adding a new property (studentModelName) to the database object


module.exports = database;