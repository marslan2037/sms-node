
const router = require('express').Router();
const Class = require('../models/Class');
const verify = require('../verifyToken');
const { ClassValidation } = require('../validation');

router.get('/', verify, async (req, res) => {
    const classes = await Class.find();
    if(!classes) return res.status(400).send('Something went wrong!');

    try {
        res.status(200).send(classes);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/:id', verify, async (req, res) => {
    const single_class = await Class.findOne({_id: req.params.id});
    if(!single_class) return res.status(404).send('No record found!');

    try {
        res.status(200).send(single_class);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/new', verify, async (req, res) => {

    const { error } = ClassValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const class_exist = await Class.findOne({name: req.body.name});
    if(class_exist) return res.status(400).send('Class is already exist, please try with new one'); 

    const single_class = new Class({
        name: req.body.name,
    });

    try {
        const savedClass = await single_class.save();
        res.send(savedClass);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', verify, async (req, res) => {
    const class_exist = await Class.findOne({_id: req.params.id});
    if(!class_exist) return res.status(404).send('Class not found');

    const { error } = ClassValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        await Class.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                }
            }
        );
        res.status(200).send(req.params.id);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', verify, async (req, res) => {
    const classExists = await Class.findOne({_id: req.params.id});
    if(!classExists) return res.status(404).send("Class not found");

    try {
        await Class.deleteOne({_id: req.params.id});
        res.status(200).send("Class record is deleted");
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;