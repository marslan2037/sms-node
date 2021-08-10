
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RegisterUserValidation, LoginValidation } = require('../validation');

router.get('/test', async (req, res) => {
    res.send('It works');
});

router.post('/login', async (req, res) => {
    const { error } = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email doesn't exist");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECERET);

    let data = {
        name: user.first_name+' '+user.last_name,
        token: token,
        email: user.email
    }
    
    try {
        res.header('auth-token', token).send(data);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.post('/register', async (req, res) => {
    const { error } = RegisterUserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const email_exist = await User.findOne({email: req.body.email});
    if(email_exist) return res.status(400).send('Email already exist, please try with new one');
    
    //HAS THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;