//creating function definition
//something else will call to provide information about sequelize and datatype
module.exports = (sequelize, DataTypes) => {
    //defining the model
    const Student = sequelize.define('Student', {
        //defining the columns in the database- giving a name and type
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:false,
            }
        },
        starID:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:false,
            }
        },
        present:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            default:false

        }
    })
    //create or update table in the database
    Student.sync({force: false}).then(() => {
        console.log('Synced student table')
    })

    return Student

}