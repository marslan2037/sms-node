
const router = require('express').Router();
const Teacher = require('../models/Teacher');
const { TeacherValidation } = require('../validation');

router.get('/', async (req, res) => {
    const teachers = await Teacher.find();
    if(!teachers) return res.status(400).send('Something went wrong!');
    
    try {
        res.status(200).send(teachers);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const teacher = await Teacher.findOne({_id: req.params.id});
    if(!teacher) return res.status(404).send('No record found!');

    try {
        res.status(200).send(teacher);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/new', async (req, res) => {
    const { error } = TeacherValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const teacher_exist = await Teacher.findOne({teacher_id: req.body.teacher_id});
    if(teacher_exist) return res.status(400).send('Teacher ID is already exist, please try with new one'); 

    const teacher = new Teacher({
        teacher_id: req.body.teacher_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        cnic: req.body.cnic,
        phone_number: req.body.phone_number,
        experience: req.body.experience,
        qualification: req.body.qualification,
        country: req.body.country,
        city: req.body.city,
        mohallah: req.body.mohallah,
        street: req.body.street,
        house_number: req.body.house_number,
    });

    try {
        const savedTeacher = await teacher.save();
        res.status(200).send(savedTeacher);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    const teacherExists = await Teacher.findOne({_id: req.params.id});
    if(!teacherExists) return res.status(404).send('Teacher not found');

    const { error } = TeacherValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        await Teacher.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    teacher_id: req.body.teacher_id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    cnic: req.body.cnic,
                    phone_number: req.body.phone_number,
                    experience: req.body.experience,
                    qualification: req.body.qualification,
                    country: req.body.country,
                    city: req.body.city,
                    mohallah: req.body.mohallah,
                    street: req.body.street,
                    house_number: req.body.house_number,
                }
            }
        );
        res.status(200).send('Teacher record is updated');
    } catch(error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const teacherExists = await Teacher.findOne({_id: req.params.id});
    if(!teacherExists) return res.status(404).send("Teacher not found");
    
    try {
        await Teacher.deleteOne({_id: req.params.id});
        res.status(200).send("Teacher record is deleted");
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;