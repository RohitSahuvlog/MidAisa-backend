const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    officeBranches: [
        {
            location: String,
            address: String,
        },
    ],
    contactInfo: [
        {
            label: String,
            number: String,
            address: String,
        },
    ],
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
