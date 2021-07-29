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
    .catch(err => console.log(err));

// Configuring body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CONFIG.ALLOW_DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//STUDENTS ROUTES
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/user/students', studentRoutes);

//TEACHER ROUTES
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/api/user/teachers', teacherRoutes);

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.listen(3000, () => console.log('Listening to 3000'))