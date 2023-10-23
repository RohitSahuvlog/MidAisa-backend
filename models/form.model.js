const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    flight: {
        type: String
    },
    title: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: String,
    preferredTime: {
        type: String,
    },
    country: String,
    prompted: {
        type: String
    },
    newsCheckbox: {
        type: String
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
});

const formModule = mongoose.model('Form', formSchema);

module.exports = formModule;
