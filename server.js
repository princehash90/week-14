//this is going to be the main file that controls the application

const express = require('express');// importing the express

const apiRoutes = require('./routes/api');// importing router/ api

const app = express();//making a new express

app.use(express.json());// can handle json data as it comes

app.use('/api', apiRoutes);

app.use(function (req, res, next){
//this will be used for cannot match route
    res.status(404).send('Sorry, Not Found');
})

app.use(function (err,req, res, next) {
    // will use to handle database errors
    console.log(err.stack);
    res.status(500).send('Server Error');
})

//process.env. PORT will be set as environment variable at azure
//azure will decide what port to run
// we use port 3000 on our local computer
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Express server running on port`, server.address().port);
});