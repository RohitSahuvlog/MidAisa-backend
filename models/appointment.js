const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
});

// Create a model based on the schema
const appointmentForm = mongoose.model('appointment', formSchema);

module.exports = appointmentForm;
