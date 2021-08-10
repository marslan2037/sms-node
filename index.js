const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

var CONFIG = require('./config');

dotenv.config();

//CONNECT TO DB
mongoose 
    .connect(process.env.MONGO_DEV_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   
    })   
    .then(() => console.log("Database connected!"))
    .catch(err => {
        console.log('going to display connection error ')
        console.log(err)
    });

app.set( 'port', ( process.env.PORT || 3000 ));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CONFIG.ALLOW_DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, auth-token");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Configuring body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

//STUDENTS ROUTES
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/user/students', studentRoutes);

//TEACHER ROUTES
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/api/user/teachers', teacherRoutes);

//FEE ROUTES
const feeRoutes = require('./routes/feeRoutes');
app.use('/api/fee', feeRoutes);

//USER ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});