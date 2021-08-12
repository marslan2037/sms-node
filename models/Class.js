const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Class', classSchema);