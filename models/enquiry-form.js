const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;
