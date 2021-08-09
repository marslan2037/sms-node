
const router = require('express').Router();
const Student = require('../models/Student');
const verify = require('../verifyToken');
const { StudentValidation } = require('../validation');

router.get('/', verify, async (req, res) => {
    const students = await Student.find();
    if(!students) return res.status(400).send('Something went wrong!');

    console.log(students);

    try {
        res.status(200).send(students);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/:id', verify, async (req, res) => {
    const student = await Student.findOne({_id: req.params.id});
    if(!student) return res.status(404).send('No record found!');

    try {
        res.status(200).send(student);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/new', verify, async (req, res) => {

    //GENERATE COMPUTER NUMBER FOR STUDENTS
    let total_students = await Student.find();
    let computer_number = 'pps-std-00'+(parseInt(total_students.length) + 1);

    const { error } = StudentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const student_exist = await Student.findOne({roll_number: req.body.roll_number});
    if(student_exist) return res.status(400).send('Roll Number already exist, please try with new one'); 

    const student = new Student({
        roll_number: req.body.roll_number,
        computer_number: computer_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        nationality: req.body.nationality,
        religion: req.body.religion,
        b_form: req.body.b_form,
        class: (req.body.class).toLowerCase(),
        previous_school: req.body.previous_school,
        country: req.body.country,
        city: req.body.city,
        mohallah: req.body.mohallah,
        street: req.body.street,
        house_number: req.body.house_number,
        father_name: req.body.father_name,
        father_cnic: req.body.father_cnic,
        father_occupation: req.body.father_occupation,
        father_education: req.body.father_education,
        phone_number: req.body.phone_number
    });

    try {
        const savedStudent = await student.save();
        res.send(savedStudent);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', verify, async (req, res) => {
    const studentExists = await Student.findOne({_id: req.params.id});
    if(!studentExists) return res.status(404).send('Student not found');

    const { error } = StudentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        await Student.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    roll_number: req.body.roll_number,
                    computer_number: studentExists.computer_number,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    date_of_birth: req.body.date_of_birth,
                    nationality: req.body.nationality,
                    religion: req.body.religion,
                    b_form: req.body.b_form,
                    class: req.body.class,
                    previous_school: req.body.previous_school,
                    country: req.body.country,
                    city: req.body.city,
                    mohallah: req.body.mohallah,
                    street: req.body.street,
                    house_number: req.body.house_number,
                    father_name: req.body.father_name,
                    father_cnic: req.body.father_cnic,
                    father_occupation: req.body.father_occupation,
                    father_education: req.body.father_education,
                    phone_number: req.body.phone_number
                }
            }
        );
        res.status(200).send('Student record is updated');
    } catch(error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', verify, async (req, res) => {
    const studentExists = await Student.findOne({_id: req.params.id});
    if(!studentExists) return res.status(404).send("Student not found");

    try {
        await Student.deleteOne({_id: req.params.id});
        res.status(200).send("Student record is deleted");
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;