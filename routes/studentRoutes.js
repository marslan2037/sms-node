
const router = require('express').Router();
const Student = require('../models/Student');
const { StudentValidation } = require('../validation');

router.get('/', async (req, res) => {
    const students = await Student.find();
    if(!students) return res.status(404).send('No record found!');

    try {
        res.status(200).send(students);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne({_id: req.params.id});
    if(!student) return res.status(404).send('No record found!');

    try {
        res.status(200).send(student);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/new', async (req, res) => {
    const { error } = StudentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const student_exist = await Student.findOne({roll_number: req.body.roll_number});
    if(student_exist) return res.status(400).send('Roll Number already exist, please try with new one'); 

    const student = new Student({
        roll_number: req.body.roll_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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
        phone_number: req.body.phone_number
    });

    try {
        const savedStudent = await student.save();
        res.send(savedStudent);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async (req, res) => {
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
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
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
                    phone_number: req.body.phone_number
                }
            }
        );
        res.status(200).send('Student record is updated');
    } catch(error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
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