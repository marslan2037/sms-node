const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    roll_number: {
        type: String,
        required: true,
        min: 2,
    },
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
    b_form: {
        type: String,
        min: 11,
    },
    class: {
        type: String,
        required: true,
        min: 1,
    },
    previous_school: {
        type: String
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
    father_name: {
        type: String,
        required: true,
        min: 3,
    },
    father_cnic: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);