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
        min: 3,
    },
    phone_number: {
        type: String,
        required: true,
        min: 11,
    },
    qualification: {
        type: String,
        required: true,
        min: 11,
    },
    experience: {
        type: String,
        required: true,
        min: 11,
    },
    subjects: {
        type: String,
        required: true,
        min: 11,
    },

    city: {
        type: String,
        required: true,
        min: 11,
    },
    street: {
        type: String,
        required: true,
        min: 11,
    },
    house_number: {
        type: String,
        required: true,
        min: 11,
    },

    father_name: {
        type: String,
        required: true,
        min: 11,
    },
    father_cnic: {
        type: String,
        required: true,
        min: 11,
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);