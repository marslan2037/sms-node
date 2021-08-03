const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    roll_number: {
        type: String,
        required: true,
        min: 2,
    },
    computer_number: {
        type: String,
        required: true,
        min: 2,
    },
    name: {
        type: String,
        required: true,
        min: 2
    },
    class: {
        type: String,
        required: true,
        min: 1,
    },
    month: {
        type: String,
        required: true,
        min: 1
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    remaining_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        required: true,
        min: 4,
        max: 6,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Fee', feeSchema);