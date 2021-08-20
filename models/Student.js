const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    roll_number: {
        type: String,
        required: true,
        min: 2,
    },
    computer_number: {
        type: String,
        min: 2,
    },
    name: {
        type: String,
        required: true,
        min: 3,
    },
    gender: {
        type: String,
        required: true,
        min: 4,
        max: 6
    },
    fee: {
        type: Number,
        required: true,
        min: 0
    },
    b_form: {
        type: String,
        min: 13,
    },
    class: {
        type: String,
        required: true,
        min: 1,
    },
    religion: {
        type: String,
        required: true,
        min: 2
    },
    status: {
        type: String,
        required: true,
        min: 6,
        max: 8
    },
    nationality: {
        type: String,
        required: true,
        min: 2
    },
    date_of_birth: {
        type: String,
        required: true,
        min: 2
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
        min: 13
    },
    phone_number: {
        type: String,
        required: true,
        min: 11,
        max: 11
    },
    father_occupation: {
        type: String,
        required: true,
        min: 2
    },
    father_education: {
        type: String,
        required: true,
        min: 2
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);