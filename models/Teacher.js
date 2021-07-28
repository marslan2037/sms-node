const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
    },
    cnic: {
        type: String,
        required: true,
        min: 13,
        max: 15
    },
    phone_number: {
        type: String,
        required: true,
        min: 11,
        max: 11
    },
    qualification: {
        type: String,
        required: true,
        min: 3,
    },
    experience: {
        type: String,
        required: true,
        min: 1,
    },
    country: {
        type: String,
        required: true,
        min: 3,
    },
    city: {
        type: String,
        required: true,
        min: 3,
    },
    mohallah: {
        type: String,
        required: true,
        min: 3,
    },
    street: {
        type: String,
        required: true,
        min: 1,
    },
    house_number: {
        type: String,
        required: true,
        min: 1,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);