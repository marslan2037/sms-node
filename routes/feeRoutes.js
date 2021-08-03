const router = require('express').Router();
const Fee = require('../models/Fee');
const Student = require('../models/Student');
const { FeeValidation } = require('../validation');

router.get('/paid', async (req, res) => {
    const fees = await Fee.find();
    if(!fees) return res.status(400).send('Something went wrong!');

    try {
        res.status(200).send(fees);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/unpaid', async (req, res) => {
    const fees = await Fee.find();
    if(!fees) return res.status(400).send('Something went wrong!');

    const students = await Student.find();
    if(!students) return res.status(400).send('Something went wrong!');

    // let result = students.filter(x => {
    //     console.log(x)
    //     // !fees.includes(x.roll_number)
    // });

    let result = [];
    for(let i=0; i<students.length; i++) {
        const found = fees.some(el => el.roll_number === students[i].roll_number && el.class === students[i].class);

        if(!found) {
            result.push(students[i]);
        }
    }

    try {
        res.status(200).send(result);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/fetch-student', async (req, res) => {
    const student = await Student.findOne({
        roll_number: req.body.roll_number,
        class: req.body.class
    });
    if(!student) return res.status(404).send('Student not found');

    let amount = 0;
    if(student.class == 1 || student.class == '1' || student.class == 'One') {
        amount = 1500;
    } else if(student.class == 2 || student.class == '2' || student.class == 'Two') {
        amount = 2000;
    } else if(student.class == 3 || student.class == '3' || student.class == 'Three') {
        amount = 2500;
    } else if(student.class == 4 || student.class == '4' || student.class == 'Four') {
        amount = 3000;
    } else if(student.class == 5 || student.class == '5' || student.class == 'Five') {
        amount = 4000;
    }
    
    let data = {
        name: student.first_name+' '+student.last_name,
        computer_number: student.computer_number,
        class: student.class,
        father_name: student.father_name,
        amount: amount
    }

    try {
        res.status(200).send(data);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/new', async (req, res) => {
    const { error } = FeeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const amount = req.body.amount;
    if(amount <= 0) return res.status(400).send('Please enter fee to proceed');

    const fee_exist = await Fee.findOne({
        roll_number: req.body.roll_number,
        class: req.body.class,
        month: req.body.month
    });

    if(fee_exist) return res.status(400).send('Already Paid'); 

    const fee = new Fee({
        roll_number: req.body.roll_number,
        computer_number: req.body.computer_number,
        name: req.body.name,
        class: req.body.class,
        month: req.body.month,
        amount: req.body.amount,
        remaining_amount: req.body.remaining_amount,
        status: req.body.status
    });

    try {
        const savedFee = await fee.save();
        res.send(savedFee);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/paid/:id', async (req, res) => {
    const fee = await Fee.findOne({_id: req.params.id});
    if(!fee) return res.status(404).send("Fee not found");

    try {
        res.status(200).send(fee);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.patch('/paid/:id', async (req, res) => {
    const { error } = FeeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const amount = req.body.amount;
    if(amount <= 0) return res.status(400).send('Please enter fee to proceed');

    try {
        await Fee.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    roll_number: req.body.roll_number,
                    class: req.body.class,
                    month: req.body.month,
                    amount: req.body.amount,
                    remaining_amount: req.body.remaining_amount,
                    status: req.body.status
                }
            }
        );
        res.status(200).send('Fee record is updated');
    } catch(error) {
        res.status(400).send(error);
    }
});

router.delete('/paid/:id', async (req, res) => {
    const feeExists = await Fee.findOne({_id: req.params.id});
    if(!feeExists) return res.status(404).send("Fee not found");
    console.log(feeExists)
    try {
        await Fee.deleteOne({_id: req.params.id});
        res.status(200).send("Fee record is deleted");
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;